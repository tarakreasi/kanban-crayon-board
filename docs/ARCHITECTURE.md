# Kanban Crayon Board - System Architecture

> **Detailed technical architecture and design decisions**

---

## 📑 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [System Design Patterns](#system-design-patterns)
4. [Data Flow](#data-flow)
5. [Security Architecture](#security-architecture)
6. [Performance Optimizations](#performance-optimizations)
7. [Scalability Considerations](#scalability-considerations)
8. [Future Architecture](#future-architecture)

---

## 🏛️ Architecture Overview

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                          │
├──────────────────────────────────────────────────────────┤
│  Browser (Chrome, Firefox, Safari, Edge)                 │
│  ├─ React 19 (UI Components)                             │
│  ├─ TypeScript (Type Safety)                             │
│  ├─ TailwindCSS (Styling)                                │
│  └─ Inertia.js Client (SPA-like Experience)              │
└──────────────┬───────────────────────────────────────────┘
               │ HTTP/HTTPS
               │
┌──────────────▼───────────────────────────────────────────┐
│                   APPLICATION LAYER                       │
├──────────────────────────────────────────────────────────┤
│  Vite Dev Server (Development)                           │
│  ├─ Hot Module Replacement                               │
│  ├─ Asset Bundling                                       │
│  └─ TypeScript Compilation                               │
└──────────────┬───────────────────────────────────────────┘
               │ Proxy Pass
               │
┌──────────────▼───────────────────────────────────────────┐
│                    SERVER LAYER                           │
├──────────────────────────────────────────────────────────┤
│  Laravel 12 (PHP 8.3)                                    │
│  ├─ Routing (web.php, auth.php)                         │
│  ├─ Middleware (Auth, CSRF, Verified)                   │
│  ├─ Controllers (Business Logic)                         │
│  ├─ Inertia.js Server                                    │
│  └─ Eloquent ORM                                         │
└──────────────┬───────────────────────────────────────────┘
               │ PDO/MySQLi
               │
┌──────────────▼───────────────────────────────────────────┐
│                   DATA LAYER                              │
├──────────────────────────────────────────────────────────┤
│  MySQL / SQLite Database                                 │
│  ├─ Tables (users, boards, tasks, etc.)                 │
│  ├─ Indexes (performance)                               │
│  └─ Foreign Key Constraints (integrity)                 │
└──────────────────────────────────────────────────────────┘
```

### Architectural Style

**Hybrid Monolith Architecture:**

This application uses a **Modern Monolith** approach:

- **Frontend & Backend in Single Repo**
- **Inertia.js** bridges server-rendered pages with React SPA feel
- **No separate API layer** (Inertia handles client-server communication)
- **Simpler deployment** (single application)
- **Easier development** (no CORS, shared auth)

**Benefits:**
- ✅ Fast development
- ✅ Easy to reason about
- ✅ Simpler deployment
- ✅ No API versioning complexity

**Trade-offs:**
- ⚠️ Not ideal for mobile apps (would need API layer)
- ⚠️ Tight coupling between frontend/backend
- ⚠️ Less flexibility for separate teams

---

## 🛠️ Technology Stack

### Backend Stack

#### Laravel 12 (PHP 8.3)
**Why Laravel?**
- Mature, well-documented PHP framework
- Excellent ORM (Eloquent)
- Built-in authentication (Breeze)
- Great ecosystem (Forge, Vapor, etc.)
- Active community

**Key Packages:**
```json
{
  "laravel/framework": "^12.0",
  "laravel/breeze": "^2.0",      // Authentication scaffolding
  "inertiajs/inertia-laravel": "^1.0",  // Server adapter
  "laravel/sanctum": "^4.0",     // Session auth
  "laravel/pint": "^1.0"         // Code formatting
}
```

#### Inertia.js
**Why Inertia?**
- Monolith with SPA feel
- No need for API endpoints
- Server-side routing
- Shares auth session
- Simpler than traditional SPA

**How It Works:**
```
1. Client requests page
2. Server responds with HTML + Inertia data
3. Inertia.js hydrates React components
4. Future navigations are XHR (fetch page props)
5. React updates without full reload
```

#### Database (MySQL/SQLite)
**Production:** MySQL 8.0+
- ACID compliance
- Better performance at scale
- Full-text search
- JSON column support

**Development:** SQLite
- Zero configuration
- Fast for testing
- File-based (easy backups)

### Frontend Stack

#### React 19
**Why React?**
- Component-based architecture
- Large ecosystem
- TypeScript support
- Concurrent features (Suspense, Transitions)
- Widely adopted

**Key Libraries:**
```json
{
  "react": "^19.0",
  "react-dom": "^19.0",
  "@inertiajs/react": "^1.0",
  "framer-motion": "^11.0",      // Animations
  "@dnd-kit/core": "^6.0",       // Drag & drop
  "lucide-react": "^0.300",      // Icons
  "date-fns": "^3.0",            // Date handling
  "react-confetti": "^6.0"       // Celebrations
}
```

#### TypeScript
**Benefits:**
- Type safety
- Better IDE support
- Catches errors at compile time
- Self-documenting code
- Easier refactoring

**Example:**
```typescript
interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done';
  priority: 'low' | 'medium' | 'high';
  board_id: number;
}

function TaskCard({ task }: { task: Task }) {
  // TypeScript ensures task has correct shape
}
```

#### Tailwind CSS 4
**Why Tailwind?**
- Utility-first approach
- Fast development
- Consistent design system
- Small production bundle
- Dark mode built-in

**Configuration:**
```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  }
}
```

#### Vite
**Why Vite?**
- Instant server start (ESBuild)
- Lightning-fast HMR
- Optimized builds (Rollup)
- Native ESM support
- Better DX than Webpack

**Features:**
- Hot Module Replacement (see changes instantly)
- Code splitting
- Tree shaking
- Asset optimization

---

## 🎨 System Design Patterns

### 1. MVC Pattern (Backend)

```
Model ─────────► Eloquent ORM
  │
  ├─ Relationships
  ├─ Scopes
  ├─ Accessors/Mutators
  └─ Casts

View ──────────► Inertia + React
  │
  ├─ Layout Components
  ├─ Page Components
  └─ Shared Components

Controller ────► HTTP Layer
  │
  ├─ Request Validation
  ├─ Business Logic
  ├─ Model Interactions
  └─ Response (Inertia/JSON)
```

**Example:**
```php
// Model (Task.php)
class Task extends Model {
    protected $fillable = ['title', 'status'];
    
    public function board() {
        return $this->belongsTo(Board::class);
    }
}

// Controller (TaskController.php)
class TaskController {
    public function index() {
        $tasks = Task::with('board')->get();
        return Inertia::render('Kanban', ['tasks' => $tasks]);
    }
}

// View (Kanban.tsx)
function Kanban({ tasks }) {
    return <div>{tasks.map(task => ...)}</div>;
}
```

### 2. Repository Pattern (Implicit)

Laravel's Eloquent acts as a repository:

```php
// Instead of raw SQL:
DB::select('SELECT * FROM tasks WHERE status = ?', ['done']);

// Eloquent provides repository-like interface:
Task::where('status', 'done')->get();
```

### 3. Factory Pattern (Testing)

```php
// TaskFactory.php
class TaskFactory extends Factory {
    public function definition() {
        return ['title' => fake()->sentence()];
    }
    
    public function done() {
        return $this->state(['status' => 'done']);
    }
}

// Usage:
Task::factory()->done()->create();
```

### 4. Component Pattern (Frontend)

```typescript
// Atomic Design Hierarchy:

Atoms (Smallest)
  ├─ Button.tsx
  ├─ Input.tsx
  └─ Badge.tsx

Molecules (Composed)
  ├─ TaskCard.tsx
  ├─ CommentThread.tsx
  └─ TagSelector.tsx

Organisms (Feature)
  ├─ KanbanBoard.tsx
  ├─ TaskModal.tsx
  └─ AnalyticsPanel.tsx

Templates (Layouts)
  ├─ AuthenticatedLayout.tsx
  └─ GuestLayout.tsx

Pages (Routes)
  ├─ Kanban.tsx
  ├─ Profile/Edit.tsx
  └─ Auth/Login.tsx
```

### 5. Observer Pattern (Events)

```php
// TaskObserver.php
class TaskObserver {
    public function created(Task $task) {
        $task->activities()->create([
            'type' => 'created',
            'description' => 'Task created',
        ]);
    }
    
    public function updated(Task $task) {
        if ($task->isDirty('status')) {
            $task->activities()->create([
                'type' => 'moved',
                'description' => "Status changed",
            ]);
        }
    }
}

// AppServiceProvider.php
Task::observe(TaskObserver::class);
```

### 6. Middleware Pattern

```php
// Request Pipeline:
Request
  │
  ├─> TrustProxies
  ├─> PreventRequestsDuringMaintenance
  ├─> ValidatePostSize
  ├─> TrimStrings
  ├─> ConvertEmptyStringsToNull
  ├─> HandleCors
  ├─> Authenticate  ←──── Route-specific
  ├─> VerifyEmail   ←──── Route-specific
  └─> Controller

// Usage in routes:
Route::get('/kanban', [TaskController::class, 'index'])
    ->middleware(['auth', 'verified']);
```

---

## 🔄 Data Flow

### Request/Response Cycle

#### 1. Initial Page Load

```
Browser
  │
  └─> GET /
        │
        ├─> Laravel Router (web.php)
        │     └─> Route::get('/', TaskController@index)
        │
        ├─> Auth Middleware
        │     └─> Check session, load user
        │
        ├─> TaskController@index()
        │     ├─> Fetch user's boards
        │     ├─> Get active board
        │     ├─> Load tasks with relationships
        │     └─> Load tags for board
        │
        ├─> Inertia::render('Kanban', $data)
        │     └─> Generate HTML with embedded data
        │
        └─> HTML Response
              ├─ <!DOCTYPE html>
              ├─ <div id="app" data-page="{...}">
              └─ <script src="/build/app.js">
                    │
                    └─> React hydrates
                          └─> Kanban.tsx renders
```

#### 2. Inertia Navigation (Client-side)

```
User clicks board in sidebar
  │
  └─> router.get('/?board_id=5')
        │
        ├─> XHR: GET / + X-Inertia header
        │
        ├─> Laravel processes request
        │     └─> TaskController@index(board_id=5)
        │
        ├─> JSON Response (only page props)
        │     {
        │       "component": "Kanban",
        │       "props": { tasks: [...], boards: [...] }
        │     }
        │
        └─> Inertia.js swaps props
              └─> React re-renders with new data
                    └─> No full page reload! ✨
```

#### 3. Form Submission

```
User creates task
  │
  └─> const { post } = useForm({ title: "..." })
        post('/tasks')
          │
          ├─> POST /tasks + CSRF token
          │
          ├─> Laravel validates request
          │     └─> Validation rules
          │
          ├─> TaskController@store()
          │     ├─> Task::create($validated)
          │     ├─> Activity::create([...])
          │     └─> return redirect()->back()
          │
          └─> Inertia reloads page props
                └─> React updates with new task
```

### Real-time Updates (Future)

```
Current: Manual refresh to see others' changes
Future with Laravel Echo + WebSockets:

User A creates task
  │
  ├─> Server saves task
  │
  ├─> Broadcast event
  │     └─> TaskCreated($task)
  │
  └─> WebSocket push to all clients
        │
        └─> User B's browser receives
              └─> React updates automatically
                    └─> No refresh needed!
```

---

## 🔒 Security Architecture

### Authentication

**Session-Based (Laravel Sanctum):**

```
Login Flow:
  │
  ├─> User submits credentials
  ├─> AuthenticatedSessionController@store
  ├─> Validate credentials
  ├─> Hash::check($password, $hashedPassword)
  ├─> Auth::login($user)
  ├─> Session created (encrypted cookie)
  └─> Redirect to /
  
Session Cookie:
  - HttpOnly (no JS access)
  - Secure (HTTPS only)
  - SameSite=Lax (CSRF protection)
  - Encrypted with APP_KEY
```

### Authorization

**Policy-Based:**

```php
// BoardPolicy.php
public function update(User $user, Board $board) {
    return $user->id === $board->user_id;
}

// Controller
public function update(Request $request, Board $board) {
    $this->authorize('update', $board);  // ← 403 if fails
    $board->update($request->validated());
}

// Automatic in routes:
Route::put('/boards/{board}', [BoardController::class, 'update'])
    ->can('update', 'board');  // ← Laravel resolves policy
```

### CSRF Protection

**All POST/PUT/DELETE Protected:**

```html
<!-- Automatically added by Inertia -->
<form method="POST">
    @csrf  ← Laravel adds hidden token
    <input type="hidden" name="_token" value="...">
</form>

<!-- React/Inertia also includes in XHR: -->
X-CSRF-TOKEN: abc123xyz
```

### Input Validation

**Server-Side (Never Trust Client):**

```php
$validated = $request->validate([
    'title' => 'required|string|max:255',
    'email' => 'required|email|unique:users',
    'priority' => 'in:low,medium,high',  // Whitelist
    'due_date' => 'date|after:today',
]);

// SQL Injection Protected (Eloquent uses prepared statements):
Task::where('status', $userInput)->get();  // ✅ Safe
DB::raw("SELECT * WHERE status = $userInput");  // ❌ NEVER DO THIS
```

### XSS Prevention

**Blade Escaping:**
```php
{{ $task->title }}  // ← Auto-escaped
{!! $html !!}       // ← Not escaped (dangerous, avoid)
```

**React Escaping:**
```tsx
<div>{task.title}</div>  // ← Auto-escaped by React
<div dangerouslySetInnerHTML={{__html: html}} />  // ← Dangerous
```

### Password Security

```php
// Hashing (Bcrypt with salt):
Hash::make($password);  // Always use this

// Verification:
Hash::check($plaintext, $hashed);  // Constant-time comparison

// Minimum Requirements (configured):
Rules\Password::defaults()
    ->min(8)
    ->letters()
    ->mixedCase()
    ->numbers()
    ->symbols()
```

---

## ⚡ Performance Optimizations

### Database Query Optimization

**Eager Loading (N+1 Prevention):**

```php
// ❌ Bad: N+1 queries
$tasks = Task::all();
foreach ($tasks as $task) {
    echo $task->board->title;  // +1 query per task
}

// ✅ Good: 2 queries total
$tasks = Task::with('board')->get();
foreach ($tasks as $task) {
    echo $task->board->title;  // No extra queries
}
```

**Indexes:**

```sql
-- Frequent query patterns:
SELECT * FROM tasks WHERE board_id = ? AND status = ?;

-- Indexes created:
CREATE INDEX idx_board_id ON tasks(board_id);
CREATE INDEX idx_status ON tasks(status);
CREATE INDEX idx_board_status ON tasks(board_id, status);
```

**Query Caching (Future):**

```php
use Illuminate\Support\Facades\Cache;

$tasks = Cache::remember('tasks.board.' . $boardId, 3600, function() {
    return Task::where('board_id', $boardId)->get();
});
```

### Frontend Optimizations

**Code Splitting:**

```typescript
// Lazy load heavy components:
const AnalyticsPanel = lazy(() => import('./components/AnalyticsPanel'));

<Suspense fallback={<Loading />}>
  <AnalyticsPanel />
</Suspense>
```

**Memoization:**

```typescript
import { useMemo, useCallback } from 'react';

const KanbanBoard = ({ tasks }) => {
    // Expensive calculation, only recalculate when tasks change:
    const tasksByStatus = useMemo(() => {
        return groupTasksByStatus(tasks);
    }, [tasks]);
    
    // Stable function reference:
    const handleDragEnd = useCallback((event) => {
        // ...
    }, []);
};
```

**Virtualization (Future for Large Lists):**

```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
    height={600}
    itemCount={tasks.length}
    itemSize={100}
>
    {({ index }) => <TaskCard task={tasks[index]} />}
</FixedSizeList>
```

### Asset Optimization

**Vite Production Build:**

```javascript
// vite.config.ts
export default {
    build: {
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['react', 'react-dom'],
                    'ui': ['framer-motion', '@dnd-kit/core'],
                }
            }
        }
    }
}

