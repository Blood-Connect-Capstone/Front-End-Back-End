const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();
console.log(process.env.database_url);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
    async getAll() {
        const { rows } = await pool.query('SELECT id, name, email, gender, blood_type, rhesus FROM users');
        return rows;
    },

    async create(user) {
        const { name, email, password, gender, bloodType, rhesus } = user;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const query = 'INSERT INTO users(name, email, password, gender, blood_type, rhesus) VALUES($1, $2, $3, $4, $5, $6) RETURNING id';
        const values = [name, email, hashedPassword, gender, bloodType, rhesus];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async login(email, password) {
        const user = await this.getUserByEmail(email);
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },

    async update(id, user) {
        const { name, email, gender, bloodType, rhesus } = user;
        await pool.query('UPDATE users SET name = $1, email = $2, gender = $3, blood_type = $4, rhesus = $5 WHERE id = $6', [name, email, gender, bloodType, rhesus, id]);
    },

    async delete(id) {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    },

    async getUserByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },

    async getUserById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    },
};