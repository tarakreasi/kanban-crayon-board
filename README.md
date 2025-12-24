# taraTask Kanban Crayon Board

<div align="center">

**A modern, multi-board Kanban application built with Laravel, React, and Inertia.js**

*Beautiful glassmorphism design meets powerful productivity features*

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## About Kanban Crayon Board

**Kanban Crayon Board** is a full-stack web application designed to bring joy and efficiency to task management. Built as part of the **taraTask** suite, this project demonstrates modern web development practices while delivering a delightful user experience.

### Why I Built This

Like many developers, I juggle multiple projects, ideas, and tasks daily. I tried various task management tools—Trello, Asana, Notion—but none felt quite right. They were either:

- Too rigid and couldn't be customized to my workflow
- Behind expensive paywalls for basic features I needed
- Visually uninspiring with boring interfaces
- Slow and bloated with too many features I didn't need

So I built **Kanban Crayon Board** as my daily driver for personal and professional task management. This isn't just a portfolio piece—it's the tool I use every day to:

- Track my freelance projects
- Organize side project ideas
- Plan learning goals and courses
- Manage personal todos

### Built for Real Use, Shared for Others

What started as a personal productivity tool evolved into a full-featured Kanban system. I wanted to prove that you can build something beautiful, functional, and performant without enterprise budgets or massive teams.

**The philosophy:**

- **Visual delight** - Work should be enjoyable to look at
- **Speed first** - No loading spinners, instant feedback everywhere
- **Customizable** - Your workflow, your colors, your rules
- **Open source** - Take it, modify it, make it yours

### Make It Your Own

This is your Kanban board now. Whether you're a developer tracking bugs and features, a designer organizing client projects, a student planning assignments, a freelancer managing multiple clients, or a team lead coordinating sprints—customize it to fit your workflow.

Change the colors, rename the columns, add features you need. The code is clean, well-documented, and ready for your personal touch.

### Project Vision

Traditional Kanban boards are functional but often feel sterile and uninspiring. Kanban Crayon Board breaks this mold by combining:

- **Visual Delight**: Glassmorphism UI with vibrant gradients and smooth animations
- **Productivity Power**: Advanced features like WIP limits, analytics, and activity tracking
- **Developer Excellence**: Clean architecture, comprehensive testing, and thorough documentation

This is not just a task manager—it's a showcase of what happens when design thinking meets technical craftsmanship.

---

## Screenshots

### Dashboard - Overview & Analytics
![Dashboard](docs/screenshots/dashboard.png)

### Kanban Board - Task Management
![Kanban Board](docs/screenshots/kanban.png)

### My Tasks - Unified View
![My Tasks](docs/screenshots/my-tasks.png)

---

## Key Features

### Multi-Board System
Organize your work across multiple boards, each with its own custom theme color that dynamically applies throughout the interface.

- Create unlimited boards
- Custom theme colors per board
- Easy board switching from sidebar
- Inline board creation and deletion

### Powerful Kanban Management
An intuitive 4-column workflow that adapts to your needs:

- **To Do → In Progress → In Review → Done**
- Drag-and-drop tasks between columns
- Quick-add tasks from column headers
- Inline editing with double-click
- Optimistic UI updates for instant feedback

### Rich Task Management
Every task is more than just a title:

- **Priorities**: High, Medium, Low (with color coding)
- **Due dates**: Never miss a deadline
- **Descriptions**: Add context with markdown support
- **Tags/Labels**: Categorize and filter tasks
- **Comments**: Collaborate with threaded discussions
- **Activity log**: Track all changes automatically

### Advanced Dashboard
Get a bird's eye view of all your work:

- Summary statistics across all boards
- Board grid with quick access and progress indicators
- Upcoming deadlines in the next 7 days
- Recent activity feed across all boards
- Overdue tasks alert panel

### Board Settings & Customization
Fine-tune each board to perfection:

- Custom board descriptions
- Theme color picker with 8 presets plus custom colors
- WIP (Work In Progress) limits per column
- Board deletion with safety confirmation

### My Tasks - Unified View
See all your tasks across all boards in one place:

- Advanced filtering by board, status, priority, and tags
- Multiple sort options: created date, due date, priority, title
- Pagination support for large task lists
- Empty state handling with helpful prompts

### Analytics & Insights
Data-driven productivity:

- **Cycle Time**: Average time from start to completion
- **Throughput**: Tasks completed per week
- **WIP Count**: Current work in progress
- **Completion Stats**: Weekly completion tracking

### Modern UI/UX
Beautiful and functional:

- Glassmorphism design with vibrant gradients
- Dark mode support throughout
- Smooth Framer Motion animations
- Responsive design for all screen sizes
- Fast, SPA-like navigation with Inertia.js

---

## Tech Stack

### Backend
- **Laravel 12** - Modern PHP framework
- **SQLite** - Lightweight database (easily swappable)
- **Laravel Sanctum** - Session-based authentication
- **Inertia.js** - Modern monolith architecture

### Frontend
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **@dnd-kit** - Drag and drop functionality
- **Vite** - Lightning-fast build tool

### Development & Quality
- **PHPUnit** - 73 passing unit tests
- **Test Factories** - Realistic test data
- **Comprehensive Documentation** - 10+ markdown guides
- **Git Version Control** - Clean commit history

---

## Installation

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- NPM or Yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/tarakreasi/kanban-crayon-board.git
cd kanban-crayon-board

# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed database (optional - creates sample data)
php artisan db:seed

# Build frontend assets
npm run build

# Start the development server
php artisan serve
```

Visit `http://localhost:8000` in your browser.

### Default Login
- **Email**: taratask@tarakreasi.com
- **Password**: tarakreasi

---

## Development

### Running in Development Mode

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server (hot reload)
npm run dev
```

### Running Tests

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test --filter=TaskManagementTest

# Run with coverage
php artisan test --coverage
```

### Database Management

```bash
# Fresh migration (caution: deletes all data)
php artisan migrate:fresh

# Fresh migration with seeding
php artisan migrate:fresh --seed

# Rollback last migration
php artisan migrate:rollback
```

---

## Documentation

This project includes comprehensive documentation:

- **[Features Guide](docs/FEATURES.md)** - Detailed feature explanations
- **[User Guide](docs/USER_GUIDE.md)** - End-user manual
- **[Developer Guide](docs/DEVELOPER_GUIDE.md)** - Technical documentation
- **[Architecture](docs/ARCHITECTURE.md)** - System design and patterns
- **[API Reference](docs/API_REFERENCE.md)** - API endpoint documentation
- **[Testing Guide](docs/TESTING.md)** - Testing strategy and coverage
- **[Changelog](docs/CHANGELOG.md)** - Version history
- **[Roadmap](docs/ROADMAP.md)** - Future plans

---

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- Code follows Laravel and React best practices
- All tests pass (`php artisan test`)
- New features include tests
- Documentation is updated

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgments

Built with love using:
- Laravel framework by Taylor Otwell
- React by Meta
- Tailwind CSS by Adam Wathan
- And many other amazing open source projects

---

## Contact

**Tri Wantoro** (tarakreasi)
- Email: ajarsinau@gmail.com
- GitHub: [@tarakreasi](https://github.com/tarakreasi)
- Project: [kanban-crayon-board](https://github.com/tarakreasi/kanban-crayon-board)

---

<div align="center">

**Made with passion for productivity**

*Star this repo if you find it useful!*

</div>
