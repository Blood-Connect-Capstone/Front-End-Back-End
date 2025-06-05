const commentPresenter = require('../presenters/commentPresenter');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/comments',
        handler: commentPresenter.getAllComment
    },
    {
        method: 'GET',
        path: '/api/v1/comments/{id}',
        handler: commentPresenter.getCommentById
    },
    {
        method: 'POST',
        path: '/api/v1/comments',
        handler: commentPresenter.createComment
    },
    {
        method: 'PUT',
        path: '/api/v1/comments/{id}',
        handler: commentPresenter.updateComment
    },
    {
        method: 'DELETE',
        path: '/api/v1/comments/{id}',
        handler: commentPresenter.deleteComment
    }
];
