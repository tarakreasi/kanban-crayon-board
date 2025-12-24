import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, BarChart3, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AnalyticsPanelProps {
    open: boolean;
    onClose: () => void;
    data: {
        avgCycleTime: number;
        throughput: number;
        wipCount: number;
        completedCount: number;
    };
    isLoading: boolean;
}

export default function AnalyticsPanel({ open, onClose, data, isLoading }: AnalyticsPanelProps) {
    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] border-0 bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl shadow-2xl text-gray-800 dark:text-gray-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        <BarChart3 className="w-6 h-6 text-blue-500" />
                        Board Analytics
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    {/* Average Cycle Time */}
                    <Card className="bg-white/50 dark:bg-slate-800/50 border-0 shadow-lg backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Cycle Time</CardTitle>
                            <Clock className="w-4 h-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{isLoading ? '...' : data.avgCycleTime}h</div>
                            <p className="text-xs text-muted-foreground">Average time to complete a task</p>
                        </CardContent>
                    </Card>

                    {/* Throughput */}
                    <Card className="bg-white/50 dark:bg-slate-800/50 border-0 shadow-lg backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Throughput (7d)</CardTitle>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{isLoading ? '...' : data.throughput}</div>
                            <p className="text-xs text-muted-foreground">Tasks completed in last 7 days</p>
                        </CardContent>
                    </Card>

                    {/* Current WIP */}
                    <Card className="bg-white/50 dark:bg-slate-800/50 border-0 shadow-lg backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Current WIP</CardTitle>
                            <Activity className="w-4 h-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{isLoading ? '...' : data.wipCount}</div>
                            <p className="text-xs text-muted-foreground">Tasks currently in progress</p>
                        </CardContent>
                    </Card>

                    {/* Total Completed */}
                    <Card className="bg-white/50 dark:bg-slate-800/50 border-0 shadow-lg backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Completed</CardTitle>
                            <BarChart3 className="w-4 h-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{isLoading ? '...' : data.completedCount}</div>
                            <p className="text-xs text-muted-foreground">Lifetime completed tasks</p>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}
