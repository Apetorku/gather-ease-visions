# QR Scanner - Quick Testing Guide

## 🔍 Testing the QR Code Scanner

### Prerequisites
- ✅ Modern browser (Chrome, Edge, Safari recommended)
- ✅ Camera-enabled device
- ✅ HTTPS connection (or localhost for testing)
- ✅ QR code ready to scan

---

## 📱 Step-by-Step Testing

### 1. Access the Scanner
```
1. Login as Organizer: organizer@test.com / organizer123
   OR
   Login as Admin: bamenorhu9@gmail.com / 1234567

2. Navigate to: Organizer Dashboard → Events Tab

3. Click "QR Check-In" button on any event
   OR
   Go directly to: /check-in/[event-id]
```

### 2. Grant Camera Permissions
```
1. Browser will prompt for camera access
2. Click "Allow" or "Grant Permission"
3. Check console logs:
   - "Requesting camera access..."
   - "Camera access granted, setting up video..."
   - "🚀 Starting video immediately..."
   - "▶️ Calling playVideo()..."
   - "🎬 Attempting to play video..."
   - "✅ Video playing successfully!"
```

### 3. Expected Console Output (Success)
```javascript
Requesting camera access...
Camera access granted, setting up video...
🚀 Starting video immediately...
▶️ Calling playVideo()...
🎬 Attempting to play video...
✅ Video playing successfully!
🔄 Starting QR scan interval...
```

### 4. Expected Console Output (Autoplay Blocked)
```javascript
Requesting camera access...
Camera access granted, setting up video...
🚀 Starting video immediately...
▶️ Calling playVideo()...
🎬 Attempting to play video...
❌ Video play error: [Error Message]
🔄 Starting QR scan interval (fallback)...
```

---

## 🎥 Camera States

### Loading State
- **Display:** "Starting Camera..." with spinner
- **Console:** "Requesting camera access..."
- **Action:** Wait for camera permission

### Ready State
- **Display:** Video preview with 4-corner overlay
- **Console:** "✅ Video playing successfully!"
- **Action:** Position QR code in camera view

### Scanning State
- **Display:** Green "Scanning..." badge
- **Console:** Scanning logs every 300ms
- **Action:** Hold QR code steady

### Success State
- **Display:** Green checkmark, "Scan Successful!" message
- **Console:** "✅ QR Code detected: [data]"
- **Action:** Check-in recorded, shows attendee info

### Error State
- **Display:** Red error message
- **Console:** "❌ [Error details]"
- **Action:** Click retry button or check permissions

---

## 🐛 Troubleshooting

### Issue: "Starting Camera..." Won't Go Away

**Possible Causes:**
1. Video play() failed silently
2. Browser autoplay policy blocking
3. Camera permissions denied

**Solutions:**
1. Check console for error messages
2. Click the video area to manually start
3. Try different browser
4. Check camera permissions in browser settings

**Debug Steps:**
```
1. Open browser console (F12)
2. Look for red error messages
3. Check for "❌ Video play error"
4. Try clicking the "Retry" button
5. Refresh page and grant permissions again
```

### Issue: Camera Permission Denied

**Solution:**
```
1. Click the camera icon in address bar
2. Change from "Blocked" to "Allow"
3. Refresh the page
4. Click "Start Camera" again
```

### Issue: No Video Showing

**Possible Causes:**
- Camera in use by another app
- Browser doesn't support getUserMedia
- Not using HTTPS (except localhost)

**Solutions:**
```
1. Close other apps using camera (Zoom, Teams, etc.)
2. Use Chrome, Edge, or Safari (latest version)
3. Ensure HTTPS or localhost
4. Try different camera if multiple available
```

### Issue: QR Code Not Detected

**Solutions:**
```
1. Ensure good lighting
2. Hold QR code closer/further from camera
3. Try different angles
4. Ensure QR code is in focus
5. Use high-contrast QR code (black on white)
```

---

## 🧪 Test QR Codes

### Generate Test QR Codes
Use any QR code generator with these formats:

```json
{
  "type": "ticket",
  "ticketId": "TICKET-12345",
  "eventId": "1",
  "attendeeName": "John Doe",
  "attendeeEmail": "john@example.com"
}
```

Or simple text:
```
TICKET-12345
```

### Online QR Generators
- https://qr-code-generator.com
- https://www.qr-code-generator.com
- https://www.qrstuff.com

---

## ✅ Expected Behavior

### Successful Scan Flow
```
1. Camera starts → Video preview visible
2. QR code positioned in view
3. Scanner detects QR (green flash)
4. Parse ticket data
5. Validate ticket
6. Mark attendee as checked in
7. Show success message
8. Update attendee list
9. Ready for next scan
```

### Manual Check-In Flow
```
1. Click "Manual Check-In" button
2. Enter ticket ID or attendee name
3. Select from list
4. Confirm check-in
5. Mark as checked in
6. Show success message
```

---

## 📊 Console Monitoring

### Key Log Messages to Watch

**✅ Good Signs:**
- "Camera access granted"
- "Video playing successfully"
- "Starting QR scan interval"
- "QR Code detected"

**⚠️ Warning Signs:**
- "Video play error" (but fallback should work)
- "Click the video to start" (user action needed)

**❌ Error Signs:**
- "Camera access error"
- "Unable to access camera"
- "MediaStreamError"

---

## 🔬 Advanced Debugging

### Enable Verbose Logging
Open console and check all messages from `QRScanner.tsx`

### Check Camera Stream
```javascript
// In console:
const video = document.querySelector('video');
console.log('Video srcObject:', video?.srcObject);
console.log('Video readyState:', video?.readyState);
console.log('Video paused:', video?.paused);
```

### Monitor Scan Rate
Scanner should attempt scan every 300ms (approximately 3 times per second)

---

## 📝 Testing Checklist

- [ ] Camera permission prompt appears
- [ ] Camera access granted
- [ ] Video stream displays
- [ ] 4-corner overlay visible
- [ ] "Scanning..." badge shows
- [ ] QR code detected successfully
- [ ] Attendee info displayed
- [ ] Check-in recorded
- [ ] Toast notification shown
- [ ] Duplicate scan prevented
- [ ] Manual check-in works
- [ ] Stop camera works
- [ ] Restart camera works

---

## 🎯 Performance Tips

### Optimize Scanning
- Good lighting improves detection rate
- Hold QR code steady (not moving)
- Optimal distance: 20-40cm from camera
- Ensure QR code fills 30-60% of frame

### Battery Saving
- Stop camera when not actively scanning
- Use manual check-in for offline scenarios
- Close check-in page when done

---

## 🚀 Quick Commands

### Test URLs
```
http://localhost:5173/check-in/1
http://localhost:5173/organizer-dashboard
```

### Test Accounts
```
Organizer: organizer@test.com / organizer123
Admin: bamenorhu9@gmail.com / 1234567
```

### Browser Console Tests
```javascript
// Check if camera API available
console.log('getUserMedia:', !!navigator.mediaDevices?.getUserMedia);

// Check video element
const video = document.querySelector('video');
console.log('Video exists:', !!video);
console.log('Video playing:', !video?.paused);
```

---

## 📞 Still Having Issues?

1. **Check browser console** for specific error messages
2. **Try a different browser** (Chrome recommended)
3. **Ensure HTTPS** or use localhost
4. **Test with simple QR code** (just text)
5. **Check camera works** in other apps
6. **Restart browser** after changing permissions

---

**Last Updated:** November 7, 2025
**Status:** QR Scanner is fully functional with fallback mechanisms
