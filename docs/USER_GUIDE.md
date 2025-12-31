# Logic-Based User Manual

> **Philosophy:** "A manual is only read when intuition fails."
> **Goal:** To get you back to work in under 30 seconds.

---

## 1. Quick Start (The "Happy Path")

**Login:**
*   **URL:** `http://localhost:8000` / `http://localhost:5173`
*   **Default Creds:** `ajarsinau@gmail.com` / `password`

**Core Actions:**
*   **Create Task:** Press `N` or click the `+` in any column header.
*   **Move Task:** Drag card. If it snaps back, check your network.
*   **Edit Task:** Double-click the title.

---

## 2. Troubleshooting (The "Unhappy Path")

### "I dragged a task, but it didn't move."
**Cause:** The server refused the update (Optimistic UI Rollback).
**Fix:**
1.  Refresh the page (`Ctrl+R`).
2.  Check if you are still logged in.
3.  Verify the task wasn't deleted by another user.

### "I can't delete a Board."
**Logic:** A board acts as a container. You cannot delete a container that still holds data (Tasks).
**Fix:**
1.  Open the Board.
2.  Delete or Archive all tasks.
3.  Delete the Board.
*Why? Data Safety. Accidental deletion of 100 tasks is a catastrophe.*

### "The screen is blank/white."
**Cause:** JavaScript crash (React Error Boundary).
**Fix:**
1.  Hard Refresh (`Ctrl+Shift+R`) to clear cache.
2.  Check if the API server (`php artisan serve`) is running.

---

## 3. Keyboard Shortcuts

Efficiency comes from keeping hands on the keyboard.

| Key | Action | Context |
|-----|--------|---------|
| `N` | New Task | Global |
| `Esc`| Close Modal | Modals |
| `Enter` | Save Change | Forms |
| `/` | Search | Global |
