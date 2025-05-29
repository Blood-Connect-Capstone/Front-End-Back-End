const bloodRequestPresenter = require('../presenters/bloodRequestPresenter');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/blood-requests',
        handler: bloodRequestPresenter.getAllBloodRequest,
    },
];
