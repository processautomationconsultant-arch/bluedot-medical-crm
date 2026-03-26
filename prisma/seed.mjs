import "dotenv/config"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- MJS Seeding Probe ---')
  try {
    await prisma.$connect()
    console.log('Successfully connected to database.')
    
    console.log('Creating initial staff member...')
    const result = await prisma.bluedot_staff.upsert({
      where: { staff_id: 'BDS-001' },
      update: {},
      create: { staff_id: 'BDS-001', name: 'Dr. Hesham', role: 'doctor', email: 'hesham@bluedot.com' },
    })
    console.log('Staff created:', result.id)
  } catch (err) {
    console.error('DIAGNOSTIC ERROR:', err.message)
    console.error('ERROR CODE:', err.code)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
