# Internal API Specification

> **Architecture:** Hybrid Monolith (Inertia.js + Laravel)
> **Protocol:** Inter-Process Communication (via HTTP/Session)
> **Authentication:** `web` guard (Cookie/Session)

---

## 1. Page Loads (Inertia Responses)
*These endpoints deliver the Application State (HTML + Props).*

### 1.1 Kanban Board (Main Interface)
**Endpoint:** `GET /kanban`
**Response:** Inertia Page Component (`Kanban`)
**Props:**
```json
{
  "tasks": ["Array of Task objects"],
  "boards": ["Array of Board objects"],
  "activeBoard": ["Current Board object"],
  "tags": ["Array of Tag objects"]
}
```

---

## 2. State Mutators (Action Endpoints)
*These endpoints modify system state. They typically redirect back with optimistic updates.*

### 2.1 Task Operations

#### Create Task
**Endpoint:** `POST /tasks`
**Payload:**
```json
{
  "title": "Fix Login Bug",         // Required | String
  "status": "todo",                 // Required | Enum: [todo, in-progress, in-review, done]
  "priority": "high",               // Required | Enum: [low, medium, high]
  "board_id": 5,                    // Optional | Integer (Defaults to first board)
  "description": "Details...",      // Optional | String
  "due_date": "2025-12-31"          // Optional | Date
}
```

#### Update Task (Move / Edit)
**Endpoint:** `PUT /tasks/{id}`
**Usage:** Drag-and-drop persistence or content editing.
**Payload:** (Partial updates accepted)
```json
{
  "status": "done",
  "priority": "low"
}
```
*Note:* Moving to `in-progress` sets `started_at`; moving to `done` sets `completed_at`.

#### Delete Task
**Endpoint:** `DELETE /tasks/{id}`
**Response:** Redirect (302) or 204 No Content (if JSON requested).

### 2.2 Board Operations

#### Create Board
**Endpoint:** `POST /boards`
**Payload:** `{"title": "New Board", "theme_color": "#FF0000"}`

#### Delete Board
**Endpoint:** `DELETE /boards/{id}`
**Constraint:** Cannot delete the last remaining board.

---

## 3. AJAX Data Endpoints
*Pure JSON endpoints for dynamic client-side fetching.*

### 3.1 Task Activities
**Endpoint:** `GET /tasks/{id}/activities`
**Response:** JSON Array of activity logs.

---

## 4. Error Handling

**Validation (422):** Returns Inertia error bag (shared props).
**Authorization (403):** Returns `abort(403)` if accessing unauthorized board/task.
**Authentication (401):** Redirects to `/login`.
