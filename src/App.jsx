import React, { useEffect, useMemo, useState } from 'react';
import TodayHeader from './components/TodayHeader';
import MealsToday from './components/MealsToday';
import FabEdit from './components/FabEdit';
import EditDialog from './components/EditDialog';

// Utilities for week-based storage compatible with previous data shape
function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun..6=Sat
  const diff = (day === 0 ? -6 : 1) - day; // move to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

const dayIndexMon0 = (date) => {
  // Monday=0 .. Sunday=6
  const js = date.getDay();
  return js === 0 ? 6 : js - 1;
};

export default function App() {
  const [today] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // Load full storage so we remain compatible with existing week-based structure
  const [store, setStore] = useState(() => {
    try {
      const saved = localStorage.getItem('mealplanner:data');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const weekKey = useMemo(() => `week:${startOfWeek(today).toISOString().slice(0, 10)}`, [today]);
  const index = useMemo(() => dayIndexMon0(today), [today]);

  const todayValues = useMemo(() => {
    const week = store[weekKey] || Array.from({ length: 7 }, () => ({ breakfast: '', lunch: '', dinner: '' }));
    const entry = week[index] || { breakfast: '', lunch: '', dinner: '' };
    // Ensure fields exist even if older schema lacked breakfast
    return { breakfast: entry.breakfast || '', lunch: entry.lunch || '', dinner: entry.dinner || '' };
  }, [store, weekKey, index]);

  // Persist on store changes
  useEffect(() => {
    localStorage.setItem('mealplanner:data', JSON.stringify(store));
  }, [store]);

  const updateField = (field, value) => {
    setStore((prev) => {
      const next = { ...prev };
      const week = next[weekKey]
        ? next[weekKey].map((d) => ({ breakfast: d.breakfast || '', lunch: d.lunch || '', dinner: d.dinner || '' }))
        : Array.from({ length: 7 }, () => ({ breakfast: '', lunch: '', dinner: '' }));
      const current = week[index] || { breakfast: '', lunch: '', dinner: '' };
      week[index] = { ...current, [field]: value };
      next[weekKey] = week;
      return next;
    });
  };

  const clearToday = () => {
    setStore((prev) => {
      const next = { ...prev };
      const week = next[weekKey]
        ? next[weekKey].map((d) => ({ breakfast: '', lunch: '', dinner: '' }))
        : Array.from({ length: 7 }, () => ({ breakfast: '', lunch: '', dinner: '' }));
      week[index] = { breakfast: '', lunch: '', dinner: '' };
      next[weekKey] = week;
      return next;
    });
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-indigo-50 text-gray-800">
      <TodayHeader today={today} />

      <MealsToday values={todayValues} onChange={updateField} />

      <FabEdit onClick={() => setOpen(true)} />

      <EditDialog open={open} onClose={() => setOpen(false)} onClear={clearToday}>
        <MealsToday values={todayValues} onChange={updateField} />
      </EditDialog>

      <footer className="max-w-3xl mx-auto px-6 py-10 text-center text-xs text-gray-500">
        Solo il giorno attuale. Tocca Modifica per aggiornare.
      </footer>
    </div>
  );
}
