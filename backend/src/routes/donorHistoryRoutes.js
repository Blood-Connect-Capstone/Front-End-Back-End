const donorHistoryPresenter = require("../presenters/donorHistoryPresenter");

module.exports = [
    {
        method: "GET",
        path: "/api/v1/donor-histories/user/{userId}",
        handler: donorHistoryPresenter.getDonorHistoryByUser,
    },
    {
        method: "POST",
        path: "/api/v1/donor-histories",
        handler: donorHistoryPresenter.createDonorHistory,
    },
    {
        method: "PUT",
        path: "/api/v1/donor-histories/{id}",
        handler: donorHistoryPresenter.updateDonorHistory,
    },
    {
        method: "DELETE",
        path: "/api/v1/donor-histories/{id}",
        handler: donorHistoryPresenter.deleteDonorHistory,
    },
    {
        method: "GET",
        path: "/api/v1/donation-stats/user/{userId}",
        handler: donorHistoryPresenter.getUserDonationStats,
    },
    {
        method: "GET",
        path: "/api/v1/donation-stats/overall",
        handler: donorHistoryPresenter.getOverallDonationStats,
    }
];