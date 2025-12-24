# Kanban Crayon Board - Features Documentation

> **Comprehensive guide to all features and functionality**

---

## 📑 Table of Contents

1. [Core Kanban Features](#core-kanban-features)
2. [Task Management](#task-management)
3. [Multi-Board System](#multi-board-system)
4. [Tags & Labels](#tags--labels)
5. [Comments & Collaboration](#comments--collaboration)
6. [Analytics & Metrics](#analytics--metrics)
7. [User Management](#user-management)
8. [UI/UX Features](#uiux-features)
9. [Technical Features](#technical-features)

---

## 🎯 Core Kanban Features

### 4-Column Workflow

The Kanban board implements a classic 4-stage workflow optimized for modern software development:

#### **Column 1: To Do** 
- **Purpose**: Backlog of tasks waiting to be started
- **Color**: Blue tint (light mode), darker blue (dark mode)
- **Actions Available**:
  - Quick-add new tasks
  - Drag tasks to In Progress
  - Edit task details
  - Set priorities and due dates

#### **Column 2: In Progress**
- **Purpose**: Tasks currently being worked on
- **Color**: Amber/yellow tint
- **Automatic Tracking**:
  - `started_at` timestamp set automatically when task moves here
  - Counted in WIP (Work In Progress) metrics
- **Actions Available**:
  - Move back to To Do (resets started_at)
  - Move forward to In Review
  - Update progress notes via comments

#### **Column 3: In Review**
- **Purpose**: Tasks completed but awaiting review/approval
- **Color**: Purple tint
- **Features**:
  - Also counted in WIP metrics
  - Ideal for code review, QA, or approval stages
- **Actions Available**:
  - Send back to In Progress for revisions
  - Move to Done upon approval

#### **Column 4: Done**
- **Purpose**: Completed tasks
- **Color**: Green tint
- **Automatic Features**:
  - `completed_at` timestamp set automatically
  - Confetti celebration animation 🎉
  - Counted in completion metrics
- **Analytics Impact**:
  - Affects cycle time calculation
  - Included in throughput metrics

### Drag & Drop

- **Technology**: @dnd-kit/core library
- **Features**:
  - Smooth dragging with visual feedback
  - Drop zones highlight on hover
  - Optimistic UI updates (instant feedback)
  - Automatic status change on drop
  - Works on desktop and touch devices

### Board Navigation

**Sidebar Board Switcher:**
- Lists all user's boards
- Color-coded indicators (board theme color)
- Active board highlighted
- Click to switch instantly
- Inline board creation
- Delete confirmation for empty boards

---

## 📋 Task Management

### Task Properties

Every task in the system contains:

#### **Core Fields**
```
- id: Unique identifier
- title: Task name (required, max 255 characters)
- description: Detailed explanation (optional, text field)
- status: todo | in-progress | in-review | done
- priority: low | medium | high
- board_id: Reference to parent board
```

#### **Temporal Fields**
```
- due_date: Optional deadline (datetime)
- started_at: Auto-set when moved to "In Progress"
- completed_at: Auto-set when moved to "Done"
- created_at: Task creation timestamp
- updated_at: Last modification timestamp
```

#### **Relational Fields**
```
- tags: Many-to-many relationship
- comments: One-to-many relationship
- activities: One-to-many activity log
- board: Belongs to one board
```

### Task Creation

**Method 1: Quick Add**
- Click "+" icon on column header
- Inline input field appears
- Type task title and press Enter
- Task created with:
  - Default priority: medium
  - Status: based on column
  - Board: current active board

**Method 2: Full Task Modal**
- Click "New Task" button in header
- Complete form with:
  - Title (required)
  - Description (WYSIWYG editor)
  - Priority selection
  - Due date picker
  - Tag assignment
  - Initial status

### Task Editing

**Inline Editing:**
- **Double-click task title** to edit in place
- Changes save on blur or Enter key
- Esc key to cancel

**Full Edit Modal:**
- Click task card anywhere except title
- Edit all fields
- Three tabs:
  1. **Details**: Title, description, priority, due date
  2. **Comments**: Discussion thread
  3. **Activity**: Change history

### Task Deletion

- Click delete button in task modal
- Confirmation dialog appears
- Cascading deletes:
  - All associated comments deleted
  - All activity records deleted
  - Tag associations removed
- Action is permanent (no undo/archive yet)

### Priority Levels

#### **Low Priority** 
- Badge Color: Gray
- Use Case: Nice-to-have features, minor improvements
- No special behavior

#### **Medium Priority** (Default)
- Badge Color: Blue
- Use Case: Standard tasks, regular development work
- Default for quick-add tasks

#### **High Priority**
- Badge Color: Red
- Use Case: Urgent bugs, critical features, blockers
- Visual prominence on cards

### Due Dates

**Color-Coded Indicators:**

```
🟢 Green: Due date is in the future (>3 days)
🟡 Yellow: Due soon (within 3 days)  
🔴 Red: Overdue (past due date)
```

**Features:**
- Date picker with calendar interface
- Clear/remove due date option
- Visible on task card
- Sortable by due date in future views

### Activity Tracking

**Automatic Activity Logging:**

Every task maintains a complete audit trail:

```php
Activity Types:
- created: Task was created
- updated: Task properties changed (logs what changed)
- moved: Status changed (logs from/to columns)
- comment_added: New comment posted
- tag_added: Tag assigned
- tag_removed: Tag removed
```

**Activity Properties:**
```json
{
  "type": "updated",
  "description": "Updated title from 'Old' to 'New'",
  "properties": {
    "old": {"title": "Old"},
    "new": {"title": "New"}
  },
  "created_at": "2025-12-24T16:00:00Z"
}
```

**Viewing Activities:**
- Activity tab in task modal
- Chronological order (newest first)
- Shows what changed and when
- User attribution (who made changes)

---

## 🎨 Multi-Board System

### Board Concept

Boards are independent workspaces that allow users to organize different projects, teams, or workflows separately.

### Board Properties

```
- id: Unique identifier
- title: Board name (required)
- theme_color: Hex color code (e.g., #FF5733)
- user_id: Owner reference
- wip_limits: JSON object with column limits
- created_at/updated_at: Timestamps
```

### Board Creation

**From Sidebar:**
1. Click "+ New Board" button
2. Inline input appears
3. Enter board name
4. Press Enter
5. Board created with auto-generated theme color

**API Endpoint:**
```http
POST /boards
Content-Type: application/json

{
  "title": "Marketing Campaign",
  "theme_color": "#FF5733"  // optional
}
```

### Theme Colors

**Purpose:** Each board has a unique color that:
- Identifies the board visually
- Colors the sidebar indicator
- Tints the board header
- Highlights active columns
- Creates visual hierarchy

**Auto-Generation:**
If no color provided, system generates random hex color:
```php
'#' . str_pad(dechex(rand(0, 16777215)), 6, '0', STR_PAD_LEFT)
```

**Popular Presets:**
- Software: `#3B82F6` (Blue)
- Marketing: `#EC4899` (Pink)
- Design: `#8B5CF6` (Purple)
- Operations: `#10B981` (Green)

### WIP Limits

**What are WIP Limits?**
Work-In-Progress limits prevent column overload by setting maximum task counts.

**Configuration:**
```json
{
  "todo": null,           // No limit
  "in-progress": 5,       // Max 5 tasks
  "in-review": 3,         // Max 3 tasks  
  "done": null            // No limit
}
```

**Visual Indicators:**
- Counter shows: "3/5" when limit set
- Red pulsing when limit exceeded
- Helps identify bottlenecks

### Board Switching

**How It Works:**
1. Click any board in sidebar
2. URL updates: `/?board_id=123`
3. Page reloads with new board data
4. Previous board state not preserved (by design)

**Performance:**
- Only active board data loaded
- Tags scoped to current board
- Analytics calculated per board
- No cross-board contamination

### Board Deletion

**Requirements:**
- Only board owner can delete
- Board must have no tasks (safety check)
- At least one board must remain

**Process:**
1. Click trash icon next to board
2. Inline confirmation appears
3. Confirm deletion
4. Board removed from database
5. User redirected to first remaining board

---

## 🏷️ Tags & Labels

### Tag System Overview

Tags provide flexible categorization within boards. They are:
- **Board-specific**: Tags don't leak across boards
- **Color-coded**: Each tag has a unique color
- **Multi-assignable**: Tasks can have multiple tags

### Tag Properties

```
- id: Unique identifier
- name: Tag label (e.g., "Frontend", "Bug", "v2.0")
- color: Hex color code (e.g., #3B82F6)
- board_id: Scoped to specific board
```

### Creating Tags

**From Task Modal:**
1. Open any task
2. Click "+ Add Tag" in Details tab
3. Enter tag name
4. Select color from preset or custom
5. Tag created and immediately applied

**API Endpoint:**
```http
POST /tags
Content-Type: application/json

{
  "name": "Frontend",
  "color": "#3B82F6",
  "board_id": 1
}
```

### Preset Colors

- Blue: `#3B82F6` (Technical work)
- Green: `#10B981` (Features/improvements)  
- Yellow: `#F59E0B` (Warnings/important)
- Red: `#EF4444` (Bugs/urgent)
- Purple: `#8B5CF6` (Design/UI)
- Pink: `#EC4899` (Marketing/content)

### Tag Usage

**Assigning Tags:**
- Select from dropdown in task modal
- Multiple selection supported
- Tags show immediately on card

**Visual Display:**
- Small colored pills below task title
- Shows first 3 tags on card
- "+N more" indicator if >3 tags

**Filtering (Future):**
- Click tag to filter board
- Multi-tag AND/OR filters
- Save filter presets

### Tag Management

**Editing Tags:**
- Currently: Delete and recreate
- Future: Edit name/color in place

**Deleting Tags:**
```http
DELETE /tags/{id}
```

- Removes tag from all associated tasks
- Confirmation not required (reversible by recreating)
- Bulk delete not yet supported

### Tag Best Practices

**Recommended Tag Strategies:**

1. **By Category:**
   - Frontend, Backend, Database, DevOps

2. **By Feature:**
   - User Auth, Dashboard, Reports, API

3. **By Type:**
   - Bug, Feature, Enhancement, Docs

4. **By Release:**
   - v1.0, v1.1, v2.0, Backlog

5. **By Priority (Alternative to built-in):**
   - P0-Critical, P1-High, P2-Medium, P3-Low

---

## 💬 Comments & Collaboration

### Comment System

Enables team discussion directly on tasks without external tools.

### Comment Properties

```
- id: Unique identifier
- task_id: Parent task reference
- user_id: Author reference
- content: Comment text (supports markdown in future)
- created_at: Timestamp
- updated_at: Last edit timestamp
```

### Creating Comments

**From Task Modal:**
1. Open task
2. Navigate to "Comments" tab
3. Type in text area
4. Click "Post Comment" or Ctrl+Enter

**API Endpoint:**
```http
POST /tasks/{taskId}/comments
Content-Type: application/json

{
  "content": "Looking good! Just minor CSS fixes needed."
}
```

**Features:**
- Real-time posting
- User attribution with avatar
- Relative timestamps ("2 hours ago")

### Viewing Comments

**Display:**
- Chronological order (newest first)
- User avatar (or initials if no avatar)
- Username and timestamp
- Comment content

**Thread Indicator:**
- Task card shows comment count
- 💬 icon with number (e.g., "💬 3")

### Deleting Comments

**Permissions:**
- Users can only delete their own comments
- 403 error if attempting to delete others'

**Process:**
1. Hover over own comment
2. Click trash icon
3. Immediate deletion (no confirmation)
4. Comment removed from database

### Comment Use Cases

**Common Patterns:**

1. **Code Review:**
   ```
   "@john Please review the authentication changes"
   "Looks good! Approved ✅"
   ```

2. **Status Updates:**
   ```
   "Blocked on API endpoint availability"
   "API is ready, continuing work"
   ```

3. **Questions:**
   ```
   "Should this support dark mode?"
   "Yes, use the theme tokens"
   ```

4. **Handoffs:**
   ```
   "Backend complete, ready for frontend"
   "@jane Task is ready for you"
   ```

### Future Enhancements

- [ ] Edit comments
- [ ] @mentions with notifications
- [ ] Markdown support (bold, italic, links, code)
- [ ] Emoji reactions (👍, ❤️, etc.)
- [ ] File attachments
- [ ] Comment threading (replies)

---

## 📊 Analytics & Metrics

### Analytics Dashboard

Access via button in board header showing key productivity metrics.

### Key Metrics

#### **1. Average Cycle Time**

**Definition:** Average time from task start to completion (in days)

**Calculation:**
```
Cycle Time = completed_at - started_at
Average = Sum of all cycle times / Count of completed tasks
```

**Only Includes:**
- Tasks with both `started_at` AND `completed_at` set
- Tasks in "Done" status
- Current board only

**Use Case:**
- Measure team velocity
- Identify process improvements
- Set realistic timelines

**Typical Values:**
- Fast: < 2 days
- Normal: 2-7 days
- Slow: > 7 days (indicates bottlenecks)

#### **2. Throughput**

**Definition:** Number of tasks completed in the last 7 days

**Calculation:**
```sql
SELECT COUNT(*) 
FROM tasks 
WHERE status = 'done' 
  AND completed_at >= NOW() - INTERVAL 7 DAY
  AND board_id = {current_board}
```

**Use Case:**
- Track team productivity over time
- Sprint planning (how much can we commit to?)
- Detect productivity drops

**Typical Values:**
- Solo: 5-15 tasks/week
- Small Team (2-3): 20-40 tasks/week
- Large Team (5+): 50+ tasks/week

#### **3. WIP Count**

**Definition:** Current number of tasks in progress or review

**Calculation:**
```sql
SELECT COUNT(*) 
FROM tasks 
WHERE status IN ('in-progress', 'in-review')
  AND board_id = {current_board}
```

**Importance:**
- High WIP = context switching, slower delivery
- Low WIP = focused work, faster completion

**Optimal Values:**
- Solo: 1-3 tasks
- Per person: 1-2 active tasks
- Team: 2-3 tasks per person

#### **4. Completed Count**

**Definition:** Total number of "Done" tasks (all time)

**Calculation:**
```sql
SELECT COUNT(*) 
FROM tasks 
WHERE status = 'done'
  AND board_id = {current_board}
```

**Use Case:**
- Celebrate achievements
- Track project progress
- Historical productivity baseline

### Analytics API

**Endpoint:**
```http
GET /analytics?board_id={id}

Response:
{
  "avgCycleTime": 4.2,      // days
  "throughput": 12,          // tasks (last 7 days)
  "wipCount": 5,             // current WIP
  "completedCount": 147      // all-time completions
}
```

### Analytics Panel UI

**Features:**
- Modal or slide-out panel
- Large metric cards with icons
- Trend indicators (future: ↑ ↓ →)
- Refresh button
- Board-specific data

**Visual Design:**
- Glassmorphism card style
- Color-coded metrics:
  - Cycle Time: Blue 📊
  - Throughput: Green 🚀
  - WIP: Amber ⚙️
  - Completed: Purple ✅

### Limitations & Future Enhancements

**Current Limitations:**
- No historical trend graphs
- No comparison between boards
- No team member breakdown
- Single time window (7 days)

**Planned Features:**
- [ ] Burndown charts
- [ ] Velocity graphs (weekly/monthly)
- [ ] Lead time vs cycle time
- [ ] Column bottleneck analysis
- [ ] Cumulative flow diagram
- [ ] Export analytics to PDF/CSV

---

## 👤 User Management

### Authentication System

Built on **Laravel Breeze** with React/Inertia.js stack.

### Registration

**Flow:**
1. Visit `/register`
2. Enter name, email, password, password confirmation
3. Submit form
4. Account created
5. Email verification sent
6. Auto-login and redirect to Kanban board

**Validation:**
- Email must be unique
- Password minimum 8 characters
- Password must match confirmation

### Login

**Flow:**
1. Visit `/login`
2. Enter email and password
3. Optional "Remember Me" checkbox
4. Submit form
5. Redirect to home page (Kanban board)

**Features:**
- Session-based authentication
- CSRF protection
- Rate limiting (60 attempts/minute)
- "Remember Me" for 2 weeks

### Email Verification

**Required for:**
- Accessing Kanban board (middleware: `verified`)

**Process:**
1. Check email for verification link
2. Click link
3. Account verified
4. Redirect to board with success message

**Re-send Email:**
- Button on `/verify-email` page
- Throttled to prevent abuse

### Password Reset

**Flow:**
1. Click "Forgot Password" on login
2. Enter email address
3. Receive reset link via email
4. Click link to `/reset-password/{token}`
5. Enter new password twice
6. Password updated
7. Auto-login and redirect

**Security:**
- Tokens expire after 60 minutes
- One-time use only
- Email must match token

### Profile Management

**Access:** Click user avatar → Profile

**Editable Fields:**
1. **Name:** Display name
2. **Email:** Account email (re-verification required if changed)
3. **Avatar:** Profile picture upload
4. **Password:** Change password (requires current password)

**Avatar Upload:**
- Accepts: JPG, PNG, GIF
- Max size: 2MB
- Stored in `storage/app/public/avatars`
- Auto-resized to 200x200px

### Account Deletion

**Process:**
1. Go to Profile → Delete Account section
2. Click "Delete Account" button
3. Enter password to confirm
4. Account and all data permanently deleted

**Cascade Deletes:**
- All boards owned by user
- All tasks in those boards
- All comments by user
- All activities
- Profile avatar file

**Warning:** This action is irreversible!

### Session Management

**Auto-Logout:**
- After 2 hours of inactivity
- When "Logout" clicked
- When password changed from another device

**Security Features:**
- HTTPS only in production
- HttpOnly cookies
- SameSite=Lax
- CSRF tokens on all forms

---

## 🎨 UI/UX Features

### Glassmorphism Design

**What is Glassmorphism?**
A design trend using frosted glass effects with backdrop blur.

**Implementation:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

**Applied To:**
- Task cards
- Modals
- Sidebar
- Headers
- Buttons

### Dark Mode

**Toggle:** Click moon/sun icon in header

**Themes:**

**Light Mode:**
- Background: Soft whites and grays
- Accent: Vibrant indigo-purple-pink gradient
- Text: Dark gray (#1F2937)
- Cards: White with subtle shadows

**Dark Mode:**
- Background: Rich navy (#0F172A)
- Accent: Softer pastels
- Text: Light gray (#F3F4F6)
- Cards: Dark blue with glow effects

**Persistence:**
- Saved to localStorage
- Syncs across tabs
- Persists after logout

### Animations

**Technology:** Framer Motion

**Page Transitions:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

**Staggered Column Entry:**
- Columns fade in left to right
- 100ms delay between each
- Smooth, professional feel

**Task Card Hover:**
```jsx
whileHover={{ y: -4, scale: 1.02 }}
transition={{ duration: 0.2 }}
```

**Confetti Celebration:**
- Triggers when task moved to "Done"
- Full-screen particle effect
- 2-second duration
- Uses react-confetti library

### Responsive Design

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

**Mobile Features:**
- Hamburger menu
- Collapsible sidebar
- Touch-optimized drag & drop
- Single-column scroll (future)

**Tablet Features:**
- Side drawer navigation
- 2-column Kanban layout
- Optimized touch targets

**Desktop Features:**
- Full 4-column board
- Persistent sidebar
- Keyboard shortcuts
- Mouse-optimized interactions

### Global Search

**Access:** Search bar in header

**Functionality:**
- Real-time filtering (client-side)
- Searches task titles and descriptions
- Highlights matching cards
- Dims non-matching cards

**Future (Server-side):**
- Full-text search with Meilisearch/Algolia
- Search history
- Advanced filters
- Keyboard shortcuts (Cmd+K)

### Progress Bar

**Location:** Board header

**Shows:** Percentage of tasks completed

**Calculation:**
```
Progress = (Done tasks / Total tasks) × 100
```

**Visual:**
- Animated bar fill
- Color changes:
  - Red: 0-30% complete
  - Yellow: 30-70% complete
  - Green: 70-100% complete

### Keyboard Shortcuts (Future)

Planned shortcuts:
- `N`: New task
- `K`: Quick search
- `Esc`: Close modal
- `?`: Show shortcuts help
- `1-4`: Switch to column 1-4

---

## ⚙️ Technical Features

### Technology Stack

**Backend:**
- Laravel 12 (PHP 8.3)
- SQLite/MySQL database
- Inertia.js middleware

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS 4
- Vite build tool

**Key Libraries:**
- @dnd-kit/core: Drag & drop
- Framer Motion: Animations
- Lucide React: Icons
- date-fns: Date formatting
- react-confetti: Celebrations

### Performance Optimizations

**Optimistic UI:**
- Updates UI immediately before server response
- Rollback on error
- Feels instant to users

**Lazy Loading:**
- Components split by route
- Images lazy loaded
- Analytics loaded on demand

**Caching:**
- SWR for data fetching (future)
- LocalStorage for preferences
- Browser cache for static assets

### Security Features

**Authentication:**
- Laravel Sanctum (session-based)
- CSRF protection on all mutations
- Password hashing (bcrypt)

**Authorization:**
- Board ownership checks
- Comment ownership verification
- Policy-based permissions

**Input Validation:**
- Server-side validation
- XSS prevention
- SQL injection protection (Eloquent ORM)

### Database Schema

**Key Tables:**
- `users`: User accounts
- `boards`: Kanban boards
- `tasks`: Individual tasks
- `tags`: Board-specific labels
- `comments`: Task discussions
- `activities`: Audit log
- `task_tag`: Many-to-many pivot

**Indexes:**
- board_id on tasks (query optimization)
- user_id on boards
- task_id on comments and activities

### API Endpoints

Full API documentation available in [API_REFERENCE.md](./API_REFERENCE.md)

**Summary:**
- 18 total endpoints
- RESTful design
- JSON responses
- Consistent error handling

### Testing Coverage

- 73 unit tests
- 215 assertions
- 100% passing
- Tests cover all major features

See [TESTING.md](./TESTING.md) for details.

---

## 🔮 Future Features

See [feature_analysis.md](../brain/feature_analysis.md) for complete roadmap.

**Coming Soon:**
- Dashboard/Overview page
- Calendar view
- Team collaboration
- Templates
- Advanced analytics
- Mobile PWA

---

*Last Updated: 2025-12-24*
*Version: 1.3.0-beta*
