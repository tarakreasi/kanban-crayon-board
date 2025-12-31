# taraTask

![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?style=flat&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3.0-003B57?style=flat&logo=sqlite&logoColor=white)

> **"Built with the logic of a technician, the stability of an integrator, and the empathy of customer service."**

---

## The Story Behind The Code

Hi, I'm **Tri Wantoro**. This project is not just a collection of code; it is the culmination of an **18-year journey** through the layers of technology.

### The "Full-Stack" Evolution
My path to software engineering is a continuous ascent through the layers of technology, giving me a unique 360 perspective:

* **2007 - 2011: The Voice of the User (Customer Service)**
    * *Lesson:* I learned exactly how users feel when technology fails. Empathy is my first debugging tool.
    * *Impact on Code:* I design UI/UX to minimize user frustration, focusing on clear error messages and intuitive flows.

* **2012 - 2017: The Logic of Hardware (Electronics Technician)**
    * *Lesson:* Fixing circuit boards taught me strict logic. Input -> Process -> Output. If a component fails, the system dies.
    * *Impact on Code:* I treat software components like electronic parts modular, testable, and precise.

* **2017 - Present: The Stability of Systems (System Integrator)**
    * *Status:* **Active Role.**
    * *Lesson:* Handling Milestone VMS, Linux Servers, and Integration in critical environments (Airports/Enterprise).
    * *Impact on Code:* I build with a "Production First" mindset. Security, logging, and server resource management are never afterthoughts.

* **2022 - Present: The Builder (Software Engineer Pivot)**
    * *Mission:* While maintaining critical systems by day, I am bridging my experience to build robust web solutions using **Laravel & React** by night.

---

## Project Overview

**taraTask** is a Kanban board application designed to streamline personal and professional task management with visual clarity and system reliability.

I built this project to bridge the gap I often see in the field: software that works technically but fails practically. Leveraging my background in **Product Thinking** and **System Integration**, this application focuses on reliability and user ease-of-use without unnecessary complexity.

### Key Features
* **Multi-Board Architecture:** Organize different aspects of life (Work, Personal, Learning) in isolated environments.
* **Visual Task Management:** Drag-and-drop interface that provides immediate visual feedback, mimicking physical interaction.
* **Systematic Productivity:** Features like WIP (Work In Progress) limits designed to prevent cognitive overload.

---

## Tech Stack & Engineering Decisions

| Component | Tech Selection | Engineering Context (The "Why") |
|-----------|---------------|---------------------------------|
| **Backend** | **Laravel 12** | Chosen for its robust ecosystem and strict structure, mirroring the Standard Operating Procedures (SOP) I use in system integration. |
| **Frontend** | **React 19** | React's component-based architecture reminds me of modular electronics easy to isolate, test, and replace. |
| **Styling** | **Tailwind CSS 4** | Utility-first CSS allows for rapid UI development without sacrificing consistency. |
| **Database** | **SQLite** | Lightweight and reliable, perfect for portable deployments while maintaining strict relational integrity. |
| **Infrastructure** | **Linux (Ubuntu)** | Developed on a Linux environment to ensure seamless deployment and server compatibility (permissions, cron, etc). |

### Technical Highlight: From Hardware to Software
**Challenge:** Handling real-time state updates across a Kanban board without race conditions.

**Solution (The RCA Approach):**
Applying my **Root Cause Analysis** mindset:
1.  **Isolate:** Separated the drag-and-drop logic into a dedicated component using `@dnd-kit`.
2.  **Trace:** Implemented optimistic UI updates to ensure the interface feels responsive immediately (Input), while confirming with the server asynchronously (Process).
3.  **Resolve:** Used database transactions to ensure that if a task move fails on the server, the UI reverts instantly, maintaining data integrity (Output).

---

## Installation & Setup

Since I am accustomed to Linux CLI environments, here is the standard setup to get this running on your local machine:

```bash
# 1. Clone the repository
git clone https://github.com/tarakreasi/taratask.git

# 2. Navigate to directory
cd taratask

# 3. Install Dependencies
composer install
npm install

# 4. Environment Setup
cp .env.example .env
# Don't forget to configure your database in .env file, or use default SQLite

# 5. Generate Key & Migrate
php artisan key:generate
php artisan migrate --seed

# 6. Run Development Server
# Terminal 1
php artisan serve

# Terminal 2
npm run dev

# Or use the local startup script if available
# ./local-serve.sh
```

---

## Retrospective: What I Learned
"Software is just hardware that you can change instantly. But the discipline to maintain it should remain the same."

* **Simplify First:** Deleting unnecessary code is harder than writing new code.
* **Production Mindset:** Running on localhost is easy. Preparing for a Linux VPS deployment requires understanding permissions and environment variables.
* **User-Centricity:** A feature is only "done" when the user can use it without reading a manual a lesson from my Customer Service days.

---

## Connect with Me
I am currently a System Integrator actively pivoting to a professional Fullstack Engineering role. I am ready to bring the reliability of a senior technician and the creativity of a developer to your team.

* **LinkedIn:** [linkedin.com/in/twantoro](https://linkedin.com/in/twantoro)
* **GitHub:** [github.com/tarakreasi](https://github.com/tarakreasi)
* **Email:** ajarsinau@gmail.com

**"Ajarsinau"** means "Learning to Learn". It represents my commitment to continuous evolution from hardware to software, from technician to engineer.
