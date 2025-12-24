# Product Requirements Document (PRD)

> **📝 Portfolio Note:** This PRD is a **retrospective simulation** created for portfolio demonstration purposes. As a solo developer building a personal project, this document was written *after* initial development to showcase Product Management skills. In a real organizational setting, the PRD would precede implementation. The content reflects genuine product decisions made during development, formatted in professional PM documentation style.

---

**Project Name:** Kanban Crayon Board  
**Version:** 1.0.0 (Beta)  
**Status:** Active Development  
**Product Owner:** Solo Developer (Personal Project)  
**Last Updated:** December 2025

---

## 1. Executive Summary

**Kanban Crayon Board** is a personal task management tool designed to bridge the gap between simple to-do lists and complex project management software. Born from a need for a "daily driver" productivity tool that feels playful yet robust, it serves a dual purpose:
1.  **A Daily Tool:** A reliable, distraction-free Kanban board for managing personal tasks and side projects.
2.  **A Portfolio Piece:** A living demonstration of full-stack engineering capabilities, showcasing modern web technologies (Laravel, Inertia.js, React, Tailwind CSS) and attention to UI/UX details.

The "Crayon" moniker reflects the design philosophy: creative, colorful, and accessible, stripping away enterprise bloat in favor of a clean, responsive, and tactile user experience.

---

## 2. Problem Statement

Existing Kanban tools (Trello, Jira, ClickUp) are often:
*   **Too Complex:** Overloaded with features geared towards large enterprise teams (sprints, intricate permissions, billing).
*   **Too Slow:** Heavy client-side bundles or slow API responses.
*   **Generic:** Lack of personal flair or customization suited for a solo developer or creative.

**Solution:** A lightweight, self-hosted Kanban board that focuses purely on the flow of individual work, built with a "native-feeling" drag-and-drop experience.

---

## 3. Goals & Objectives

### Product Goals
*   **Simplicity:** Zero learning curve. A user should be able to create and move a task within seconds of landing on the app.
*   **Visual Clarity:** Use color and layout (Grid/Crayon aesthetics) to instantly convey task status and priority.
*   **Performance:** Instantaneous interactions, optimistic UI updates, and fast page loads via server-side rendering (Inertia).

### Technical/Portfolio Goals
*   demonstrate proficiency in the **TALL/VILT stack** (Vue/React + Inertia + Laravel + Tailwind).
*   Showcase mastery of **complex frontend interactions** (Drag and Drop using `dnd-kit`).
*   Implement clean, **maintainable architecture** (Service layer, Typed props, Component modularity).
*   Document the **software development lifecycle (SDLC)** from concept to delivery.

---

## 4. User Persona

**"The Creative Developer" (Me)**
*   **Role:** Full Stack Developer / freelancer / hobbyist.
*   **Pain Points:** Gets overwhelmed by cluttered Jira tickets; needs a visual overview of "what's next" without configuring 50 dropdowns.
*   **Needs:**
    *   Fast entry of tasks.
    *   Satisfying drag-and-drop mechanics.
    *   Clear separation of "In Progress" vs "In Review" (self-review or waiting on others).
    *   Aesthetics that sparkle joy (not dull corporate grey).

---

## 5. Functional Requirements

### Core Features (Implemented ✅)

#### 5.1 Kanban Board System
*   **Four-Column Layout:** Standard Kanban workflow
    *   **To Do** (Gray theme): Tasks awaiting action
    *   **In Progress** (Blue theme): Active work
    *   **In Review** (Yellow theme): Awaiting review/approval
    *   **Done** (Green theme): Completed tasks
*   **Visual Status Indicators:**
    *   Colored backgrounds per column (pastel scheme)
    *   Task count badges
    *   Color-coded status dots

#### 5.2 Task Management (Full CRUD)
*   **Create Task:**
    *   Quick-add via "+" button in any column
    *   Global "New Task" button in header
    *   Modal form with validation
    *   Fields: Title (required), Description (optional), Priority, Status
*   **Edit Task:**
    *   Click any card to edit
    *   Pre-populated form
    *   Optimistic UI updates
*   **Delete Task:**
    *   Hover-revealed trash icon on cards
    *   Immediate removal with confirmation
*   **View Tasks:**
    *   Card-based design with hover effects
    *   Priority badges (Low/Medium/High with distinct colors)
    *   Creation date display
    *   Three-dot menu for actions

#### 5.3 Drag & Drop System
*   **Powered by @dnd-kit:**
    *   Smooth drag interactions with physics
    *   Visual feedback (card lift, rotation, opacity)
    *   Drop zone highlighting
*   **Cross-Column Movement:**
    *   Drag tasks between any columns
    *   Auto status update on drop
    *   Backend persistence via API
*   **Touch Support:**
    *   Works on tablets and touch devices
    *   Activation constraints to prevent accidental drags

#### 5.4 Sidebar Navigation
*   **Navigation Menu:**
    *   Active route highlighting
    *   Board, Settings links
    *   Compact icon-based design
*   **Recent Tasks Widget (NEW):**
    *   Displays 5 most recent tasks
    *   Sorted by creation date (newest first)
    *   Mini badges showing status and priority
    *   Truncated titles for space efficiency
    *   Hover effects for interaction feedback

#### 5.5 Responsive Design
*   **Desktop (≥768px):**
    *   Fixed sidebar (256px width)
    *   4-column grid layout
    *   Breadcrumb navigation
*   **Mobile (<768px):**
    *   Collapsible sidebar
    *   Horizontal scroll for columns
    *   Touch-optimized interactions
*   **Adaptive Typography:**
    *   Inter font family
    *   Responsive text sizes (text-xs to text-2xl)

#### 5.6 UI/UX Polish
*   **TaraKreasi Design System:**
    *   Soft pastel color palette
    *   Subtle shadows (shadow-sm, shadow-card)
    *   Rounded corners (rounded-xl, rounded-2xl)
    *   Material Symbols icons
*   **Micro-Interactions:**
    *   Hover state transitions
    *   Group-hover effects (action buttons appear on card hover)
    *   Smooth modal animations
    *   Backdrop blur effects
*   **Accessibility:**
    *   Semantic HTML5 elements
    *   Keyboard navigation support
    *   ARIA labels on interactive elements

### Roadmap (Future Iterations)
*   **Tags/Labels:** Custom grouping for "Work", "Personal", "Urgent".
*   **Dark Mode:** Full system-aware dark theme.
*   **Archive:** Move "Done" tasks to an archive to keep the board clean.
*   **Subtasks:** Checklist within a card.
*   **Analytics:** Simple velocity chart (Tasks completed per week).

---

## 6. Non-Functional Requirements

*   **Performance:** Time to Interactive (TTI) < 500ms.
*   **Reliability:** Database integrity (ACID compliance via SQL).
*   **Security:** standard Laravel protection (CSRF, XSS sanitization).
*   **Code Quality:** Strict TypeScript typing, PSR-12 PHP standards.

---

## 7. Success Metrics

*   **Personal Usage:** Used daily for managing this very backlog for at least 30 days.
*   **Code Stability:** Zero critical bugs in main flows (Create, Move, Delete).
*   **Load Time:** Page transitions under 100ms via Inertia.
