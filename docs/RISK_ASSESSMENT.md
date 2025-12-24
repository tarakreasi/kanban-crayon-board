# Risk Assessment & Mitigation

> **📝 Portfolio Note:** This risk assessment is a **retrospective simulation** created for portfolio purposes. It documents real risks encountered and mitigation strategies applied during personal project development, formatted as a professional PM risk matrix. This demonstrates understanding of risk management frameworks applicable to both personal projects and organizational settings.

---

**Project:** Kanban Crayon Board  
**Risk Owner:** Solo Developer (Personal Project)  
**Last Updated:** December 2025

---

## Risk Matrix

| Risk ID | Risk Description | Probability | Impact | Severity | Mitigation Strategy | Status |
|---------|-----------------|-------------|--------|----------|---------------------|--------|
| R-001 | Scope Creep | High | Medium | 🟡 Medium | Strict feature freeze before v1.0 | Active |
| R-002 | Browser Compatibility | Medium | High | 🟡 Medium | Cross-browser testing in CI | Monitoring |
| R-003 | Performance Degradation | Low | High | 🟢 Low | Performance budgets + monitoring | Mitigated |
| R-004 | Data Loss | Low | Critical | 🟡 Medium | Automated backups + migration tests | Mitigated |
| R-005 | Security Vulnerabilities | Medium | High | 🟡 Medium | Dependency audits + Laravel security | Active |
| R-006 | Learning Curve Overhead | Medium | Medium | 🟢 Low | Focus on one tech at a time | Accepted |
| R-007 | Abandonment | Medium | Medium | 🟡 Medium | Use daily for dogfooding | Active |

**Legend:**  
🔴 High | 🟡 Medium | 🟢 Low

---

## Detailed Risk Analysis

### R-001: Scope Creep
**Description:** Continuous addition of features delays the v1.0 release indefinitely.

**Probability:** High (Personal projects often suffer from "just one more feature" syndrome)  
**Impact:** Medium (Delays portfolio showcase, reduces motivation)  
**Severity:** 🟡 Medium

**Mitigation:**
1. **Feature Freeze:** Lock core features for v1.0 as defined in PRD.
2. **Backlog Discipline:** New ideas go into v1.1+ backlog, not current sprint.
3. **MVP Mindset:** Ask "Does this prevent basic usage?" If no, defer.
4. **Time Boxing:** Allocate max 2 weeks per feature iteration.

**Owners:** Product Owner (self-accountability)  
**Status:** Active - Requires ongoing discipline

---

### R-002: Browser Compatibility Issues
**Description:** Drag-and-drop or CSS Grid features break in Safari, older browsers, or mobile.

**Probability:** Medium (Modern APIs like `@dnd-kit` are well-supported, but edge cases exist)  
**Impact:** High (Poor UX for subset of users, damages portfolio credibility)  
**Severity:** 🟡 Medium

**Mitigation:**
1. **Testing Matrix:** Manual testing on Chrome, Firefox, Safari, Edge.
2. **Mobile Testing:** Test on iOS Safari and Android Chrome.
3. **Graceful Degradation:** Provide fallback UI if drag-and-drop fails.
4. **BrowserStack:** Use free tier for automated cross-browser testing.
5. **Can I Use:** Verify feature support before implementation.

**Owners:** Developer (self)  
**Status:** Monitoring - Test before each release

---

### R-003: Performance Degradation with Large Task Lists
**Description:** App becomes slow when user has 500+ tasks due to inefficient re-renders.

**Probability:** Low (Current architecture uses optimistic updates and Inertia SSR)  
**Impact:** High (Unusable app = abandoned tool)  
**Severity:** 🟢 Low (but would become 🔴 if triggered)

**Mitigation:**
1. **Performance Budget:** Page load < 500ms, interaction < 100ms.
2. **Virtualization:** Implement if tasks exceed 100 per column (use react-window).
3. **Pagination/Lazy Loading:** Load tasks incrementally.
4. **Profiling:** Regular Chrome DevTools profiling during development.
5. **Archive Feature:** Encourage moving old tasks to archive (US-011).

**Owners:** Developer  
**Status:** Mitigated - Proactive architecture choices

---

### R-004: Data Loss During Migration or Crashes
**Description:** Database corruption or failed migration causes user to lose all tasks.

**Probability:** Low (SQLite is stable, Laravel migrations are battle-tested)  
**Impact:** Critical (Complete loss of trust, unusable for daily tasks)  
**Severity:** 🟡 Medium

