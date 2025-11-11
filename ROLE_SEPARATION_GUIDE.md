# GatherEase - Role Separation Guide

## Overview
This document clarifies the distinct roles and functionalities in GatherEase to ensure proper role-based access control.

---

## 🎭 Role Definitions

### 1. **Attendee** 
Regular users who browse, register, and attend events.

**Core Functionalities:**
- Browse and search events (by category, date, location)
- View event details
- RSVP/purchase tickets
- Receive notifications about events
- Add events to personal calendar
- Check-in at events via QR code
- Submit feedback/reviews after events
- Manage profile and preferences
- View ticket history

**Pages Access:**
- `/` - Home/Index
- `/events` - Browse Events
- `/events/:id` - Event Details
- `/dashboard` - Personal Dashboard
- `/my-tickets` - My Tickets
- `/profile` - Profile & Preferences

---

### 2. **Organizer**
Event creators who manage their own events from creation to post-event analysis.

**Core Functionalities:**

#### Epic 1: Event Creation & Management
- Create new events with all details (title, venue, date, description, tickets)
- Edit/update event details
- Publish/unpublish events
- Duplicate past events
- Upload banners and attachments

#### Epic 2: Ticketing & Registration
- Define ticket types (free, paid, early-bird, group)
- Monitor registrations in real-time
- Process refunds/cancellations
- Auto-generate QR tickets for attendees

#### Epic 3: Attendee Communication
- Send announcements to registered attendees
- Schedule reminder notifications
- Configure notification templates
- View notification logs

#### Epic 4: Attendance Tracking
- QR code scanning for check-in
- Manual check-in option
- View live attendance data
- Export attendance reports (CSV)

#### Epic 5: Post-Event Survey (PES)
- Create custom surveys for events
- Distribute surveys automatically
- Analyze survey responses
- Export survey data

#### Epic 6: Analytics & Reporting
- View event performance metrics
- Compare multiple events
- Track registrations vs attendance
- Export reports (PDF/CSV)

#### Epic 7: Profile & Team Management
- Update organization profile
- Manage team roles and permissions (Admin, Editor, Viewer)
- View audit trail

**Pages Access:**
- `/organizer-dashboard` - Organizer Dashboard
- `/organizer/create-event` - Create New Event
- `/organizer/events` - My Events List
- `/organizer/events/:id` - Event Management Detail
- `/organizer/analytics` - Analytics Dashboard
- `/organizer/attendees/:eventId` - Attendee Management
- `/organizer/check-in/:eventId` - QR Check-in Scanner
- `/organizer/surveys/:eventId` - PES Management
- `/organizer/profile` - Organization Profile

---

### 3. **Admin**
Platform administrators who oversee the entire system and moderate content.

**Core Functionalities:**

#### Platform Management
- Approve/reject event submissions
- Moderate event content
- Suspend/activate events
- Manage platform-wide settings

#### User Management
- View all users (organizers, attendees)
- Approve organizer applications
- Suspend/ban users
- View user activity logs
- Manage user roles and permissions

#### System Oversight
- View platform-wide analytics
- Monitor system health
- Manage categories and tags
- Configure notification settings
- Review reported content

#### Support & Moderation
- Respond to support tickets
- Review and resolve disputes
- Handle refund requests (escalated)
- Moderate reviews/feedback

**Pages Access:**
- `/admin` - Admin Dashboard
- `/admin/events` - All Events (Pending/Active/Archived)
- `/admin/users` - User Management
- `/admin/organizers` - Organizer Applications
- `/admin/analytics` - Platform Analytics
- `/admin/settings` - System Settings
- `/admin/reports` - Reports & Moderation

---

### 4. **Super Admin**
Highest level access with full system control.

**Core Functionalities:**
- All Admin functionalities
- Manage admin accounts
- System configuration
- Database management
- Security settings
- Payment gateway configuration
- API key management

**Pages Access:**
- `/superadmin` - Super Admin Dashboard
- All admin pages plus:
- `/superadmin/admins` - Admin Management
- `/superadmin/system` - System Configuration
- `/superadmin/security` - Security Settings

---

## 🔐 Access Control Matrix

| Feature | Attendee | Organizer | Admin | Super Admin |
|---------|----------|-----------|-------|-------------|
| Browse Events | ✅ | ✅ | ✅ | ✅ |
| Register for Events | ✅ | ✅ | ✅ | ✅ |
| Create Events | ❌ | ✅ | ❌* | ✅ |
| Manage Own Events | ❌ | ✅ | ❌ | ✅ |
| Approve Events | ❌ | ❌ | ✅ | ✅ |
| QR Check-in (Own Events) | ❌ | ✅ | ❌ | ✅ |
| View All Users | ❌ | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ✅ | ✅ |
| System Settings | ❌ | ❌ | ❌ | ✅ |
| Analytics (Own Events) | ❌ | ✅ | ❌ | ✅ |
| Analytics (All Events) | ❌ | ❌ | ✅ | ✅ |

*Admins can create events but primarily focus on approval/moderation

---

## 📋 Implementation Checklist

### Phase 1: Update Organizer Dashboard
- [ ] Remove admin-specific features (user management, event approvals)
- [ ] Add event creation and management
- [ ] Add QR check-in scanner for own events
- [ ] Add ticketing management
- [ ] Add attendee communication tools
- [ ] Add PES creation and management
- [ ] Add analytics for own events
- [ ] Add team/organization profile management

### Phase 2: Update Admin Dashboard
- [ ] Remove event creation tools (or limit to moderation)
- [ ] Add event approval workflow
- [ ] Add user management (organizers and attendees)
- [ ] Add organizer application approval
- [ ] Add platform-wide analytics
- [ ] Add content moderation tools
- [ ] Add system settings
- [ ] Remove QR scanner (organizers handle this)

### Phase 3: Update Navigation & Guards
- [ ] Add role-based route guards
- [ ] Update navigation menus per role
- [ ] Add proper redirects after login
- [ ] Add "insufficient permissions" messages

### Phase 4: Create Missing Pages
- [ ] Create OrganizerDashboard with proper features
- [ ] Create Organizer Event Management pages
- [ ] Create Organizer Check-in page with QR scanner
- [ ] Update Admin dashboard to focus on moderation
- [ ] Create Admin user management pages

---

## 🚀 Quick Start After Implementation

### For Organizers:
1. Login → Redirected to `/organizer-dashboard`
2. Click "Create Event" → `/organizer/create-event`
3. Manage events → `/organizer/events`
4. Check-in attendees → `/organizer/check-in/:eventId`

### For Admins:
1. Login → Redirected to `/admin`
2. Review pending events → `/admin/events?status=pending`
3. Manage users → `/admin/users`
4. View platform analytics → `/admin/analytics`

---

## 📝 Notes

- **Organizers** are focused on their own events and attendees
- **Admins** oversee the platform and moderate content
- **QR Scanner** is an organizer tool, not an admin tool
- **Event Creation** is primarily an organizer function
- **User Management** is an admin function
