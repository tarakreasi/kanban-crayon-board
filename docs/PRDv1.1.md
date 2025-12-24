# PRD v1.1: Kanban "Crayon Focus" 🖍️

**Status:** DELIVERED ✅  
**Last Updated:** December 21, 2025  
**Project Owner:** twantoro  
**Target Delivery:** ~~December 21, 2025~~ (Completed)

---

1. Executive Summary

Version 1.1.20 of Kanban Crayon Board focuses on refining the core single-user experience — enhancing usability, adding more intuitive interactions, and laying the foundation for scalable features in future releases.

This release remains deliberately non-collaborative and offline-first friendly, keeping the focus on personal productivity and smooth, responsive UI behavior.

The guiding vision:

“A Kanban that feels delightful, clear, and fast — your daily canvas for getting things done.”

2. Product Goals
2.1 Functional Goals

Streamline Task Management

Reduce friction in task creation and editing.

Enable inline editing for faster updates.

Enhance User Experience

Add visual and interactive polish (animations, shortcuts, transitions).

Provide optional dark mode for comfort.

Support Insightful Workflow

Introduce basic progress analytics and task history log.

Preserve Simplicity

Maintain zero-setup workflow (no sign-up required).

Ensure mobile responsiveness remains top-tier.

3. Scope Overview
Area	Focus	Description
🧩 Core Kanban	✅ Enhanced	4-column system with inline edit, drag & drop, and quick-add
📱 Responsive UI	✅ Improved	Better mobile UX, collapsible sidebar, swipe scroll
🎨 Theme System	🆕 Added	Light/Dark themes with smooth transitions
📊 Analytics	🆕 Added	Basic charts (tasks per column, done-per-week counter)
⚙️ Settings	🆕 Added	User preferences stored locally (theme, layout density)
🧭 Navigation	✅ Enhanced	Quick jump between columns via shortcuts
🔔 Feedback	🆕 Added	Toast notifications for create/update/delete
💾 Persistence	✅ Improved	Local caching of tasks for offline resilience
4. Functional Requirements
4.1 Task Management Enhancements

Inline Edit:

Double-click on a task title to rename directly.

Press Enter to save or Esc to cancel.

Quick Add:

Each column header now includes a small “+” for one-line task creation without opening a modal.

Task History Log:

Every CRUD action timestamped and stored (in SQLite).

Accessible via “Activity” tab in task modal.

Priority Colors Update:

Subtle saturation shift to improve legibility in both themes.

4.2 UI/UX & Visual Features

Dark Mode:

System-aware (prefers-color-scheme) or manual toggle in sidebar footer.

Smooth fade transition between modes.

Micro Animations:

Card move bounce, column highlight pulse, and modal fade transitions using Framer Motion.

Keyboard Shortcuts:

N → New Task

E → Edit selected

Del → Delete

← → → Move between columns

/ → Focus search (future placeholder)

Toast Feedback System:

Success and error notifications for create, edit, delete actions.

Loading States:

Skeleton cards for perceived performance during data fetch.

4.3 Board Insights

Column Summary Badges:

Real-time count and percentage of total tasks per column.

Simple Analytics Panel:

“Stats” view in sidebar showing:

Tasks completed this week

Total open tasks

Average completion rate

4.4 Settings Panel

Theme Toggle (Light/Dark/System)

Layout Density (Comfortable / Compact)

Reset Data (Clears all tasks with confirmation modal)

Settings persist via localStorage.

4.5 Technical Enhancements

Offline Mode (Phase 1):

Automatic local persistence of tasks using IndexedDB or browser cache.

Syncs on reconnect.

Performance Optimization:

Lazy loading of modals and charts.

Memoization for task components to prevent re-renders.

Accessibility (A11y):

Improved keyboard navigation and ARIA labels.

Higher contrast in Dark Mode verified to WCAG AA.

5. Non-Functional Requirements
Category	Target
Performance	Time to Interactive < 400ms
Accessibility	WCAG 2.1 AA
Offline Resilience	Local data retained after reload
Code Quality	TypeScript strict mode, ESLint + PSR-12 PHP
Maintainability	Component-based modularity preserved
Security	CSRF, input sanitization (Laravel defaults)
6. Out of Scope (Deferred Features)

🔒 Authentication & Multi-User Collaboration

🤖 AI Assistant / Smart Sorting

🏷️ Task Tags / Labels

📅 Calendar Sync

📁 Subtasks

📦 Archival System

🌐 API Integrations

These will be revisited in roadmap v1.2+.

7. Success Metrics
Metric	Target
User Flow Completion Rate	100% (Create → Move → Edit → Delete)
Average FPS on drag	≥ 60fps
Error Rate (client console)	< 1%
Dark Mode Adoption	≥ 40% users prefer dark
Task Creation Speed	< 3 seconds average from click to create
Lighthouse Score	90+ Performance, 95+ Accessibility
8. Release & Versioning
Phase	Description	ETA
Alpha 1.1.0	Inline edit, dark mode base, keyboard shortcuts	Jan 2026
Beta 1.1.10	Analytics & Settings panel	Feb 2026
Stable 1.1.20	Offline mode, toast system, full polish	Mar 2026
9. Future Direction (v1.2–v2.0 Preview)

Subtasks & Labels

Archival Board

Multi-board Support

PWA Installation

Collaborative Real-time Sync

update the tone color 
Primary Accent Blue (Darker, Vibrant Blue from Sidebar): #1E40FF (This is a deep, vibrant blue, very prominent in the sidebar).
Main Background: #F8F9FA (Very Pale Off-White)
Header/Top Bar Background: #FFFFFF (Pure White)
Call-to-Action Orange: #FFB347 (Pastel Orange)
Status Badge 'Published' (Light Green): #D4EDDA (for the badge background) and #28A745 (for the dot/text)
Status Badge 'Draft' (Light Yellow): #FFF3CD (for the badge background) and #FFC107 (for the dot/text)
Category Tags (Example Pastels):
Light Blue (e.g., "Design"): #ADD8E6
Light Purple (e.g., "Business"): #D8BFD8
Light Pink (e.g., "Community"): #FFC0CB
Text (Body/Subtle Gray): #6C757D (Medium-Soft Gray)
Text (Prominent Titles/Charcoal): #343A40 (Dark Charcoal)
Card Backgrounds: #FFFFFF (Pure White), with some subtle, very light pastel tints (like light green #F0FFF0, light orange #FFF5EE, light pink/beige #FDF5E6) under the main image area of some cards.

Summary:
Version 1.1.20 focuses on refinement and joy of use.
Every improvement aims to make the Kanban Crayon Board feel more personal, tactile, and seamless — a productivity space that delights without distraction.