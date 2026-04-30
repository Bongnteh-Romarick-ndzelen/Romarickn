// lib/prisma.ts
import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// This is your extended Prisma client
const extendedPrisma = prisma.$extends({
  model: {
    user: {
        async findByEmail(email: string) {
            return prisma.user.findUnique({ where: { email } })
        },
    },
    post: {
      // Find a single post by its ID, including related data
      async findById(id: string) {
        return prisma.post.findUnique({
          where: { id },
          include: {
            author: { select: { id: true, name: true, avatar: true, bio: true } },
            categories: true,
            tags: true,
            comments: {
              where: { approved: true, parentId: null },
              include: {
                replies: {
                  where: { approved: true },
                  include: { user: { select: { name: true, avatar: true } } },
                },
                user: { select: { name: true, avatar: true } },
              },
              orderBy: { createdAt: 'desc' },
            },
            _count: {
              select: {
                comments: { where: { approved: true } },
                likes: true,
                bookmarks: true,
              },
            },
          },
        })
      },
      // Find a single post by its slug, including related data
      async findBySlug(slug: string) {
        return prisma.post.findUnique({
          where: { slug },
          include: {
            author: { select: { id: true, name: true, avatar: true, bio: true } },
            categories: true,
            tags: true,
            comments: {
              where: { approved: true, parentId: null },
              include: {
                replies: {
                  where: { approved: true },
                  include: { user: { select: { name: true, avatar: true } } },
                },
                user: { select: { name: true, avatar: true } },
              },
              orderBy: { createdAt: 'desc' },
            },
            _count: {
              select: {
                comments: { where: { approved: true } },
                likes: true,
                bookmarks: true,
              },
            },
          },
        })
      },
      // Increment the view count for a post
      async incrementViews(id: string) {
        return prisma.post.update({
          where: { id },
          data: { views: { increment: 1 } },
        })
      },
    },
    comment: {
      // Find all unapproved comments for moderation
      async findForModeration() {
        return prisma.comment.findMany({
          where: { approved: false },
          include: {
            post: { select: { title: true, slug: true } },
            user: { select: { name: true, email: true } },
          },
          orderBy: { createdAt: 'desc' },
        })
      }
    }
  },
})


export const db = extendedPrisma

// Define a type for the extended client to use throughout your app
export type ExtendedPrismaClient = typeof db
