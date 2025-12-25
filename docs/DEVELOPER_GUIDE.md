# Kanban Crayon Board - Developer Guide

> **Technical documentation for developers working on this project**

---

## 📑 Table of Contents

1. [Project Setup](#project-setup)
2. [Architecture Overview](#architecture-overview)
3. [Database Schema](#database-schema)
4. [Backend Development](#backend-development)
5. [Frontend Development](#frontend-development)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Contributing](#contributing)

---

## 🛠️ Project Setup

### Prerequisites

**Required:**
- PHP 8.3 or higher
- Composer 2.x
- Node.js 18+ and npm
- SQLite or MySQL 8.0+

**Recommended:**
- Git
- VS Code with extensions:
  - PHP Intelephense
  - Laravel Extension Pack
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense

### Initial Setup

**1. Clone Repository**
```bash
git clone https://github.com/yourname/kanban-crayon-board.git
cd kanban-crayon-board
```

**2. Install PHP Dependencies**
```bash
composer install
```

**3. Install JavaScript Dependencies**
```bash
npm install
```

**4. Environment Configuration**
```bash
cp .env.example .env
php artisan key:generate
```

**5. Configure Database**

For SQLite (Development):
```bash
touch database/database.sqlite
```

Edit `.env`:
```env
DB_CONNECTION=sqlite
# Comment out DB_HOST, DB_PORT, DB_DATABASE, etc.
```

For MySQL (Production):
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kanban_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

**6. Run Migrations**
```bash
php artisan migrate --seed
```

This creates:
- Database tables
- Default user: `taratask@tarakreasi.com` / `password`

**7. Link Storage**
```bash
php artisan storage:link
```

Allows avatar uploads to be publicly accessible.

**8. Start Development Servers**

Terminal 1 (Laravel):
```bash
php artisan serve
```

Terminal 2 (Vite):
```bash
npm run dev
```

Or use concurrent:
```bash
npm start
```

**9. Access Application**
```
http://localhost:8000
```

---

## 🏗️ Architecture Overview

### Technology Stack

**Backend:**
```
Laravel 12 (PHP 8.3)
├── Inertia.js (Server-side rendering adapter)
├── Eloquent ORM (Database)
├── Laravel Breeze (Authentication scaffolding)
└── Sanctum (Session-based auth)
```

**Frontend:**
```
React 19 (TypeScript)
├── Vite (Build tool & dev server)
├── TailwindCSS 4 (Styling)
├── Framer Motion (Animations)
├── @dnd-kit (Drag & drop)
└── Lucide Icons (Icon library)
```

### Project Structure

``

`javascript
kanban-crayon-board/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # API & page controllers
│   │   │   ├── Auth/          # Authentication controllers (9 files)
│   │   │   ├── TaskController.php
│   │   │   ├── BoardController.php
│   │   │   ├── TagController.php
│   │   │   ├── CommentController.php
│   │   │   └── AnalyticsController.php
│   │   ├── Middleware/        # Custom middleware
│   │   └── Requests/          # Form request validation
│   ├── Models/                # Eloquent models
│   │   ├── User.php
│   │   ├── Board.php
│   │   ├── Task.php
│   │   ├── Tag.php
│   │   ├── Comment.php
│   │   └── Activity.php
│   └── Policies/              # Authorization policies
│
├── database/
│   ├── factories/             # Model factories for testing
│   ├── migrations/            # Database migrations (14 files)
│   └── seeders/               # Database seeders
│
├── resources/
│   ├── js/
│   │   ├── Components/        # Shared React components
│   │   ├── Layouts/           # Page layouts
│   │   ├── Pages/             # Inertia pages
│   │   │   ├── Auth/          # Auth pages (6 files)
│   │   │   ├── Kanban.tsx     # Main application
│   │   │   └── Profile/       # Profile pages
│   │   ├── components/        # Feature components
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskModal.tsx
│   │   │   └── AnalyticsPanel.tsx
│   │   └── types/             # TypeScript types
│   └── css/
│       └── app.css            # Global styles & Tailwind
│
├── routes/
│   ├── web.php                # Web routes
│   └── auth.php               # Authentication routes
│
├── tests/
│   ├── Feature/               # Integration tests
│   │   ├── TaskManagementTest.php
│   │   ├── BoardManagementTest.php
│   │   ├── TagManagementTest.php
│   │   ├── CommentManagementTest.php
│   │   └── AnalyticsTest.php
│   └── Unit/                  # Unit tests
│
├── docs/                      # Documentation
│   ├── FEATURES.md            # Feature documentation
│   ├── USER_GUIDE.md          # End-user guide
│   ├── DEVELOPER_GUIDE.md     # This file
│   ├── API_REFERENCE.md       # API documentation
│   ├── TESTING.md             # Testing documentation
│   └── CHANGELOG.md           # Version history
│
├── .env.example               # Environment template
├── composer.json              # PHP dependencies
├── package.json               # JS dependencies
├── phpunit.xml                # PHPUnit configuration
└── vite.config.ts             # Vite build configuration
```

### Request Lifecycle

**Typical Page Load:**

```
1. Browser → GET /
2. Laravel Router → web.php
3. TaskController@index
4. Eloquent queries database
5. Inertia::render('Kanban', $data)
6. HTML sent with Inertia data
7. React hydrates on client
8. User interacts with page
```

**Typical API Call:**

```
1. React → POST /tasks
2. CSRF middleware validates token
3. Auth middleware checks session
4. TaskController@store
5. Request validation
6. Eloquent saves to database
7. Activity logged
8. JSON response → React
9. Optimistic UI updates
```

---

## 💾 Database Schema

### Entity Relationship Diagram

```
┌─────────┐
│  users  │
└────┬────┘
     │
     │ 1:N
     ▼
┌─────────┐       1:N      ┌─────────┐
│ boards  ├────────────────▶  tasks  │
└────┬────┘                └────┬────┘
     │                          │
     │ 1:N                      │ 1:N
     ▼                          ▼
┌─────────┐            ┌────────────┐
│  tags   │◀──────────│  task_tag  │
└─────────┘    N:M     └────────────┘
                              │
                              │ 1:N
                              ▼
                       ┌────────────┐
                       │  comments  │
                       └────────────┘
                              │
                              │ 1:N
                              ▼
                       ┌────────────┐
                       │ activities │
                       └────────────┘
```

### Table Schemas

#### users
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### boards
```sql
CREATE TABLE boards (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    theme_color VARCHAR(7) NOT NULL,
    wip_limits JSON NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);
```

#### tasks
```sql
CREATE TABLE tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    board_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    status ENUM('todo', 'in-progress', 'in-review', 'done') DEFAULT 'todo',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    due_date TIMESTAMP NULL,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    
    FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
    INDEX idx_board_id (board_id),
    INDEX idx_status (status)
);
```

#### tags
```sql
CREATE TABLE tags (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    board_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(7) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    
    FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
    UNIQUE KEY unique_name_per_board (board_id, name)
);
```

#### task_tag (Pivot)
```sql
CREATE TABLE task_tag (
    task_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

#### comments
```sql
CREATE TABLE comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    task_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_task_id (task_id)
);
```

#### activities
```sql
CREATE TABLE activities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    task_id BIGINT NOT NULL,
    type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    properties JSON NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    INDEX idx_task_id (task_id)
);
```

### Migrations

**Create New Migration:**
```bash
php artisan make:migration create_example_table
```

**Run Migrations:**
```bash
php artisan migrate
```

**Rollback:**
```bash
php artisan migrate:rollback
```

**Fresh Migration:**
```bash
php artisan migrate:fresh --seed
```

---

##  Backend Development

### Controllers

#### Creating a Controller
```bash
php artisan make:controller ExampleController
```

#### Controller Example
```php
<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $boardId = $request->query('board_id') ?? $user->boards()->first()->id;
        
        $tasks = Task::where('board_id', $boardId)
            ->with(['tags', 'comments'])
            ->get();
        
        return Inertia::render('Kanban', [
            'tasks' => $tasks,
            'board' => Board::find($boardId),
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:todo,in-progress,in-review,done',
            'board_id' => 'required|exists:boards,id',
        ]);
        
        $task = Task::create($validated);
        
        // Log activity
        $task->activities()->create([
            'type' => 'created',
            'description' => 'Task created',
        ]);
        
        return response()->json($task, 201);
    }
}
```

### Models

#### Creating a Model
```bash
php artisan make:model Example -m  # With migration
php artisan make:model Example -mf # With migration and factory
```

#### Model Example
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title', 'description', 'priority', 'status',
        'board_id', 'due_date', 'started_at', 'completed_at'
    ];
    
    protected $casts = [
        'due_date' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];
    
    // Relationships
    public function board()
    {
        return $this->belongsTo(Board::class);
    }
    
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'task_tag');
    }
    
    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }
    
    public function activities()
    {
        return $this->hasMany(Activity::class)->latest();
    }
}
```

### Validation

**Request Validation:**
```php
$validated = $request->validate([
    'title' => 'required|string|max:255',
    'email' => 'required|email|unique:users',
    'priority' => 'required|in:low,medium,high',
    'due_date' => 'nullable|date|after:today',
    'tags' => 'array',
    'tags.*' => 'exists:tags,id',
]);
```

**Custom Form Request:**
```bash
php artisan make:request StoreTaskRequest
```

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'board_id' => 'required|exists:boards,id',
            'priority' => 'in:low,medium,high',
        ];
    }
}
```

### Authorization

**Policies:**
```bash
php artisan make:policy BoardPolicy --model=Board
```

```php
<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Board;

