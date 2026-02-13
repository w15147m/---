import os
from PIL import Image

def resize_and_save(source_path, target_path, size):
    try:
        img = Image.open(source_path)
        img = img.resize((size, size), Image.Resampling.LANCZOS)
        img.save(target_path)
        print(f"Saved {size}x{size} to {target_path}")
    except Exception as e:
        print(f"Error saving to {target_path}: {e}")

logo_source = "src/assets/app-log/logo.png"

# Android Icons Mapping (Name: Size)
android_icons = {
    "android/app/src/main/res/mipmap-mdpi": 48,
    "android/app/src/main/res/mipmap-hdpi": 72,
    "android/app/src/main/res/mipmap-xhdpi": 96,
    "android/app/src/main/res/mipmap-xxhdpi": 144,
    "android/app/src/main/res/mipmap-xxxhdpi": 192,
}

for folder, size in android_icons.items():
    os.makedirs(folder, exist_ok=True)
    resize_and_save(logo_source, os.path.join(folder, "ic_launcher.png"), size)
    resize_and_save(logo_source, os.path.join(folder, "ic_launcher_round.png"), size)

# iOS Icons (Sizes based on standard AppIcon requirements)
ios_path = "ios/ReactNativeTutorial/Images.xcassets/AppIcon.appiconset"
os.makedirs(ios_path, exist_ok=True)

ios_icons = [
    ("icon-20x20@2x.png", 40),
    ("icon-20x20@3x.png", 60),
    ("icon-29x29@2x.png", 58),
    ("icon-29x29@3x.png", 87),
    ("icon-40x40@2x.png", 80),
    ("icon-40x40@3x.png", 120),
    ("icon-60x60@2x.png", 120),
    ("icon-60x60@3x.png", 180),
    ("icon-1024x1024.png", 1024),
]

for filename, size in ios_icons:
    resize_and_save(logo_source, os.path.join(ios_path, filename), size)

print("Icon generation complete!")
