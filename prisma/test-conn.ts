import "dotenv/config"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test() {
  try {
    console.log('Testing connection...')
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 20) + '...')
    const staffCount = await prisma.bluedot_staff.count()
    console.log('Connection successful! Staff count:', staffCount)
  } catch (error) {
    console.error('Connection failed!')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

test()
