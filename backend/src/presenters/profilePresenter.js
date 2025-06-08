const profileModel = require("../models/profileModel");

module.exports = {
  async getAllProfile(request, h) {
    try {
      const profiles = await profileModel.getAll();

      return h
        .response({
          success: true,
          data: profiles,
          message: "Profiles fetched successfully",
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          success: false,
          message: "Failed to fetch profiles",
          error: err.message,
        })
        .code(500);
    }
  },

  async getProfileById(request, h) {
    try {
      const { id } = request.params;
      const profile = await profileModel.getById(id);

      return h
        .response({
          success: true,
          data: profile,
          message: "Profile fetched successfully",
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          success: false,
          message: "Profile not found",
          error: err.message,
        })
        .code(404);
    }
  },

  async createProfile(request, h) {
    try {
      const profile = await profileModel.create(request.payload);

      return h
        .response({
          success: true,
          data: profile,
          message: "Profile created successfully",
        })
        .code(201);
    } catch (err) {
      return h
        .response({
          success: false,
          message: "Failed to create profile",
          error: err.message,
        })
        .code(500);
    }
  },

  async updateProfile(request, h) {
    try {
      const { id } = request.params;
      const updatedProfile = await profileModel.update(id, request.payload);

      return h
        .response({
          success: true,
          data: updatedProfile,
          message: "Profile updated successfully",
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          success: false,
          message: "Failed to update profile",
          error: err.message,
        })
        .code(500);
    }
  },

  async deleteProfile(request, h) {
    try {
      const { id } = request.params;
      await profileModel.delete(id);

      return h
        .response({
          success: true,
          message: "Profile deleted successfully",
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          success: false,
          message: "Failed to delete profile",
          error: err.message,
        })
        .code(500);
    }
  },
  async getProfile(request, h) {
    try {
      const { id } = request.auth.credentials;
      const profile = await profileModel.getById(id);

      if (!profile) {
        return h
          .response({
            success: false,
            message: "Profile not found",
          })
          .code(404);
      }

      return h
        .response({
          success: true,
          data: profile,
          message: "Profile fetched successfully",
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          success: false,
          message: "Failed to fetch profile",
          error: err.message,
        })
        .code(500);
    }
  },
  async updateProfileImage(request, h) {
    try {
      const { id } = request.auth.credentials;
      const { image } = request.payload;

      const imageUrl = await saveImageSomewhere(image, id);
      await profileModel.update(id, { photo: imageUrl });

      return h
        .response({
          success: true,
          data: { imageUrl },
          message: "Profile photo updated",
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          success: false,
          message: "Failed to update profile photo",
          error: err.message,
        })
        .code(500);
    }
  },
};
