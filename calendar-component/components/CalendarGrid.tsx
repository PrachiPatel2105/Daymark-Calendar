"use client";

import { DateRange } from "./WallCalendar";

interface CalendarGridProps {
  currentDate: Date;
  selectedRange: DateRange;
  setSelectedRange: (range: DateRange) => void;
  isFlipping: boolean;
}

export default function CalendarGrid({
  currentDate,
  selectedRange,
  setSelectedRange,
  isFlipping,
}: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Create array of day objects
  const days = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  const handleDayClick = (date: Date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      // Start new selection
      setSelectedRange({ start: date, end: null });
    } else {
      // Complete selection
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: date });
      }
    }
  };

  const isDateInRange = (date: Date): boolean => {
    if (!selectedRange.start) return false;
    if (!selectedRange.end) return date.getTime() === selectedRange.start.getTime();
    
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const isStartDate = (date: Date): boolean => {
    return selectedRange.start?.getTime() === date.getTime();
  };

  const isEndDate = (date: Date): boolean => {
    return selectedRange.end?.getTime() === date.getTime();
  };

  const isToday = (date: Date): boolean => {
    return date.getTime() === today.getTime();
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`transition-all duration-300 ${isFlipping ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const inRange = isDateInRange(date);
          const isStart = isStartDate(date);
          const isEnd = isEndDate(date);
          const isTodayDate = isToday(date);

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDayClick(date)}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                transition-all duration-200 relative
                ${inRange
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }
                ${isStart || isEnd ? 'ring-2 ring-blue-700 ring-offset-2 dark:ring-offset-slate-800' : ''}
                ${isTodayDate && !inRange ? 'ring-2 ring-slate-400 dark:ring-slate-500' : ''}
              `}
            >
              {date.getDate()}
              {isTodayDate && !inRange && (
                <div className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selection info */}
      {selectedRange.start && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
          <p className="text-blue-800 dark:text-blue-200">
            {selectedRange.end ? (
              <>
                Selected: {selectedRange.start.toLocaleDateString()} - {selectedRange.end.toLocaleDateString()}
              </>
            ) : (
              <>
                Start date: {selectedRange.start.toLocaleDateString()} (click another date to complete range)
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
