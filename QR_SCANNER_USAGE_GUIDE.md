# QR Scanner Usage & Testing Guide

## 🎯 Overview
The QR Scanner is a critical feature for organizers to check in attendees at events. This guide explains how to use and test the scanner functionality.

---

## 📱 Accessing the QR Scanner

### Method 1: Through Organizer Dashboard
1. Login as an organizer (demo account: organizer@test.com / organizer123)
2. Navigate to **Organizer Dashboard**
3. Click on the **"Events"** tab
4. Find your event and click **"Check-In Station"** button

### Method 2: Direct URL
- Visit: `/check-in-station`
- Requires organizer authentication

---

## 🎥 Camera Scanner Setup

### Prerequisites
1. **HTTPS Connection**: Camera access requires HTTPS in most modern browsers
   - Local development: Use `https://localhost:5173` or ngrok
   - Production: Ensure SSL certificate is installed

2. **Browser Permissions**: Allow camera access when prompted
   - Chrome/Edge: Click "Allow" in the permission dialog
   - Firefox: Click "Allow" in the permission dropdown
   - Safari: Grant camera access in Settings → Privacy

### Steps to Use Camera Scanner
1. Click **"Start Camera Scanner"** button
2. Allow camera permissions when browser prompts
3. Position QR code within the scanning frame (4 corners)
4. Scanner will automatically detect and process QR codes
5. Visual feedback appears when code is detected
6. Check-in status is shown immediately

### Scanning Frame Features
- **4-Corner Overlay**: Visual guide for QR code positioning
- **Animated Scanning Line**: Indicates active scanning
- **Live Status Badge**: Shows "Scanning Active"
- **Detection Alert**: Green badge when QR code is detected
- **Helper Text**: "Position QR code within the frame"

---

## 🔧 Demo Mode (No Camera Required)

### When to Use Demo Mode
- Camera is unavailable
- Testing on HTTP (not HTTPS)
- Browser doesn't support camera API
- Quick testing without hardware

### How to Activate Demo Mode
1. Click **"Start Camera Scanner"**
2. If camera fails, click **"Use Demo Mode"** button
3. Demo mode uses manual entry only

---

## ⌨️ Manual Ticket Entry

### Use Cases
- Camera is unavailable
- QR code is damaged/unreadable
- Quick manual check-in needed
- Backup check-in method

### How to Use
1. Find the **"Manual Ticket Entry"** section
2. Enter ticket number (e.g., `TIS2025-VIP-1234`)
3. Press **Enter** or click the search icon
4. System validates and processes the ticket

### Ticket Number Format
- Event Code: `TIS2025` (Tech Innovation Summit 2025)
- Ticket Type: `VIP` or `STD` (Standard)
- Unique ID: 4-digit number
- Full Example: `TIS2025-VIP-1234`

---

## 📊 Live Statistics

The check-in station displays real-time statistics:

1. **Total Registered**: All attendees registered for the event
2. **Checked In**: Number of successful check-ins
3. **Attendance Rate**: Percentage of registered attendees checked in
4. **Current Time**: Live clock for event timing

---

## ✅ Check-In Status Types

### Valid Check-In (Green ✓)
- Ticket is authentic
- Not previously used
- Matches event registration
- **Result**: Attendee is checked in successfully

### Invalid Ticket (Red ✗)
- Ticket number is not recognized
- Ticket is for a different event
- Ticket is counterfeit
- **Result**: Check-in is rejected

### Already Used (Yellow ⚠️)
- Ticket was previously scanned
- Prevents duplicate entry
- Security feature
- **Result**: Warns of potential issue

---

## 🧪 Testing the QR Scanner

### Test Ticket Numbers
Use these formats to test different scenarios:

**Valid Tickets:**
```
TIS2025-VIP-1001
TIS2025-VIP-1002
TIS2025-STD-2001
TIS2025-STD-2002
```

**Invalid Ticket (Contains 9999):**
```
TIS2025-VIP-9999
TIS2025-STD-9999
```

**Duplicate Test:**
1. Scan/enter: `TIS2025-VIP-1001`
2. Scan/enter same ticket again
3. Should show "Already Used" status

### Testing Workflow
1. **Start Scanner**: Click "Start Camera Scanner"
2. **Grant Permissions**: Allow camera access
3. **Test Valid QR**: Use test ticket or generate QR code
4. **Test Manual Entry**: Enter test ticket number
5. **Test Invalid**: Use ticket with "9999"
6. **Test Duplicate**: Scan same ticket twice
7. **Review History**: Check "Check-In History" tab
8. **Export Data**: Click "Export CSV" to download report

