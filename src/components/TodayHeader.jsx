import React from 'react';

function formatItalianDate(date) {
  const weekday = new Intl.DateTimeFormat('it-IT', { weekday: 'long' }).format(date);
  const dayMonth = new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  return `${cap(weekday)} · ${dayMonth}`;
}

export default function TodayHeader({ today }) {
  return (
    <header className="w-full sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Menu di Oggi</h1>
          <p className="text-sm text-gray-500">{formatItalianDate(today)}</p>
        </div>
      </div>
    </header>
  );
}
