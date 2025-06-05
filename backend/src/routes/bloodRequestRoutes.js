const bloodRequestPresenter = require('../presenters/bloodRequestPresenter');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/blood-requests',
        handler: bloodRequestPresenter.getAllBloodRequests
    },
    {
        method: 'GET',
        path: '/api/v1/blood-requests/{id}',
        handler: bloodRequestPresenter.getBloodRequestById
    },
    {
        method: 'POST',
        path: '/api/v1/blood-requests',
        handler: bloodRequestPresenter.createBloodRequest
    },
    {
        method: 'PUT',
        path: '/api/v1/blood-requests/{id}',
        handler: bloodRequestPresenter.updateBloodRequest
    },
    {
        method: 'DELETE',
        path: '/api/v1/blood-requests/{id}',
        handler: bloodRequestPresenter.deleteBloodRequest
    }
];
