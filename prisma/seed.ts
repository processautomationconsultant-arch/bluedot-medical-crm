import "dotenv/config"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Seeding Probe ---')
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
  } catch (err: any) {
    console.error('DIAGNOSTIC ERROR:', err.message)
    console.error('ERROR CODE:', err.code)
    throw err
  }
}

main()
  .catch((e) => {
    console.error('SEED SCRIPT FAILED!');
    console.error('Full Error Object:', JSON.stringify(e, null, 2));
    console.error('Stack Trace:', e.stack);
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
