import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    CheckCircle2,
    AlertCircle,
    Clock,
    TrendingUp,
    Calendar,
    Activity as ActivityIcon
} from 'lucide-react';

interface Board {
    id: number;
    title: string;
    theme_color: string;
    tasks_count: number;
    total_tasks_count: number;
}

interface Task {
    id: number;
    title: string;
    status: string;
    priority: string;
    due_date: string;
    board: Board;
    tags: Array<{ id: number; name: string; color: string }>;
}

interface ActivityItem {
    id: number;
    type: string;
    description: string;
    created_at: string;
    task: {
        id: number;
        title: string;
        board: Board;
    };
}

interface DashboardProps {
    auth: { user: any };
    boards: Board[];
    stats: {
        totalTasks: number;
        completedThisWeek: number;
        overdueTasks: number;
        inProgress: number;
    };
    upcomingTasks: Task[];
    recentActivity: ActivityItem[];
    overdueTasks: Task[];
}

export default function Dashboard({ auth, boards, stats, upcomingTasks, recentActivity, overdueTasks }: DashboardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMins = Math.floor(diffInMs / 60000);

        if (diffInMins < 1) return 'just now';
        if (diffInMins < 60) return `${diffInMins}m ago`;

        const diffInHours = Math.floor(diffInMins / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    const StatCard = ({ icon: Icon, label, value, color }: any) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-xl"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                    <p className="text-3xl font-bold mt-2 dark:text-white">{value}</p>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </motion.div>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold dark:text-white flex items-center gap-2">
                            <LayoutDashboard className="w-8 h-8" />
                            Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Overview of all your work across boards
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={LayoutDashboard}
                            label="Total Tasks"
                            value={stats.totalTasks}
                            color="bg-blue-500"
                        />
                        <StatCard
                            icon={CheckCircle2}
                            label="Completed This Week"
                            value={stats.completedThisWeek}
                            color="bg-green-500"
                        />
                        <StatCard
                            icon={AlertCircle}
                            label="Overdue"
                            value={stats.overdueTasks}
                            color="bg-red-500"
                        />
                        <StatCard
                            icon={Clock}
                            label="In Progress"
                            value={stats.inProgress}
                            color="bg-amber-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Boards & Upcoming */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Boards Grid */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                                    <LayoutDashboard className="w-5 h-5" />
                                    Your Boards
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {boards.map((board, index) => (
                                        <motion.div
                                            key={board.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link href={`/?board_id=${board.id}`}>
                                                <div className="glass-card p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div
                                                            className="w-4 h-4 rounded-full"
                                                            style={{ backgroundColor: board.theme_color }}
                                                        />
                                                        <h3 className="font-semibold dark:text-white">{board.title}</h3>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            {board.total_tasks_count} tasks
                                                        </span>
                                                        <span className="text-green-600 dark:text-green-400">
                                                            {board.tasks_count} completed
                                                        </span>
                                                    </div>
                                                    <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                                                            style={{
                                                                width: `${board.total_tasks_count > 0
                                                                    ? (board.tasks_count / board.total_tasks_count) * 100
                                                                    : 0}%`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Tasks */}
                            {upcomingTasks.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Upcoming Deadlines
                                    </h2>
                                    <div className="glass-card p-6 rounded-xl space-y-3">
                                        {upcomingTasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-medium dark:text-white">{task.title}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {task.board.title}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                                                        {formatDate(task.due_date)}
                                                    </span>
                                                    {task.tags.length > 0 && (
                                                        <div className="flex gap-1 mt-1 justify-end">
                                                            {task.tags.slice(0, 2).map(tag => (
                                                                <span
                                                                    key={tag.id}
                                                                    className="text-xs px-2 py-0.5 rounded"
                                                                    style={{ backgroundColor: tag.color + '20', color: tag.color }}
                                                                >
                                                                    {tag.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Activity Feed */}
                        <div>
                            <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                                <ActivityIcon className="w-5 h-5" />
                                Recent Activity
                            </h2>
                            <div className="glass-card p-4 rounded-xl space-y-3 max-h-[600px] overflow-y-auto">
                                {recentActivity.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                                    >
                                        <div className="flex-shrink-0">
                                            {activity.type === 'created' && (
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <TrendingUp className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                            {activity.type === 'moved' && (
                                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                                    <TrendingUp className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                            {activity.type === 'updated' && (
                                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                                                    <Clock className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm dark:text-white truncate font-medium">
                                                {activity.task.title}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                {activity.task.board.title} • {getTimeAgo(activity.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Overdue Tasks Alert */}
                    {overdueTasks.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 glass-card p-6 rounded-xl border-l-4 border-red-500"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                                <h3 className="text-lg font-bold dark:text-white">
                                    {overdueTasks.length} Overdue Task{overdueTasks.length > 1 ? 's' : ''}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {overdueTasks.slice(0, 4).map((task) => (
                                    <div
                                        key={task.id}
                                        className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                                    >
                                        <p className="font-medium dark:text-white">{task.title}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {task.board.title} • Due {formatDate(task.due_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
