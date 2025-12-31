# Product Requirements Document (PRD)

> **Portfolio Note:** This PRD is a **retrospective simulation** created for portfolio demonstration purposes. As a solo developer building a personal project, this document was written *after* initial development to showcase Product Management skills. In a real organizational setting, the PRD would precede implementation. The content reflects genuine product decisions made during development, formatted in professional PM documentation style.

---

**Project Name:** taraTask
**Version:** 1.0.0 (Beta)
**Status:** Active Development
**Product Owner:** Solo Developer (Personal Project)
**Last Updated:** December 2025

---

## 1. Executive Summary

**taraTask** is a personal task management system designed to eliminate the cognitive overhead found in enterprise tools. Born from the need for a "daily driver" productivity tool that balances simplicity with reliability, it serves as a bridge between the chaos of sticky notes and the complexity of Jira.

This project also serves as a living demonstration of full-stack engineering capabilities, showcasing the **TALL/VILT stack** (React + Inertia + Laravel + Tailwind) and a "Production First" mindset.

---

## 2. Problem Statement: Why Another Kanban?

Most existing Kanban tools suffer from two extremes:
1.  **Complexity Overload:** Enterprise tools (Jira, ClickUp) require complex configuration, slow loading times, and "feature bloat" that distracts from the actual work.
2.  **Lack of Stability:** Lightweight tools often lack the relational integrity and audit trails required for serious workflow management.

**Root Cause:** These tools prioritize "features" over "flow".
**Solution:** A focused, self-hosted system that treats task management as a critical infrastructure—reliant, fast, and distraction-free.

---

## 3. Goals & Objectives

### Product Goals
*   **Zero-Friction Entry:** Task creation must be instantaneous (< 2 seconds).
*   **Visual Logic:** Status must be identifiable by color and position alone, reducing reading time.
*   **System Stability:** Data integrity is paramount. No "lost" tasks or ambiguous states.

### Technical Goals
*   **Demonstrate Full-Stack Mastery:** Integration of Laravel (Backend logic) with React (Frontend interactivity).
*   **Complex Interactions:** Robust Drag-and-Drop implementation using `@dnd-kit`.
*   **Maintainable Architecture:** Adherence to strict typing, Service Layer patterns, and self-documenting code.

---

## 4. User Persona

**"The Creative Developer" (Me)**
*   **Role:** Full Stack Developer / System Integrator.
*   **Pain Point:** Cognitive load. Switching between "Coding" and "Managing" breaks flow.
*   **Requirement:** A tool that works as fast as I think. "If I have to click three times to move a task, the tool has failed."

---

## 5. Functional Requirements

### 5.1 Core Workflow (The Board)
*   **Four-Stage Pipeline:**
    *   **To Do:** Backlog (Gray).
    *   **In Progress:** Active context (Blue).
    *   **In Review:** Verification stage (Yellow).
    *   **Done:** Completion (Green).
*   **Strict State Management:** A task typically moves linearly, but the system must handle regressions (moving back to To Do) without data corruption.

### 5.2 Interaction Design
*   **Tactile Drag & Drop:**
    *   Requirement: Immediate "optimistic" UI update.
    *   Requirement: Server sync in background.
    *   Fail-safe: If server error occurs, card snaps back (Data Integrity).
*   **Modal Interactions:**
    *   Task details open in a modal to maintain context of the board.

### 5.3 Task Entity
*   **Must-Have Fields:** Title, Status, Priority (Low/Med/High).
*   **Optional Fields:** Description (Markdown), Due Date.
*   **Audit Trail:** Every change (move, edit) is logged in the `activities` table.

---

## 6. Non-Functional Requirements

*   **Performance:** Time to Interactive (TTI) < 200ms.
*   **Reliability:** ACID compliance for all database transactions.
*   **Security:** Standard Laravel protections (CSRF, XSS) enabled by default.
*   **Scalability:** Logic modularized (Service Classes) to allow API expansion.

---

## 7. Success Metrics

*   **Usage:** Primary tool for personal task management for 30 consecutive days.
*   **Stability:** Zero critical bugs in the Drag-and-Drop flow.
*   **Efficiency:** Task creation and categorization in under 5 seconds.
