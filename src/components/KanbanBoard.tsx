"use client";

import { useState } from 'react';
import { Task, Status } from '@/types/task';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableTaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function SortableTaskCard({ task, onEdit, onDelete }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

const columns: { id: Status; title: string; color: string }[] = [
  { id: 'todo', title: 'To Do', color: '#B4A7D6' },
  { id: 'in-progress', title: 'In Progress', color: '#4A90E2' },
  { id: 'done', title: 'Done', color: '#FF8C42' },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design landing page',
      description: 'Create a modern and responsive landing page design',
      priority: 'high',
      status: 'todo',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Setup database',
      description: 'Configure PostgreSQL database and create initial schemas',
      priority: 'medium',
      status: 'in-progress',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Write documentation',
      description: 'Complete API documentation and user guides',
      priority: 'low',
      status: 'done',
      createdAt: new Date(),
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<Status>('todo');
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleAddTask = (status: Status) => {
    setDefaultStatus(status);
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'> & { id?: string }) => {
    if (taskData.id) {
      setTasks(
        tasks.map((task) =>
          task.id === taskData.id
            ? { ...task, ...taskData, id: task.id, createdAt: task.createdAt }
            : task
        )
      );
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date(),
      } as Task;
      setTasks([...tasks, newTask]);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    const overColumn = columns.find((col) => col.id === over.id);
    if (overColumn && activeTask.status !== overColumn.id) {
      setTasks(
        tasks.map((task) =>
          task.id === active.id ? { ...task, status: overColumn.id } : task
        )
      );
    }
  };

  const getTasksByStatus = (status: Status) => {
    return tasks.filter((task) => task.status === status);
  };

  const activeTask = activeId ? tasks.find((task) => task.id === activeId) : null;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            return (
              <div
                key={column.id}
                className="flex flex-col bg-[#F5F5F5] rounded-xl p-4 min-h-[600px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: column.color }}
                    />
                    <h2 className="text-lg font-bold text-gray-800">
                      {column.title}
                    </h2>
                    <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddTask(column.id)}
                    className="h-8 w-8 p-0 bg-white hover:bg-[#4A90E2] hover:text-white text-gray-600 border-0 shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <SortableContext
                  items={columnTasks.map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                  id={column.id}
                >
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    {columnTasks.map((task) => (
                      <SortableTaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                    
                    {columnTasks.length === 0 && (
                      <div className="text-center py-12 text-gray-400">
                        <p className="text-sm">No tasks yet</p>
                        <p className="text-xs mt-1">Click + to add one</p>
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 scale-105">
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
        defaultStatus={defaultStatus}
      />
    </>
  );
}
