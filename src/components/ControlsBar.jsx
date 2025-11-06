import React, { useRef } from 'react';
import { Download, Upload, Trash2, Printer, Save } from 'lucide-react';

export default function ControlsBar({ onClear, onExport, onImport, onPrint, onSave }) {
  const fileRef = useRef(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-6">
      <div className="flex flex-wrap gap-2">
        <button onClick={onSave} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition">
          <Save className="h-4 w-4" />
          <span>Salva settimana</span>
        </button>
        <button onClick={onClear} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50 transition">
          <Trash2 className="h-4 w-4" />
          <span>Pulisci</span>
        </button>
        <button onClick={onPrint} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50 transition">
          <Printer className="h-4 w-4" />
          <span>Stampa</span>
        </button>
        <button onClick={onExport} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50 transition">
          <Download className="h-4 w-4" />
          <span>Esporta</span>
        </button>
        <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50 transition">
          <Upload className="h-4 w-4" />
          <span>Importa</span>
        </button>
        <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={onImport} />
      </div>
    </div>
  );
}
