const formPresenter = require('../presenters/formPresenter.js');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/donorform1',
        handler: formPresenter.getAllForms,
    },
    {
        method: 'POST',
        path: '/api/v1/donorform1',
        handler: formPresenter.createForm,  
    }
];