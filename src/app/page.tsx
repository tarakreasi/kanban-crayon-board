"use client";

import KanbanBoard from '@/components/KanbanBoard';
import { LayoutGrid } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-[#4A90E2]/10 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#4A90E2] to-[#B4A7D6] p-2 rounded-lg shadow-md">
                <LayoutGrid className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#FF8C42] bg-clip-text text-transparent">
                  Kanban Board
                </h1>
                <p className="text-sm text-gray-500">Organize your tasks efficiently</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#B4A7D6]"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#4A90E2]"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#FF8C42]"></div>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <KanbanBoard />
      </main>

      {/* Footer */}
      <footer className="mt-12 pb-8 text-center text-sm text-gray-500">
        <p>Drag and drop tasks between columns to update their status</p>
      </footer>
    </div>
  );
}