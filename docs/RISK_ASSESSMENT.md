# Operational Risk Assessment

> **Context:** This matrix reflects a "System Integrator" perspective. We assume hardware will fail, networks will drop, and users will make mistakes.

---

## 1. Critical System Risks (Severity: HIGH)

### R-001: Database Corruption
*   **Scenario:** Power loss during a write operation (SQLite journaling failure).
*   **Impact:** Irrecoverable data loss.
*   **Mitigation:**
    *   Enforce ACID transactions for all writes.
    *   **Backup Strategy:** Daily `cron` dump to external storage (S3/Local NAS).

### R-002: Service Downtime
*   **Scenario:** The PHP process crashes due to memory leaks.
*   **Impact:** User inability to work.
*   **Mitigation:**
    *   Manage via `systemd` (Auto-restart on failure).
    *   Monitoring via `Uptime Kuma` or similar health-check ping.

---

## 2. Security Risks (Severity: MEDIUM)

### R-003: Session Hijacking
*   **Scenario:** Attacker steals a valid session cookie.
*   **Mitigation:**
    *   Cookies set to `HttpOnly` and `Secure`.
    *   Session lifetime limited to 2 hours.

### R-004: Excessive WIP (Cognitive Risk)
*   **Scenario:** User creates 50 tasks in "In Progress", leading to paralysis.
*   **Mitigation:**
    *   **System Logic:** Hard limits on column counts (e.g., max 5 items).
    *   **Visual Feedback:** UI turns red when capacity is near.

---

## 3. Portfolio Risks

### R-005: "Tutorial Hell" Perception
*   **Risk:** The project looks like a generic Todo App tutorial.
*   **Mitigation:**
    *   Showcase **Engineering Depth**: Optimistic UI, Service Layer Architecture, and Strict Typing.
    *   Documentation (this file) proves "Product Thinking" over just "Coding".
