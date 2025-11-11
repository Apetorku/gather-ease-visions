# GatherEase - Event Management Platform

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![Status](https://img.shields.io/badge/status-production%20ready-brightgreen.svg)
![React](https://img.shields.io/badge/React-18.3-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)

A modern, full-featured event management platform with role-based access control, QR code check-in system, and comprehensive analytics.

## 🌟 Key Features

### 🔐 Role-Based Access Control

- **Super Admin**: Full system access and platform management
- **Admin**: Event management and attendee check-in
- **Organizer**: Event creation and management
- **Attendee**: Event browsing and ticket management

### 📱 QR Code Check-In System

- **Real Camera Access**: Uses WebRTC getUserMedia API
- **Automatic Detection**: Scans QR codes every 300ms
- **Visual Feedback**: 4-corner frame overlay and status indicators
- **Duplicate Prevention**: 3-second cooldown for repeated scans
- **Manual Entry**: Backup option for manual ticket verification
- **Live Statistics**: Real-time check-in tracking and analytics

### 🎫 Ticket Management

- Digital ticket generation with QR codes
- Download tickets as PNG images
- Share tickets via native share API
- Responsive ticket display

### 📊 Analytics Dashboard

- Real-time event statistics
- Check-in rate monitoring
- Ticket type breakdown
- Exportable reports (CSV)

### 🎨 Modern UI/UX

- Glass morphism design
- Gradient backgrounds
- Smooth animations (Framer Motion)
- Fully responsive layout
- Mobile-first approach

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- Modern browser (Chrome, Edge, Safari, Firefox)
- Camera device (for QR scanning)
- HTTPS connection (required for camera access)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd gather-ease-visions

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 👥 Demo Accounts

### Super Admin

```
Email: bamenorhu8@gmail.com
Password: 1234567
Access: Full platform management
```

### Admin

```
Email: bamenorhu9@gmail.com
Password: 1234567
Access: Event management + QR scanner
```

---

## 📖 Usage Guide

### For Admins

#### 1. Login

- Navigate to the login page
- Enter admin credentials
- System automatically redirects to admin dashboard

#### 2. Event Management

- View all events in card layout
- Create new events with detailed information
- Edit existing events
- View event analytics and statistics

#### 3. QR Code Check-In

1. Click "Scan QR Code" button
2. Click "Start Camera Scanner"
3. Allow camera permissions
4. Position attendee QR code within the 4-corner frame
5. System automatically detects and validates ticket
6. View check-in status and history

#### 4. Manual Check-In (Backup)

1. Scroll to "Manual Ticket Entry" section
2. Enter ticket number (e.g., TIS2025-VIP-1234)
3. Press Enter or click search icon
4. System validates and processes check-in

### For Attendees

#### 1. Browse Events

- View upcoming events on the Events page
- Filter by category, date, or location
- Read detailed event descriptions

#### 2. Register for Events

- Click on event card
- Fill out registration form
- Receive confirmation and ticket

#### 3. Access Tickets

- Navigate to "My Tickets"
- View all registered events
- See QR codes for each ticket

#### 4. Download/Share Tickets

- Click download icon to save ticket as PNG
- Click share icon to share via native share menu
- Present QR code at event entrance

---

## 🛠️ Technical Stack

### Frontend

- **React 18.3**: UI framework
- **TypeScript 5.8**: Type safety
- **Vite 5.4**: Build tool and dev server
- **TailwindCSS 3.4**: Utility-first CSS
- **Shadcn/ui**: Component library

### Key Libraries

- **jsQR 1.4**: QR code detection
- **Framer Motion 12.23**: Animations
- **React Router 6.30**: Client-side routing
- **React Hook Form 7.61**: Form management
- **Zod 3.25**: Schema validation
- **Supabase 2.78**: Backend services

### APIs Used

- **getUserMedia**: Camera access
- **Canvas API**: Image processing and ticket generation
- **Web Share API**: Native sharing functionality

---

## 📂 Project Structure

```
gather-ease-visions/
├── public/                      # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/                  # Images and media
│   ├── components/              # React components
│   │   ├── ui/                  # Shadcn UI components
│   │   ├── QRScanner.tsx        # QR scanner component
│   │   ├── GlassCard.tsx        # Reusable card component
│   │   └── ...
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-toast.ts
│   │   └── useUserRole.tsx
│   ├── integrations/            # External service integrations
│   │   └── supabase/
│   ├── lib/                     # Utility functions
│   │   └── utils.ts
│   ├── pages/                   # Page components
│   │   ├── SuperAdmin.tsx       # Super admin dashboard
│   │   ├── Admin.tsx            # Admin dashboard
│   │   ├── Events.tsx           # Event listing
│   │   ├── MyTickets.tsx        # User tickets
│   │   ├── Login.tsx            # Authentication
│   │   └── ...
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── supabase/                    # Supabase configuration
├── DEMO_ACCOUNTS.md             # Demo credentials
├── QR_SCANNER_TESTING_GUIDE.md  # Testing instructions
├── IMPLEMENTATION_SUMMARY.md    # Feature summary
├── QR_SCANNER_FLOW_DIAGRAM.md   # Technical diagrams
└── README.md                    # This file
```

---

## 🧪 Testing

### QR Scanner Testing

#### Generate Test QR Codes

1. Visit [QR Code Generator](https://www.qr-code-generator.com/)
2. Enter test ticket numbers:
   - Valid VIP: `TIS2025-VIP-1234`
   - Valid Standard: `TIS2025-STD-5678`
   - Invalid: `TIS2025-STD-9999`
3. Display QR code on another device or print it
4. Test scanning with the QR scanner

#### Expected Results

- **Valid tickets**: Green checkmark, success toast, check-in recorded
- **Invalid tickets**: Red X, error toast, check-in rejected
- **Duplicate scans**: Yellow warning, duplicate status

### Manual Testing Checklist

- [ ] Super Admin login and dashboard access
- [ ] Admin login and event management
- [ ] QR scanner camera activation
- [ ] QR code automatic detection
- [ ] Valid ticket check-in
- [ ] Invalid ticket rejection
- [ ] Duplicate scan detection
- [ ] Manual ticket entry
- [ ] Ticket download functionality
- [ ] Ticket share functionality
- [ ] Navigation between pages
- [ ] Logout functionality
- [ ] Mobile responsiveness

---

## 🔧 Configuration

### Camera Settings

```javascript
{
  video: {
    facingMode: "environment",    // Back camera on mobile
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
}
```

### QR Scanner Settings

- **Scan Interval**: 300ms
- **Duplicate Prevention**: 3 seconds
- **Detection Library**: jsQR
- **Video Display**: object-contain

---

## 🐛 Troubleshooting

### Camera Not Working

**Issue**: Camera doesn't open when clicking "Start Camera Scanner"

**Solutions**:

1. Ensure HTTPS connection (or localhost)
2. Check browser permissions for camera access
3. Verify camera is not in use by another application
4. Try different browser (Chrome/Edge recommended)
5. Check camera device is properly connected

### QR Code Not Detected

**Issue**: Camera is active but QR codes aren't being scanned

**Solutions**:

1. Position QR code within the 4-corner frame
2. Keep QR code 6-12 inches from camera
3. Ensure adequate lighting
4. Make sure QR code is in focus
5. Hold device steady for 1-2 seconds
6. Try manual entry as alternative

### TypeScript Errors

**Issue**: Build or development errors

**Solutions**:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild TypeScript
npm run build
```

---

## 📈 Performance

### Optimizations

- Lazy loading for routes
- Image optimization
- Canvas-based QR detection (no external API calls)
- Efficient state management
- Memoized components where appropriate

### Browser Support

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ⚠️ Mobile browsers (camera support varies)

---

## 🔒 Security

### Authentication

- Supabase authentication
- Session management
- Protected routes
- Role-based access control

### Camera Privacy

- Camera only activates when explicitly started
- Video stream stops when scanner is closed
- No video/image data stored or transmitted
- Camera permission requested per session

---

## 📚 Documentation

### Available Guides

- **DEMO_ACCOUNTS.md**: Demo login credentials
- **QR_SCANNER_TESTING_GUIDE.md**: Detailed testing instructions
- **IMPLEMENTATION_SUMMARY.md**: Complete feature summary
- **QR_SCANNER_FLOW_DIAGRAM.md**: Technical flow diagrams
- **SUPER_ADMIN_DOCUMENTATION.md**: Super admin features
- **SUPER_ADMIN_ACCESS_CONTROL.md**: Access control details

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build output directory: dist
# Build command: npm run build
```

### Important Notes

- Ensure HTTPS for camera access
- Configure environment variables on hosting platform
- Test camera functionality post-deployment
- Mobile camera support may vary by browser

---

## 🤝 Contributing

This project was built as a demonstration of modern web development practices. Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Share feedback

---

## 📄 License

This project is for demonstration purposes. Please check with the project owner for licensing details.

---

## 🙏 Acknowledgments

- **Shadcn/ui**: Beautiful component library
- **jsQR**: QR code detection
- **Supabase**: Backend infrastructure
- **TailwindCSS**: Styling framework
- **Framer Motion**: Animation library

---

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review documentation files
3. Test with demo accounts
4. Verify browser compatibility

---

## 🎯 Roadmap

### Completed ✅

- Role-based access control
- QR code scanner with real camera
- Ticket management system
- Event analytics
- Mobile-responsive UI

### Future Enhancements 🔮

- [ ] Offline mode for check-ins
- [ ] Bulk check-in operations
- [ ] Email notifications
- [ ] Advanced analytics charts
- [ ] Native mobile apps
- [ ] Multi-language support
- [ ] Custom ticket designs
- [ ] Payment integration

---

## 📊 Project Stats

- **Version**: 2.0
- **Status**: Production Ready
- **Lines of Code**: 10,000+
- **Components**: 50+
- **Pages**: 12
- **Dependencies**: 50+

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

**Last Updated**: January 2025
