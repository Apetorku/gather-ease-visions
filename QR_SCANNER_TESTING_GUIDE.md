# QR Scanner Testing Guide

## Overview

The QR Scanner is now fully implemented with real camera access and automatic QR code detection. This guide will help you test and use the scanner effectively.

## Features Implemented

### ✅ Real Camera Access

- Uses `getUserMedia` API for direct camera access
- Automatically requests camera permissions
- Prefers back camera on mobile devices
- Optimized resolution: 1280x720

### ✅ Automatic QR Code Detection

- Uses `jsQR` library for real-time QR code scanning
- Scans every 300ms for optimal performance
- No manual "Scan" button needed - detection is automatic
- Duplicate scan prevention (3-second cooldown)

### ✅ Enhanced UI/UX

- **4-Corner Frame Overlay**: Professional scanning guide with corner brackets
- **Live Status Indicators**: Shows "Scanning Active" badge when camera is on
- **Visual Feedback**: Green "QR Code Detected!" badge appears when code is scanned
- **Animated Elements**: Pulsing scan line and status indicators
- **Clear Instructions**: Step-by-step guidance for users

### ✅ Check-In Management

- Valid tickets: Green checkmark and success toast
- Invalid tickets: Red X and error toast
- Duplicate scans: Yellow warning for already-used tickets
- Real-time statistics update
- Complete check-in history with timestamps

## How to Test

### 1. Access the QR Scanner

1. Login as Admin: `bamenorhu9@gmail.com` (password: `1234567`)
2. Navigate to the Admin page
3. Click "Scan QR Code" button in the Event Management section
4. The QR Scanner dialog will open

### 2. Test Camera Access

1. Click "Start Camera Scanner" button
2. Browser will request camera permission - click "Allow"
3. Camera feed should appear with:
   - Black background
   - Video feed displayed
   - 4-corner frame overlay (blue brackets at corners)
   - "Scanning Active" green badge at top-left
   - "Auto-Detect" badge at top-right
   - Bottom instruction: "📱 Position QR code within the frame"

### 3. Test QR Code Scanning

#### Option A: Generate Test QR Code

1. Visit any QR code generator (e.g., https://www.qr-code-generator.com/)
2. Enter a test ticket number: `TIS2025-VIP-1234`
3. Generate and display QR code on another device or print it
4. Hold QR code in front of camera within the 4-corner frame
5. Scanner will automatically detect and process the code

#### Option B: Use Manual Entry (Alternative)

1. Scroll down to "Manual Ticket Entry" section
2. Enter a test ticket number: `TIS2025-VIP-1234`
3. Press Enter or click the search icon
4. Check-in will be processed manually

### 4. Expected Behavior

When a QR code is detected:

1. ✅ **Visual Feedback**: Green "QR Code Detected!" badge appears at top
2. 🔔 **Toast Notification**: Success/error message pops up
3. 📊 **Stats Update**: Live statistics increment in real-time
4. 📝 **History Entry**: New entry appears in Check-In History tab

### 5. Test Different Ticket Types

**Valid VIP Ticket**: `TIS2025-VIP-1234`

- Expected: Green checkmark, "Valid Ticket" toast, check-in successful

**Valid Standard Ticket**: `TIS2025-STD-5678`

- Expected: Green checkmark, "Valid Ticket" toast, check-in successful

**Invalid Ticket**: `TIS2025-STD-9999`

- Expected: Red X, "Invalid Ticket" toast, check-in rejected

**Duplicate Scan**: Scan the same valid ticket twice

- Expected: Yellow warning, "Duplicate Scan" toast, already-used status

## Troubleshooting

### Camera Not Opening

**Problem**: Camera feed doesn't appear after clicking "Start Camera Scanner"

**Solutions**:

1. Check browser permissions: Ensure camera access is allowed
2. Try different browser: Chrome/Edge work best
3. Check if camera is being used by another app
4. Refresh the page and try again

### QR Code Not Detected

**Problem**: Camera is on but QR code isn't being scanned

**Solutions**:

1. **Position**: Hold QR code within the 4-corner frame
2. **Distance**: Keep QR code 6-12 inches from camera
3. **Lighting**: Ensure good lighting conditions
4. **Focus**: Make sure QR code is in focus and not blurry
5. **Size**: QR code should fill most of the frame
6. **Angle**: Hold device/QR code straight (not tilted)

### Scanner Too Slow

**Problem**: Scanning takes too long

**Solutions**:

1. Scanner runs every 300ms - hold QR code steady for 1-2 seconds
2. Improve lighting conditions
3. Use a clearer/larger QR code
4. Try manual entry as alternative

### Dialog Too Small

**Problem**: Camera view is too small to see clearly

**Solution**: Dialog is now set to `max-w-5xl` (larger size). If still too small, you can resize your browser window or use fullscreen mode.

## Technical Details

### Camera Configuration

```javascript
{
  video: {
    facingMode: "environment", // Back camera on mobile
    width: { ideal: 1280 },
    height: { ideal: 720 }
  },
  audio: false
}
```

### Scan Interval

- Scans every **300ms** for optimal performance
- Duplicate detection: **3-second** cooldown period

### Video Display

- Uses `object-contain` for proper aspect ratio
- Black background for better contrast
- Overlays do not interfere with camera feed

### QR Code Detection

- Library: `jsQR` (already installed)
- Detection mode: `inversionAttempts: "dontInvert"`
- Canvas-based image processing

## Demo Accounts

### Admin Account

- Email: `bamenorhu9@gmail.com`
- Password: `1234567`
- Access: Event management + QR scanner

### Super Admin Account

- Email: `bamenorhu8@gmail.com`
- Password: `1234567`
- Access: All admin features + system overview

## Additional Features

### Check-In History

- Switch to "Check-In History" tab to view all scans
- Filter by status: All / Valid / Invalid / Duplicate
- Export to CSV for reporting

### Analytics

- Switch to "Analytics" tab for detailed statistics
- Check-in rate visualization
- Ticket type breakdown
- Real-time updates

### Manual Entry

- Backup method when QR scanning is unavailable
- Supports same validation logic as QR codes
- Keyboard accessible (press Enter to submit)

## Best Practices

1. **Testing**: Always test with multiple QR codes before production use
2. **Lighting**: Ensure venue has adequate lighting for scanning
3. **Training**: Brief staff on how to use the scanner
4. **Backup**: Keep manual entry option available as fallback
5. **Permissions**: Inform users they need to allow camera access

## Support

If you encounter any issues:

1. Check this guide's troubleshooting section
2. Verify camera permissions in browser settings
3. Try different browsers (Chrome recommended)
4. Test with different QR code sizes and types
5. Use manual entry as alternative method

---

**Last Updated**: January 2025
**Version**: 2.0
**Status**: ✅ Fully Implemented & Tested
