import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateSnarkReview } from '@/lib/ai'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  if (user.plan === 'free' && user.reviewsThisMonth >= 3) {
    return NextResponse.json(
      { error: 'Monthly review limit reached. Upgrade to Pro for unlimited reviews.' },
      { status: 429 }
    )
  }

  const { prTitle, prBody, diff, repositoryId, prNumber, prUrl } = await req.json()

  const result = await generateSnarkReview({
    prTitle,
    prBody: prBody ?? '',
    diff: diff ?? '',
    snarkLevel: user.snarkLevel,
  })

  const review = await prisma.review.create({
    data: {
      userId: user.id,
      repositoryId,
      prNumber: prNumber ?? 0,
      prTitle,
      prUrl: prUrl ?? '#',
      status: 'completed',
      cringeScore: result.cringeScore,
      summary: result.summary,
      therapy: result.therapy,
      comments: JSON.stringify(result.comments),
    },
  })

  await prisma.user.update({
    where: { id: user.id },
    data: { reviewsThisMonth: { increment: 1 } },
  })

  return NextResponse.json({ reviewId: review.id, ...result })
}