---

## 📸 Generating Test QR Codes

### Option 1: Online QR Generator
1. Visit: https://www.qr-code-generator.com/
2. Enter ticket number: `TIS2025-VIP-1234`
3. Download QR code image
4. Display on phone/tablet and scan

### Option 2: My Tickets Page
1. Login as attendee
2. Go to **"My Tickets"**
3. View your tickets with embedded QR codes
4. Use another device to scan

### Option 3: Command Line (Python)
```bash
pip install qrcode[pil]
python -c "import qrcode; qrcode.make('TIS2025-VIP-1234').save('ticket.png')"
```

---

## 🎨 UI Features & Feedback

### Visual Indicators
- **Scanning Active Badge**: Green badge with pulsing dot
- **QR Detected Alert**: Bouncing green badge
- **Status Icons**: ✓ Valid, ✗ Invalid, ⚠️ Duplicate
- **Color Coding**: Green=Success, Red=Error, Yellow=Warning

### Audio/Haptic Feedback (Future Enhancement)
- Beep on successful scan
- Different sound for errors
- Vibration on mobile devices

---

## 🐛 Troubleshooting

### Camera Not Working
**Problem**: "Unable to access camera" error

**Solutions**:
1. Check HTTPS connection
2. Grant browser permissions
3. Close other apps using camera
4. Try different browser
5. Use **Demo Mode** as fallback

### QR Code Not Detected
**Problem**: Camera running but not detecting QR

**Solutions**:
1. Ensure good lighting
2. Hold QR code steady in frame
3. Adjust distance (6-12 inches ideal)
4. Clean camera lens
5. Use **Manual Entry** instead

### Duplicate Scan Prevention
**Problem**: Same ticket scans multiple times

**Feature**: Built-in 3-second cooldown prevents accidental duplicates

**Override**: Wait 3+ seconds between scans for testing

---

## 📈 Analytics & Reports

### Check-In History Tab
- View all check-in attempts
- Filter by status (Valid/Invalid/Duplicate)
- See timestamps for each check-in
- Search by ticket number or attendee name

### Export Functionality
- **CSV Format**: Downloadable report
- **Columns**: Ticket Number, Name, Type, Status, Timestamp
- **Use Cases**: Post-event analysis, auditing, reporting

---

## 🔒 Security Features

1. **Duplicate Prevention**: Prevents same ticket from being used twice
2. **Validation Logic**: Checks ticket format and authenticity
3. **Audit Trail**: Logs all scan attempts
4. **Real-Time Updates**: Instant check-in status
5. **Role-Based Access**: Only organizers can access

---

## 📱 Mobile Optimization

### Responsive Design
- Works on tablets and smartphones
- Touch-friendly buttons
- Optimized camera view
- Swipe-friendly history list

### Best Practices
- Use tablet for check-in station
- Portrait or landscape mode supported
- Larger screen = easier scanning
- Consider mounting device at entrance

---

## 🚀 Production Deployment Tips

1. **HTTPS Required**: Obtain SSL certificate
2. **Camera Permissions**: Inform staff to allow permissions
3. **Backup Method**: Always have manual entry available
4. **Test Before Event**: Run through all scenarios
5. **Network Connection**: Ensure stable internet
6. **Device Setup**: Charge devices, adjust brightness
7. **Staff Training**: Train team on both scanner and manual entry

---

## 📞 Support

### For Organizers
- Access help from Organizer Dashboard
- Review this guide before events
- Contact support for technical issues

### For Developers
- Component: `src/components/QRScanner.tsx`
- Page: `src/pages/CheckInStation.tsx`
- Library: `jsQR` for QR code detection
- Camera API: `navigator.mediaDevices.getUserMedia`

---

## ✨ Future Enhancements

1. **Offline Mode**: Check-in without internet
2. **Bulk Check-In**: Scan multiple tickets quickly
3. **Face Recognition**: Optional contactless check-in
4. **Custom Branding**: Event-specific scanner themes
5. **Analytics Dashboard**: Real-time attendance graphs
6. **Multi-Device Sync**: Sync across multiple check-in stations
7. **Guest Check-In**: Allow +1 or group check-ins
8. **VIP Fast Lane**: Priority queue for VIP tickets

---

## 🎓 Summary

The QR Scanner provides a professional, efficient check-in experience:
- ✅ Real-time QR code scanning
- ✅ Manual entry backup
- ✅ Live statistics
- ✅ Multiple validation states
- ✅ Export capabilities
- ✅ Mobile-optimized
- ✅ Security features

For best results, use HTTPS and grant camera permissions. Demo mode is available for testing without camera access.
