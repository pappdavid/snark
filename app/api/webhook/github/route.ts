import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { prisma } from '@/lib/prisma'
import { generateSnarkReview } from '@/lib/ai'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-hub-signature-256')
  const event = req.headers.get('x-github-event')

  const secret = process.env.GITHUB_WEBHOOK_SECRET
  if (secret && signature) {
    const expectedSig = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`
    if (signature !== expectedSig) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  }

  if (event !== 'pull_request') {
    return NextResponse.json({ message: 'Ignored' })
  }

  const payload = JSON.parse(body)
  const { action, pull_request: pr, repository } = payload

  if (action !== 'opened' && action !== 'synchronize') {
    return NextResponse.json({ message: 'Ignored action' })
  }

  const account = await prisma.account.findFirst({
    where: {
      provider: 'github',
      providerAccountId: String(repository.owner.id),
    },
    include: { user: true },
  })

  if (!account) {
    return NextResponse.json({ message: 'No user found for this repo' })
  }

  const user = account.user

  if (user.plan === 'free' && user.reviewsThisMonth >= 3) {
    return NextResponse.json({ message: 'Review limit reached' })
  }

  let repo = await prisma.repository.findFirst({
    where: { userId: user.id, githubId: repository.id },
  })

  if (!repo) {
    repo = await prisma.repository.create({
      data: {
        userId: user.id,
        githubId: repository.id,
        name: repository.name,
        fullName: repository.full_name,
        description: repository.description,
        private: repository.private,
      },
    })
  }

  const review = await prisma.review.create({
    data: {
      userId: user.id,
      repositoryId: repo.id,
      prNumber: pr.number,
      prTitle: pr.title,
      prUrl: pr.html_url,
      status: 'pending',
    },
  })

  generateAndSaveReview(review.id, pr, user.snarkLevel).catch((error) => {
    console.error('Failed to queue review for PR', pr.number, 'in', repository.full_name, ':', error)
  })

  return NextResponse.json({ message: 'Review queued', reviewId: review.id })
}

async function generateAndSaveReview(reviewId: string, pr: Record<string, unknown>, snarkLevel: number) {
  try {
    const diffUrl = pr.diff_url as string | undefined
    const diff = diffUrl ? await fetch(diffUrl).then((r) => r.text()) : 'No diff available'

    const result = await generateSnarkReview({
      prTitle: pr.title as string,
      prBody: (pr.body as string) ?? '',
      diff,
      snarkLevel,
    })

    await prisma.review.update({
      where: { id: reviewId },
      data: {
        status: 'completed',
        cringeScore: result.cringeScore,
        summary: result.summary,
        therapy: result.therapy,
        comments: JSON.stringify(result.comments),
        rawDiff: diff.slice(0, 50000),
      },
    })

    const review = await prisma.review.findUnique({ where: { id: reviewId } })
    if (review) {
      await prisma.user.update({
        where: { id: review.userId },
        data: { reviewsThisMonth: { increment: 1 } },
      })
    }
  } catch (error) {
    console.error('Failed to generate review:', error)
    await prisma.review.update({
      where: { id: reviewId },
      data: { status: 'failed' },
    })
  }
}
