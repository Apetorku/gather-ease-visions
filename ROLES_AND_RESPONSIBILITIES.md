# GatherEase - Roles and Responsibilities

## Overview
This document outlines the distinct roles, responsibilities, and functionalities for each user type in the GatherEase platform.

---

## 1. **Attendees** 👥

### Primary Purpose
Discover, register for, and attend events while engaging with the community.

### Key Functionalities

#### Event Discovery & Awareness (Epic 1)
- ✅ Browse and search events by category, date, location
- ✅ View detailed event information (date, venue, description, pricing)
- ✅ Receive notifications about new and relevant events
- ✅ Filter events by price range, date, and location
- ✅ Save favorite events

#### RSVP, Ticketing & Payments (Epic 2)
- ✅ RSVP to free events or purchase paid tickets
- ✅ Secure payment processing (mobile money, card, etc.)
- ✅ Receive digital tickets with QR codes
- ✅ View confirmation via in-app and email
- ✅ Request refunds based on organizer policy

#### Event Planning & Scheduling (Epic 3)
- ✅ Add events to personal calendar
- ✅ Sync with Google/Apple/Outlook calendars
- ✅ Receive event reminders
- ✅ Auto-update when event details change

#### Networking & Engagement (Epic 4)
- ✅ Share feedback and reviews after events
- ✅ Rate events (1-5 stars)
- ✅ Submit Post-Event Surveys (PES)
- ✅ Share events with friends

#### Check-In & Attendance (Epic 5)
- ✅ Display QR code for event entry
- ✅ Quick check-in at event venue
- ✅ Receive check-in confirmation
- ✅ Access event updates during the event

#### Attendee Profile & Preferences (Epic 6)
- ✅ Manage personal profile (bio, picture, contact info)
- ✅ Set event interests and preferences
- ✅ Configure notification settings
- ✅ View dashboard with upcoming and past events
- ✅ Track ticket history

### Access Pages
- `/` - Home page
- `/events` - Event listing
- `/events/:id` - Event details
- `/dashboard` - Attendee dashboard
- `/my-tickets` - Ticket management
- `/profile` - Profile management

---

## 2. **Organizers** 🎯

### Primary Purpose
Create, manage, and execute successful events while engaging with attendees.

### Key Functionalities

#### Event Creation & Management (Epic 1)
- ✅ Create new events with comprehensive details
  - Title, description, venue, date/time
  - Banner image and attachments
  - Capacity limits and categories
- ✅ Edit and update event information
- ✅ Publish, unpublish, or archive events
- ✅ Duplicate past events for recurring events
- ✅ Track event status (Draft, Published, Active, Completed)

#### Ticketing & Registration Management (Epic 2)
- ✅ Define ticket types (Free, Paid, Early-bird, Group, VIP)
- ✅ Set pricing and quantity limits per ticket tier
- ✅ Monitor real-time registration statistics
- ✅ Process refunds and cancellations
- ✅ Automatically generate QR tickets for attendees
- ✅ Manage seat availability and overbooking prevention

#### Attendee Communication & Notifications (Epic 3)
- ✅ Send announcements to registered attendees
- ✅ Schedule automated reminder notifications
- ✅ Configure notification templates with dynamic placeholders
- ✅ Track notification delivery and engagement
- ✅ Send updates about event changes

#### Attendance Tracking & Check-In Management (Epic 4)
- ✅ **QR Code Scanner** - Scan attendee tickets at entry
- ✅ Verify ticket validity in real-time
- ✅ View live attendance data and check-in rates
- ✅ Manual check-in option as backup
- ✅ Prevent duplicate entries
- ✅ Export attendance data (CSV)
- ✅ View check-in progress for each event

#### Post-Event Survey (PES) Management (Epic 5)
- ✅ Create custom PES for each event
- ✅ Multiple question types (rating, text, multiple choice)
- ✅ Auto-distribute PES to attendees after event
- ✅ Analyze response data and satisfaction metrics
- ✅ Export PES results (CSV/PDF)
- ✅ Track response rates

#### Analytics & Reporting (Epic 6)
- ✅ View event performance dashboard
  - Registration trends
  - Attendance rates
  - Revenue tracking
  - Check-in statistics
- ✅ Compare multiple events
- ✅ Export analytics reports
- ✅ Monitor growth and engagement metrics

#### Organizer Profile & Account Management (Epic 7)
- ✅ Update organization profile (logo, bio, contact)
- ✅ Manage team members and roles
  - Admin: Full access
  - Editor: Create and edit events
  - Viewer: View-only access
- ✅ Set permissions for sensitive actions
- ✅ View audit trail of team actions

### Advanced Event Tools
- ✅ **QR Check-In** - Real-time ticket scanning
- ✅ **Announcements** - Send instant notifications
- ✅ **Export Reports** - Download analytics and data
- ✅ **Duplicate Events** - Copy event templates
- ✅ **Team Management** - Collaborate with team members

### Access Pages
- `/organizer-dashboard` - Organizer main dashboard
- `/organizer/create-event` - Event creation
- `/events` - Browse all events
- `/profile` - Organization profile
- `/dashboard` - Personal dashboard

---

## 3. **Admins** 🛡️

