"use client";

import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'bg-[#B4A7D6] hover:bg-[#B4A7D6]/80 text-white',
  medium: 'bg-[#4A90E2] hover:bg-[#4A90E2]/80 text-white',
  high: 'bg-[#FF8C42] hover:bg-[#FF8C42]/80 text-white',
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className="p-4 bg-white hover:shadow-lg transition-all duration-200 border-2 border-[#F5F5F5] hover:border-[#4A90E2]/30 cursor-grab active:cursor-grabbing">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800 flex-1 pr-2">{task.title}</h3>
        <Badge className={`${priorityColors[task.priority]} border-0 text-xs px-2 py-1`}>
          {task.priority}
        </Badge>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}
      
      <div className="flex gap-2 justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          className="h-8 w-8 p-0 hover:bg-[#4A90E2]/10 hover:text-[#4A90E2]"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
