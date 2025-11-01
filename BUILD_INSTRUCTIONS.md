# Build Instructions

## Issue: Blank White Screen / PWA Not Loading

If you see a blank white screen when running the app, the PWA files are not being included in the app bundle. Follow these steps to fix:

### Solution 1: Verify PWA Folder is in Xcode Project

1. Open `PWA_Shell.xcodeproj` in Xcode
2. In the Project Navigator (left sidebar), verify you can see:
   ```
   PWA_Shell
   ├── PWA_ShellApp.swift
   ├── ContentView.swift
   ├── Assets.xcassets
   └── PWA (folder - should appear blue)
       ├── index.html
       ├── styles.css
       ├── app.js
       ├── manifest.json
       ├── service-worker.js
       ├── icon.svg
       └── test.html
   ```

3. If the PWA folder is **missing** or appears **yellow** instead of blue:
   - Right-click on `PWA_Shell` folder in Project Navigator
   - Select "Add Files to PWA_Shell..."
   - Navigate to and select the `PWA` folder
   - **IMPORTANT**: Check "Create folder references" (NOT "Create groups")
   - Click "Add"

4. Verify the PWA folder now appears **blue** in the Project Navigator

### Solution 2: Check Xcode Version

This project uses `PBXFileSystemSynchronizedRootGroup` which requires:
- **Xcode 15.0 or later**

If you're using an older version of Xcode:
1. Upgrade to Xcode 15+ (recommended)
2. Or manually add the PWA files using folder references (Solution 1)

### Solution 3: Clean Build

After ensuring files are properly added:

1. In Xcode menu: Product > Clean Build Folder (⇧⌘K)
2. In Xcode menu: Product > Build (⌘B)
3. Run the app (⌘R)

### Solution 4: Verify Files in Build Phase

1. Select the project in Project Navigator
2. Select the "PWA_Shell" target
3. Go to "Build Phases" tab
4. Expand "Copy Bundle Resources"
5. If PWA folder is not listed, add it:
   - Click the "+" button
   - Select "Add Other..." > "Add Files..."
   - Navigate to and select the entire `PWA` folder
   - Ensure "Copy items if needed" is unchecked
   - Click "Add"

### Debugging

Check the Xcode console for debug messages:

- ✅ `Found PWA at: /path/to/PWA/index.html` - Files found successfully
- ❌ `Failed to find PWA files in bundle` - Files not in bundle (follow solutions above)
- ❌ `WebView navigation failed:` - Check file paths and permissions

### Testing the Fix

After applying any solution:

1. Clean build (⇧⌘K)
2. Build (⌘B)
3. Run (⌘R)
4. You should see the PWA app with:
   - Purple gradient background
   - "🌟 PWA Example App" header
   - Navigation buttons (Home, Audio, Camera, Mic)

If you still see a blank/white screen:
- Check Console for error messages
- Try running on a different simulator
- Delete the app from simulator and reinstall

### Folder Reference vs Group

The PWA folder must be added as a **Folder Reference** (blue folder) not a **Group** (yellow folder):

- 📁 **Folder Reference (Blue)**: Maintains folder structure, includes all files automatically
- 📂 **Group (Yellow)**: Logical grouping only, files must be added individually

### Common Mistakes

❌ Don't:
- Add PWA files as individual files
- Use "Create groups" when adding the folder
- Forget to clean build after changes

✅ Do:
- Add entire PWA folder as folder reference
- Use "Create folder references" option
- Clean build before testing
- Verify folder appears blue in Project Navigator

## Alternative: Load from Remote URL

If local file loading continues to have issues, you can load the PWA from a web server:

Edit `ContentView.swift`:
```swift
// Replace the file loading code with:
if let url = URL(string: "https://your-pwa-domain.com") {
    webView.load(URLRequest(url: url))
}
```

This requires hosting the PWA on a web server but avoids bundle file issues.

## Still Having Issues?

1. Check Xcode version: `xcodebuild -version` (should be 15.0+)
2. Verify PWA files exist: `ls -la PWA_Shell/PWA/`
3. Check Console output when running the app
4. Try the test.html file first to verify basic loading works
5. Report the issue with Console output and Xcode version
