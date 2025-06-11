const userPointsPresenter = require("../presenters/userPointPresenter");

module.exports = [
    {
        method: "GET",
        path: "/api/v1/user-points/user/{userId}",
        handler: userPointsPresenter.getUserPointsByUser,
    },
    {
        method: "POST",
        path: "/api/v1/user-points",
        handler: userPointsPresenter.createUserPoints,
    },
    {
        method: "PUT",
        path: "/api/v1/user-points/{id}",
        handler: userPointsPresenter.updateUserPoints,
    },
    {
        method: "DELETE",
        path: "/api/v1/user-points/{id}",
        handler: userPointsPresenter.deleteUserPoints,
    },
    {
        method: "GET",
        path: "/api/v1/points-stats/user/{userId}",
        handler: userPointsPresenter.getUserPointsStats,
    },
    {
        method: "GET",
        path: "/api/v1/points-stats/overall",
        handler: userPointsPresenter.getOverallPointsStats,
    },
    {
        method: "GET",
        path: "/api/v1/points-stats/by-source",
        handler: userPointsPresenter.getPointsBySource,
    }
];