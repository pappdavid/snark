'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface User {
  id: string
  snarkLevel: number
  plan: string
  githubUsername?: string | null
}

interface SettingsFormProps {
  user: User | null
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [snarkLevel, setSnarkLevel] = useState(user?.snarkLevel ?? 5)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const snarkLabels: Record<number, string> = {
    1: 'Mildly Rude',
    2: 'Somewhat Sarcastic',
    3: 'Noticeably Snarky',
    4: 'Sharply Critical',
    5: 'Moderately Brutal',
    6: 'Quite Savage',
    7: 'Very Brutal',
    8: 'Extremely Savage',
    9: 'Nearly No Filter',
    10: 'Absolutely Savage',
  }

  async function saveSettings() {
    setSaving(true)
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ snarkLevel }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-1">GitHub Integration</h2>
        <p className="text-gray-400 text-sm mb-6">
          Connect your GitHub account to automatically review pull requests.
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-gray-300 text-sm">
              Connected as{' '}
              <span className="font-mono text-white">@{user?.githubUsername ?? 'unknown'}</span>
            </span>
          </div>
          <a
            href="https://github.com/apps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300"
          >
            Install GitHub App →
          </a>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-1">Snark Level</h2>
        <p className="text-gray-400 text-sm mb-6">
          How brutal should the AI be? Choose wisely. Your mental health depends on it.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">😌 Mildly Rude</span>
            <span className="text-white font-bold text-sm">
              {snarkLevel}/10 — {snarkLabels[snarkLevel]}
            </span>
            <span className="text-gray-400 text-xs">💀 Absolutely Savage</span>
          </div>

          <input
            type="range"
            min={1}
            max={10}
            value={snarkLevel}
            onChange={(e) => setSnarkLevel(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />

          <p className="text-gray-500 text-xs text-center">
            {snarkLevel <= 3
              ? 'The AI will be gently critical. Like a kind uncle who thinks your code is mediocre.'
              : snarkLevel <= 6
              ? 'The AI will be clearly snarky. Buckle up.'
              : snarkLevel <= 8
              ? 'The AI will be brutal. Not for the faint-hearted.'
              : 'The AI will show absolutely no mercy. You asked for this.'}
          </p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-1">Current Plan</h2>
        <p className="text-gray-400 text-sm mb-4">
          You are on the{' '}
          <span className="text-white font-bold capitalize">{user?.plan ?? 'free'}</span> plan.
        </p>
        {user?.plan === 'free' && (
          <a href="/pricing">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Upgrade to Pro
            </Button>
          </a>
        )}
      </div>

      <Button
        onClick={saveSettings}
        disabled={saving}
        className="bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Settings'}
      </Button>
    </div>
  )
}
