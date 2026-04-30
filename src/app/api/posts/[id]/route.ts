import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET: Get single post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const post = await db.post.findBySlug(id) || await db.post.findById(id)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const currentUser = await auth.getCurrentUser()
    if (!post.published && !currentUser) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    // Increment view count only for published posts and for public views
    if (post.published) {
      await db.post.update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
      })
    }
    
    // Re-fetch post to get the updated view count
    const updatedPost = await db.post.findBySlug(id) || await db.post.findById(id);

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Get post error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PUT: Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await auth.requireAuth()
    const { id } = params
    
    const existingPost = await db.post.findUnique({ where: { id }})
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    const isAdmin = await auth.isAdmin();
    if (existingPost.authorId !== user.id && !isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }
    
    const body = await request.json()
    
    const post = await db.post.update({
      where: { id },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        slug: (body.slug || body.title).toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-'),
        coverImage: body.coverImage,
        published: body.published,
        featured: body.featured,
        readTime: body.readTime || calculateReadTime(body.content),
        categories: body.categories ? {
          set: body.categories.map((id: string) => ({ id })),
        } : undefined,
        tags: body.tags ? {
          set: [], // Disconnect all first
          connectOrCreate: body.tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') },
          })),
        } : undefined,
        publishedAt: body.published && !existingPost.publishedAt ? new Date() : existingPost.publishedAt,
      },
      include: {
        author: true,
        categories: true,
        tags: true,
      },
    })
    
    return NextResponse.json(post)
  } catch (error: any) {
    console.error('Update post error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE: Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await auth.requireAuth()
    const { id } = params
    
    if (!await auth.isAdmin()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }
    
    await db.post.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error: any) {
    console.error('Delete post error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete post' },
      { status: 500 }
    )
  }
}

function calculateReadTime(content: string): number {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}
