import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { DashboardNav } from '@/components/DashboardNav'
import { SnarkReview } from '@/components/SnarkReview'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

interface PageProps {
  params: { id: string }
}

export default async function ReviewPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const review = await prisma.review.findFirst({
    where: {
      id: params.id,
      user: { email: session.user.email! },
    },
    include: { repository: true },
  })

  if (!review) notFound()

  const reviewData = {
    prTitle: review.prTitle,
    cringeScore: review.cringeScore ?? undefined,
    summary: review.summary ?? undefined,
    comments: review.comments ? (JSON.parse(review.comments) as any[]) : [],
    therapy: review.therapy ?? undefined,
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNav user={session.user} />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black mb-1">{review.prTitle}</h1>
              <p className="text-gray-500 text-sm">
                {review.repository?.fullName} · PR #{review.prNumber} ·{' '}
                {new Date(review.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </p>
            </div>
            <a
              href={review.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-800 rounded px-3 py-1.5 shrink-0"
            >
              View PR →
            </a>
          </div>
        </div>

        {review.status === 'pending' ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-300 font-medium">Review in progress...</p>
            <p className="text-gray-500 text-sm mt-2">
              Our AI is carefully reading your code and preparing its disappointment.
            </p>
          </div>
        ) : (
          <SnarkReview review={reviewData} />
        )}
      </main>
    </div>
  )
}
