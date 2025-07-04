const profilePresenter = require("../presenters/profilePresenter");

module.exports = [
  {
    method: "GET",
    path: "/api/v1/profiles",
    handler: profilePresenter.getAllProfile,
  },
  {
    method: "GET",
    path: "/api/v1/profiles/{id}",
    handler: profilePresenter.getProfileById,
  },
  {
    method: "POST",
    path: "/api/v1/profiles",
    handler: profilePresenter.createProfile,
  },
  {
    method: "PUT",
    path: "/api/v1/profiles/{id}",
    handler: profilePresenter.updateProfile,
  },
  {
    method: "DELETE",
    path: "/api/v1/profiles/{id}",
    handler: profilePresenter.deleteProfile,
  },
  {
    method: "POST",
    path: "/api/v1/profile/image",
    handler: profilePresenter.updateProfileImage,
    options: {
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        maxBytes: 1048576 * 5,
      },
    },
  },
];
