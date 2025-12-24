# UI/UX Research & Concept

**Project:** Kanban Crayon Board  
**Theme:** "Digital Clarity" (TaraKreasi Design)  
**Design System:** Tailwind CSS + Material Symbols
**Last Updated:** December 21, 2025

---

## 1. Design Philosophy

The core concept behind the "Crayon Board" is **Approachable Productivity**. 

Traditional project management tools often feel sterile and intimidating. Inspired by the **TaraKreasi design language**, "Crayon" aims to feel:
*   **Tactile:** Elements should feel like physical cards on a board.
*   **Vibrant:** Use colors not just for decoration, but for semantic meaning.
*   **Focus-Driven:** The UI fades into the background, highlighting the *work* rather than the tool.
*   **Soft & Modern:** Pastel colors, subtle shadows, generous whitespace.

### Visual Inspiration
*   **Physical Kanbans:** Sticky notes on a whiteboard.
*   **Modern SaaS:** Linear, Notion, Height (clean typography, generous whitespace).
*   **Glassmorphism:** Subtle gradients and blurs to give depth to headers and cards.
*   **TaraKreasi Aesthetic:** Soft color palettes, rounded corners,subtle shadows.

---

## 2. Color System (Implemented)

We utilize a **pastel-first** palette to differentiate states and priorities, ensuring accessibility by combining color with text/icons.

