# Developer Standard Operating Procedure (SOP)

> **Document ID:** SOP-DEV-001
> **Scope:** Engineering & Deployment
> **Enforcement:** Strict Adherence Required

---

## 1. Environment Prerequisites (Pre-Flight Check)

Before initiating the development environment, verify the following dependencies. Mixing versions is a primary cause of instability.

| Component | Required Version | Verification Command |
|-----------|------------------|----------------------|
| **PHP** | 8.3+ | `php -v` |
| **node/npm** | 20+ | `node -v` |
| **Composer** | 2.6+ | `composer -V` |
| **Database** | SQLite / MySQL 8.0 | `sqlite3 --version` |

---

## 2. Installation Sequence (Cold Start)

Excecute these commands sequentially. Do not skip steps.

### Phase 1: Dependency Injection
```bash
# Backend Dependencies
composer install --no-dev --optimize-autoloader

# Frontend Dependencies
npm ci
```

### Phase 2: Configuration & Secrets
```bash
# 1. Clone Environment
cp .env.example .env

# 2. Generate Encryption Key
php artisan key:generate

# 3. Establish Database Link
touch database/database.sqlite
# (Ensure DB_CONNECTION=sqlite in .env)
```

### Phase 3: Database Hydration
```bash
# Reset and Seed Database
php artisan migrate:fresh --seed
```

---

## 3. Runtime Operations

### Local Development Server
Use the unified local server script to prevent port conflicts:
```bash
./local-serve.sh
```
*   **PHP (Laravel):** http://localhost:8000
*   **Vite (HMR):** http://localhost:5173

### Testing Protocol
Run the full test suite before any commit.
```bash
php artisan test
```

---

## 4. Code Standards & Conventions

### 4.1 Backend (Laravel)
*   **Strict Typing:** All controller methods must declare return types.
*   **Service Layer:** Controllers do not contain business logic. Injest a Service class.
*   **Transactions:** Any operation modifying >1 table must be wrapped in `DB::transaction()`.

### 4.2 Frontend (React)
*   **Props:** Must be typed via TypeScript interfaces. `any` is strictly prohibited.
*   **Components:** Functional components only. No Class components.

---

## 5. Troubleshooting (RCA)

**Issue:** "Vite connection refused"
**Check:** verify port 5173 is open. `lsof -i :5173`.

**Issue:** "Database locked" (SQLite)
**Action:** The server process likely hung. Kill the php process or switch to MySQL for heavy concurrency.
