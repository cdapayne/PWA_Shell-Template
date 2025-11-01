# PWA Shell Template

A Progressive Web App (PWA) shell for iOS (iPad and iPhone) that allows you to host and display PWAs with full functionality both online and offline.

## Features

### iOS Shell App
- **WKWebView-based** hosting for PWAs
- **iPad and iPhone** compatible
- **Full-screen display** with edge-to-edge content
- **Native permissions** for camera and microphone
- **JavaScript bridge** for native features
- **Offline support** through service workers

### Example PWA Included
The template includes a fully functional example PWA that demonstrates:

- ✅ **Multi-page Navigation** - Navigate between different pages smoothly
- ✅ **Audio Playback** - Play tones and sounds with Web Audio API
- ✅ **Camera Access** - Access device camera and capture photos
- ✅ **Microphone Access** - Record audio with visualization
- ✅ **Haptic Feedback** - Vibration feedback on interactions
- ✅ **Offline Support** - Service worker caching for offline functionality
- ✅ **Responsive Design** - Works on both iPad and iPhone

## Project Structure

```
PWA_Shell/
├── PWA_ShellApp.swift        # Main app entry point
├── ContentView.swift          # WebView wrapper
└── PWA/                       # Example Progressive Web App
    ├── index.html             # Main HTML page
    ├── styles.css             # Styling
    ├── app.js                 # JavaScript functionality
    ├── manifest.json          # PWA manifest
    ├── service-worker.js      # Offline support
    └── icon.svg               # App icon
```

## Getting Started

### Prerequisites
- macOS with Xcode installed
- iOS device or simulator (iOS 14.0+)
- Apple Developer account (for device testing)

### Building the App

1. Open `PWA_Shell.xcodeproj` in Xcode
2. Select your target device (iPad or iPhone simulator/device)
3. Click the Run button (⌘R) or Product > Run

### Customizing the PWA

To use your own Progressive Web App:

1. Replace the contents of the `PWA_Shell/PWA/` directory with your PWA files
2. Ensure your PWA includes:
   - `index.html` (main entry point)
   - `manifest.json` (PWA manifest)
   - `service-worker.js` (for offline support)
3. Update permissions in Xcode project settings if your PWA requires additional access
4. Rebuild and run the app

## Features Explained

### Camera Access
The example PWA demonstrates camera access:
- Click "Start Camera" to activate the device camera
- Click "Capture Photo" to take a picture
- Click "Stop Camera" to release camera resources

### Microphone Access
Record and play back audio:
- Click "Start Recording" to begin audio capture
- Audio waveform is visualized in real-time
- Click "Stop Recording" to finish
- Click "Play Recording" to hear the playback

### Audio Playback
Test audio functionality:
- Play beep sounds
- Play musical notes at different frequencies
- Uses Web Audio API for synthesis

### Haptic Feedback
Experience tactile feedback:
- Buttons trigger vibration on tap
- Works on physical devices (not simulators)

### Offline Support
The service worker caches resources:
- App works without internet connection
- Status indicator shows online/offline state
- All features available offline (except network requests)

## Permissions

The app requests the following permissions (configured via INFOPLIST_KEY entries in Xcode project settings):

- **NSCameraUsageDescription**: Camera access for photo capture
- **NSMicrophoneUsageDescription**: Microphone access for audio recording
- **NSPhotoLibraryUsageDescription**: Photo library access for saving images

## Technical Details

### WebView Configuration
- Inline media playback enabled
- JavaScript fully enabled
- Camera and microphone permissions auto-granted
- File URL access enabled for local PWA loading

### PWA Requirements
Your PWA should include:
- A valid `manifest.json` with app metadata
- A `service-worker.js` for offline functionality
- Responsive design for various screen sizes
- HTTPS (or localhost) for full PWA features

## Testing

The example PWA can be tested on:
- iPad (all models)
- iPhone (all models with iOS 14.0+)
- iOS Simulator

**Note**: Some features like camera, microphone, and haptic feedback require physical devices.

## Troubleshooting

### Camera/Microphone Not Working
- Ensure Xcode project settings have INFOPLIST_KEY permission descriptions
- Check device permissions in Settings
- Test on physical device (not simulator)

### Offline Mode Not Working
- Check service worker registration in browser console
- Verify service-worker.js is in the PWA directory
- Clear cache and reload if needed

### PWA Not Loading
- Check file paths in ContentView.swift
- Ensure index.html exists in PWA directory
- Verify bundle resources are included in Xcode project

## Browser Console

To debug the PWA:
1. Enable Safari Developer Menu
2. Connect device or use simulator
3. Safari > Develop > [Device] > [App]
4. View console logs and errors

## License

This template is provided as-is for creating iOS shell apps for Progressive Web Apps.

## Contributing

Feel free to submit issues and enhancement requests!
