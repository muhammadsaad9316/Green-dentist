# Manual Testing Checklist

## 1. Admin Authentication
- [ ] **Login Success**:
    - Go to `/admin/login`.
    - Enter `admin@greendentist.com` / `admin123`.
    - Expect redirect to `/admin`.
- [ ] **Login Failure**:
    - Enter correct email, wrong password.
    - Expect "Invalid credentials" error.
- [ ] **Logout**:
    - Click "Sign Out" in Sidebar.
    - Expect redirect to `/admin/login` (or `/`).
- [ ] **Protected Routes**:
    - Try accessing `/admin/appointments` without login.
    - Expect redirect to login.

## 2. Public Booking Flow
- [ ] **Availability Check**:
    - Go to `/book`.
    - Select "Teeth Cleaning".
    - Pick a date.
    - Verify some slots available.
- [ ] **Submission**:
    - Fill Date/Time.
    - Enter Name: "Test User".
    - Enter Email: "test@user.com".
    - Enter Phone: "+15550001111".
    - Submit.
    - Expect "Booking Confirmed" success screen.

## 3. Admin Appointments Management
- [ ] **View List**:
    - Log in to Admin.
    - Go to Appointments.
    - Verify "Test User" booking appears.
    - Verify Status is "PENDING".
- [ ] **Status Update**:
    - Click "Details" or "Edit" on the booking.
    - Change status to "CONFIRMED".
    - Verify toast success message.
    - Refresh to confirm persistence.
- [ ] **Delete**:
    - Click Delete icon.
    - Confirm modal.
    - Verify item is removed from list.

## 4. Security & Validation
- [ ] **XSS Test**:
    - Create booking with Name `<script>alert(1)</script>`.
    - Verify it displays as text in Admin, not executed.
- [ ] **Rate Limit** (Optional):
    - Fire 50+ status updates rapidly.
    - Expect 429 error.

## 5. Mobile Responsiveness
- [ ] **Sidebar**:
    - On mobile (<768px), sidebar should be hidden or have a hamburger menu (if implemented) or bottom nav. *Note: Current implementation hides sidebar on mobile, need to verify fallback nav exists.*
- [ ] **Tables**:
    - Check horizontal scroll on small screens.
