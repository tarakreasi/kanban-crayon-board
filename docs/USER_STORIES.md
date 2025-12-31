# User Stories & Functional Requirements

> **Context:** This document serves as the "contract" between the Product Owner and the Engineering implementation. Requirements are written in standard "As a... I want to... So that..." format to ensure user-centricity.

---

## 1. Core Task Flow (Epic 1)

### US-001: Rapid Task Capture
**As a** User containing a thought,
**I want to** create a task immediately from the board view,
**So that** I do not lose the context of my current workflow.

**Acceptance Criteria:**
*   Inline "Quick Add" input available at the top of every column.
*   Validation: Title is required; defaults to "Medium" priority.
*   System Feedback: Task appears in the list instantly (Optimistic UI).

### US-002: Task Editing & Refinement
**As a** User,
**I want to** update task details (Description, Priority),
**So that** the task reflects the current state of reality.

**Acceptance Criteria:**
*   Double-click on card title triggers inline edit mode.
*   Clicking card body opens a detailed Modal view.
*   Changes are auto-saved on blur or explicit "Save" action.

### US-003: Task Deletion (Cleanup)
**As a** User,
**I want to** permanently remove irrelevant tasks,
**So that** my board remains actionable and clutter-free.

**Acceptance Criteria:**
*   Action requires explicit user confirmation (Prevent accidental data loss).
*   Deletion removes all associated child data (Comments, Activity Logs).

---

## 2. Productivity Enablers (Epic 2)

### US-007: Deadline Management
**As a** User managing a schedule,
**I want to** see visual indicators for upcoming deadlines,
**So that** I can prioritize work effectively.

**Acceptance Criteria:**
*   Dates < 3 days away show a yellow indicator.
*   Past due dates show a red indicator.

### US-008: Work-In-Progress (WIP) Limits
**As a** User prone to multitasking,
**I want to** be warned when a column exceeds its capacity,
**So that** I focus on finishing tasks before starting new ones.

**Acceptance Criteria:**
*   Column header displays "Count / Limit".
*   Visual alert (Red pulsing) triggers when Count > Limit.

---

## 3. Experience & Aesthetics (Epic 3)

### US-011: Contextual Dark Mode
**As a** User working night shifts,
**I want to** toggle a dark theme,
**So that** I reduce eye strain during extended usage.

**Acceptance Criteria:**
*   System respects OS-level preference by default.
*   Manual toggle persists across sessions (LocalStorage).

---

## 4. Multi-Tenancy (Epic 4)

### US-015: Project Isolation (Boards)
**As a** User with multiple life domains (Work, Personal),
**I want to** separate tasks into distinct Boards,
**So that** I do not see "Groceries" next to "Server Deployment".

**Acceptance Criteria:**
*   Sidebar list displays all available boards.
*   Creating a board generates a unique color identity.
*   Switching boards performs a full context switch (clean state).
