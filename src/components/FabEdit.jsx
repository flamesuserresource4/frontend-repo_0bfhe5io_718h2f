import React from 'react';
import { Pencil } from 'lucide-react';

export default function FabEdit({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Modifica"
      className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-3 shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/30"
    >
      <Pencil className="w-4 h-4" />
      <span className="hidden sm:block text-sm font-medium">Modifica</span>
    </button>
  );
}
