import React from 'react';
import { Coffee, Utensils, Moon } from 'lucide-react';

const Field = ({ label, icon: Icon, value, onChange, placeholder }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-gray-500" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full resize-none rounded-md border border-gray-200 focus:border-gray-300 focus:ring-0 p-3 text-gray-800 placeholder:text-gray-400 min-h-[72px]"
    />
  </div>
);

export default function MealsToday({ values, onChange }) {
  return (
    <section className="max-w-3xl mx-auto px-6 py-6 grid gap-4">
      <Field
        label="Colazione"
        icon={Coffee}
        value={values.breakfast}
        onChange={(v) => onChange('breakfast', v)}
        placeholder="Cosa mangio a colazione?"
      />
      <Field
        label="Pranzo"
        icon={Utensils}
        value={values.lunch}
        onChange={(v) => onChange('lunch', v)}
        placeholder="Cosa mangio a pranzo?"
      />
      <Field
        label="Cena"
        icon={Moon}
        value={values.dinner}
        onChange={(v) => onChange('dinner', v)}
        placeholder="Cosa mangio a cena?"
      />
    </section>
  );
}
