import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

export async function GET() {
  try {
    const user = await auth.requireAuth()

    if (user.role !== 'ADMIN' && user.role !== 'AUTHOR' && user.role !== 'EDITOR') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const posts = await db.post.findMany({
      where: {
        authorId: user.role === 'ADMIN' ? undefined : user.id,
      },
      include: {
        author: {
          select: { name: true }
        },
        categories: {
          select: { name: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ posts })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
