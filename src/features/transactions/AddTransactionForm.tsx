import React from 'react';

export default function AddTransactionForm() {
  return (
    <form className="space-y-2">
      <input type="text" placeholder="Category" className="border p-1" />
      <input type="number" placeholder="Amount" className="border p-1" />
      <input type="date" className="border p-1" />
      <button type="submit" className="bg-blue-600 text-white px-2 py-1 rounded">Add</button>
    </form>
  );
}
