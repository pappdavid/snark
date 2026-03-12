import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { snarkLevel } = await req.json()

  if (typeof snarkLevel !== 'number' || snarkLevel < 1 || snarkLevel > 10) {
    return NextResponse.json({ error: 'Invalid snark level' }, { status: 400 })
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { snarkLevel: Math.round(snarkLevel) },
  })

  return NextResponse.json({ success: true })
}
