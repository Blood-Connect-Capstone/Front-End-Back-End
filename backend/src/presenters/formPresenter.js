const formModel = require("../models/FormModel.js");

module.exports = {
  async getAllForms(request, h) {
    try {
      const forms = await formModel.getAll();
      return h.response({
        success: true,
        message: "Forms fetched successfully",
        data: forms,
      });
    } catch (err) {
      console.error(err);
      return h
        .response({
          success: false,
          message: "Failed to fetch forms",
          error: err.message,
        })
        .code(500);
    }
  },
  async createForm(request, h) {
    try {
      const form = request.payload;

      if (
        !form.nik?.trim() ||
        !form.full_name?.trim() ||
        !form.gender?.trim() ||
        !form.religion?.trim() ||
        !form.place_of_birth?.trim() ||
        !form.date_of_birth?.trim() ||
        !form.full_address?.trim() ||
        !form.occupation?.trim() ||
        !form.blood_type?.trim() ||
        form.total_previous_donations === undefined ||
        form.weight_kg === undefined ||
        form.height_cm === undefined ||
        !form.province?.trim() ||
        !form.city_or_regency?.trim() ||
        !form.district?.trim() ||
        !form.sub_district?.trim()
      ) {
        return h
          .response({
            success: false,
            message: "All fields are required",
          })
          .code(400);
      }

      const createdForm = await formModel.create(form);
      return h
        .response({
          success: true,
          message: "Form created successfully",
          data: createdForm,
        })
        .code(201);
    } catch (err) {
      console.error(err);
      return h
        .response({
          success: false,
          message: "Failed to create form",
          error: err.message,
        })
        .code(500);
    }
  },
};
