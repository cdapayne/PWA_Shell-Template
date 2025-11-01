# PWA Shell Testing Guide

This document provides step-by-step instructions for testing all features of the PWA Shell template.

## Prerequisites

- macOS with Xcode installed
- iOS device (iPhone or iPad) with iOS 14.0+ OR iOS Simulator
- **Note**: Camera, microphone, and haptic feedback require a physical device

## Building and Running

1. Open `PWA_Shell.xcodeproj` in Xcode
2. Select your target device (simulator or physical device)
3. Press ⌘R to build and run
4. If using a physical device, ensure it's connected and trusted

## Test Cases

### 1. App Launch
**Expected Result**: App should launch and display the PWA home page with a gradient purple background

**Steps**:
1. Launch the app
2. Verify the app displays "🌟 PWA Example App" header
3. Verify navigation buttons are visible (Home, Audio, Camera, Mic)

**Success Criteria**: ✅ App launches without crashes and shows the PWA interface

---

### 2. Navigation Between Pages
**Expected Result**: Users can navigate between different pages smoothly

**Steps**:
1. Tap the "Audio" button
2. Verify the audio controls page is displayed
3. Tap the "Camera" button
4. Verify the camera controls page is displayed
5. Tap the "Mic" button
6. Verify the microphone controls page is displayed
7. Tap the "Home" button
8. Verify return to home page

**Success Criteria**: ✅ All page transitions work smoothly with animations

---

### 3. Haptic Feedback
**Expected Result**: Device should vibrate when haptic feedback is triggered

**Steps**:
1. Navigate to the Home page
2. Tap "Test Haptic Feedback" button
3. Feel/observe device vibration (physical device only)
4. Verify status message shows "✅ Haptic feedback triggered!"
5. Tap any navigation button and feel haptic feedback

**Success Criteria**: ✅ Haptic feedback is felt on physical device

**Note**: Haptic feedback will not work in the iOS Simulator

---

### 4. Audio Playback
**Expected Result**: App can play audio tones and sounds

**Steps**:
1. Navigate to the "Audio" page
2. Tap "Play Beep Sound" button
3. Verify you hear a short beep sound
4. Verify status shows "✅ Beep sound completed!"
5. Tap "Play A Note (440Hz)" button
6. Verify you hear a sustained tone
7. Tap "Play C Note (523Hz)" button
8. Verify you hear a different tone
9. Tap "Stop Audio" button
10. Verify audio stops immediately

**Success Criteria**: ✅ All audio playback functions work correctly

---

### 5. Camera Access
**Expected Result**: App can access device camera and capture photos

**Steps**:
1. Navigate to the "Camera" page
2. Tap "Start Camera" button
3. When prompted, allow camera access
4. Verify camera feed is displayed
5. Point camera at something
6. Tap "Capture Photo" button
7. Verify captured photo is displayed
8. Feel haptic feedback on capture (physical device)
9. Tap "Stop Camera" button
10. Verify camera feed stops

**Success Criteria**: ✅ Camera access works and photos can be captured

**Note**: Camera will not work in iOS Simulator

---

### 6. Microphone Access
**Expected Result**: App can access microphone and record audio

**Steps**:
1. Navigate to the "Mic" page
2. Tap "Start Recording" button
3. When prompted, allow microphone access
4. Verify status shows "🔴 Recording..."
5. Verify waveform visualization is displayed
6. Speak or make sounds
7. Verify waveform responds to audio input
8. Tap "Stop Recording" button
9. Verify status shows "✅ Recording stopped!"
10. Tap "Play Recording" button
11. Verify recorded audio plays back

**Success Criteria**: ✅ Microphone recording and playback work correctly

**Note**: Microphone may work in simulator but better tested on physical device

---

### 7. Online/Offline Status
**Expected Result**: App shows current network status

**Steps**:
1. Verify footer shows "🟢 Online" when connected
2. Enable Airplane Mode on device
3. Verify footer changes to "🔴 Offline"
4. Verify app still functions (offline mode)
5. Disable Airplane Mode
6. Verify footer returns to "🟢 Online"

