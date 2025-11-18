# Customizing the PWA Shell

This guide explains how to replace the example PWA with your own Progressive Web App.

## Quick Start

The simplest way to use this template with your own PWA:

1. Replace all files in `PWA_Shell/PWA/` with your PWA files
2. Ensure your PWA has an `index.html` entry point
3. Update permissions in Xcode project settings if needed
4. Build and run in Xcode

## Step-by-Step Customization

### 1. Prepare Your PWA

Your Progressive Web App should include:

**Required Files:**
- `index.html` - Main entry point (must be named exactly this)
- `manifest.json` - PWA manifest with app metadata
- `service-worker.js` - For offline functionality (optional but recommended)

**Optional Files:**
- CSS files for styling
- JavaScript files for functionality
- Images, fonts, and other assets
- Additional HTML pages

**PWA Requirements:**
```
my-pwa/
├── index.html          # Required - entry point
├── manifest.json       # Recommended - app metadata
├── service-worker.js   # Recommended - offline support
├── styles/
│   └── main.css
├── scripts/
│   └── app.js
└── assets/
    ├── icons/
    └── images/
```

### 2. Replace the Example PWA

**Option A: Replace All Files**
```bash
# Delete example PWA
rm -rf PWA_Shell/PWA/*

# Copy your PWA files
cp -r /path/to/your/pwa/* PWA_Shell/PWA/
```

**Option B: Using Xcode**
1. In Xcode, select all files in `PWA_Shell/PWA/` folder
2. Press Delete and choose "Move to Trash"
3. Right-click `PWA_Shell` folder
4. Select "Add Files to PWA_Shell..."
5. Choose your PWA folder
6. Check "Create folder references"
7. Click Add

### 3. Update App Metadata

#### Update Xcode Project Name
1. Select project in Xcode navigator
2. Change "Display Name" in General tab
3. Update Bundle Identifier

#### Update manifest.json
```json
{
  "name": "Your App Name",
  "short_name": "YourApp",
  "description": "Your app description",
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 4. Configure Permissions

#### Check Required Permissions

Determine what device features your PWA needs:

| Feature | Permission Required | INFOPLIST_KEY |
|---------|-------------------|----------------|
| Camera | Yes | INFOPLIST_KEY_NSCameraUsageDescription |
| Microphone | Yes | INFOPLIST_KEY_NSMicrophoneUsageDescription |
| Photo Library | Yes | INFOPLIST_KEY_NSPhotoLibraryUsageDescription |
| Location | Yes | INFOPLIST_KEY_NSLocationWhenInUseUsageDescription |
| Notifications | No | Built-in |

#### Update Xcode Project Settings

Edit `PWA_Shell.xcodeproj/project.pbxproj` to add or remove permissions in both Debug and Release configurations:

```
INFOPLIST_KEY_NSCameraUsageDescription = "Your reason";
INFOPLIST_KEY_NSMicrophoneUsageDescription = "Your reason";
```

### 5. Customize WebView Behavior

Edit `PWA_Shell/ContentView.swift` to customize WebView settings:

#### Enable/Disable Features

```swift
// Allow inline video playback
configuration.allowsInlineMediaPlayback = true

// Require user interaction for media
configuration.mediaTypesRequiringUserActionForPlayback = [.audio, .video]

// Allow picture-in-picture
configuration.allowsPictureInPictureMediaPlayback = true
```

#### Change Loading Behavior

```swift
// Load from URL instead of bundle
if let url = URL(string: "https://your-pwa.com") {
    webView.load(URLRequest(url: url))
}

// Load from bundle (default)
if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "PWA") {
    webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
}
```

### 6. Add Custom JavaScript Bridges

To enable communication between your PWA and native iOS:

#### Step 1: Add Message Handler

In `ContentView.swift`:
```swift
// Add to makeUIView
contentController.add(context.coordinator, name: "yourHandler")

