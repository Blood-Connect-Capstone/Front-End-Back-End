const donorReservationPresenter = require('../presenters/donorReservationPresenter');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/donor-reservations/reference/{reservationType}/{referId}/{userId}',
        handler: donorReservationPresenter.getUserDonorReservationsByReference
    },
    {
        method: 'GET',
        path: '/api/v1/donor-reservations/user/{userId}',
        handler: donorReservationPresenter.getDonorReservationsByUserId
    },
    {
        method: 'GET',
        path: '/api/v1/donor-reservations/{id}',
        handler: donorReservationPresenter.getDonorReservationById
    },
    {
        method: 'GET',
        path: '/api/v1/donor-reservations',
        handler: donorReservationPresenter.getAllDonorReservations
    },
    {
        method: 'POST',
        path: '/api/v1/donor-reservations',
        handler: donorReservationPresenter.createDonorReservation
    },
    {
        method: 'PUT',
        path: '/api/v1/donor-reservations/{id}',
        handler: donorReservationPresenter.updateDonorReservation
    },
    {
        method: 'DELETE',
        path: '/api/v1/donor-reservations/{id}',
        handler: donorReservationPresenter.deleteDonorReservation
    },
    {
        method: 'PATCH',
        path: '/api/v1/donor-reservations/date',
        handler: donorReservationPresenter.updateDate
    },
    {
        method: 'PATCH',
        path: '/api/v1/donor-reservations/status',
        handler: donorReservationPresenter.updateStatus
    },
    {
        method: 'PATCH',
        path: '/api/v1/donor-reservations/screening-status',
        handler: donorReservationPresenter.updateScreeningStatus
    },
]