'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface DashboardNavProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/settings', label: 'Settings' },
    { href: '/pricing', label: 'Upgrade' },
  ]

  return (
    <nav className="border-b border-gray-800 px-6 py-4 bg-gray-950">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🐍</span>
            <span className="font-bold text-white">Snark</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  pathname === link.href
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name ?? ''}
              width={28}
              height={28}
              className="rounded-full"
            />
          )}
          <span className="text-gray-400 text-sm hidden md:block">{user.name}</span>
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            size="sm"
            variant="ghost"
            className="text-gray-500 hover:text-white hover:bg-gray-800 text-xs"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  )
}
