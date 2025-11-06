import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import WeekNavigator from './components/WeekNavigator';
import ControlsBar from './components/ControlsBar';
import MealGrid from './components/MealGrid';

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun..6=Sat
  const diff = (day === 0 ? -6 : 1) - day; // move to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatWeekLabel(weekStart) {
  const fmt = new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const end = new Date(weekStart.getTime() + 6 * 86400000);
  return `${fmt.format(weekStart)} - ${fmt.format(end)}`;
}

export default function App() {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));
  const [weekData, setWeekData] = useState(() => {
    const saved = localStorage.getItem('mealplanner:data');
    return saved ? JSON.parse(saved) : {};
  });

  const key = useMemo(() => `week:${weekStart.toISOString().slice(0,10)}`, [weekStart]);
  const data = weekData[key] || Array.from({ length: 7 }, () => ({ lunch: '', dinner: '' }));

  useEffect(() => {
    localStorage.setItem('mealplanner:data', JSON.stringify(weekData));
  }, [weekData]);

  const handleChange = (index, field, value) => {
    setWeekData(prev => {
      const next = { ...prev };
      const cur = next[key] ? [...next[key]] : Array.from({ length: 7 }, () => ({ lunch: '', dinner: '' }));
      cur[index] = { ...cur[index], [field]: value };
      next[key] = cur;
      return next;
    });
  };

  const prevWeek = () => setWeekStart(new Date(weekStart.getTime() - 7 * 86400000));
  const nextWeek = () => setWeekStart(new Date(weekStart.getTime() + 7 * 86400000));

  const onClear = () => {
    setWeekData(prev => ({ ...prev, [key]: Array.from({ length: 7 }, () => ({ lunch: '', dinner: '' })) }));
  };

  const onExport = () => {
    const blob = new Blob([JSON.stringify(weekData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'menu-settimanale.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const onImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (typeof parsed === 'object' && parsed) {
          setWeekData(parsed);
        }
      } catch (err) {
        alert('File non valido');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const onPrint = () => {
    window.print();
  };

  const onSave = () => {
    localStorage.setItem('mealplanner:data', JSON.stringify(weekData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50 text-gray-800">
      <Header weekLabel={formatWeekLabel(weekStart)} />
      <WeekNavigator onPrev={prevWeek} onNext={nextWeek} weekStart={weekStart} />
      <ControlsBar onClear={onClear} onExport={onExport} onImport={onImport} onPrint={onPrint} onSave={onSave} />
      <MealGrid weekStart={weekStart} data={data} onChange={handleChange} />
      <footer className="max-w-6xl mx-auto px-4 py-10 text-center text-sm text-gray-500">
        Suggerimento: fai clic su Esporta per salvare e condividere il tuo menu. Puoi importarlo in seguito.
      </footer>
    </div>
  );
}
