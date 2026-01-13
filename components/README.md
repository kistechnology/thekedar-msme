# Components Structure

## Layout Components

### MainLayout (`components/layout/MainLayout.tsx`)
The main layout wrapper that uses Mantine's `AppShell` to provide a structured layout with:
- Header (60px height)
- Sidebar/Navbar (280px width on desktop, drawer on mobile)
- Footer (60px height, hidden on mobile)
- Main content area (scrollable)
- Bottom navigation (mobile only)
- Scroll to top button

### Header (`components/layout/Header.tsx`)
- Mobile-friendly header with burger menu toggle
- App title "Thekedar MSME"
- Action icons for notifications and profile
- Responsive: Burger menu only visible on mobile

### Sidebar (`components/layout/Sidebar.tsx`)
- Mobile drawer navigation
- Navigation items: Dashboard, Quotations, Settings
- Active route highlighting
- Hidden on desktop (use DesktopSidebar instead)

### DesktopSidebar (`components/layout/DesktopSidebar.tsx`)
- Desktop sidebar navigation (visible from "sm" breakpoint)
- Same navigation items as mobile sidebar
- Always visible on desktop

### BottomNavigation (`components/layout/BottomNavigation.tsx`)
- Mobile-only bottom navigation bar
- WhatsApp-like navigation pattern
- Fixed position at bottom
- Icon-based navigation

### Footer (`components/layout/Footer.tsx`)
- Minimal footer with copyright
- Hidden on mobile devices
- Visible on desktop

### ScrollToTop (`components/layout/ScrollToTop.tsx`)
- Floating action button
- Appears when user scrolls down 400px
- Smooth scroll to top animation
- Positioned at bottom-right

## Component Features

### Mobile-First Design
- Responsive breakpoints using Mantine's `visibleFrom`/`hiddenFrom`
- Touch-friendly button sizes (minimum 44x44px)
- Bottom navigation for mobile (WhatsApp-like)
- Drawer sidebar for mobile navigation

### Navigation Items
Currently configured with:
1. **Dashboard** (`/`) - Home page
2. **Quotations** (`/quotations`) - Quotation management
3. **Settings** (`/settings`) - Application settings

### Icons
Using `lucide-react` for consistent iconography:
- `LayoutDashboard` - Dashboard
- `FileText` - Quotations
- `Settings` - Settings
- `Bell` - Notifications
- `User` - Profile
- `ArrowUp` - Scroll to top

## Usage

```tsx
import MainLayout from "@/components/layout/MainLayout";

export default function Page() {
  return (
    <MainLayout>
      {/* Your page content */}
    </MainLayout>
  );
}
```

## Responsive Breakpoints

- **Mobile**: < 768px (sm)
  - Burger menu in header
  - Drawer sidebar
  - Bottom navigation
  - Footer hidden

- **Desktop**: ≥ 768px (sm)
  - Always visible sidebar
  - No bottom navigation
  - Footer visible
  - No burger menu

## Next Steps

1. Add more navigation items as needed
2. Customize header actions (notifications, profile menu)
3. Add user authentication UI
4. Customize theme colors
5. Add breadcrumbs component
6. Add search functionality in header
