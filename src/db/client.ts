import { drizzle } from "drizzle-orm/sqlite-proxy";
import SQLite from "react-native-sqlite-storage";
import * as schema from "./schema";
import migrations from "../../drizzle/migrations";

// Open the database
const sqlite = SQLite.openDatabase({
  name: "MyData_v5.db", // Fresh start with cleaned migrations
  location: "default",
});

// Helper to extract column names from SQL queries
const getColumnNames = (sql: string): string[] | null => {
  // Handle SELECT queries
  const selectMatch = sql.match(/select\s+(.*?)\s+from/i);
  if (selectMatch) {
    const columnPart = selectMatch[1];
    return columnPart.split(',').map(col => {
      const parts = col.trim().split(/\s+as\s+/i);
      const target = parts[parts.length - 1]; // Get the alias if exists, else the column
      return target.replace(/"/g, '').replace(/`/g, '').split('.').pop() || '';
    });
  }

  // Handle RETURNING clauses (for INSERT/UPDATE)
  const returningMatch = sql.match(/returning\s+(.*)$/i);
  if (returningMatch) {
    return returningMatch[1].split(',').map(col =>
      col.trim().replace(/"/g, '').replace(/`/g, '').split('.').pop() || ''
    );
  }

  return null;
};

// Create a callback function for the proxy driver
const callback = async (sql: string, params: any[], method: "all" | "run" | "get" | "values") => {
  try {
    // console.log(`Proxy SQL [${method}]:`, sql.substring(0, 50));

    // Check for RETURNING clause which is often unsupported in RN SQLite
    const hasReturning = sql.toLowerCase().includes('returning');
    let effectiveSql = sql;

    if (hasReturning && (sql.toLowerCase().startsWith('insert') || sql.toLowerCase().startsWith('update'))) {
      // Strip RETURNING for execution if the driver doesn't support it
      effectiveSql = sql.replace(/\s+returning\s+.*$/i, '');
      console.log('📡 Stripped RETURNING for compatibility');
    }

    const results = await new Promise<any[]>((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(effectiveSql, params, (_, res) => {
          const rows: any[] = [];

          if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
              rows.push(res.rows.item(i));
            }
          }

          // If it was an insert and we wanted data back but got none (due to unsupported RETURNING)
          // we can at least return the insertId if Drizzle expects some columns
          if (rows.length === 0 && res.insertId !== undefined && hasReturning) {
            // This is a minimal fallback, but better than erroring
            // Ideally we'd query the row here, but transaction is closing
            // Drizzle will map the insertId to the primary key
            const fallbackRow: any = { id: res.insertId };
            rows.push(fallbackRow);
          }

          resolve(rows);
        }, (_, err) => {
          reject(err);
          return false;
        });
      });
    });

    const columnNames = getColumnNames(sql);

    if (columnNames && columnNames.length > 0) {
      // Map objects to arrays based on the parsed column order
      const data = results.map(row => columnNames.map(col => row[col] === undefined ? null : row[col]));
      if (method === "get") {
        return { rows: data[0] || [] };
      }
      return { rows: data };
    }

    // Default for metadata queries or queries where column extraction fails
    const defaultData = results.map(row => Object.values(row));
    if (method === "get") {
      return { rows: defaultData[0] || [] };
    }
    return { rows: defaultData };
  } catch (e) {
    console.error("Drizzle Proxy Error:", e);
    throw e;
  }
};

// Initialize Drizzle with the proxy
export const db = drizzle(callback, { schema });

// Migration runner
export const runMigrations = async () => {
  try {
    const execute = (sql: string, params: any[] = []) => new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(sql, params, (_, res) => resolve(res), (_, err) => {
          reject(err);
          return false;
        });
      });
    });

    // Helper to check if a column exists in a table (useful for idempotent migrations)
    const columnExists = async (tableName: string, columnName: string): Promise<boolean> => {
      try {
        const res: any = await execute(`PRAGMA table_info(${tableName})`);
        return res.rows.length > 0 && res.rows.some((col: any) => col.name === columnName);
      } catch {
        return false;
      }
    };

    // Create migrations table
    await execute(`
      CREATE TABLE IF NOT EXISTS __drizzle_migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        hash TEXT UNIQUE,
        created_at INTEGER NOT NULL
      );
    `);

    try {
      await execute(`ALTER TABLE __drizzle_migrations ADD COLUMN name TEXT UNIQUE`);
    } catch (e) { }

    if (!migrations || !migrations.migrations) {
      throw new Error("Migrations not properly loaded");
    }

    const migrationKeys = Object.keys(migrations.migrations).sort();

    for (const key of migrationKeys) {
      const res: any = await execute(
        `SELECT id FROM __drizzle_migrations WHERE name = ? OR hash = ?`,
        [key, key]
      );

      if (res.rows.length > 0) continue;

      let sql = (migrations.migrations as any)[key];
      // Handle babel-plugin-inline-import default export
      if (sql && typeof sql === 'object' && 'default' in sql) {
        sql = sql.default;
      }

      if (!sql || typeof sql !== 'string') {
        throw new Error(`Migration SQL for ${key} is missing or invalid`);
      }

      // Split by statement-breakpoint (handle optional spaces)
      const statements = sql.split(/-->\s*statement-breakpoint/);

      for (const statement of statements) {
        const trimmed = statement.trim();
        if (!trimmed) continue;

        // Enhanced idempotent CREATE TABLE & DROP TABLE
        let finalSql = trimmed;
        if (trimmed.toUpperCase().startsWith('CREATE TABLE') && !trimmed.toUpperCase().includes('IF NOT EXISTS')) {
          finalSql = trimmed.replace(/CREATE TABLE/i, 'CREATE TABLE IF NOT EXISTS');
        } else if (trimmed.toUpperCase().startsWith('DROP TABLE') && !trimmed.toUpperCase().includes('IF EXISTS')) {
          finalSql = trimmed.replace(/DROP TABLE/i, 'DROP TABLE IF EXISTS');
        }

        // Handle ALTER TABLE ADD COLUMN idempotency
        const alterMatch = finalSql.match(/ALTER TABLE [`']?(\w+)[`']? ADD [`']?(\w+)[`']?/i);
        if (alterMatch) {
          const [, tableName, columnName] = alterMatch;
          if (await columnExists(tableName, columnName)) {
            console.log(`⏩ Skipping column add: ${tableName}.${columnName} already exists`);
            continue;
          }
        }

        try {
          console.log(`📡 Executing: ${finalSql.substring(0, 50)}${finalSql.length > 50 ? '...' : ''}`);
          await execute(finalSql);
        } catch (e) {
          console.error(`❌ Statement failed: ${finalSql}`);
          console.error(`❌ Error details:`, e);
          // Don't throw for DROP TABLE errors during reset/migration testing
          if (!finalSql.toUpperCase().includes('DROP TABLE')) {
            throw e;
          }
        }
      }

      await execute(
        `INSERT INTO __drizzle_migrations (name, hash, created_at) VALUES (?, ?, ?)`,
        [key, key, Date.now()]
      );
    }
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
};
