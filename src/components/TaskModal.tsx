"use client";

import { useState, useEffect } from 'react';
import { Task, Priority, Status } from '@/types/task';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt'> & { id?: string }) => void;
  task?: Task | null;
  defaultStatus?: Status;
}

export default function TaskModal({ open, onClose, onSave, task, defaultStatus = 'todo' }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [status, setStatus] = useState<Status>(defaultStatus);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setStatus(defaultStatus);
    }
  }, [task, defaultStatus]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      id: task?.id,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    });

    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus(defaultStatus);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white border-2 border-[#4A90E2]/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-800">
            {task ? 'Edit Task' : 'Add New Task'}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {task ? 'Update the task details below.' : 'Create a new task for your board.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700 font-medium">
              Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="border-2 border-gray-200 focus:border-[#4A90E2]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="border-2 border-gray-200 focus:border-[#4A90E2] min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-gray-700 font-medium">
                Priority
              </Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger className="border-2 border-gray-200 focus:border-[#4A90E2]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-700 font-medium">
                Status
              </Label>
              <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
                <SelectTrigger className="border-2 border-gray-200 focus:border-[#4A90E2]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-2 border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim()}
            className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white border-0"
          >
            {task ? 'Update' : 'Create'} Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
