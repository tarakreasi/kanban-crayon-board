import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { ListTodo, Filter, SortAsc, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Board {
    id: number;
    title: string;
    theme_color: string;
}

interface Tag {
    id: number;
    name: string;
    color: string;
}

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: string | null;
    board: Board;
    tags: Tag[];
    comments: any[];
}

interface MyTasksProps {
    auth: { user: any };
    tasks: {
        data: Task[];
        current_page: number;
        last_page: number;
    };
    boards: Board[];
    allTags: Tag[];
    filters: {
        board_id: number | null;
        status: string | null;
        priority: string | null;
        tag_id: number | null;
        sort_by: string;
        sort_order: string;
    };
}

export default function MyTasks({ auth, tasks, boards, allTags, filters }: MyTasksProps) {
    const [showFilters, setShowFilters] = useState(false);

    const applyFilter = (key: string, value: any) => {
        router.get(route('my-tasks'), {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
        });
    };

    const clearFilters = () => {
        router.get(route('my-tasks'));
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            case 'medium': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
            case 'low': return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
            default: return '';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'todo': return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
            case 'in-progress': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
            case 'in-review': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
            case 'done': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            default: return '';
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const activeFilterCount = Object.values(filters).filter(v => v && v !== 'created_at' && v !== 'desc').length;

    return (
        <AuthenticatedLayout>
            <Head title="My Tasks" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold dark:text-white flex items-center gap-2">
                                <ListTodo className="w-8 h-8" />
                                My Tasks
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                All your tasks across {boards.length} boards
                            </p>
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="glass-card px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="glass-card p-6 rounded-xl mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Board Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-white">Board</label>
                                    <select
                                        value={filters.board_id || ''}
                                        onChange={(e) => applyFilter('board_id', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    >
                                        <option value="">All Boards</option>
                                        {boards.map(board => (
                                            <option key={board.id} value={board.id}>{board.title}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
                                    <select
                                        value={filters.status || ''}
                                        onChange={(e) => applyFilter('status', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="todo">To Do</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="in-review">In Review</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>

                                {/* Priority Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-white">Priority</label>
                                    <select
                                        value={filters.priority || ''}
                                        onChange={(e) => applyFilter('priority', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    >
                                        <option value="">All Priorities</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>

                                {/* Tag Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-white">Tag</label>
                                    <select
                                        value={filters.tag_id || ''}
                                        onChange={(e) => applyFilter('tag_id', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    >
                                        <option value="">All Tags</option>
                                        {allTags.map(tag => (
                                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Clear all filters
                                </button>

                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium dark:text-white">Sort by:</label>
                                    <select
                                        value={filters.sort_by}
                                        onChange={(e) => applyFilter('sort_by', e.target.value)}
                                        className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 text-sm"
                                    >
                                        <option value="created_at">Created Date</option>
                                        <option value="due_date">Due Date</option>
                                        <option value="priority">Priority</option>
                                        <option value="title">Title</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tasks List */}
                    <div className="space-y-3">
                        {tasks.data.length === 0 ? (
                            <div className="glass-card p-12 rounded-xl text-center">
                                <ListTodo className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold dark:text-white mb-2">No tasks found</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {activeFilterCount > 0
                                        ? 'Try adjusting your filters'
                                        : 'Create your first task to get started'}
                                </p>
                            </div>
                        ) : (
                            tasks.data.map((task) => (
                                <div
                                    key={task.id}
                                    className="glass-card p-4 rounded-xl hover:scale-[1.01] transition-transform cursor-pointer"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: task.board.theme_color }}
                                                />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {task.board.title}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-semibold dark:text-white mb-2">
                                                {task.title}
                                            </h3>

                                            {task.description && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                                    {task.description}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap gap-2">
                                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                                                    {task.status.replace('-', ' ')}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                                {task.tags.map(tag => (
                                                    <span
                                                        key={tag.id}
                                                        className="text-xs px-2 py-1 rounded-full"
                                                        style={{
                                                            backgroundColor: tag.color + '20',
                                                            color: tag.color
                                                        }}
                                                    >
                                                        {tag.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="ml-4 text-right">
                                            {task.due_date && (
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    Due: {formatDate(task.due_date)}
                                                </div>
                                            )}
                                            {task.comments.length > 0 && (
                                                <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                                    💬 {task.comments.length}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {tasks.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {Array.from({ length: tasks.last_page }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => router.get(route('my-tasks'), { ...filters, page })}
                                    className={`px-4 py-2 rounded-lg ${page === tasks.current_page
                                        ? 'bg-indigo-500 text-white'
                                        : 'glass-card hover:scale-105 transition-transform'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
