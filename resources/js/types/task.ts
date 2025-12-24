import { Tag } from './tag';

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'in-review' | 'done';

export interface Task {
  id: string | number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  due_date?: string | null;
  tags?: Tag[];
  updated_at?: string;
  created_at?: string;
}
