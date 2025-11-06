import React from 'react';
import { Calendar, Utensils } from 'lucide-react';

export default function Header({ weekLabel }) {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
            <Utensils className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Planner Menu Settimanale</h1>
            <p className="text-sm text-gray-500">Organizza pranzo e cena per tutta la settimana</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span className="text-sm">{weekLabel}</span>
        </div>
      </div>
    </header>
  );
}
