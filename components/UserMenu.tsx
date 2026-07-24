'use client'

import { signOut } from 'next-auth/react'
import { useState, useRef, useEffect } from 'react'
import { Session } from 'next-auth'
import { SignOutButton } from './SignOutButton'

interface UserMenuProps {
  session: Session | null
}

export default function UserMenu({ session }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  if (!session?.user) return null

  const initials = session.user.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U'

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
          {initials}
        </div>
        <span className="text-white text-sm font-medium hidden sm:block pr-2">
          {session.user.name || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute animate-in fade-in zoom-in-50 top-full duration-300 right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-100 py-2 z-50" role="menu" aria-orientation="vertical">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {session.user.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {session.user.email}
            </p>
          </div>
          <SignOutButton />
        </div>
      )}
    </div>
  )
}