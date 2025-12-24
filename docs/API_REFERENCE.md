# API Reference

This document provides a technical overview of the API endpoints used by the **Kanban Crayon Board** frontend. All endpoints require authentication via session cookies (Laravel Breeze).

## Base Configuration
- **Host**: Localhost (Development) / Production URL
- **Format**: All requests should include `Accept: application/json` headers.
- **Authentication**: Stateful session (Web)

---

## 📋 Tasks

### `GET /kanban`
Fetches all tasks, boards, and tags for the active user.
- **Response**: Inertia Page Object containing `tasks`, `boards`, `activeBoard`, and `tags`.

### `POST /tasks`
Create a new task.
- **Payload**:
  - `title`: string (required)
  - `description`: string (optional)
  - `priority`: enum (`low`, `medium`, `high`)
  - `status`: enum (`todo`, `in-progress`, `in-review`, `done`)
  - `board_id`: integer (required)
  - `due_date`: string (ISO date, optional)

### `PUT /tasks/{task}`
Update an existing task or move its status.
- **Payload**: Fields same as `POST /tasks`. Use for partial updates (e.g., status change).

### `DELETE /tasks/{task}`
Permanently delete a task.

### `GET /tasks/{task}/activities`
Fetch the activity history for a specific task.

---

## 🎨 Boards

### `POST /boards`
Create a new board.
- **Payload**:
  - `title`: string (required)
  - `theme_color`: string (Hex color, e.g., `#4A90E2`)

### `PUT /boards/{board}`
Update board details (e.g., theme color or WIP limits).
- **Payload**:
  - `title`: string
  - `theme_color`: string
  - `wip_limits`: JSON object (optional)

### `DELETE /boards/{board}`
Delete a board. **Note**: Board must be empty of tasks.

---

## 🏷️ Tags

### `POST /tags`
Create a new board-specific tag.
- **Payload**:
  - `board_id`: integer (required)
  - `name`: string (required)
  - `color`: string (Hex color)

### `DELETE /tags/{tag}`
Delete a tag.

---

## 💬 Comments

### `GET /tasks/{task}/comments`
Fetch all comments for a specific task.

### `POST /tasks/{task}/comments`
Post a new comment.
- **Payload**:
  - `body`: string (required)

### `DELETE /comments/{comment}`
Delete a comment.

---

## 📊 Analytics

### `GET /analytics`
Fetch board-specific metrics.
- **Parameters**: `board_id` (Query param)
- **Response**:
  - `avg_cycle_time`: float (days)
  - `throughput`: integer (tasks completed in last 7 days)
  - `wip_count`: integer (current tasks in progress)
  - `total_completed`: integer

---

## 👤 Profile

### `PATCH /profile`
Update user profile or upload avatar.
- **Payload**:
  - `name`: string
  - `email`: string
  - `avatar`: file (optional, multipart/form-data)
