const donorLocationPresenter = require('../presenters/donorLocationPresenter');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/donor-locations',
        handler: donorLocationPresenter.getAllDonorLocation
    },
    {
        method: 'GET',
        path: '/api/v1/donor-locations/{id}',
        handler: donorLocationPresenter.getDonorLocationById
    },
    {
        method: 'POST',
        path: '/api/v1/donor-locations',
        handler: donorLocationPresenter.createDonorLocation
    },
    {
        method: 'PUT',
        path: '/api/v1/donor-locations/{id}',
        handler: donorLocationPresenter.updateDonorLocation
    },
    {
        method: 'DELETE',
        path: '/api/v1/donor-locations/{id}',
        handler: donorLocationPresenter.deleteDonorLocation
    }
];
