'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <span className="text-3xl">🐍</span>
            <span className="text-2xl font-black text-white">Snark</span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">
            Brace Yourself
          </h1>
          <p className="text-gray-400">
            Sign in to start receiving brutally honest feedback about your terrible code.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <Button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full bg-white text-gray-900 hover:bg-gray-100 flex items-center justify-center gap-3 py-6 text-base font-semibold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Continue with GitHub
          </Button>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              By signing in, you agree to let us judge your code mercilessly.
              <br />
              Your dignity is not covered under our Terms of Service.
            </p>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          <Link href="/" className="hover:text-gray-400 transition-colors">
            ← Actually, maybe I don&apos;t want feedback
          </Link>
        </p>
      </div>
    </div>
  )
}
