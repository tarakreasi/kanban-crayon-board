# System Features & Modules

> **Documentation Strategy:** This document outlines system capabilities using a **Root Cause Analysis (RCA)** framework. Each feature is presented not as a "marketing highlight" but as a technical solution to a specific workflow bottleneck.

---

## 1. Core Workflow Engine (Kanban Board)

**Module:** Board Logic
**Problem:** Invisibility of work states creates bottlenecks and context-switching fatigue.
**Solution:** A four-stage state machine with strict visual delineation.

### 1.1 State Management (Columns)
*   **To Do (Backlog):** Passive state. Tasks here are dormant.
*   **In Progress (Active):** High-priority state. The system tracks `started_at` timestamps upon entry to measure Cycle Time.
*   **In Review (Gatekeeping):** Quality control state. Prevents premature closure of tasks.
*   **Done (Archival):** Final state. Triggers `completed_at` timestamps for throughput calculation.

### 1.2 Interaction Model (Drag & Drop)
**Bottleneck:** High latency in web-based drag-and-drop systems causes user error (dropping in wrong column).
**Technical Solution:**
*   **Library:** `@dnd-kit` (React).
*   **Logic:** Optimistic UI updates. The interface reflects the new state *before* the API confirms, eliminating perceived latency (TTI < 50ms).
*   **Safety:** Automatic revert on API failure ensures data integrity remains the source of truth.

---

## 2. Task Management Module

**Module:** Task Entity
**Problem:** "Is it done yet?" ambiguity and lack of audit trails.
**Solution:** A self-contained entity that tracks its own history.

### 2.1 The Task Object
A strict data structure enforcing required fields to prevent "zombie tasks" (tasks with no title or status).
*   **Validation:** Title required. Status defaults to "To Do".
*   **Priority:** Indexed enum (High, Medium, Low) for sorting logic.

### 2.2 Audit Logging (Activity Stream)
**Requirement:** Non-repudiation and history tracking.
**Implementation:**
*   Every Create, Update, and Delete event is recorded in the `activities` table.
*   Logs include: `user_id`, `action_type`, `payload_snapshot`, and `timestamp`.
*   *Why?* To answer "Who moved this?" without requiring manual communication.

---

## 3. Workload Control (WIP Limits)

**Module:** Cognitive Load Management
**Problem:** Users tend to accept more work than capacity allows, stalling all projects (The Ringelmann Effect).
**Solution:** Visual constraints on column capacity.

### 3.1 Implementation
*   **Logic:** `In Progress` column monitors its child count.
*   **Trigger:** If `count > limit`:
    *   Visual Warning: Header turns Red.
    *   (Future) Hard Block: Prevent drop action.
*   **Effect:** Forces the user to finish existing tasks before starting new ones (Result: Reduced Cycle Time).

---

## 4. Multi-Tenant Architecture (Boards)

**Module:** Scoping
**Problem:** Mixing "Work" and "Personal" tasks creates noise and reduces focus.
**Solution:** Strict data isolation between Board entities.

### 4.1 Data Isolation
*   **Schema:** `tasks` table belongs_to `boards`.
*   **Security:** API endpoints require `board_id` context. A user cannot query tasks from Board B while on Board A.
*   **Context:** Each board maintains its own Tags and Analytics, preventing "tag pollution" across projects.

---

## 5. Analytics (Productivity Telemetry)

**Module:** Metric Aggregation
**Problem:** "Busyness" vs. "Crashes". Users feel busy but don't know if they are effective.
**Solution:** Raw data visualization.

### 5.1 Key Metrics
1.  **Cycle Time:** `completed_at - started_at`. (Efficiency).
2.  **Throughput:** tasks_completed / 7_days. (Velocity).
3.  **WIP Count:** current_active_tasks. (Saturation).

*Rationale:* These metrics are chosen because they are actionable. If Cycle Time increases, the bottleneck is in the process, not the person.
