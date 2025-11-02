# PWA Icons Setup

## Current Status
The app is configured with placeholder icon files. You need to generate proper PNG icons.

## Generate Icons

### Option 1: Using an online tool
1. Visit https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
2. Upload your icon design (preferably 512x512 SVG or PNG)
3. Generate the icon pack
4. Replace the files in `/public/`:
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)

### Option 2: Using ImageMagick (if installed)
```bash
# Install ImageMagick if needed
brew install imagemagick

# Convert your source image
convert icon.svg -resize 192x192 public/icon-192.png
convert icon.svg -resize 512x512 public/icon-512.png
```

### Option 3: Manual creation
Create PNG files at:
- `public/icon-192.png` - 192x192 pixels
- `public/icon-512.png` - 512x512 pixels

## Design Guidelines for iOS
- Use simple, recognizable designs
- Avoid small text
- Ensure good contrast
- Square aspect ratio (will be rounded by iOS)
- No transparency for iOS icons
- Consider the "maskable" safe zone (center 80%)

## Testing on iPhone
1. Build the app: `npm run build`
2. Serve the dist folder: `npm run preview`
3. Open Safari on iPhone
4. Navigate to your app URL
5. Tap the Share button
6. Tap "Add to Home Screen"
7. The app will install with your icon
