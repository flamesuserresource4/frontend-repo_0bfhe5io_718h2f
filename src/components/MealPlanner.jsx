import React from 'react';

const days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

export default function MealPlanner({ meals, onChange }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {days.map((day, idx) => (
          <div key={day} className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-semibold text-gray-800 mb-3">{day}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">Pranzo</label>
                <input
                  type="text"
                  value={meals[idx]?.lunch || ''}
                  onChange={(e) => onChange(idx, 'lunch', e.target.value)}
                  placeholder="Es. Insalata di pollo"
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Cena</label>
                <input
                  type="text"
                  value={meals[idx]?.dinner || ''}
                  onChange={(e) => onChange(idx, 'dinner', e.target.value)}
                  placeholder="Es. Pasta al pesto"
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
