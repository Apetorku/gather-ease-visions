# Super Admin Role - GatherEase

## Overview

The Super Admin is the highest level of access in the GatherEase platform. Super Admins have complete control over the platform, including the ability to manage other administrators.

## Access

- **Route**: `/superadmin`
- **Required Role**: `superadmin` (stored in localStorage)
- **Authentication Check**: Automatic redirect to dashboard if role is not superadmin
- **Designated Super Admin Email**: `bamenorhu8@gmail.com` (automatically assigned superadmin role on login)

## Demo Login Credentials

### Super Admin Account

- **Email**: `bamenorhu8@gmail.com`
- **Password**: `1234567`
- **Role**: Super Admin
- **Access**: Full super admin dashboard with all privileges

### Regular Admin Account

- **Email**: `bamenorhu9@gmail.com`
- **Password**: `1234567`
- **Role**: Admin
- **Access**: Standard admin dashboard (no super admin privileges)

## Key Features

### 1. Admin Management

- **Add New Admins**: Invite new administrators or moderators with custom permissions
- **Approve/Reject Requests**: Review and approve pending admin access requests
- **Suspend/Reactivate**: Temporarily disable or restore admin access
- **Remove Admins**: Permanently remove administrators from the platform
- **View Details**: Monitor admin activity, events managed, and last active time

### 2. Role Types

- **Admin**: Full access to most platform features (events, users, reports, settings)
- **Moderator**: Limited access with selected permissions (typically events and reports only)

### 3. Granular Permissions

Each admin can be assigned specific permissions:

- **Manage Events**: Create, edit, approve, and delete events
- **Manage Users**: View, suspend, and manage user accounts
- **View Reports**: Access analytics and generate reports
- **System Settings**: Configure platform settings
- **Manage Payments**: Handle refunds and payment disputes
- **Content Moderation**: Moderate user-generated content

### 4. System Monitoring

- **Real-time Stats**: Monitor total admins, active admins, pending requests, system health
- **Activity Logs**: Track all admin actions and system events
- **Log Types**: Success, Warning, Error, Info
- **Audit Trail**: Complete history of administrative actions

### 5. Platform Management

All standard admin features plus:

- **Security Settings**: Configure 2FA, session timeouts
- **Platform Features**: Enable/disable auto-approval, maintenance mode
- **Database Management**: Backup database, clear cache, export logs
- **System Health**: Monitor platform performance and database size

### 6. Enhanced Statistics Dashboard

8 comprehensive stat cards:

- Total Admins
- Active Admins
- Pending Requests
- System Health
- Total Events
- Total Revenue
- Total Users
- Database Size

## User Interface

### Tabs

1. **Admin Management**: Main tab for managing all administrators
2. **Permissions**: Configure and view permission details
3. **System Logs**: Monitor all platform activity
4. **Platform Settings**: Configure global settings

### Admin Card Features

Each admin card displays:

- Profile avatar and name
- Email address
- Role badge (Admin/Moderator)
- Status badge (Active/Suspended/Pending)
- Join date and last active time
- Assigned permissions
- Number of events managed
- Quick action dropdown menu

### Actions Menu

- View Details
- Edit Permissions
- Approve Admin (for pending)
- Suspend Access (for active)
- Reactivate (for suspended)
- Remove Admin (with confirmation dialog)

## Security Features

1. **Role-Based Access Control**: Only users with 'superadmin' role can access
2. **Automatic Redirect**: Non-super admins are redirected to dashboard
3. **Confirmation Dialogs**: Critical actions require confirmation
4. **Toast Notifications**: All actions provide user feedback
5. **Audit Logging**: All administrative actions are logged

## Login Flow

When a user logs in:

1. Credentials verified via Supabase
2. Email is checked against designated super admin email (`bamenorhu8@gmail.com`)
3. If email matches, role is automatically set to `superadmin`, regardless of metadata
4. Otherwise, role is fetched from user metadata (admin/organizer/attendee)
5. Role stored in localStorage as `userRole`
6. Session token stored as `userSession`
7. User name stored as `userName`
8. Automatic redirect based on role:
   - `superadmin` → `/superadmin`
   - `admin` → `/admin`
   - `organizer` → `/organizer-dashboard`
   - `attendee` → `/dashboard`

## Testing

To test Super Admin functionality:

```javascript
// In browser console or via login
localStorage.setItem("userRole", "superadmin");
localStorage.setItem("userSession", "test-session");
localStorage.setItem("userName", "Super Admin");
```

Then navigate to `/superadmin`

## Integration Points

### Backend Requirements

1. **User Management API**:

   - GET /admins - Fetch all administrators
   - POST /admins - Create new admin
   - PATCH /admins/:id - Update admin status/permissions
   - DELETE /admins/:id - Remove admin

2. **System Logs API**:

   - GET /system/logs - Fetch activity logs
   - POST /system/logs - Create log entry

3. **Settings API**:

   - GET /settings - Fetch platform settings
   - PATCH /settings - Update settings

4. **Email Service**:
   - Send invitation emails to new admins
   - Notify admins of status changes

### Database Schema Suggestions

```sql
-- Admins table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  role VARCHAR(20) CHECK (role IN ('admin', 'moderator', 'superadmin')),
  status VARCHAR(20) CHECK (status IN ('active', 'suspended', 'pending')),
  permissions TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  last_active_at TIMESTAMP,
  created_by UUID REFERENCES users(id)
);

-- System logs table
CREATE TABLE system_logs (
  id SERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  user_id UUID REFERENCES users(id),
  type VARCHAR(20) CHECK (type IN ('info', 'warning', 'error', 'success')),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Differences from Regular Admin

| Feature               | Admin   | Super Admin |
| --------------------- | ------- | ----------- |
| Manage Events         | ✅      | ✅          |
| View Reports          | ✅      | ✅          |
| Manage Users          | ✅      | ✅          |
| Add/Remove Admins     | ❌      | ✅          |
| Configure Permissions | ❌      | ✅          |
| System Settings       | ❌      | ✅          |
| View System Logs      | Limited | Full        |
| Database Management   | ❌      | ✅          |
| Suspend Admins        | ❌      | ✅          |

## Future Enhancements

1. **Multi-Factor Authentication**: Require MFA for super admin access
2. **IP Whitelisting**: Restrict super admin access to specific IPs
3. **Activity Notifications**: Real-time alerts for critical actions
4. **Advanced Analytics**: Detailed admin performance metrics
5. **Bulk Operations**: Manage multiple admins simultaneously
6. **Role Templates**: Pre-configured permission sets
7. **Scheduled Reports**: Automated system health reports
8. **API Key Management**: Manage API access tokens
