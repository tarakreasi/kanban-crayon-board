"use client";

import { useState, useRef, useEffect } from 'react';
import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, MoreHorizontal, Clock, Calendar, MessageSquare, Tag as TagIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import axios from 'axios';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string | number) => void;
  isOverlay?: boolean;
}

const priorityStyles = {
  low: {
    badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    text: 'Low Priority'
  },
  medium: {
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    text: 'Medium Priority'
  },
  high: {
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    text: 'High Priority'
  },
};

const getDueDateStyle = (dueDate: string | null | undefined) => {
  if (!dueDate) return null;
  const due = new Date(dueDate);
  const now = new Date();
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/30', label: 'Overdue' };
  if (diffDays === 0) return { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30', label: 'Today' };
  if (diffDays <= 2) return { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30', label: `${diffDays}d left` };
  return { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30', label: due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
};

export default function TaskCard({ task, onEdit, onDelete, isOverlay }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(task.title);
  }, [task.title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (title.trim() === task.title) {
      setIsEditing(false);
      return;
    }

    if (!title.trim()) {
      setTitle(task.title);
      setIsEditing(false);
      return;
    }

    try {
      await axios.put(`/tasks/${task.id}`, {
        ...task,
        title: title
      }, {
        headers: { 'Accept': 'application/json' }
      });

      setIsEditing(false);
      router.reload({ only: ['tasks'] });
    } catch (error) {
      console.error('Failed to update task:', error);
      setTitle(task.title); // Revert on error
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`relative overflow-hidden p-4 backdrop-blur-xl transition-all cursor-grab active:cursor-grabbing group rounded-xl
        ${isOverlay
          ? 'bg-white/90 dark:bg-slate-800/90 border-orange-500 dark:border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)] dark:shadow-[0_0_20px_rgba(251,146,60,0.3)] scale-[1.02] ring-1 ring-orange-400/50'
          : 'bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 border border-gray-200/80 dark:border-white/10 shadow-[0_4px_20px_0_rgba(0,0,0,0.02)]'
        }`}
      >
        {/* Subtle Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="flex justify-between items-start mb-2 relative z-10">
          <span className={`${priorityStyles[task.priority].badge} bg-opacity-70 dark:bg-opacity-20 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md`}>
            {task.priority}
          </span>
          <button className="text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Due Date Badge */}
        {task.due_date && (() => {
          const style = getDueDateStyle(task.due_date);
          return style ? (
            <div className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md mb-2 w-fit relative z-10 ${style.bg} ${style.color}`}>
              <Clock className="w-3 h-3" />
              {style.label}
            </div>
          ) : null;
        })()}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2 relative z-10">
            {task.tags.map(tag => (
              <span
                key={tag.id}
                className="text-[10px] font-medium px-1.5 py-0.5 rounded-md border"
                style={{
                  backgroundColor: tag.color + '15',
                  color: tag.color,
                  borderColor: tag.color + '40'
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="w-full text-sm font-medium mb-2 leading-snug p-1 -ml-1 rounded border-blue-300 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 dark:text-white dark:border-slate-700 relative z-10"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <h4
            onDoubleClick={() => setIsEditing(true)}
            className="text-gray-800 dark:text-gray-100 font-medium text-sm mb-2 leading-snug cursor-text hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative z-10"
            title="Double click to edit"
          >
            {task.title}
          </h4>
        )}

        {task.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 relative z-10">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 relative z-10">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-7 w-7 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-500 dark:hover:text-blue-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-7 w-7 p-0 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {/* Metadata Indicators */}
            <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500">
              {(task as any).comments?.length > 0 && (
                <span className="flex items-center gap-0.5">
                  <MessageSquare className="w-3 h-3" />
                  {(task as any).comments.length}
                </span>
              )}
              {task.tags && task.tags.length > 0 && (
                <span className="flex items-center gap-0.5">
                  <TagIcon className="w-3 h-3" />
                  {task.tags.length}
                </span>
              )}
            </div>

            <div className="text-gray-400 dark:text-gray-500 text-[10px] flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date((task as any).created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
