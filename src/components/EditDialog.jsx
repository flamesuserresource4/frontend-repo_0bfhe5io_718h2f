import React, { useRef } from 'react';

export default function EditDialog({ open, onClose, onClear, children }) {
  const dialogRef = useRef(null);

  return (
    <div
      className={`fixed inset-0 ${open ? '' : 'pointer-events-none'} z-50`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className={`absolute inset-x-0 bottom-0 sm:inset-y-0 sm:my-auto sm:max-h-[80vh] sm:max-w-lg sm:mx-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-xl transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full sm:translate-y-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold">Modifica di oggi</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Chiudi</button>
        </div>
        <div className="p-5 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
        <div className="p-5 border-t border-gray-100 flex items-center justify-end gap-3">
          <button onClick={onClear} className="text-sm text-red-600 hover:text-red-700">Pulisci</button>
          <button onClick={onClose} className="bg-black text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800">Fatto</button>
        </div>
      </div>
    </div>
  );
}
