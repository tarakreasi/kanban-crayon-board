# Product Requirement Document (v1.1)

**Release Focus:** "Crayon Focus" (Refinement & Stability)
**Status:** Delivered
**Owner:** twantoro

---

## 1. Executive Summary
Version 1.1 focuses on refining the core single-user experience. The objective is to enhance usability and interaction speed without compromising the offline-first architecture.

**Vision:** A tool that balances operational strictness with fluid user interaction.

---

## 2. Functional Requirements

### 2.1 Task Management
*   **Inline Editing:** Double-click interaction for rapid title updates.
*   **Quick Add:** One-click insertion point in column headers.
*   **Audit Trail:** SQLite logging of all CRUD operations (Created, Updated, Deleted).

### 2.2 User Interface
*   **System Theme:** Detection of `prefers-color-scheme` for automatic Dark Mode.
*   **Motion Design:** Implementation of subtle layout transitions (Framer Motion) to indicate state changes, not just for decoration.
*   **Feedback Loops:** Toast notifications for system state confirmation (Success/Error).

### 2.3 Analytics Engine
*   **Cycle Time:** Calculation of delta between `started_at` and `completed_at`.
*   **Throughput:** Rolling 7-day count of completed tasks.

---

## 3. Technical Constraints

*   **Offline Resilience:** Application must maintain state if connection drops (Optimistic UI).
*   **Performance:** Time to Interactive (TTI) must remain under 400ms.
*   **Accessibility:** WCAG 2.1 AA Compliance for contrast and keyboard navigation.

---

## 4. Design Guidelines (Reference)

**Primary Palette:**
*   **Accent:** #1E40FF (Deep Blue)
*   **Action:** #FFB347 (Pastel Orange)
*   **Background:** #F8F9FA (Off-White)

**Status Indicators:**
*   **Published:** #28A745 (Green)
*   **Draft:** #FFC107 (Yellow)

**Typography:**
*   **Body:** #6C757D (Soft Gray)
*   **Headings:** #343A40 (Charcoal)