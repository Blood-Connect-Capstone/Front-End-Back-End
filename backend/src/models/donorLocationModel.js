const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
    async getAll() {
        const { rows } = await pool.query('SELECT * FROM donor_locations');
        return rows;
    },

    async create(donorLocation) {
        const { name, address, lat, lng } = donorLocation;
        const query = `
            INSERT INTO donor_locations (name, address, lat, lng)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [name, address, lat, lng];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
};