// Add to Coordinator class
func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    if message.name == "yourHandler" {
        // Handle message from JavaScript
        if let data = message.body as? String {
            // Do something with data
        }
    }
}
```

#### Step 2: Call from JavaScript

In your PWA JavaScript:
```javascript
// Send message to native iOS
window.webkit.messageHandlers.yourHandler.postMessage({
    action: 'doSomething',
    data: 'value'
});
```

### 7. Customize App Icon

#### Create App Icons

You need icons at multiple sizes:
- 1024x1024 (App Store)
- 180x180 (iPhone)
- 167x167 (iPad Pro)
- 152x152 (iPad)
- And more...

Use a tool like [App Icon Generator](https://appicon.co/) to create all sizes.

#### Add to Xcode

1. Open `PWA_Shell/Assets.xcassets/AppIcon.appiconset/`
2. Drag and drop icon images
3. Or use Xcode's asset catalog editor

### 8. Configure App Settings

#### Bundle Identifier
Change in Xcode project settings:
```
com.yourcompany.yourapp
```

#### Display Name
The name shown on home screen:
```
INFOPLIST_KEY_CFBundleDisplayName = "Your App";
```

#### Version Numbers
```
MARKETING_VERSION = 1.0
CURRENT_PROJECT_VERSION = 1
```

#### Supported Devices
```
TARGETED_DEVICE_FAMILY = "1,2"; // 1=iPhone, 2=iPad
```

#### Minimum iOS Version
```
IPHONEOS_DEPLOYMENT_TARGET = 14.0;
```

### 9. Advanced Customization

#### Custom Loading Screen

Create a SwiftUI loading view:
```swift
struct LoadingView: View {
    var body: some View {
        VStack {
            ProgressView()
            Text("Loading...")
        }
    }
}
```

#### Handle Navigation

Add navigation delegate methods:
```swift
func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
    // Intercept navigation
    if let url = navigationAction.request.url {
        if url.scheme == "external" {
            // Open in Safari
            UIApplication.shared.open(url)
            decisionHandler(.cancel)
            return
        }
    }
    decisionHandler(.allow)
}
```

#### Inject JavaScript

Add custom JavaScript on page load:
```swift
let script = WKUserScript(
    source: "console.log('Custom JavaScript injected');",
    injectionTime: .atDocumentEnd,
    forMainFrameOnly: true
)
configuration.userContentController.addUserScript(script)
```

### 10. Testing Your Custom PWA

After customization:

1. **Clean Build**: ⌘⇧K in Xcode
2. **Build**: ⌘B
3. **Run**: ⌘R
4. **Test Features**: Follow TESTING.md guide
5. **Debug**: Use Safari Web Inspector

## Common Customization Scenarios

### Scenario 1: Simple Static PWA

If you have a static website:
1. Export your website files
2. Ensure index.html exists
3. Copy to PWA_Shell/PWA/
4. Build and run

### Scenario 2: React/Vue/Angular App

For SPA frameworks:
1. Build your production bundle: `npm run build`
2. Copy dist/build folder contents to PWA_Shell/PWA/
3. Ensure built files include index.html
4. Build and run

### Scenario 3: Remote PWA

To load from a server:
```swift
if let url = URL(string: "https://your-domain.com") {
    webView.load(URLRequest(url: url))
}
```

Update `ATS` in Xcode project settings if using HTTP by adding to project.pbxproj:
```
INFOPLIST_KEY_NSAppTransportSecurity_NSAllowsArbitraryLoads = YES;
```

### Scenario 4: Hybrid Local + Remote

Load local files but allow network requests:
```swift
// Load local index.html
webView.loadFileURL(localURL, allowingReadAccessTo: localURL.deletingLastPathComponent())

// Your PWA can still make fetch() requests to APIs
```

## Troubleshooting

### PWA Not Loading
- Check file paths
- Verify index.html exists
- Check Xcode build phases include PWA folder
- Clean and rebuild

### Features Not Working
- Check permissions in Xcode project settings (INFOPLIST_KEY entries)
- Verify JavaScript bridge is set up
- Check Safari console for errors

### Icons Not Showing
- Ensure icons are in asset catalog
- Check icon sizes match requirements
- Clean and rebuild

### Service Worker Issues
- Service workers require HTTPS or localhost
- File URLs may have limitations
- Consider loading from server for full SW features

## Best Practices

1. **Test on Device**: Many features don't work in simulator
2. **Optimize Assets**: Compress images and files
3. **Cache Wisely**: Service worker should cache efficiently
4. **Handle Offline**: Provide offline fallbacks
5. **Secure Data**: Don't expose sensitive information
6. **Update Regularly**: Keep dependencies updated
7. **Monitor Performance**: Profile memory and CPU usage

## Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [WKWebView Documentation](https://developer.apple.com/documentation/webkit/wkwebview)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## Example PWAs You Can Use

- **To-Do List**: Simple task management
- **Note Taking**: Markdown editor
- **Photo Gallery**: Image viewer with filters
- **Music Player**: Audio streaming app
- **News Reader**: RSS feed reader
- **Weather App**: Location-based weather
- **Calculator**: Scientific calculator
- **Games**: HTML5 canvas games

## Need Help?

If you encounter issues:
1. Check TESTING.md for common problems
2. Review Safari Web Inspector console
3. Verify file structure matches requirements
4. Ensure all permissions are configured
5. Try the example PWA first to verify setup
