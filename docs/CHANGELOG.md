# Changelog

All notable changes to the **Kanban Crayon Board** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.4.0] - 2025-12-25

### Added
- **Dashboard / Overview Page**:
  - Central hub showing stats across all boards
  - Summary cards: Total tasks, Completed this week, Overdue, In Progress
  - Board grid with quick access and progress indicators
  - Upcoming deadlines section (next 7 days)
  - Recent activity feed across all boards
  - Overdue tasks alert panel
- **Board Settings Page**:
  - Advanced board configuration interface
  - Board description field for context
  - Theme color picker with 8 presets + custom color selector
  - WIP (Work In Progress) limits per column configuration
  - Danger zone with safe board deletion
- **My Tasks / Personal View**:
  - Unified task view across all boards
  - Advanced filtering: board, status, priority, tags
  - Multiple sort options: created date, due date, priority, title
  - Pagination support (20 tasks per page)
  - Empty state handling
  - Real-time filter updates

### Changed
- **Navigation Enhanced**:
  - Added "Dashboard" link to desktop and mobile navigation
  - Added "My Tasks" link to desktop and mobile navigation
  - Reorganized navigation: Dashboard → Kanban → My Tasks
- **Database Schema**:
  - Added `description` column to `boards` table (TEXT, nullable)
  - Updated Board model fillable to include description

### Technical
- Created `DashboardController.php` with comprehensive stats calculation
- Created `MyTasksController.php` with advanced filtering and sorting
- Extended `BoardController.php` with settings management methods
- Created `Dashboard.tsx` page with Framer Motion animations
- Created `BoardSettings.tsx` page with form handling
- Created `MyTasks.tsx` page with filter panel
- Added 4 new routes: dashboard, my-tasks, boards.settings (GET/POST)
- Migration: `2025_12_24_172452_add_description_to_boards_table`

---

## [1.3.0-beta] - 2025-12-24

### Added
- **Home Route Optimization**: 
  - Root URL (`/`) now serves Kanban board directly (previously served Welcome page)
  - Authentication required for home route access
  - Seamless login-to-kanban flow
- **User Management**:
  - Added `taratask@tarakreasi.com` as default seeded user
  - Password: `tarakreasi`
- **Profile Enhancement**:
  - Added logout button directly in profile edit section
  - Improved profile management UX with inline actions
- **Branding Update**:
  - Application title changed to "Kanban Crayon Board"
  - Subtitle updated to "taraTask" for brand consistency
  - Consistent branding across sidebar and navigation

### Changed
- **Navigation Simplified**:
  - Removed redundant Dashboard page
  - Updated `AuthenticatedLayout` navigation to point to Kanban board
  - Cleaner navigation menu (Profile → Kanban → Logout flow)
- **Login Redirect**:
  - Post-login redirect now goes to `/` (Kanban board) instead of removed dashboard
  - Updated `AuthenticatedSessionController` to use 'home' route

### Removed
- **Dashboard Page**: Removed unused `Dashboard.tsx` component
- **Dashboard Route**: Cleaned up `/dashboard` route from web routes
- **Dashboard Navigation**: Removed all dashboard references from navigation menus

### Fixed
- **Route Error**: Fixed "Route [dashboard] not defined" error after login
- **Navigation Consistency**: Ensured all navigation links point to valid routes
- **Auth Flow**: Streamlined authentication flow to go directly to main application

### Documentation
- **README.md**: Complete rewrite with comprehensive project narrative
  - Added detailed "About" section explaining project vision
  - Comprehensive feature documentation with icons and formatting
  - Clear quick-start guide with step-by-step instructions
  - Technology stack explanation
  - Design philosophy section
  - Project structure overview
- **CHANGELOG.md**: Updated with latest changes (v1.3.0-beta)

---

## [1.2.0-beta] - 2025-12-21
### Added
- **Due Dates:**
  - Set due dates for tasks via date picker in Task Modal
  - Color-coded indicators on task cards (Green: future, Yellow: soon, Red: overdue)
- **WIP Limits:**
  - Configurable Work-In-Progress limits for Kanban columns
  - Visual alerts (red pulsing counter) when limits are exceeded
- **Labels & Tags:**
  - Create and manage board-specific tags with custom colors
  - Assign multiple tags to tasks
  - Colored tag pills displayed on task cards
- **Task Comments:**
  - Dedicated Comments tab in Task Modal
  - Add and delete comments per task
  - User avatars and timestamps for context
- **Cycle Time Analytics:**
  - Tracking of `started_at` (In Progress) and `completed_at` (Done) timestamps
  - Analytics panel showing Average Cycle Time, Throughput (7 days), and current WIP
  - New analytics dashboard button in the board header
- **UI/UX Polish (WOW Factors):**
  - **Board Progress Bar**: Real-time project completion indicator in the header
  - **Global Task Search**: Instant client-side filtering by title or description
  - **Framer Motion Animations**: Smooth page transitions, staggered column entries, and interactive card hover effects
  - **Completion Celebration**: Full-screen confetti burst when moving tasks to "Done"
  - **Enhanced Task Cards**: Added comment/tag count indicators and subtle noise textures for premium glassmorphism
- **API Reference**: Added comprehensive documentation for available backend endpoints.

