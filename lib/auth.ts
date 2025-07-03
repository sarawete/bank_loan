import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export interface User {
  id: string
  email: string
  fullName: string
  password: string
  role: 'user' | 'administrator'
  createdAt: string
}

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')

export function getUsers(): User[] {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return []
    }
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users file:', error)
    return []
  }
}

export function saveUsers(users: User[]): void {
  try {
    const dir = path.dirname(USERS_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error saving users file:', error)
    throw new Error('Failed to save user data')
  }
}

export function findUserByEmail(email: string): User | null {
  const users = getUsers()
  return users.find(user => user.email === email) || null
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const users = getUsers()
  
  // Check if user already exists
  if (findUserByEmail(userData.email)) {
    throw new Error('User already exists')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10)

  const newUser: User = {
    id: Date.now().toString(),
    ...userData,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)

  return newUser
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = findUserByEmail(email)
  if (!user) {
    return null
  }

  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword) {
    return null
  }

  return user
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const userSession = cookieStore.get('user_session')?.value
    
    if (!userSession) {
      return null
    }

    const sessionData = JSON.parse(userSession)
    
    // Find the complete user data using the ID from the session
    const user = getUsers().find(u => u.id === sessionData.id)
    
    if (!user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}