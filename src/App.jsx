import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import WeekNavigator from './components/WeekNavigator';
import MealPlanner from './components/MealPlanner';
import ShoppingList from './components/ShoppingList';

function startOfWeek(date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // make Monday=0
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() - day);
  return d;
}

export default function App() {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));
  const [meals, setMeals] = useState(Array(7).fill(null).map(() => ({ lunch: '', dinner: '' })));

  const weekLabel = useMemo(() => {
    const fmt = new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
    const end = new Date(weekStart.getTime() + 6 * 86400000);
    return `${fmt.format(weekStart)} - ${fmt.format(end)}`;
  }, [weekStart]);

  const handleChange = (dayIndex, field, value) => {
    setMeals((prev) => {
      const next = prev.map((d) => ({ ...d }));
      next[dayIndex][field] = value;
      return next;
    });
  };

  const goPrev = () => setWeekStart(new Date(weekStart.getTime() - 7 * 86400000));
  const goNext = () => setWeekStart(new Date(weekStart.getTime() + 7 * 86400000));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 text-gray-900">
      <Header weekLabel={weekLabel} />
      <WeekNavigator onPrev={goPrev} onNext={goNext} weekStart={weekStart} />
      <MealPlanner meals={meals} onChange={handleChange} />
      <ShoppingList meals={meals} />
      <footer className="max-w-6xl mx-auto px-4 py-12 text-xs text-gray-500">
        Suggerimento: inserisci piatti separati da virgola per generare una lista della spesa rapida.
      </footer>
    </div>
  );
}