### Fixed
- **Pivot Table Mapping:** Resolved `tag_task` table name collision by explicitly specifying `task_tag` in models
- **UI Icons:** Replaced missing `calendar_today` text with Lucide `Calendar` icon
- **Modal Structure:** Fixed JSX syntax error and unclosed tags in `TaskModal.tsx`

## [1.1.0-beta] - 2025-12-21
### Added
- **Multi-Board System:**
  - Users can create multiple Kanban boards with custom theme colors
  - Board switcher in sidebar with visual hierarchy (active indicator, color dots)
  - Inline board creation input (no popup)
  - Inline delete confirmation for empty boards
  - Dynamic theme color applied to headers, buttons, and column glows
- **Authentication & Profile:**
  - Laravel Breeze (React/Inertia) integration
  - User avatar upload support
  - Minimalist glassmorphism login page design
  - User profile section in sidebar
- **Task Activity Log:**
  - Activity history tracking for tasks (created, moved, updated)
  - Activity tab in Task Modal with timeline view
- **Quick Add:**
  - Inline task creation directly from column headers
  - Press Enter to submit, Escape to cancel
- **Inline Editing:**
  - Double-click task title to edit inline
  - Blur or Enter to save changes
- **Dark Mode:**
  - Full dark mode support with theme toggle
  - Rich navy blue color palette for dark theme
  - Color-tinted column backgrounds per status
- **Mobile Responsiveness:**
  - Hamburger menu with slide-out sidebar
  - Backdrop blur overlay on mobile
  - Responsive header and button layouts

### Changed
- **Sidebar UI:** Complete redesign with glassmorphism effects
- **Board Theme:** Dynamic color integration throughout UI
- **Column Design:** Status-specific background tints (blue, amber, green)
- **"New Task" Button:** Uses board theme color with hover animations
- **Footer:** Updated branding with copyright
- **Inline Profile Editing:** Edit name, email, and upload avatar directly in sidebar
- **Light Mode Gradient:** Vibrant indigo-purple-pink gradient for beautiful glassmorphism

### Fixed
- CSS loading issue (missing variable definitions)
- `preserveScroll` TypeScript errors in Inertia router calls
- `board_id` not passed during task creation (Quick Add, Modal)
- Malformed Tailwind class names in sidebar
- Duplicate closing bracket syntax error

---

## [1.0.0-beta] - 2025-12-21
### Added
- **UI/UX Redesign:** Complete TaraKreasi design implementation
  - Pastel color palette (soft gray, blue, yellow, green for columns)
  - Material Symbols icon font integration
  - Inter font family from Google Fonts
  - Softer shadows and rounded corners (rounded-xl, rounded-2xl)
  - Backdrop blur effects on header
- **Sidebar Features:**
  - Recent Tasks widget showing 5 most recent tasks
  - Mini status and priority badges in sidebar
  - Hover effects for task items
  - Scrollable sidebar with overflow handling
- **Layout:** Responsive sidebar layout with breadcrumb navigation
- **Feature:** Added "In Review" status column (4-column Kanban board)
- **Drag & Drop:** Fixed droppable zones using `useDroppable` hook
- **Header Actions:** "New Task" button in header now functional
- **Core:** Completed port from Next.js to **Laravel 12 + Inertia + React** stack
- **Docs:** Comprehensive documentation (PRD, UI/UX Concept, Roadmap, User Stories, Risk Assessment, Success Metrics, Sprint Log, Feature Status)

### Changed
- **Grid:** Updated Board to 4-column layout to accommodate "In Review" status
- **Performance:** Optimized with server-side rendering via Inertia
- **Color Scheme:** Updated from vibrant to pastel colors for better visual hierarchy
- **Typography:** Smaller, cleaner text sizes (text-xs, text-sm)
- **Cards:** Updated with group-hover effects for action buttons
- **Badges:** Uppercase, tracking-wider for priority/status indicators

### Fixed
- Drag and drop now works correctly between columns
- Modal opens when clicking "New Task" in header
- Recent tasks list updates dynamically

---

## [0.9.0] - 2025-11-15
### Added
- **Interactions:** Drag and drop functionality using `@dnd-kit/core` and `@dnd-kit/sortable`.
- **Feature:** Task Priority levels (Low, Medium, High) with visual indicators.
- **Backend:** Basic API endpoints for Task CRUD operations.

### Fixed
- **Bug:** Solved issue where dragging a task momentarily disappeared before snapping.
- **Style:** Fixed mobile overflow issues on the main board container.

---

## [0.8.0] - 2025-10-01
### Added
- **UI:** Initial integration of **Tailwind CSS**.
- **Components:** Created atomic components: `TaskCard`, `Badge`, `Button`.
- **Feature:** "Edit Task" modal window.
- **Database:** SQLite database schema design for `tasks` table.

### Changed
- Refactored `TaskCard` to separate display logic from data structure.

---

## [0.5.0] - 2025-09-10
### Added
- **Prototype:** Initial "Proof of Concept" built with Next.js and local storage.
- **Feature:** Basic "To Do" list functionality (Add/Remove items).
- **Design:** Sketching initial wireframes for the "Board" view.

### Deprecated
- **Legacy:** Removed the original vanilla JS + HTML prototype files in favor of React component architecture.

---

## [0.1.0] - 2025-07-20
### Added
- **Inception:** Initial commit.
- **Concept:** Manifesto and rough ideas for a "Non-boring" Kanban board.
- **Setup:** Repository initialization and environment setup.