class BoardPolicy
{
    public function update(User $user, Board $board)
    {
        return $user->id === $board->user_id;
    }
    
    public function delete(User $user, Board $board)
    {
        return $user->id === $board->user_id;
    }
}
```

**Usage in Controller:**
```php
public function destroy(Board $board)
{
    $this->authorize('delete', $board);
    
    $board->delete();
    
    return redirect()->route('home');
}
```

---

## ⚛️ Frontend Development

### Component Structure

**Typical Component:**
```typescript
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

interface TaskCardProps {
    task: Task;
    onUpdate: (task: Task) => void;
}

export default function TaskCard({ task, onUpdate }: TaskCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData, patch } = useForm({
        title: task.title,
    });
    
    const handleSave = () => {
        patch(`/tasks/${task.id}`, {
            onSuccess: () => {
                setIsEditing(false);
                onUpdate(data);
            },
        });
    };
    
    return (
        <div className="task-card">
            {isEditing ? (
                <input
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    onBlur={handleSave}
                />
            ) : (
                <h3 onDoubleClick={() => setIsEditing(true)}>
                    {task.title}
                </h3>
            )}
        </div>
    );
}
```

### Inertia.js Usage

**Page Component:**
```typescript
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface KanbanProps {
    tasks: Task[];
    boards: Board[];
    auth: { user: User };
}

