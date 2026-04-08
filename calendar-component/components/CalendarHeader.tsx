"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  isFlipping: boolean;
}

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  isFlipping,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onPrevMonth}
        disabled={isFlipping}
        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
      </div>

      <button
        onClick={onNextMonth}
        disabled={isFlipping}
        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
        aria-label="Next month"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