**Success Criteria**: ✅ Online/offline status is accurately displayed

---

### 8. Service Worker (Offline Functionality)
**Expected Result**: App works offline after initial load

**Steps**:
1. With internet connection, launch app
2. Navigate through all pages
3. Enable Airplane Mode
4. Close and relaunch app
5. Verify app still loads
6. Verify all pages are accessible
7. Verify UI elements display correctly
8. Test navigation between pages

**Success Criteria**: ✅ App functions offline after initial cache

---

### 9. Permissions
**Expected Result**: App properly requests and handles permissions

**Steps**:
1. Delete app from device
2. Reinstall app
3. Navigate to Camera page and tap "Start Camera"
4. Verify camera permission dialog appears
5. Tap "Allow"
6. Verify camera works
7. Navigate to Mic page and tap "Start Recording"
8. Verify microphone permission dialog appears
9. Tap "Allow"
10. Verify microphone works

**Success Criteria**: ✅ Permission dialogs appear and permissions work when granted

---

### 10. Responsive Design
**Expected Result**: UI adapts to different screen sizes

**Steps**:
1. Test on iPhone (smaller screen)
2. Verify all elements are visible
3. Verify buttons are tappable
4. Test on iPad (larger screen)
5. Verify layout looks appropriate
6. Test in portrait orientation
7. Test in landscape orientation

**Success Criteria**: ✅ UI is usable on all supported devices and orientations

---

## Debug Mode

To view console logs and debug the PWA:

1. Connect device to Mac
2. Open Safari on Mac
3. Go to Safari > Develop > [Your Device] > [PWA_Shell]
4. Web Inspector will open showing console logs

Alternatively, in iOS Simulator:
1. Go to Safari > Develop > Simulator > [PWA_Shell]

## Common Issues

### Camera/Microphone Not Working
- Ensure using physical device (not simulator)
- Check Settings > Privacy > Camera/Microphone
- Verify Info.plist has usage descriptions
- Restart app

### Audio Not Playing
- Check device volume
- Ensure device not in silent mode
- Try with headphones

### Haptic Feedback Not Working
- Only works on physical devices
- Some older devices have limited haptic support
- Check device haptic settings

### App Crashes on Launch
- Clean build folder (⌘⇧K)
- Rebuild project
- Check Console for error messages

### PWA Not Loading
- Verify PWA files are in bundle
- Check file paths in ContentView.swift
- Verify index.html exists in PWA directory

## Performance Checklist

- [ ] App launches in under 3 seconds
- [ ] Navigation is smooth with no lag
- [ ] Camera preview has no noticeable delay
- [ ] Audio playback starts immediately
- [ ] No memory leaks after extended use
- [ ] No console errors during normal operation

## Security Checklist

- [ ] Camera/microphone permissions are requested
- [ ] User must grant permissions explicitly
- [ ] No unauthorized access to device features
- [ ] Local file access is properly scoped
- [ ] Service worker only caches intended resources

## Test Results Template

```
Date: _____________
Tester: _____________
Device: _____________
iOS Version: _____________

| Test Case | Pass/Fail | Notes |
|-----------|-----------|-------|
| App Launch | ⬜ | |
| Navigation | ⬜ | |
| Haptic Feedback | ⬜ | |
| Audio Playback | ⬜ | |
| Camera Access | ⬜ | |
| Microphone Access | ⬜ | |
| Online/Offline Status | ⬜ | |
| Service Worker | ⬜ | |
| Permissions | ⬜ | |
| Responsive Design | ⬜ | |

Overall Result: ⬜ Pass ⬜ Fail

Additional Comments:
_________________________________
_________________________________
_________________________________
```

## Automated Testing

Currently, manual testing is required for most features due to hardware dependencies (camera, microphone, haptic).

Future improvements could include:
- Unit tests for WebView setup
- UI tests for navigation
- Mock tests for JavaScript bridge
- Integration tests for service worker

## Reporting Issues

When reporting issues, please include:
1. Device model and iOS version
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots or video if possible
5. Console logs from Safari Web Inspector
