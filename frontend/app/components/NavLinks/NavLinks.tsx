'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavLinksProps } from "../";

export default function NavLinks({ navLinks }:NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className='flex gap-2 items-center justify-center'>
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <li key={link.href} className='text-lg'>
            <Link
              className={isActive ? 'text-pink-600' : 'text-bluetext-rose-600'}
              href={link.href}
              key={link.href}
            >
              {link.name}
            </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}