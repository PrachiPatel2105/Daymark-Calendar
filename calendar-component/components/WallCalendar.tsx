"use client";

import { useState, useEffect } from "react";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";
import CalendarHeader from "./CalendarHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  text: string;
  dateRange?: DateRange;
  createdAt: Date;
}

const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1548777123-e216912df7d8?w=1200&q=85&fit=crop", // January - Snowy winter landscape
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=85&fit=crop", // February - Valentine hearts/love
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=85&fit=crop", // March - Spring flowers blooming
  "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?w=1200&q=85&fit=crop", // April - Cherry blossoms
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop", // May - Mountain landscape
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85&fit=crop", // June - Sunny beach
  "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&q=85&fit=crop", // July - Tropical paradise
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=85&fit=crop", // August - Sunset nature
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=85&fit=crop", // September - Forest path
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85&fit=crop", // October - Autumn leaves
  "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200&q=85&fit=crop", // November - Cozy fall
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&q=85&fit=crop", // December - Winter wonderland
];

export default function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("calendar-notes");
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      setNotes(parsed.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        dateRange: note.dateRange ? {
          start: note.dateRange.start ? new Date(note.dateRange.start) : null,
          end: note.dateRange.end ? new Date(note.dateRange.end) : null,
        } : undefined,
      })));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes]);

  const handlePrevMonth = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
      setIsFlipping(false);
    }, 300);
  };

  const handleNextMonth = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
      setIsFlipping(false);
    }, 300);
  };

  const addNote = (text: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      text,
      dateRange: selectedRange.start ? { ...selectedRange } : undefined,
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const monthImage = MONTH_IMAGES[currentDate.getMonth()];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-0">
          {/* Left: Image Section */}
          <div className="col-span-1 relative">
            <div className={`h-full transition-all duration-300 ${isFlipping ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <img
                src={monthImage}
                alt={`${currentDate.toLocaleString('default', { month: 'long' })} theme`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {currentDate.toLocaleString('default', { month: 'long' })}
                </h1>
                <p className="text-xl text-white/90">{currentDate.getFullYear()}</p>
              </div>
            </div>
          </div>

          {/* Middle: Calendar Grid */}
          <div className="col-span-2 p-8">
            <CalendarHeader
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              isFlipping={isFlipping}
            />
            <CalendarGrid
              currentDate={currentDate}
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              isFlipping={isFlipping}
            />
            <NotesSection
              notes={notes}
              selectedRange={selectedRange}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Image Section */}
          <div className="relative h-64">
            <div className={`h-full transition-all duration-300 ${isFlipping ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <img
                src={monthImage}
                alt={`${currentDate.toLocaleString('default', { month: 'long' })} theme`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-3xl font-bold text-white mb-1">
                  {currentDate.toLocaleString('default', { month: 'long' })}
                </h1>
                <p className="text-lg text-white/90">{currentDate.getFullYear()}</p>
              </div>
            </div>
          </div>

          {/* Calendar and Notes */}
          <div className="p-6">
            <CalendarHeader
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              isFlipping={isFlipping}
            />
            <CalendarGrid
              currentDate={currentDate}
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              isFlipping={isFlipping}
            />
            <NotesSection
              notes={notes}
              selectedRange={selectedRange}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
