"use client";

import { useState } from "react";
import { Note, DateRange } from "./WallCalendar";
import { Trash2, Calendar, Plus } from "lucide-react";

interface NotesSectionProps {
  notes: Note[];
  selectedRange: DateRange;
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
}

export default function NotesSection({
  notes,
  selectedRange,
  onAddNote,
  onDeleteNote,
}: NotesSectionProps) {
  const [noteText, setNoteText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      onAddNote(noteText.trim());
      setNoteText("");
    }
  };

  const formatDateRange = (dateRange?: DateRange) => {
    if (!dateRange?.start) return "General note";
    if (!dateRange.end) return dateRange.start.toLocaleDateString();
    return `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`;
  };

  return (
    <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Notes
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <Plus className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
        </button>
      </div>

      {/* Add note form */}
      <form onSubmit={handleSubmit} className={`mb-4 ${!isExpanded && 'hidden lg:block'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={
              selectedRange.start
                ? `Add note for ${formatDateRange(selectedRange)}...`
                : "Add a general note..."
            }
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg 
                     bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!noteText.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
        {selectedRange.start && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            This note will be linked to: {formatDateRange(selectedRange)}
          </p>
        )}
      </form>

      {/* Notes list */}
      <div className={`space-y-3 max-h-96 overflow-y-auto ${!isExpanded && 'hidden lg:block'}`}>
        {notes.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center py-8">
            No notes yet. Add your first note above!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg group hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <p className="text-slate-800 dark:text-slate-100 mb-2">{note.text}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDateRange(note.dateRange)}</span>
                  </div>
                </div>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 
                           opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