### Primary States (Columns)
*   **To Do:** `#94a3b8` (Slate Gray) - Calm, neutral, represents backlog
    *   Background: `bg-gray-50` (#f9fafb)
    *   Badge: `bg-slate-200/50 text-slate-600`
*   **In Progress:** `#60a5fa` (Sky Blue) - Represents flow, activity, focus
    *   Background: `bg-blue-50/50` (#eff6ff with 50% opacity)
    *   Badge: `bg-blue-200/50 text-blue-600`
*   **In Review:** `#fbbf24` (Amber Yellow) - Represents a "pause" or check-point
    *   Background: `bg-yellow-50/50` (#fefce8 with 50% opacity)
    *   Badge: `bg-yellow-100 text-yellow-600`
*   **Done:** `#4ade80` (Green) - Represents completion, success
    *   Background: `bg-green-50/50` (#f0fdf4 with 50% opacity)
    *   Badge: `bg-green-100 text-green-600`

### Priority Levels (Task Badges)
*   **Low:** `bg-purple-50 text-purple-600` - Soft purple, not urgent
*   **Medium:** `bg-blue-50 text-blue-600` - Standard blue, moderate importance
*   **High:** `bg-rose-50 text-rose-600` - Alert rose/pink, draws attention

### UI Elements
*   **App Background:** `bg-gray-50` (#f9fafb) - Paper white, reduces eye strain
*   **Sidebar Background:** `bg-white` with `border-r border-gray-200`
*   **Main Content Background:** `bg-white/40` - Translucent white overlay
*   **Cards:** `bg-white` + `shadow-card` + `border border-gray-100`
*   **Header:** `bg-white/50 backdrop-blur-sm` - Frosted glass effect

### Interactive States
*   **Hover:** Increased opacity, subtle background color shift
*   **Focus:** Blue border (`border-blue-400`)
*   **Active (Dragging):** Opacity 0.5, rotate 3deg, scale 1.05
*   **Group Hover:** Action buttons fade in from `opacity-0` to `opacity-100`

---

## 3. Typography (Inter Font System)

**Font Family:** Inter (Google Fonts)  
*   Clean, legible, and optimized for screen reading.
*   **Headers:** Bold / Semibold (600-700) for visual hierarchy.
*   **Body:** Regular weight (400) for task descriptions.
*   **Meta:** Small (text-xs), lighter gray for timestamps and IDs.
*   **Badges:** Uppercase (uppercase), tight tracking (tracking-wider), font-bold

**Size Scale:**
*   `text-[9px]` - Micro badges (priority, status in sidebar)
*   `text-xs` (12px) - Card metadata, sidebar labels
*   `text-sm` (14px) - Task titles, navigation links, column headers
*   `text-base` (16px) - Modal inputs
*   `text-lg` (18px) - Section headers
*   `text-xl` (20px) - Sidebar branding
*   `text-2xl` (24px) - Page titles

---

## 4. Iconography (Material Symbols)

**System:** Google Material Symbols Outlined  
*   Variable font with weight customization
*   Settings: `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`

**Usage:**
*   `view_kanban` - Board/Kanban icon
*   `add` / `plus` - Create new task
*   `edit` - Edit action (Lucide alternative)
*   `delete` / `trash` - Delete action (Lucide alternative)
*   `more_horiz` - Three-dot menu
*   `calendar_today` - Date display
*   `priority_high` - Priority indicator
*   `check_circle` - Completion marker

**Lucide Icons** (React-friendly):
*   `LayoutGrid`, `Plus`, `Edit2`, `Trash2`, `MoreHorizontal`, `Clock`

---

## 5. Interaction Design (IxD)

### Drag and Drop (The "Crown Jewel")
The interaction model is critical. We use `@dnd-kit` to ensure:
*   **Physics:** Movements follow the cursor 1:1.
*   **Feedback:**
    *   *On Drag:* The card active state lifts (scale 1.05), rotates slightly (3deg), and lowers opacity (0.5 for the placeholder).
    *   *On Hover (Droppable Zone):* Column background subtly highlights.
    *   *On Drop:* Smooth transition animation to the new position, optimistic UI update.
*   **Touch Support:** Activation constraints (`distance: 8px`) to differentiate tap from drag.

### Modal vs. Inline
*   **Creation/Edit:** A modal (`DialogContent`) ensures full focus, preventing clutter.
*   **Quick Actions:** Hover-revealed icons (Edit, Delete) for speed.
*   **Breadcrumbs:** Contextual navigation in header.

### Layout Evolution
*   **Iteration 1 (Initial):** Simple centered board, gradient colors.
*   **Iteration 2 (Sidebar):** Added left sidebar for navigation and recent tasks.
*   **Iteration 3 (TaraKreasi Redesign):** Pastel colors, softer shadows, Material Symbols, recent task widget.
*   **Mobile Experience:** On mobile, sidebar collapses, columns scroll horizontally.

---

## 6. Component Patterns

### Task Cards
*   **Structure:**
    *   Priority badge (top-left, uppercase, small)
    *   Three-dot menu (top-right, visible on hover)
    *   Title (medium weight, 14px)
    *   Description (12px, line-clamp-2)
    *   Footer with date and action buttons (divider line)
*   **States:**
    *   Default: `bg-white border border-gray-100`
    *   Hover: `shadow-md` transition
    *   Dragging: `rotate-3 scale-105 opacity-50`

### Columns
*   **Header:**
    *   Status dot (2.5px circle, column color)
    *   Title (14px, semibold, column color)
    *   Task count badge (pill shape)

---

## 5. User Journey Map

1.  **Dashboard Load:** User sees the "Big Picture". Sidebar provides context ("Project Board").
2.  **Scan:** Eye travels Left -> Right (ToDo -> Done). Color coding helps identify bottlenecks.
3.  **Action (Move):** User grabs an "In Progress" task. Dragging gives visual feedback.
4.  **Reaction:** Dropping into "In Review" triggers an optimistic UI update (immediate visual change) followed by a background API sync.
5.  **Completion:** Moving to "Done" provides a sense of accomplishment via the warm orange color cue.

---

## 6. Accessibility (A11y)

*   **Keyboard Navigation:** All interactive elements (buttons, inputs) are focusable.
*   **Contrast:** Text colors are checked against background colors for WCAG AA compliance.
*   **Semantics:** Proper use of `<header>`, `<main>`, `<aside>`, and `<nav>` tags for screen readers.