export default function Kanban({ tasks, boards, auth }: KanbanProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kanban Board" />
            
            <div className="kanban-container">
                <KanbanBoard tasks={tasks} />
            </div>
        </AuthenticatedLayout>
    );
}
```

**Making Requests:**
```typescript
import { router } from '@inertiajs/react';

// GET request
router.get('/kanban', { board_id: 5 });

// POST request
router.post('/tasks', {
    title: 'New task',
    status: 'todo',
}, {
    onSuccess: () => alert('Task created!'),
    onError: (errors) => console.error(errors),
});

// DELETE request
router.delete(`/tasks/${taskId}`, {
    onBefore: () => confirm('Are you sure?'),
});
```

### State Management

**Local State:**
```typescript
const [tasks, setTasks] = useState<Task[]>(initialTasks);
const [isOpen, setIsOpen] = useState(false);
```

**Form State (Inertia):**
```typescript
const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    priority: 'medium',
});

const submit = (e: FormEvent) => {
    e.preventDefault();
    post('/tasks');
};
```

### Styling with Tailwind

**Component Styling:**
```typescript
<div className="
    rounded-xl                    // Rounded corners
    bg-white dark:bg-gray-800    // Light/dark bg
    shadow-lg                     // Shadow
    backdrop-blur-md              // Glassmorphism
    border border-white/20        // Border
    p-4                          // Padding
    hover:scale-105              // Hover effect
    transition-transform          // Smooth transition
">
    Content here
</div>
```

**Custom Classes:**
```css
/* resources/css/app.css */
@layer components {
    .glass-card {
        @apply bg-white/10 backdrop-blur-md border border-white/20;
        @apply shadow-xl rounded-xl;
    }
    
    .btn-primary {
        @apply bg-indigo-600 text-white px-4 py-2 rounded-lg;
        @apply hover:bg-indigo-700 transition-colors;
    }
}
```

### Drag & Drop

**Using @dnd-kit:**
```typescript
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';

function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        
        if (over && active.id !== over.id) {
            const taskId = active.id;
            const newStatus = over.id as TaskStatus;
            
            // Optimistic update
            setTasks(prev => prev.map(task =>
                task.id === taskId
                    ? { ...task, status: newStatus }
                    : task
            ));
            
            // Server update
            router.put(`/tasks/${taskId}`, { status: newStatus });
        }
    };
    
    return (
        <DndContext onDragEnd={handleDragEnd}>
            {columns.map(column => (
                <SortableContext items={getTasksForColumn(column)}>
                    <Column tasks={getTasksForColumn(column)} />
                </SortableContext>
            ))}
        </DndContext>
    );
}
```

---

## 🧪 Testing

### Running Tests

**All Tests:**
```bash
php artisan test
```

**Specific Test File:**
```bash
php artisan test --filter=TaskManagementTest
```

**With Coverage:**
```bash
php artisan test --coverage
```

**Stop on Failure:**
```bash
php artisan test --stop-on-failure
```

### Writing Tests

**Feature Test Example:**
```php
<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Board;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskManagementTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_user_can_create_task()
    {
        $user = User::factory()->create();
        $board = Board::factory()->create(['user_id' => $user->id]);
        
        $response = $this->actingAs($user)->post('/tasks', [
            'title' => 'Test Task',
            'board_id' => $board->id,
            'status' => 'todo',
            'priority' => 'medium',
        ]);
        
        $response->assertRedirect();
        $this->assertDatabaseHas('tasks', [
            'title' => 'Test Task',
            'board_id' => $board->id,
        ]);
    }
    
    public function test_task_started_at_set_when_moved_to_in_progress()
    {
        $user = User::factory()->create();
        $board = Board::factory()->create(['user_id' => $user->id]);
        $task = Task::factory()->create([
            'board_id' => $board->id,
            'status' => 'todo',
            'started_at' => null,
        ]);
        
        $this->actingAs($user)->put("/tasks/{$task->id}", [
            'status' => 'in-progress',
        ]);
        
        $task->refresh();
        $this->assertNotNull($task->started_at);
    }
}
```

### Factories

**Creating Factories:**
```bash
php artisan make:factory TaskFactory
```

**Factory Example:**
```php
<?php

