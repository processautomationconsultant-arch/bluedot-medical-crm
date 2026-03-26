const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function main() {
  console.log('--- JS SEED TEST ---')
  console.log('DATABASE_URL starts with:', process.env.DATABASE_URL?.substring(0, 15))
  try {
    const count = await prisma.bluedot_staff.count()
    console.log('Staff count:', count)
  } catch (error) {
    console.error('JS SEED ERROR:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
