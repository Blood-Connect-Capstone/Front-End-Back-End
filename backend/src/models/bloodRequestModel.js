const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
    async getAll() {
        const { rows } = await pool.query(`
            SELECT 
            br.id AS request_id,
            br.location_id,
            br.requester_name,
            br.blood_type,
            br.quantity,
            br.request_date,
            br.notes,
            br.urgency,
            br.status,
            dl.name AS location_name,
            dl.lat,
            dl.lng,
            dl.address,
            dl.phone
            FROM 
            blood_requests br
            JOIN 
            donor_locations dl ON br.location_id = dl.id
        `);
        return rows;
    },
};
