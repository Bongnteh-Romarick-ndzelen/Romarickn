import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const headersList = await headers()
    
    const comment = await db.comment.create({
      data: {
        content: body.content,
        authorName: body.authorName,
        authorEmail: body.authorEmail,
        authorWebsite: body.authorWebsite,
        authorIp: headersList.get('x-forwarded-for') || 'unknown',
        postId: body.postId,
        parentId: body.parentId,
        userId: body.userId,
        approved: false, // Moderate all comments by default
      },
      include: {
        user: { select: { name: true, avatar: true } },
      },
    })
    
    return NextResponse.json(comment)
  } catch (error) {
    console.error('Create comment error:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
