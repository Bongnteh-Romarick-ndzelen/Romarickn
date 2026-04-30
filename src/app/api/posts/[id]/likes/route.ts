import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params
    const body = await request.json()
    const headersList = await headers()
    
    const like = await db.like.create({
      data: {
        postId,
        userId: body.userId,
        userIp: headersList.get('x-forwarded-for') || 'unknown',
        userAgent: headersList.get('user-agent') || 'unknown',
      },
    })
    
    return NextResponse.json(like)
  } catch (error) {
    console.error('Like error:', error)
    return NextResponse.json(
      { error: 'Failed to like post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params
    const body = await request.json()
    
    await db.like.deleteMany({
      where: {
        postId,
        OR: [
          { userId: body.userId },
          { userIp: body.userIp },
        ],
      },
    })
    
    return NextResponse.json({ message: 'Unliked successfully' })
  } catch (error) {
    console.error('Unlike error:', error)
    return NextResponse.json(
      { error: 'Failed to unlike post' },
      { status: 500 }
    )
  }
}
