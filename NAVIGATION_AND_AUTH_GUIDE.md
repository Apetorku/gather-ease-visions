# Navigation and Authentication Guide

## Overview
This guide explains the complete navigation and authentication flow for the GatherEase platform.

## ✅ Implemented Features

### 1. **Authentication Protection**
All protected pages now check for authentication on mount and redirect unauthorized users:

- **Dashboard** (`/dashboard`)
- **Admin Panel** (`/admin`)
- **My Tickets** (`/my-tickets`)
- **Profile** (`/profile`)

### 2. **Role-Based Access Control**
Pages check both authentication AND user role:

- **Admin Panel**: Only accessible to users with `admin` or `superadmin` role
- **Super Admin Panel**: Only accessible to users with `superadmin` role
- **Regular Pages**: Accessible to all authenticated users

### 3. **Professional Logout Flow**
Every protected page now has:
- User avatar menu in the header
- Logout option that:
  - Clears all localStorage data (session, role, username, email)
  - Shows success toast notification
  - Redirects to home page using `replace: true` (prevents back button issues)

### 4. **Loading States**
All protected pages show a professional loading spinner while checking authentication

### 5. **User Menu Dropdown**
Consistent user menu across all pages with:
- User avatar (generated from username)
- Username display
- Quick navigation links
- Settings option
- Logout button (red text for emphasis)

## 🔐 Authentication Flow

### Login Process
1. User enters credentials on `/login`
2. Credentials validated (demo accounts or Supabase)
3. Session data stored in localStorage:
   ```javascript
   localStorage.setItem("userSession", token);
   localStorage.setItem("userRole", role);
   localStorage.setItem("userName", name);
   localStorage.setItem("userEmail", email);
   ```
4. User redirected based on role:
   - `superadmin` → `/superadmin`
   - `admin` → `/admin`
   - `organizer` → `/organizer-dashboard`
   - `attendee` → `/dashboard`

### Protected Page Access
1. User navigates to protected page
2. Page checks `localStorage.getItem("userSession")`
3. If no session:
   - Show error toast
   - Redirect to `/login` with `replace: true`
4. If session exists:
   - Check role if needed
   - Load user data
   - Show page content

### Logout Process
1. User clicks "Log out" from user menu
2. All localStorage data cleared:
   ```javascript
   localStorage.removeItem("userSession");
   localStorage.removeItem("userName");
   localStorage.removeItem("userRole");
   localStorage.removeItem("userEmail");
   ```
3. Success toast shown
4. Redirect to `/` with `replace: true`

## 🗺️ Navigation Structure

### Public Pages (No Authentication Required)
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/events` - Event listing (with limited features for guests)
- `/events/:id` - Event details

### Protected Pages (Authentication Required)
- `/dashboard` - User dashboard
- `/my-tickets` - User's tickets
- `/profile` - User profile/settings

### Admin Pages (Admin Role Required)
- `/admin` - Admin panel
- `/admin/create-event` - Create event

### Super Admin Pages (Super Admin Role Required)
- `/superadmin` - Super admin panel

## 🎯 User Menu Features

### Available on All Protected Pages:
1. **User Avatar**
   - Generated from username
   - Click to open dropdown menu

2. **Dropdown Menu Items**:
   - **Profile**: View/edit personal information
   - **Dashboard**: View personalized dashboard
   - **My Tickets**: View purchased tickets
   - **Browse Events**: Explore available events
   - **Settings**: Manage preferences
   - **Log out**: End session and return to home

## 🔄 Navigation Best Practices

### Redirect with `replace: true`
All authentication-related redirects use `replace: true` to prevent:
- Users navigating back to protected pages after logout
- Accumulating unnecessary history entries
- Confusing back button behavior

### Example:
```javascript
navigate("/login", { replace: true });
navigate("/", { replace: true });
```

### Toast Notifications
All auth actions provide user feedback:
- ✅ Login success
- ❌ Login failure
- ✅ Logout success
- ❌ Access denied
- ℹ️ Permission errors

## 📱 Responsive Design

### Mobile Navigation
- User menu collapses to icon on small screens
- Dropdown menu remains fully functional
- Touch-friendly button sizes

### Desktop Navigation
- Full navigation bar with text labels
- Large user avatar and dropdown
- Visible page titles and breadcrumbs

## 🚀 Testing the Navigation Flow

### Test Case 1: Public to Protected
1. Visit `/events` (public, no login needed)
2. Click "My Tickets" → Redirected to `/login`
3. Login with credentials
4. Automatically redirected to `/my-tickets`

### Test Case 2: Logout and Navigation
1. Login as any user
2. Navigate to `/dashboard`
3. Click user avatar → "Log out"
4. Verify redirect to `/`
5. Try to manually navigate to `/dashboard`
6. Verify redirect back to `/login`

### Test Case 3: Role-Based Access
1. Login as regular user (attendee)
2. Try to navigate to `/admin`
3. Verify redirect to `/dashboard` with error toast
4. Login as admin
5. Navigate to `/admin` successfully

### Test Case 4: Browser Back Button
1. Login and navigate to `/dashboard`
2. Logout (redirected to `/`)
3. Click browser back button
4. Verify redirect to `/login` (not showing dashboard)

## 🛠️ Technical Implementation

### Key Components Used
- **React Router**: Navigation and routing
- **localStorage**: Session persistence
- **Framer Motion**: Page transitions
- **Shadcn UI**: Dropdown menus and avatars
- **Sonner/Toast**: User notifications

### State Management
Each protected page maintains:
```javascript
const [userName, setUserName] = useState("User");
const [isLoading, setIsLoading] = useState(true);
```

### useEffect Hook Pattern
```javascript
useEffect(() => {
  const userSession = localStorage.getItem("userSession");
  const storedUserName = localStorage.getItem("userName");
  
  if (!userSession) {
    navigate("/login", { replace: true });
    return;
  }
  
  setUserName(storedUserName || "User");
  setIsLoading(false);
}, [navigate]);
```

## 📝 Summary

The GatherEase platform now has:
- ✅ Professional authentication checks on all protected pages
- ✅ Consistent user menus with logout functionality
- ✅ Proper redirect handling (no back button issues)
- ✅ Role-based access control
- ✅ Loading states during authentication checks
- ✅ User-friendly toast notifications
- ✅ Mobile-responsive navigation
- ✅ Clean and professional UI/UX

All navigation is now professional and secure, with proper session management and user feedback throughout the user journey.
