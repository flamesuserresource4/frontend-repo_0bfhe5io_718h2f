import React from 'react';
import { Soup, Moon } from 'lucide-react';

const dayNames = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

export default function MealGrid({ weekStart, data, onChange }) {
  const formatter = new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: '2-digit' });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {dayNames.map((name, idx) => {
        const date = new Date(weekStart.getTime() + idx * 86400000);
        const dayData = data[idx] || { lunch: '', dinner: '' };
        return (
          <div key={idx} className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
              <div className="font-medium">{name}</div>
              <div className="text-sm text-gray-500">{formatter.format(date)}</div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Soup className="h-4 w-4 text-emerald-600" /> Pranzo
                </label>
                <input
                  type="text"
                  value={dayData.lunch}
                  onChange={(e) => onChange(idx, 'lunch', e.target.value)}
                  placeholder="Es. Pasta al pomodoro, insalata..."
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Moon className="h-4 w-4 text-indigo-600" /> Cena
                </label>
                <input
                  type="text"
                  value={dayData.dinner}
                  onChange={(e) => onChange(idx, 'dinner', e.target.value)}
                  placeholder="Es. Zuppa di verdure, pollo alla piastra..."
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
