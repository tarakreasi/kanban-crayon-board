# taraTask Kanban Crayon Board 🎨

<div align="center">

**A modern, multi-board Kanban application built with Laravel, React, and Inertia.js**

*Beautiful glassmorphism design meets powerful productivity features*

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 About Kanban Crayon Board

**Kanban Crayon Board** is a full-stack web application designed to bring joy and efficiency to task management. Built as part of the **taraTask** suite, this project demonstrates modern web development practices while delivering a delightful user experience.

### 🎯 Why I Built This

Like many developers, I juggle multiple projects, ideas, and tasks daily. I tried various task management tools—Trello, Asana, Notion—but **none felt quite right**. They were either:
- 🔒 Too rigid (can't customize the workflow)
- 💰 Behind expensive paywalls (for basic features)
- 🎨 Visually uninspiring (boring UI that doesn't spark joy)
- 🐌 Slow and bloated (too many features I don't need)

So I built **Kanban Crayon Board** as **my daily driver** for personal and professional task management. This isn't just a portfolio piece—it's the tool I use every day to:
- 📝 Track my freelance projects
- 💡 Organize side project ideas
- 🎯 Plan learning goals and courses
- ✅ Manage personal todos

### 💭 Built for Real Use, Shared for Others

What started as a personal productivity tool evolved into a full-featured Kanban system. I wanted to prove that you can build something **beautiful, functional, and performant** without enterprise budgets or massive teams.

**The philosophy:**
- ✨ **Visual delight** - Work should be enjoyable to look at
- 🚀 **Speed first** - No loading spinners, instant feedback
- 🎨 **Customizable** - Your workflow, your colors, your rules
- 🔓 **Open source** - Take it, modify it, make it yours

### 🌟 Make It Your Own

This is **your** Kanban board now. Whether you're:
- 👨‍💻 A developer tracking bugs and features
- 🎨 A designer organizing client projects
- 📚 A student planning assignments
- 🏃 A freelancer managing multiple clients
- 💼 A team lead coordinating sprints

**Customize it to fit your workflow.** Change the colors, rename the columns, add features you need. The code is clean, well-documented, and ready for your personal touch.

### 🎯 Project Vision

Traditional Kanban boards are functional but often feel sterile and uninspiring. Kanban Crayon Board breaks this mold by combining:

- **Visual Delight**: Glassmorphism UI with vibrant gradients and smooth animations
- **Productivity Power**: Advanced features like WIP limits, analytics, and activity tracking
- **Developer Excellence**: Clean architecture, comprehensive testing, and thorough documentation

This is not just a task manager—it's a showcase of what happens when design thinking meets technical craftsmanship.

---

## 📸 Screenshots

### Dashboard - Overview & Analytics
![Dashboard](docs/screenshots/dashboard.png)

### Kanban Board - Task Management
![Kanban Board](docs/screenshots/kanban.png)

### My Tasks - Unified View
![My Tasks](docs/screenshots/my-tasks.png)

---

## ✨ Key Features

### 🎨 **Multi-Board System**
Organize your work across multiple boards, each with its own custom theme color that dynamically applies throughout the interface.

- Create unlimited boards
- Custom theme colors per board
- Easy board switching from sidebar
- Inline board creation and deletion

### 📋 **Powerful Kanban Management**
A intuitive 4-column workflow that adapts to your needs:

- **To Do** → **In Progress** → **In Review** → **Done**
- Drag-and-drop tasks between columns
- Quick-add tasks from column headers
- Inline editing with double-click
- Optimistic UI updates for instant feedback

### 🚀 **Productivity Tools**

#### Due Dates
Set deadlines with color-coded visual indicators:
- 🟢 Green: Due in the future
- 🟡 Yellow: Due soon (within 3 days)
- 🔴 Red: Overdue

#### WIP Limits
Enforce flow by setting Work-In-Progress limits per column with visual alerts when exceeded.

#### Labels & Tags
Categorize tasks with custom board-specific tags and color coding.

#### Comments & Discussion
Collaborate with inline comments on each task, complete with timestamps and user avatars.

#### Analytics Dashboard
Track your productivity with metrics including:
- Average Cycle Time
- Throughput (7-day window)
- Current Work in Progress (WIP)
- Completion trends

### 🎭 **Beautiful UI/UX**

- **Glassmorphism Design**: Frosted glass effects with backdrop blur
- **Dark Mode**: Full dark theme support with elegant navy palette
- **Responsive Design**: Seamless experience from mobile to desktop
- **Smooth Animations**: Framer Motion-powered transitions
- **Celebration Effects**: Confetti burst on task completion
- **Global Search**: Instant task filtering

### 🔐 **Authentication & Profile**

- Secure authentication with Laravel Breeze
- Profile management with avatar uploads
- Session-based security
- Inline profile editing in sidebar

---

## 🛠️ Technology Stack

### Backend
- **Laravel 12**: Modern PHP framework with elegant syntax
- **SQLite/MySQL**: Flexible database options
- **Inertia.js**: Modern monolith architecture (SPA without APIs)

### Frontend
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe component development
- **Tailwind CSS 4**: Utility-first styling
- **dnd-kit**: Accessible drag-and-drop
- **Framer Motion**: Production-ready animations
- **Lucide Icons**: Beautiful, consistent iconography

### Developer Tools
- **Vite**: Lightning-fast build tool
- **PHPUnit**: Comprehensive backend testing
- **Vitest**: Frontend unit testing
- **Laravel Pint**: Code formatting

---

## 🚀 Quick Start

### Prerequisites
- PHP 8.3+
- Composer
- Node.js 18+ & npm
- SQLite or MySQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kanban-crayon-board.git
   cd kanban-crayon-board
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Set up database**
   ```bash
   # For SQLite (default)
   touch database/database.sqlite
   php artisan migrate --seed
   
   # This creates a demo user:
   # Email: taratask@tarakreasi.com
   # Password: tarakreasi
   ```

5. **Link storage (for avatar uploads)**
   ```bash
   php artisan storage:link
   ```

6. **Start development servers**
   ```bash
   npm start
   # This runs both the Laravel server and Vite dev server
   ```

7. **Access the application**
   ```
   http://localhost:8000
   ```

### Default Credentials
```
Email: taratask@tarakreasi.com
Password: tarakreasi
```

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

### 📖 **User Documentation**
- **[Features Guide](docs/FEATURES.md)** ⭐ *NEW* - Complete feature documentation with detailed explanations
- **[User Guide](docs/USER_GUIDE.md)** ⭐ *NEW* - Step-by-step manual for end users with examples

### 💻 **Developer Documentation**
- **[Developer Guide](docs/DEVELOPER_GUIDE.md)** ⭐ *NEW* - Setup, development workflows, and best practices
- **[Architecture](docs/ARCHITECTURE.md)** ⭐ *NEW* - System design patterns and technical decisions
- **[API Reference](docs/API_REFERENCE.md)** - Complete API endpoint documentation
- **[Testing Guide](docs/TESTING.md)** - Test coverage and testing practices

### 📋 **Product Management**
- **[Product Requirements (PRD)](docs/PRD.md)** - Vision, goals, and feature specifications
- **[PRD v1.1 "Crayon Focus"](docs/PRDv1.1.md)** - Enhanced feature set
- **[Product Roadmap](docs/ROADMAP.md)** - 6-month strategic timeline
- **[Feature Status](docs/FEATURE_STATUS.md)** - Implementation tracking
- **[Changelog](docs/CHANGELOG.md)** - Version history

### 🎨 **Design Documentation**
- **[UI/UX Concept](docs/UI_UX_CONCEPT.md)** - Design philosophy and system
- **[User Stories](docs/USER_STORIES.md)** - User-centered design stories

### 📊 **Project Management**
- **[Success Metrics](docs/SUCCESS_METRICS.md)** - OKR framework and KPIs
- **[Risk Assessment](docs/RISK_ASSESSMENT.md)** - Risk matrix and mitigation
- **[Sprint Log](docs/SPRINT_LOG.md)** - Development retrospectives

---

## 🧪 Testing

### Run Backend Tests
```bash
php artisan test
# or with coverage
php artisan test --coverage
```

### Run Frontend Tests
```bash
npm run test
# or watch mode
npm run test:watch
```

### Test Coverage
The project includes comprehensive tests for:
- ✅ Task CRUD operations
- ✅ Board management
- ✅ User authentication
- ✅ Activity logging
- ✅ Tag and comment systems
- ✅ Analytics calculations

---

## 🎨 Design Philosophy

### "Crayon Focus" Aesthetic

The interface follows the **Crayon Focus** design language:

1. **Playful yet Professional**: Vibrant colors balanced with clean layouts
2. **Glassmorphism**: Frosted glass effects create depth and hierarchy
3. **Motion-Rich**: Smooth animations that enhance (not distract from) productivity
4. **Dark-Mode First**: Both themes are first-class citizens
5. **Accessibility**: WCAG AA compliant color contrasts

### Color System
- **Light Mode**: Indigo-purple-pink gradient with soft pastels
- **Dark Mode**: Rich navy palette with subtle color tints
- **Dynamic Theming**: Board colors influence the entire UI

---

## 📊 Project Structure

```
├── app/
│   ├── Http/Controllers/     # Backend logic
│   ├── Models/               # Eloquent models
│   └── Policies/             # Authorization
├── database/
│   ├── migrations/           # Database schema
│   └── seeders/              # Sample data
├── resources/
│   ├── js/
│   │   ├── Components/       # React components
│   │   ├── Pages/            # Inertia pages
│   │   └── Layouts/          # Page layouts
│   └── css/                  # Global styles
├── routes/
│   └── web.php               # Application routes
├── tests/
│   ├── Feature/              # Integration tests
│   └── Unit/                 # Unit tests
└── docs/                     # Documentation
```

---

## 🔄 Development Workflow

### Available Scripts
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run test         # Run frontend tests
php artisan serve    # Start Laravel server
php artisan test     # Run backend tests
npm start            # Run both servers concurrently
```

### Code Quality
```bash
composer pint        # Format PHP code
npm run lint         # Lint JavaScript/TypeScript
```

---

## 🚧 Roadmap

### v1.3 (Planned)
- [ ] Server-side search with filters
- [ ] Task templates
- [ ] Bulk actions
- [ ] Export boards (JSON/CSV)

### v2.0 (Future)
- [ ] Real-time collaboration
- [ ] Mobile apps (React Native)
- [ ] Third-party integrations
- [ ] Advanced reporting

See the full [Roadmap](docs/ROADMAP.md) for details.

---

## 🤝 Contributing

This is currently a portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Design Inspiration**: Glassmorphism.com, Dribbble
- **Icons**: [Lucide Icons](https://lucide.dev)
- **Fonts**: [Inter](https://rsms.me/inter/) by Rasmus Andersson
- **Community**: Laravel, React, and Tailwind communities

---

## 📧 Contact

**Project**: Kanban Crayon Board (taraTask)  
**Portfolio**: [https://tarakreasi.com/taraTask]  
**Email**: ajarsinau@gmail.com

---

<div align="center">

**Made with ❤️ and ☕ by the taraTask team**

⭐ Star this repo if you find it helpful!

</div>
