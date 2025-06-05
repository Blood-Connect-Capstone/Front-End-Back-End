const postPresenter = require('../presenters/postPresenter');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/posts',
        handler: postPresenter.getAllPost
    },
    {
        method: 'POST',
        path: '/api/v1/posts',
        handler: postPresenter.createPost
    },
    {
        method: 'PUT',
        path: '/api/v1/posts/{id}',
        handler: postPresenter.updatePost
    },
    {
        method: 'DELETE',
        path: '/api/v1/posts/{id}',
        handler: postPresenter.deletePost
    }
];
