# Kanban Crayon Board - User Guide

> **Complete guide for end users to master the Kanban Crayon Board**

---

## 📚 Table of Contents

1. [Getting Started](#getting-started)
2. [Creating Your First Board](#creating-your-first-board)
3. [Managing Tasks](#managing-tasks)
4. [Organizing with Tags](#organizing-with-tags)
5. [Team Collaboration](#team-collaboration)
6. [Tracking Progress](#tracking-progress)
7. [Customizing Your Experience](#customizing-your-experience)
8. [Tips & Best Practices](#tips--best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Creating an Account

1. **Navigate to Registration:**
   - Visit the application URL
   - Click "Register" link

2. **Fill Out Registration Form:**
   ```
   Name: Your full name
   Email: your.email@example.com
   Password: Minimum 8 characters
   Confirm Password: Must match password
   ```

3. **Verify Your Email:**
   - Check your inbox for verification email
   - Click the verification link
   - You'll be redirected to your Kanban board

### First Login

1. **Access Login Page:**
   - Visit the application URL
   - Click "Login"

2. **Enter Credentials:**
   ```
   Email: your.email@example.com
   Password: ••••••••
   ☐ Remember Me (stay logged in for 2 weeks)
   ```

3. **You're In!**
   - After login, you'll see your personal Kanban board
   - A default "Personal" board is created automatically

### Understanding the Interface

**Main Components:**

```
┌─────────────────────────────────────────────────────┐
│ [🎨 Logo] [Board Title]        [Search] [🌙] [👤]  │ Header
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ SIDEBAR  │         KANBAN BOARD                     │
│          │                                          │
│ Boards:  │  [To Do] [In Progress] [Review] [Done]  │
│ • Work   │   ┌───┐    ┌───┐       ┌───┐    ┌───┐  │
│ • Home   │   │ T │    │ T │       │ T │    │ T │  │
│          │   │ A │    │ A │       │ A │    │ A │  │
│ + New    │   │ S │    │ S │       │ S │    │ S │  │
│          │   │ K │    │ K │       │ K │    │ K │  │
│ Profile  │   └───┘    └───┘       └───┘    └───┘  │
└──────────┴──────────────────────────────────────────┘
```

---

## 📋 Creating Your First Board

### Why Use Multiple Boards?

Think of boards as separate workspaces:
- **Work Board**: Professional projects and tasks
- **Personal Board**: Home to-dos, errands, goals
- **Side Project**: Your app idea or startup
- **Learning**: Courses, books, skill development

### Creating a New Board

**Method 1: From Sidebar**

1. Click "**+ New Board**" at bottom of sidebar
2. Type your board name (e.g., "Marketing Campaign")
3. Press **Enter**
4. Board created with random color

**Method 2: Quick Tips**

```
✅ Use descriptive names: "Q1 2025 Product Launch"
✅ Keep it short: Fits in sidebar nicely
❌ Avoid: "Board 1", "Test", "Untitled"
```

### Customizing Board Appearance

**Changing Theme Color:**

Currently, colors are auto-assigned. In the future UI:
1. Click board name
2. Select color from palette
3. Color applies to entire board interface

**Recommended Color Scheme:**
- 🔵 Blue: Development/Technical work
- 🟢 Green: Business/Growth
- 🟣 Purple: Creative/Design
- 🟡 Yellow: Urgent/Important
- 🔴 Red: Critical/Bugs

### Switching Between Boards

1. **Click any board name** in sidebar
2. Page reloads with selected board
3. All tasks, tags, and analytics are board-specific

**Pro Tip:** Use browser tabs to have multiple boards open!

---

## ✅ Managing Tasks

### Creating Tasks

#### Quick Add (Fastest Method)

1. Find the column where task should start (usually "To Do")
2. Click the "**+**" icon next to column name
3. Type task title
4. Press **Enter**

**Example:**
```
+ "Design homepage mockup"  ← Type this
✓ Task created instantly   ← Appears in column
```

#### Full Task Creation

1. Click "**New Task**" button in header
2. Fill out complete form:

```
Title: "Implement user authentication"
Description: "Add login, registration, and password 
             reset functionality using Laravel"
Priority: High
Due Date: December 31, 2025
Tags: Backend, Security
Status: To Do
```

3. Click "**Create Task**"

### Editing Tasks

#### Quick Title Edit (Double-Click)

1. **Double-click** task title on card
2. Edit inline
3. Press **Enter** to save or **Esc** to cancel

**Use Case:** Fix typos, clarify wording

#### Full Task Edit

1. **Click anywhere** on task card (except title)
2. Task modal opens with 3 tabs:

**📝 Details Tab:**
- Edit title, description, priority
- Change due date
- Add/remove tags

**💬 Comments Tab:**
- View discussion thread
- Add new comments
- Delete your comments

**📊 Activity Tab:**
- See complete change history
- Who changed what and when
- Audit trail for accountability

### Moving Tasks

#### Drag & Drop

1. **Click and hold** on task card
2. **Drag** to target column
3. **Release** to drop

**What Happens:**
```
To Do → In Progress:  started_at timestamp set
In Progress → In Review:  No special behavior
In Review → Done:  completed_at set + 🎉 confetti!
```

#### Moving Backwards

You can drag tasks back to previous columns:
- Done → In Review: Unsets completed_at
- In Progress → To Do: Unsets started_at

**Use Case:** Task needs rework or wasn't ready

### Task Priorities

**Visual Indicators:**

- **🔴 High**: Red badge, urgent items
- **🔵 Medium**: Blue badge, normal work (default)
- **⚪ Low**: Gray badge, when-you-can tasks

**How to Set:**
1. Open task modal
2. Click priority dropdown
3. Select level
4. Saves automatically

**Best Practice:** Reserve "High" for true urgencies

### Due Dates

**Setting a Due Date:**

1. Open task modal
2. Click calendar icon
3. Select date from picker
4. Due date appears on card

**Due Date Colors:**

```
🟢 Green Circle:  More than 3 days away
🟡 Yellow Circle: Due within 3 days (heads up!)
🔴 Red Circle:    Past due date (take action!)
```

**Clearing Due Date:**
- Click "Clear" in date picker
- Due date removed from task

### Deleting Tasks

**⚠️ Warning:** Deletion is permanent!

1. Open task modal
2. Click "**Delete Task**" button
3. Confirm in dialog
4. Task and all comments/activities deleted

**What Gets Deleted:**
- The task itself
- All comments on the task
- All activity history
- Tag associations

---

## 🏷️ Organizing with Tags

### What Are Tags?

Tags are labels you create to categorize tasks within a board.

**Examples:**

**By Department:**
- `Frontend` `Backend` `Design` `Marketing`

**By Type:**
- `Bug` `Feature` `Enhancement` `Refactor`

**By Customer:**
- `Client A` `Client B` `Internal`

**By Version:**
- `v1.0` `v1.1` `v2.0` `Backlog`

### Creating Tags

**From Task Modal:**

1. Open any task (new or existing)
2. Go to "Details" tab
3. Click "**+ Add Tag**"
4. Enter tag name (e.g., "Frontend")
5. Choose color from palette
6. Click "Create"

**Pro Tip:** Create all your tags on one task first, then they're available for all tasks!

### Assigning Tags

1. Open task modal
2. Click tag dropdown
3. Select tags (multiple allowed)
4. Tags appear immediately on card

**Visual Display:**
```
Task Card:
┌─────────────────────────┐
│ Design new landing page │
│ [Frontend] [Design]     │  ← Tags show here
│ Due: Dec 25             │
└─────────────────────────┘
```

### Tag Colors

**Recommended Color Usage:**

- 🔵 **Blue** (`#3B82F6`): Technical/Dev work
- 🟢 **Green** (`#10B981`): New features
- 🟡 **Yellow** (`#F59E0B`): Important/Warning
- 🔴 **Red** (`#EF4444`): Bugs/Critical
- 🟣 **Purple** (`#8B5CF6`): Design/UI
- 🌸 **Pink** (`#EC4899`): Marketing/Content

### Managing Tags

**Viewing All Tags:**
- Tags are listed in task modal dropdown
- Board-specific (don't cross boards)

**Deleting Tags:**
1. Currently: Must delete from all tasks individually
2. Future feature: Tag management page

**Renaming Tags:**
- Not yet supported
- Workaround: Create new tag, reassign tasks, delete old tag

---

## 👥 Team Collaboration

### Comments System

**Adding Comments:**

1. Open task modal
2. Click "**Comments**" tab
3. Type your comment
4. Click "**Post Comment**" or press **Ctrl+Enter**

**Comment Features:**
- Your name and avatar auto-added
- Timestamp shown ("2 hours ago")
- Comments remain even after task moves

**Example Use Cases:**

```
💬 Status Update:
"Completed the API integration, ready for frontend"

💬 Question:
"Should this support mobile or desktop first?"

💬 Block:
"Waiting on API keys from DevOps team"

💬 Handoff:
"@Sarah, backend is done, ready for your review"
```

**Note:** @mentions don't currently send notifications (coming soon!)

### Viewing Comments

**On Task Card:**
- Small 💬 icon shows comment count
- Example: "💬 5" means 5 comments

**In Modal:**
- Full thread view
- Newest comments at top
- Scroll for older comments

### Deleting Comments

**Rules:**
- You can only delete your own comments
- Other users' comments protected

**How To:**
1. Hover over your comment
2. Click trash icon
3. Immediate deletion (no undo)

**Use Case:** Typo corrections, outdated info

### Activity History

**Every task tracks:**
- Who created it
- Every edit (title, description, priority, due date)
- Column movements (todo → in progress)
- Tag additions/removals
- Comments added

**Viewing Activity:**
1. Open task modal
2. Click "**Activity**" tab
3. See chronological log

**Example Activity Log:**
```
🎯 You created this task - 2 days ago
📝 You updated description - 2 days ago
➡️  You moved from "To Do" to "In Progress" - 1 day ago
💬 You added a comment - 1 day ago
🏷️  Sarah added tag "Frontend" - 5 hours ago
➡️  John moved from "In Progress" to "Done" - 1 hour ago
```

---

## 📈 Tracking Progress

### Board Progress Bar

**Location:** Top of Kanban board

**Shows:** Visual bar indicating % completion

**Calculation:**
```
Progress = (Tasks in "Done" / Total tasks) × 100%
```

**Example:**
```
If you have:
- 3 tasks in To Do
- 2 tasks in In Progress  
- 1 task in In Review
- 4 tasks in Done
Total: 10 tasks, 4 done = 40% complete
```

### Analytics Dashboard

**Access:** Click "📊 Analytics" button in header

**Four Key Metrics:**

#### 1. Average Cycle Time

**What It Means:**
Average days from starting to completing a task

**Good Values:**
- **< 2 days**: Fast-moving team 🚀
- **2-5 days**: Healthy pace ✅
- **> 7 days**: Possible bottlenecks ⚠️

**Use It To:**
- Set realistic deadlines
- Identify slow processes
- Track team velocity

#### 2. Throughput

**What It Means:**
Tasks completed in last 7 days

**Good Values:**
- **Solo developer**: 5-15 tasks/week
- **Small team (2-3)**: 20-40 tasks/week
- **Large team**: 50+ tasks/week

**Use It To:**
- Sprint planning ("We can commit to 20 tasks")
- Measure productivity trends
- Celebrate achievements

#### 3. WIP Count

**What It Means:**
Tasks currently in "In Progress" or "In Review"

**Optimal Values:**
- **Per person**: 1-2 active tasks
- **Whole board**: 2-3 tasks per contributor

**Too High?**
- Context switching kills productivity
- Tasks take longer to complete
- Quality suffers

**Use It To:**
- Apply WIP limits
- Focus on finishing vs. starting
- Improve flow

#### 4. Completed Count

**What It Means:**
Total tasks marked "Done" (all time)

**Use It To:**
- Celebrate milestones (100 tasks! 🎉)
- Track long-term progress
- Motivation booster

### WIP Limits

**What Are They?**
Maximum number of tasks allowed in a column

**Why Use Them?**
- Prevent overload
- Maintain focus
- Identify bottlenecks

**Setting WIP Limits:**
Currently auto-configured:
```json
{
  "in-progress": 5,
  "in-review": 3
}
```

**Future:** Adjustable per board in settings

**Visual Indicator:**
```
In Progress (5/5) ← At limit
In Progress (6/5) ← Over limit (pulses red)
```

---

## ⚙️ Customizing Your Experience

### Dark Mode

**Enable Dark Mode:**
1. Click 🌙 moon icon in header
2. Interface switches to dark theme
3. Preference saved automatically

**Disable Dark Mode:**
1. Click ☀️ sun icon
2. Returns to light theme

**Automatic:**
- Preference syncs across browser tabs
- Persists after logout/login
- Saves in browser localStorage

### Profile Settings

**Access:** Click avatar in header → "Profile"

#### Update Name

1. Go to "Profile Information" section
2. Change "Name" field
3. Click "Save"

**Effect:** Shows in comments and activity logs

#### Change Email

1. Go to "Profile Information" section
2. Enter new email
3. Click "Save"
4. **Verify new email** (security check)

**Important:** Must verify before email fully changes

#### Upload Avatar

1. Go to "Profile Information" section
2. Click "Select A New Photo"
3. Choose image file (JPG, PNG, GIF)
4. Click "Save"

**Requirements:**
- Max 2MB file size
- Will be resized to 200x200px
- Shows throughout app

#### Change Password

1. Go to "Update Password" section
2. Enter current password
3. Enter new password
4. Confirm new password
5. Click "Save"

**Requirements:**
- Current password must be correct
- New password minimum 8 characters
- Logs out other devices for security

#### Delete Account

**⚠️ DANGER ZONE**

1. Go to "Delete Account" section
2. Read warning carefully
3. Click "Delete Account"
4. Enter password to confirm
5. Account permanently deleted

**What Gets Deleted:**
- Your account
- All your boards
- All tasks in those boards
- All comments and activities
- Profile avatar

**No Undo!**

### Board Customization

#### Renaming Boards

**Future Feature**
Currently: Create new board, migrate tasks, delete old

#### Theme Colors

**Auto-Assigned**
Each board gets unique random color

**Future:** Color picker in board settings

#### Organizing Boards

**Sidebar Order:**
- Chronological (newest first)
- Drag to reorder (coming soon)

---

## 💡 Tips & Best Practices

###  Writing Good Task Titles

**✅ Good Examples:**
```
"Implement user login with OAuth"
"Fix: Dashboard loading spinner stuck"
"Design mobile navigation menu"
"Deploy v1.2 to production"
```

**❌ Bad Examples:**
```
"Fix bug" ← Too vague
"Update stuff" ← What stuff?
"TODO" ← Not descriptive
"!!!" ← Not helpful
```

**Best Practices:**
- Start with action verb (Implement, Fix, Design, Deploy)
- Be specific but concise
- Include context if needed
- Under 60 characters ideal

### Using Descriptions Effectively

**What to Include:**
```
Problem/Goal:
What are we solving or building?

Acceptance Criteria:
How do we know it's done?

Technical Notes:
Libraries, APIs, dependencies

Links:
Figma designs, docs, related tickets
```

**Example:**
```
Title: "Implement password reset flow"

Description:
Problem: Users have no way to recover account if 
they forget password.

Acceptance Criteria:
- User clicks "Forgot Password" on login
- Enters email, receives reset link
- Link expires after 1 hour
- Password updated successfully

Technical:
- Use Laravel's built-in password reset
- Email via SendGrid
- Update PasswordResetController

Links:
- Design: [figma.com/reset-flow]
```

### Managing Workload

**The Two-Task Rule:**
Never have more than 2 tasks "In Progress" per person

**Why?**
- Context switching is expensive
- Finish tasks faster
- Better quality work

**How to Apply:**
1. Move task to "In Progress"
2. Work until done or blocked
3. Only then start next task

**If Blocked:**
- Add comment explaining block
- Move back to "To Do"
- Don't let it occupy WIP

### Effective Tagging

**Create Tag Scheme First:**

Before adding tasks, create your tag system:

```
Category Tags:
- Frontend, Backend, Database, DevOps

Type Tags:
- Feature, Bug, Enhancement, Documentation

Priority Tags (if not using built-in):
- Critical, High, Medium, Low
```

**Consistent Usage:**
- Use same tags across similar tasks
- Don't create synonyms (Frontend vs FE)
- Review and merge redundant tags monthly

### Sprint Planning

**Using the Board for Sprints:**

1. **Create sprint board**: "Sprint 23 - Jan 2025"
2. **Fill "To Do"** with sprint commitments
3. **Use WIP limits** to prevent overcommit
4. **Track throughput** from previous sprints
5. **Review analytics** to adjust estimates

**Example 2-Week Sprint:**
```
Team Throughput: 30 tasks in previous sprint
Plan This Sprint: 25-35 tasks (buffer for unknowns)
WIP Limit: 6 tasks (3 people × 2 tasks each)
```

### Collaboration Etiquette

**Comment Guidelines:**

✅ **Be Specific:**
```
"The login button should be blue (#3B82F6) not green"
```

❌ **Not Vague:**
```
"Change the button color"
```

✅ **Be Constructive:**
```
"Great progress! Minor suggestion: reduce spacing by 8px"
```

❌ **Not Negative:**
```
"This looks terrible"
```

✅ **Ask Questions:**
```
"Should this API support pagination?"
```

**Activity Best Practices:**
- Check activity log before asking questions
- Update tasks after discussions
- Use comments for decisions (creates paper trail)

---

## 🔧 Troubleshooting

### Common Issues

#### "Route [dashboard] not defined"

**Cause:** Outdated bookmark or link

**Fix:**
- Visit root URL: `https://yourapp.com/`
- Update bookmarks to use `/` not `/dashboard`

#### Can't See My Boards

**Possible Causes:**

1. **Not Logged In**
   - Check for avatar in header
   - If not visible, log in

2. **Email Not Verified**
   - Check email for verification link
   - Click link to verify

3. **Wrong Account**
   - Logged into different email address
   - Log out and log in with correct account

#### Tasks Not Saving

**Possible Causes:**

1. **Network Issue**
   - Check internet connection
   - Refresh page

2. **Session Expired**
   - Log out and log back in
   - Check "Remember Me" box

3. **Validation Error**
   - Task title required
   - Check for error messages

#### Drag & Drop Not Working

**Possible Causes:**

1. **Browser Compatibility**
   - Use latest Chrome, Firefox, Safari, or Edge
   - Clear browser cache

2. **JavaScript Disabled**
   - Enable JavaScript in browser settings

3. **Touch Device**
   - Make sure to hold and drag
   - Some devices need longer press

#### Analytics Showing Zero

**Possible Causes:**

1. **No Completed Tasks**
   - Metrics only calculate from "Done" tasks
   - Move some tasks to "Done" column

2. **Wrong Board Selected**
   - Analytics are board-specific
   - Switch to board with completed tasks

3. **Tasks Never Started**
   - Cycle time needs started_at timestamp
   - Move tasks through columns properly

### Getting Help

**Before Asking:**
1. Check this User Guide
2. Read [FEATURES.md](./FEATURES.md) documentation
3. Try refreshing the page
4. Check browser console for errors (F12)

**How to Report Bugs:**

Include these details:
```
Browser: Chrome 120
OS: Windows 11
Account: john@example.com
Steps to Reproduce:
1. Click "New Task"
2. Enter title with emoji 🚀
3. Click "Create"
Expected: Task created
Actual: Error message appears
Screenshot: [attach image]
```

**Feature Requests:**

Use this format:
```
Feature: Bulk task deletion
Use Case: Need to clean up 50+ old tasks quickly
Proposed Solution: Select multiple tasks with checkboxes,
                  click "Delete Selected"
Alternative: Archive feature instead of delete
```

---

## 🎓 Advanced Tips

### Keyboard Shortcuts (Coming Soon)

Planned shortcuts:
- `N`: New task
- `Cmd/Ctrl + K`: Quick search
- `Esc`: Close modals
- `?`: Show shortcuts help
- `1`, `2`, `3`, `4`: Jump to columns

### URL Parameters

**Switch Boards via URL:**
```
https://yourapp.com/?board_id=5
```

**Bookmark Different Boards:**
- Save URLs with board_id parameter
- Quick access to frequently used boards

### Browser Extensions (Future)

Planned integrations:
- Chrome extension: Create tasks from any webpage
- Slack integration: Create tasks from Slack messages
- Email integration: Forward email to create task

### Workflow Automation (Future)

Ideas for auto-rules:
```
When task created in "To Do"
  And title contains "[Bug]"
  Then set priority to "High"
  And add tag "Bug"
  
When task moved to "Done"
  And age > 30 days
  Then archive task
```

---

## 📚 Additional Resources

**Documentation:**
- [Features Guide](./FEATURES.md) - Technical feature details
- [Developer Guide](./DEVELOPER_GUIDE.md) - For developers
- [API Reference](./API_REFERENCE.md) - API documentation
- [Changelog](./CHANGELOG.md) - Version history

**External Resources:**
- [What is Kanban?](https://wikipedia.org/wiki/Kanban)
- [Kanban Principles](https://kanbanize.com/kanban-resources/getting-started/what-is-kanban)
- [WIP Limits Explained](https://www.digite.com/blog/kanban-wip-limits/)

---

## 🎉 You're Ready!

You now know everything needed to master Kanban Crayon Board!

**Quick Start Checklist:**
- [ ] Create your first board
- [ ] Add 3-5 tasks
- [ ] Try drag & drop
- [ ] Set a due date
- [ ] Create some tags
- [ ] Add a comment
- [ ] Check analytics
- [ ] Upload profile avatar
- [ ] Enable dark mode

**Happy Tasking! 🚀**

---

*Last Updated: 2025-12-24*
*Need help? Check the troubleshooting section or contact support.*
