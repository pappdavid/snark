import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/DashboardNav'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      repositories: { orderBy: { createdAt: 'desc' }, take: 10 },
      reviews: { orderBy: { createdAt: 'desc' }, take: 5, include: { repository: true } },
    },
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNav user={session.user} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black mb-2">
            Welcome back, {session.user.name?.split(' ')[0]}. 😬
          </h1>
          <p className="text-gray-400">
            Ready to discover what you did wrong this time?
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Reviews This Month', value: user?.reviewsThisMonth ?? 0 },
            { label: 'Connected Repos', value: user?.repositories.length ?? 0 },
            { label: 'Total Reviews', value: user?.reviews.length ?? 0 },
            { label: 'Plan', value: user?.plan === 'pro' ? '⭐ Pro' : user?.plan === 'team' ? '👥 Team' : '🆓 Free' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
            {(user?.reviews.length ?? 0) === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <p className="text-gray-400">No reviews yet. Install the GitHub App to get started.</p>
                <Link href="/settings" className="mt-4 inline-block">
                  <Button size="sm" className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                    Connect GitHub
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {user?.reviews.map((review) => (
                  <Link key={review.id} href={`/review/${review.id}`}>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-indigo-800 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{review.prTitle}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {review.repository?.fullName} · PR #{review.prNumber}
                          </p>
                        </div>
                        {review.cringeScore !== null && (
                          <div className={`shrink-0 text-xs font-bold px-2 py-1 rounded ${
                            review.cringeScore >= 8 ? 'bg-red-900 text-red-300' :
                            review.cringeScore >= 5 ? 'bg-yellow-900 text-yellow-300' :
                            'bg-green-900 text-green-300'
                          }`}>
                            {review.cringeScore}/10
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Connected Repositories</h2>
              <Link href="/settings">
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800 text-xs">
                  Manage
                </Button>
              </Link>
            </div>
            {(user?.repositories.length ?? 0) === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <div className="text-4xl mb-3">🔗</div>
                <p className="text-gray-400 text-sm">No repositories connected yet.</p>
                <Link href="/settings" className="mt-4 inline-block">
                  <Button size="sm" className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                    Add Repository
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {user?.repositories.map((repo) => (
                  <div key={repo.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{repo.fullName}</p>
                        {repo.description && (
                          <p className="text-gray-500 text-xs mt-1 truncate max-w-[200px]">{repo.description}</p>
                        )}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${repo.enabled ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-500'}`}>
                        {repo.enabled ? 'Active' : 'Paused'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
