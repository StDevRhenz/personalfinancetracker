import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <span className="font-bold">Finance Tracker</span>
      <div>
        <Link href="/dashboard" className="mr-4">Dashboard</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
