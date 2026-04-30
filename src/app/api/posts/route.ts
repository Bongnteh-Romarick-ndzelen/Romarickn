import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET: Get all published posts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    
    const skip = (page - 1) * limit
    
    const where: any = { published: true }
    
    if (category) {
      where.categories = { some: { slug: category } }
    }
    
    if (tag) {
      where.tags = { some: { slug: tag } }
    }
    
    const [posts, total] = await Promise.all([
      db.post.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          categories: true,
          tags: true,
          _count: {
            select: {
              comments: { where: { approved: true } },
              likes: true,
            },
          },
        },
        orderBy: { publishedAt: 'desc' },
      }),
      db.post.count({ where }),
    ])
    
    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST: Create new post (admin/author only)
export async function POST(request: NextRequest) {
  try {
    const user = await auth.requireAuth()
    
    if (!await auth.isAuthor()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }
    
    const body = await request.json()
    
    // Generate slug from title
    const slug = (body.slug || body.title)
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
    
    const post = await db.post.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        published: body.published || false,
        featured: body.featured || false,
        readTime: body.readTime || calculateReadTime(body.content),
        authorId: user.id,
        categories: {
          connect: body.categories?.map((id: string) => ({ id })) || [],
        },
        tags: {
          connectOrCreate: body.tags?.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') },
          })) || [],
        },
        publishedAt: body.published ? new Date() : null,
      },
      include: {
        author: true,
        categories: true,
        tags: true,
      },
    })
    
    return NextResponse.json(post, { status: 201 })
  } catch (error: any) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
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
