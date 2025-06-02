const { Pool } = require("pg");
require("dotenv").config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  async getAll() {
    const { rows } = await pool.query("SELECT * FROM public.donorform1");
    return rows;
  },

  async create(form) {
    const {
      nik,
      full_name,
      gender,
      religion,
      place_of_birth,
      date_of_birth,
      full_address,
      occupation,
      blood_type,
      total_previous_donations,
      weight_kg,
      height_cm,
      province,
      city_or_regency,
      district,
      sub_district,
      last_donation_date,
      last_donation_location,
      previous_donor_card_number,
    } = form;

    const query = `
      INSERT INTO public.donorform1 (
        nik, full_name, gender, religion, place_of_birth, date_of_birth, full_address, occupation,
        blood_type, total_previous_donations, weight_kg, height_cm, province, city_or_regency,
        district, sub_district, last_donation_date, last_donation_location, previous_donor_card_number
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
      )
      RETURNING *;
    `;
    const values = [
      nik,
      full_name,
      gender,
      religion,
      place_of_birth,
      date_of_birth,
      full_address,
      occupation,
      blood_type,
      total_previous_donations,
      weight_kg,
      height_cm,
      province,
      city_or_regency,
      district,
      sub_district,
      last_donation_date || null,
      last_donation_location || null,
      previous_donor_card_number || null,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
};
