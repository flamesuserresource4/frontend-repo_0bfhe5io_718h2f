import React, { useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ShoppingList({ meals }) {
  const items = useMemo(() => {
    const list = [];
    meals.forEach((m) => {
      const all = [m?.lunch || '', m?.dinner || ''].join(',');
      all.split(',').map((s) => s.trim()).filter(Boolean).forEach((i) => list.push(i));
    });
    // Simple unique list
    return Array.from(new Set(list));
  }, [meals]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8">
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="flex items-center gap-2 p-4 border-b">
          <ShoppingCart className="h-5 w-5 text-emerald-600" />
          <h3 className="font-semibold">Lista della Spesa</h3>
        </div>
        {items.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">Aggiungi i piatti per generare automaticamente gli ingredienti.</p>
        ) : (
          <ul className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {items.map((it) => (
              <li key={it} className="text-sm text-gray-700 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                {it}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
