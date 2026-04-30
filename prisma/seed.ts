// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Create sample categories
  await prisma.category.createMany({
    data: [
      { name: 'Web Development', slug: 'web-development', color: '#3B82F6' },
      { name: 'React', slug: 'react', color: '#61DAFB' },
      { name: 'Next.js', slug: 'nextjs', color: '#000000' },
      { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
      { name: 'Database', slug: 'database', color: '#FF6B6B' },
    ],
    skipDuplicates: true,
  })

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