// Results in:
app.js         (your code)
vendor.js      (React, React DOM)
ui.js          (UI libraries)
```

**Image Optimization:**

```php
// Avatar upload:
$path = $request->file('avatar')->store('avatars');
Image::make($path)->fit(200, 200)->save();  // Resize
```

---

## 📈 Scalability Considerations

### Current Limits

**Single Server (Current):**
- 100-1000 concurrent users
- 10-100 boards per user
- 1000-10000 tasks per board

### Horizontal Scaling (Future)

**Load Balancer:**

```
            ┌─> App Server 1
Users ─> LB ├─> App Server 2
            └─> App Server 3
                    │
                    ▼
              Database (MySQL Read Replicas)
```

**Session Storage:**

```php
// .env
SESSION_DRIVER=redis  // Share sessions across servers
CACHE_DRIVER=redis    // Share cache
QUEUE_CONNECTION=redis // Shared job queue
```

**CDN for Static Assets:**

```
app.css, app.js → CloudFront/Cloudflare
Avatars → S3 + CloudFront
```

### Vertical Scaling (Immediate)

```
Upgrade server:
- 2GB RAM → 8GB RAM
- 2 CPU cores → 4 cores
- SSD storage
- MySQL optimization (query cache, indexes)
```

### Database Sharding (Large Scale)

```
User 1-1000    → Database 1
User 1001-2000 → Database 2
User 2001-3000 → Database 3
```

---

## 🔮 Future Architecture

### Planned Enhancements

**1. API Layer (Mobile Support):**

```
┌─────────────┐
│ React Web   │ ──┐
└─────────────┘   │
                  ├──> RESTful API (Laravel)
