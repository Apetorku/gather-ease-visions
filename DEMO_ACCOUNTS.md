# GatherEase Demo Accounts

Quick reference for all demo login accounts.

## Admin Accounts

### Super Admin (Full Access)

```
Email:    bamenorhu8@gmail.com
Password: 1234567
Role:     Super Admin
Access:   /superadmin dashboard
```

**Capabilities:**

- ✅ All admin features
- ✅ Manage other admins
- ✅ Add/remove/suspend administrators
- ✅ View system logs and audit trails
- ✅ Configure platform settings
- ✅ Full permissions management
- ✅ Access to super admin dashboard

---

### Regular Admin (Standard Access)

```
Email:    bamenorhu9@gmail.com
Password: 1234567
Role:     Admin
Access:   /admin dashboard
```

**Capabilities:**

- ✅ Create and manage events
- ✅ View analytics and reports
- ✅ Manage attendees
- ✅ Access admin dashboard
- ❌ Cannot manage other admins
- ❌ Cannot access super admin features
- ❌ Cannot modify system settings

---

### Organizer (Event Management)

```
Email:    organizer@test.com
Password: organizer123
Role:     Organizer
Access:   /organizer-dashboard
```

**Capabilities:**

- ✅ Create and manage own events
- ✅ QR code check-in station
- ✅ Manage attendee lists
- ✅ View event analytics
- ✅ Export event reports
- ✅ Send notifications to attendees
- ✅ Ticket management
- ❌ Cannot approve other organizers' events
- ❌ Cannot access admin panel
- ❌ Cannot manage users

---

## How to Use

1. **Navigate to Login**: Go to `/login` page
2. **Enter Credentials**: Use one of the emails and password above
3. **Auto-Redirect**: You'll be automatically redirected to the appropriate dashboard
4. **Demo Mode**: These accounts work without Supabase authentication for testing

---

## Role Comparison

| Feature          | Super Admin | Regular Admin | Organizer | Attendee |
| ---------------- | ----------- | ------------- | --------- | -------- |
| Create Events    | ✅          | ✅            | ✅        | ❌       |
| View Analytics   | ✅          | ✅            | Limited   | ❌       |
| Manage Users     | ✅          | ✅            | ❌        | ❌       |
| System Settings  | ✅          | ❌            | ❌        | ❌       |
| Manage Admins    | ✅          | ❌            | ❌        | ❌       |
| View System Logs | ✅          | ❌            | ❌        | ❌       |

---

## Notes

- Both accounts are **demo accounts** that bypass normal authentication
- Perfect for testing role-based access control
- No Supabase setup required for these accounts
- Session data is stored in localStorage
- Use these accounts to test different permission levels

---

## Logging Out

All accounts properly clear session data on logout:

- User session token
- User role
- User name
- User email

Logout redirects to the home page or login page depending on the context.
