import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function WeekNavigator({ onPrev, onNext, weekStart }) {
  const formatter = new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: '2-digit' });
  const weekRange = `${formatter.format(weekStart)} - ${formatter.format(new Date(weekStart.getTime() + 6 * 86400000))}`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-6 flex items-center justify-between">
      <button onClick={onPrev} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50 transition">
        <ChevronLeft className="h-4 w-4" />
        <span>Settimana prec.</span>
      </button>
      <div className="text-sm text-gray-600">{weekRange}</div>
      <button onClick={onNext} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50 transition">
        <span>Settimana succ.</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
