const { Client } = require('pg');
require('dotenv').config();

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully!');

    // Get staff IDs
    const res = await client.query('SELECT name, id FROM bluedot_staff');
    const staff = {};
    res.rows.forEach(r => staff[r.name] = r.id);

    const cases = [
      ['BDC-2026-001', 'John Doe', 'active', 'zone_1', 'cf', 'me', '2026-03-27', 'UAE', 'Dubai', 'UK', 'London', staff['Dr. Hesham'], staff['Mr. Lijo'], staff['Mr. Sumith'], 3],
      ['BDC-2026-002', 'Jane Smith', 'on_hold', 'zone_2', 'aa', 'ext', '2026-03-30', 'UAE', 'Abu Dhabi', 'USA', 'New York', staff['Dr. Rahul'], staff['Ms. Muqadas'], staff['Mr. Sumith'], 5]
    ];

    for (const [case_id, patient_name, state, zone, type, t_class, date, o_country, o_city, d_country, d_city, doc_id, nurse_id, cm_id, priority] of cases) {
      // 1. Insert Case
      const caseRes = await client.query(
        `INSERT INTO bluedot_transfer_case 
        (id, case_id, patient_name, state, zone, transfer_type, transfer_class, planned_transfer_date, origin_country, origin_city, destination_country, destination_city, doctor_id, nurse_id, case_manager_id, urgency_priority, create_date, write_date) 
        VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW()) 
        ON CONFLICT (case_id) DO NOTHING RETURNING id`,
        [case_id, patient_name, state, zone, type, t_class, date, o_country, o_city, d_country, d_city, doc_id, nurse_id, cm_id, priority]
      );

      if (caseRes.rows.length > 0) {
        const cid = caseRes.rows[0].id;
        // 2. Insert related models
        await client.query('INSERT INTO bluedot_departure_port (id, case_id, create_date, write_date) VALUES (gen_random_uuid()::text, $1, NOW(), NOW())', [cid]);
        await client.query('INSERT INTO bluedot_arrival_port (id, case_id, create_date, write_date) VALUES (gen_random_uuid()::text, $1, NOW(), NOW())', [cid]);
        await client.query('INSERT INTO bluedot_amc (id, case_id, create_date, write_date) VALUES (gen_random_uuid()::text, $1, NOW(), NOW())', [cid]);
        await client.query('INSERT INTO bluedot_sending_facility (id, case_id, create_date, write_date) VALUES (gen_random_uuid()::text, $1, NOW(), NOW())', [cid]);
        await client.query('INSERT INTO bluedot_receiving_facility (id, case_id, create_date, write_date) VALUES (gen_random_uuid()::text, $1, NOW(), NOW())', [cid]);
      }
    }

    console.log('Seeding demo cases completed!');
  } catch (err) {
    console.error('PG SEED ERROR:', err);
  } finally {
    await client.end();
  }
}

seed();