### Primary Purpose
Oversee platform operations, approve content, manage users, and maintain system integrity.

### Key Functionalities

#### Platform Administration
- ✅ View platform-wide statistics
  - Total events (all organizers)
  - Total users (attendees + organizers)
  - Platform revenue
  - Active users and engagement metrics
- ✅ Monitor system health and performance
- ✅ Access audit logs

#### Event Moderation & Approval
- ✅ **Review pending events** from organizers
- ✅ **Approve or reject** event submissions
- ✅ Ensure events meet platform guidelines
- ✅ Edit event details if needed for compliance
- ✅ Flag inappropriate or policy-violating events
- ✅ View all events across the platform

#### User Management
- ✅ **Manage organizer accounts**
  - Approve new organizer applications
  - Suspend or deactivate accounts
  - Review organizer profiles
- ✅ **Manage attendee accounts**
  - View user activity
  - Handle support requests
  - Resolve disputes
- ✅ **Approve admin applications**
  - Review admin access requests
  - Grant or deny admin privileges
  - Manage admin roles

#### System Configuration
- ✅ Configure platform settings
- ✅ Manage categories and event types
- ✅ Set platform-wide policies
- ✅ Update terms of service
- ✅ Manage payment gateway settings

#### Reporting & Analytics
- ✅ View platform-wide analytics
- ✅ Generate system reports
- ✅ Monitor revenue trends
- ✅ Track user growth
- ✅ Export platform data

#### Support & Moderation
- ✅ Review user reports and complaints
- ✅ Moderate content and reviews
- ✅ Handle refund disputes
- ✅ Provide platform support

### What Admins DON'T Do
- ❌ Create events (that's for organizers)
- ❌ Scan QR codes at events (organizer responsibility)
- ❌ Manage individual event attendees
- ❌ Send event-specific announcements
- ❌ Handle event-level operations

### Access Pages
- `/admin` - Admin dashboard
- `/superadmin` - Super admin dashboard (full access)
- `/events` - Browse all events
- `/dashboard` - Personal dashboard

---

## 4. **Super Admin** 👑

### Primary Purpose
Ultimate platform control with access to all admin functions plus system-level configuration.

### Key Functionalities
- ✅ All Admin functionalities
- ✅ Manage admin accounts
- ✅ System-level configuration
- ✅ Database management
- ✅ Platform security settings
- ✅ Access to all features and data

### Access Pages
- `/superadmin` - Super admin dashboard
- All other pages with elevated permissions

---

## Role Comparison Matrix

| Feature | Attendee | Organizer | Admin | Super Admin |
|---------|----------|-----------|-------|-------------|
| Browse Events | ✅ | ✅ | ✅ | ✅ |
| Buy Tickets | ✅ | ✅ | ✅ | ✅ |
| Create Events | ❌ | ✅ | ❌ | ✅ |
| QR Check-In | ❌ | ✅ | ❌ | ✅ |
| Manage Tickets | Own Only | Own Events | ❌ | ✅ |
| Event Analytics | ❌ | Own Events | All Events | All Events |
| Approve Events | ❌ | ❌ | ✅ | ✅ |
| Manage Users | ❌ | Team Only | All Users | All Users |
| Platform Config | ❌ | ❌ | Limited | Full |
| System Access | ❌ | ❌ | Limited | Full |

---

## Navigation Flow

### Attendee Flow
```
Login → Dashboard → Browse Events → View Event → Buy Ticket → My Tickets → Attend Event
```

### Organizer Flow
```
Login → Organizer Dashboard → Create Event → Manage Tickets → QR Check-In → View Analytics → Send Announcements
```

### Admin Flow
```
Login → Admin Panel → Review Pending Events → Approve/Reject → Manage Users → View Platform Stats
```

---

## Demo Accounts

### Attendee
- **Email:** user@test.com
- **Password:** user123

### Organizer
- **Email:** organizer@test.com
- **Password:** org123

### Admin
- **Email:** bamenorhu9@gmail.com
- **Password:** 1234567

### Super Admin
- **Email:** bamenorhu8@gmail.com
- **Password:** 1234567

---

## Security & Permissions

### Route Protection
- Protected routes check for valid session
- Role-based access control (RBAC)
- Automatic redirect on unauthorized access
- Session persistence with localStorage

### Permission Levels
1. **Public** - Anyone can access (home, events list)
2. **Authenticated** - Logged-in users (dashboard, profile)
3. **Organizer** - Event creators (organizer dashboard, QR scanner)
4. **Admin** - Platform moderators (admin panel, user management)
5. **Super Admin** - Full system access (all features)

---

## Future Enhancements

### Planned Features
- [ ] Real-time chat for attendees
- [ ] Event networking features
- [ ] Mobile app for check-in
- [ ] Advanced analytics dashboard
- [ ] Email marketing campaigns
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Offline check-in mode
- [ ] Custom event themes
- [ ] API for third-party integrations

---

## Summary

- **Attendees** focus on discovering and attending events
- **Organizers** create and manage their events with full operational control
- **Admins** oversee the platform, approve content, and manage users
- **Super Admins** have complete system access and control

Each role has distinct responsibilities that don't overlap, ensuring clear separation of concerns and efficient platform operation.
