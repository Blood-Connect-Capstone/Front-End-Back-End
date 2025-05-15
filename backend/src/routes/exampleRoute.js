const examplePresenter = require('../presenters/examplePresenter');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/users',
        handler: examplePresenter.getAllUsers,
    },
    {
        method: 'POST',
        path: '/api/v1/users',
        handler: examplePresenter.createUser,
    },
    {
        method: 'PUT',
        path: '/api/v1/users/{id}',
        handler: examplePresenter.updateUser,
    },
    {
        method: 'DELETE',
        path: '/api/v1/users/{id}',
        handler: examplePresenter.deleteUser,
    }
];
