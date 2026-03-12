import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/DashboardNav'
import { SettingsForm } from '@/components/SettingsForm'
import { prisma } from '@/lib/prisma'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNav user={session.user} />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black mb-2">Settings</h1>
        <p className="text-gray-400 mb-8">
          Adjust how Snark destroys your confidence, or reduce it slightly.
        </p>

        <SettingsForm user={user} />
      </main>
    </div>
  )
}
