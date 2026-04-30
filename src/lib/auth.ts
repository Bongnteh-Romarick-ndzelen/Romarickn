import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { db } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-that-is-long-enough' // Use an env variable
const SALT_ROUNDS = 10

// Define the user payload for the token
interface UserPayload {
  id: string
  email: string
  name: string
  role: string
}

export const auth = {
  // Hash password
  hashPassword: async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS)
  },
  
  // Verify password
  verifyPassword: async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash)
  },
  
  // Generate JWT token
  generateToken: (payload: UserPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
  },
  
  // Verify JWT token
  verifyToken: (token: string): UserPayload | null => {
    try {
      return jwt.verify(token, JWT_SECRET) as UserPayload
    } catch (error) {
      return null
    }
  },
  
  // Login user
  login: async (email: string, password: string) => {
    const user = await db.user.findUnique({ where: { email }})
    
    if (!user) {
      throw new Error('User not found')
    }
    
    const isValid = await auth.verifyPassword(password, user.password)
    if (!isValid) {
      throw new Error('Invalid password')
    }
    
    // Generate token
    const token = auth.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
    
    // Set cookie
    cookies().set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    return {
      user: userWithoutPassword,
      token,
    }
  },
  
  // Logout user
  logout: () => {
    cookies().delete('auth_token')
  },
  
  // Get current user from token in cookie
  getCurrentUser: async (): Promise<(UserPayload & { avatar?: string | null }) | null> => {
    const token = cookies().get('auth_token')?.value
    
    if (!token) {
      return null
    }
    
    const decoded = auth.verifyToken(token)
    if (!decoded) {
      return null
    }
    
    // Optionally re-fetch user from DB to ensure data is fresh
    const user = await db.user.findUnique({ where: { id: decoded.id }})
    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    }
  },
  
  // Middleware helper to require authentication
  requireAuth: async () => {
    const user = await auth.getCurrentUser()
    if (!user) {
      throw new Error('Authentication required')
    }
    return user
  },
  
  // Check user roles
  isAdmin: async () => {
    const user = await auth.getCurrentUser()
    return user?.role === 'ADMIN'
  },
  
  isAuthor: async () => {
    const user = await auth.getCurrentUser()
    return user?.role === 'AUTHOR' || user?.role === 'ADMIN' || user?.role === 'EDITOR'
  },

  isEditor: async () => {
    const user = await auth.getCurrentUser()
    return user?.role === 'EDITOR' || user?.role === 'ADMIN'
  },
}