┌─────────────┐   │       │
│ React Native│ ──┘       ▼
└─────────────┘        Database
```

**2. Real-Time (WebSockets):**

```php
// Broadcasting events:
broadcast(new TaskCreated($task));

// React listening:
Echo.channel(`board.${boardId}`)
    .listen('TaskCreated', (e) => {
        addTaskToBoard(e.task);
    });
```

**3. Microservices (Far Future):**

```
Auth Service     (User management)
Board Service    (Board CRUD)
Task Service     (Task CRUD)
Analytics Service(Metrics calculation)
Notification Service (Email, push)
```

**4. Serverless Functions:**

```javascript
// Vercel Edge Functions for analytics:
export default async function(req) {
    const metrics = await calculateMetrics();
    return new Response(JSON.stringify(metrics));
}
```

---

## 📊 Performance Metrics

### Current Performance

**Time to First Byte (TTFB):** < 200ms
**First Contentful Paint (FCP):** < 1.5s  
- **Largest Contentful Paint (LCP):** < 2.5s
**Total Blocking Time (TBT):** < 300ms
**Cumulative Layout Shift (CLS):** < 0.1

**Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)

### Monitoring (Future)

```javascript
// Application Performance Monitoring:
- New Relic / DataDog
- Error tracking: Sentry
- Analytics: Google Analytics, Mixpanel
- Uptime: UptimeRobot, Pingdom
```

---

*Last Updated: 2025-12-24*
*This architecture is designed for growth and maintainability.*
