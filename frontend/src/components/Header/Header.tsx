'use client';
import Link from 'next/link';
import { NavLinks } from '../';
import { navLinks } from '@/data/navLinks';

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between max-w-5xl bg-stone-500/30 p-2 rounded-md">
      <h1>
        <Link href="/" className="text-white/90 no-underline hover:text-white text-2xl">Notes</Link>
      </h1>
      <NavLinks navLinks={navLinks} />
    </header>
  );
}