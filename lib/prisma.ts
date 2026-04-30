// lib/prisma.ts
import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const extendedPrisma = prisma.$extends({
  model: {
    user: {
      async create(data: Prisma.UserCreateInput) {
        if (data.password) {
          data.password = await bcrypt.hash(data.password, 10)
        }
        return prisma.user.create({ data })
      },
      async findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } })
      },
    },
    post: {
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
      async incrementViews(id: string) {
        return prisma.post.update({
          where: { id },
          data: { views: { increment: 1 } },
        })
      },
    },
    comment: {
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

export type ExtendedPrismaClient = typeof extendedPrisma
