import { db } from './client';
import { events, chapters, articles, items, article_event } from './schema';

export const seedDatabase = async () => {
  try {
    // Check if we already have data
    const existingChapters = await db.select().from(chapters).limit(1);
    if (existingChapters.length > 0) {
      console.log('🌱 Database already seeded, skipping...');
      return;
    }

    console.log('🌱 Seeding database...');

    // 1. Create a Chapter
    const [chapter] = await db.insert(chapters).values({
      name: 'تعقیباتِ نماز (Taqeebat-e-Namaz)',
      thumbnail_url: 'https://example.com/taqeebat.png',
    }).returning();

    // 2. Create an Article in that Chapter
    const [article] = await db.insert(articles).values({
      chapter_id: chapter.id,
      title_ar: 'تعقيب صلاة الظهر',
      title_en: 'Taqeeb of Zuhr Prayer',
      short_description: 'Recommended prayers after Zuhr namaz',
    }).returning();

    // 3. Create Items for the Article
    await db.insert(items).values([
      {
        article_id: article.id,
        sequence_order: 1,
        arabic_text: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ',
        urdu_translation: 'اللہ کے سوا کوئی معبود نہیں جو عظمت والا اور بردبار ہے',
        english_translation: 'There is no god but Allah, the Great, the Forbearing',
        instruction: 'Recite 3 times',
      },
      {
        article_id: article.id,
        sequence_order: 2,
        arabic_text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ',
        urdu_translation: 'اے اللہ میں تجھ سے تیری رحمت کے اسباب کا سوال کرتا ہوں',
        english_translation: 'O Allah, I ask You for the causes of Your mercy',
      }
    ]);

    // 4. Create an Event
    const [event] = await db.insert(events).values({
      name: 'شبِ قدر (Shab-e-Qadr)',
      details: 'The night of power in the month of Ramadan',
    }).returning();

    // 5. Link Article to Event
    await db.insert(article_event).values({
      article_id: article.id,
      event_id: event.id,
    });

    console.log('✅ Seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
};
