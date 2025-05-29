const donorLocationPresenter = require('../presenters/donorLocationPresenter');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/donor-locations',
        handler: donorLocationPresenter.getAllDonorLocation,
    },
    {
        method: 'POST',
        path: '/api/v1/donor-locations',
        handler: donorLocationPresenter.createDonorLocation,
    }
];