namespace Database\Factories;

use App\Models\Board;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    public function definition()
    {
        return [
            'board_id' => Board::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'status' => fake()->randomElement(['todo', 'in-progress', 'in-review', 'done']),
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
        ];
    }
    
    public function done()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'done',
            'started_at' => now()->subDays(5),
            'completed_at' => now()->subDays(2),
        ]);
    }
}
```

**Using Factories:**
```php
// Create single
$task = Task::factory()->create();

// Create multiple
$tasks = Task::factory()->count(10)->create();

// With state
$completedTask = Task::factory()->done()->create();

// With relationships
$task = Task::factory()
    ->for(Board::factory())
    ->has(Comment::factory()->count(3))
    ->create();
```

---

##  Deployment

### Production Build

**1. Install Dependencies:**
```bash
composer install --optimize-autoloader --no-dev
npm ci
```

**2. Build Frontend:**
```bash
npm run build
```

**3. Optimize Laravel:**
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

**4. Run Migrations:**
```bash
php artisan migrate --force
```

**5. Link Storage:**
```bash
php artisan storage:link
```

### Environment Configuration

**Production .env:**
```env
APP_NAME="Kanban Crayon Board"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourapp.com

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password

SESSION_DRIVER=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourapp.com
```

### Server Requirements

**Minimum:**
- PHP 8.3+
- MySQL 8.0+ or PostgreSQL 12+
- 512MB RAM
- 1GB disk space

**Recommended:**
- 2GB RAM
- 5GB disk space
- HTTPS (Let's Encrypt)
- Redis for sessions/cache

### Deployment Platforms

**Laravel Forge:**
```bash
# Automated deployment via Forge
# Just connect Git repository
```

**Docker:**
```dockerfile
FROM php:8.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application
COPY . /var/www/html
WORKDIR /var/www/html

# Install dependencies
RUN composer install --optimize-autoloader --no-dev
RUN npm install && npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage
```

**Vercel/Netlify (Static Export - Future):**
Currently Inertia SSR, but could add static generation.

---

## 🤝 Contributing

### Development Workflow

**1. Create Feature Branch:**
```bash
git checkout -b feature/add-calendar-view
```

**2. Make Changes:**
- Write code
- Add tests
- Update documentation

**3. Run Tests:**
```bash
php artisan test
npm run test
```

**4. Format Code:**
```bash
composer pint           # PHP
npm run lint            # JavaScript
```

**5. Commit Changes:**
```bash
git add .
git commit -m "feat: Add calendar view component"
```

**6. Push & Create PR:**
```bash
git push origin feature/add-calendar-view
```

### Code Style

**PHP (Laravel Pint):**
```bash
composer pint
```

Follows Laravel conventions:
- PSR-12 standard
- 4-space indentation
- No trailing whitespace

**TypeScript/React (ESLint):**
```bash
npm run lint
```

- 2-space indentation
- Single quotes
- Semicolons required
- React hooks rules

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semi colons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Updating build tasks, package manager configs, etc.

**Examples:**
```
feat(kanban): Add calendar view component
fix(tasks): Resolve drag & drop on mobile
docs(readme): Update installation instructions
test(boards): Add board deletion tests
```

### Pull Request Guidelines

**Template:**
```markdown
## Description
Briefly describe what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing performed

## Screenshots (if applicable)
Attach screenshots of UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added to hard-to-understand areas
- [ ] Documentation updated
- [ ] No new warnings generated
```

---

##  Additional Resources

**Laravel:**
- [Laravel Documentation](https://laravel.com/docs)
- [Eloquent ORM](https://laravel.com/docs/eloquent)
- [Inertia.js](https://inertiajs.com/)

**React:**
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

**Testing:**
- [PHPUnit](https://phpunit.de/documentation.html)
- [Laravel Testing](https://laravel.com/docs/testing)

**Tools:**
- [Vite](https://vitejs.dev/)
- [Composer](https://getcomposer.org/)
- [NPM](https://docs.npmjs.com/)

---

*Last Updated: 2025-12-24*
*For questions, check the documentation or open an issue on GitHub.*