**Mitigation:**
1. **Backup Strategy:**
   - Daily automated SQLite backups (cron job or Laravel scheduler)
   - Export feature (JSON download) for manual backups
2. **Migration Testing:**
   - Test migrations on copy of production DB before applying
   - Rollback strategy for failed migrations
3. **Version Control:**
   - Keep migration files in Git
   - Document breaking changes in CHANGELOG
4. **Data Validation:**
   - Foreign key constraints to prevent orphaned records
   - Validation in Form Requests

**Owners:** Developer  
**Status:** Mitigated - Safety nets in place

---

### R-005: Security Vulnerabilities (XSS, CSRF, SQL Injection)
**Description:** Exploitable security holes allow attackers to steal data or modify tasks.

**Probability:** Medium (Laravel has defenses, but custom code may introduce gaps)  
**Impact:** High (Data breach, reputational damage for portfolio)  
**Severity:** 🟡 Medium

**Mitigation:**
1. **Laravel Security Features:**
   - CSRF protection enabled (automatic with Inertia)
   - Eloquent ORM (prevents SQL injection)
   - XSS protection via Blade escaping and React's JSX escaping
2. **Dependency Audits:**
   - Run `npm audit` and `composer audit` regularly
   - Update dependencies monthly
3. **Input Validation:**
   - Validate all inputs in Form Requests
   - Sanitize user-generated content (descriptions)
4. **Authentication:**
   - Use Laravel Breeze/Sanctum for secure auth
   - No custom auth logic
5. **Code Review:**
   - Self-review all commits before merging
   - Follow OWASP Top 10 checklist

**Owners:** Developer  
**Status:** Active - Ongoing vigilance required

---

### R-006: Learning Curve Overhead Slows Development
**Description:** Unfamiliarity with React 19, Inertia, or TypeScript causes delays.

**Probability:** Medium (New stack for personal learning)  
**Impact:** Medium (Timeline delays, but not critical for portfolio)  
**Severity:** 🟢 Low (acceptable trade-off for skill growth)

**Mitigation:**
1. **Incremental Learning:**
   - Focus on one tech at a time (e.g., master Inertia before diving into TypeScript generics)
2. **Documentation:**
   - Heavily comment tricky code sections
   - Keep a "Lessons Learned" log
3. **Community Resources:**
   - Use Laracasts, Inertia docs, and official React docs
   - Ask questions on Discord/Stack Overflow
4. **Time Buffers:**
   - Estimate 2x time for unfamiliar features

**Owners:** Product Owner + Developer (self)  
**Status:** Accepted - Learning is part of the goal

---

### R-007: Project Abandonment (Not Using Daily)
**Description:** Stop using the tool daily, leading to loss of motivation and incomplete features.

**Probability:** Medium (Common for personal projects)  
**Impact:** Medium (Incomplete portfolio piece, wasted effort)  
**Severity:** 🟡 Medium

**Mitigation:**
1. **Dogfooding:**
   - Use Kanban Crayon Board to manage its own development backlog
   - Track all tasks, bugs, and features in the tool itself
2. **Public Commitment:**
   - Share progress on LinkedIn/Twitter
   - Set soft deadlines (e.g., "v1.0 by February 2026")
3. **Minimum Viable Usage:**
   - Tool must be "just good enough" to prefer over alternatives (Trello, Notion)
4. **Fun Factor:**
   - Prioritize features that bring joy (smooth animations, colors)
5. **Portfolio Pressure:**
   - Need completed project for job applications

**Owners:** Product Owner (self)  
**Status:** Active - Requires ongoing discipline

---

## Risk Monitoring Plan

### Weekly Check-In
- Review open risks
- Update status (Active → Mitigated or vice versa)
- Add new risks as identified

### Pre-Release Risk Review
- Confirm all 🔴 High severity risks are mitigated
- Document known issues in release notes
- Plan hotfix strategy for critical bugs

### Post-Release Monitoring
- Monitor error logs (Laravel Telescope or Sentry)
- Track performance metrics (Google Lighthouse)
- Collect user feedback (GitHub Issues)

---

## Assumptions & Dependencies

**Assumptions:**
- SQLite is sufficient for single-user deployment (migrate to PostgreSQL if multi-user)
- Self-hosted on personal server or Vercel/Netlify
- No GDPR compliance needed (personal use only)

**Dependencies:**
- Laravel framework stability
- `@dnd-kit` library maintenance
- Browser API stability (Drag and Drop API)

---

**Ownership:** All risks are owned by the solo product owner/developer. External stakeholders (recruiters, portfolio viewers) are informed through documentation transparency.
