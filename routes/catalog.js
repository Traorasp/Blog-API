var express = require('express');
var router = express.Router();

const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');
const commentControllers = require('../controllers/commentControllers');

/// POST ROUTES ///

// GET request for blog list
router.get('/', postControllers.post_list_get);

// GET request for creating a post
router.get('/post/create', postControllers.post_create_get);

// POST request for creating a post
router.post('/post/create', postControllers.post_create_post);

// GET request for updating a post
router.get('/post/:id/update', postControllers.post_update_get);

// POST request for updating a post
router.post('/post/:id/update', postControllers.post_update_post);

// GET request for deleting a post
router.post('/post/:id/delete', postControllers.post_delete_post);

// POST request for deleting a post
router.get('/post/:id', postControllers.post_detail_get);

/// USER ROUTES ///

// GET request for sign in
router.get('/signin', userControllers.user_signin_get);

// POST request for sign in
router.post('/signin', userControllers.user_signin_post);

// POST request for sign out
router.post('/signout', userControllers.user_signout_post);

/// COMMENT ROUTES ///

// GET request for creating a comment
router.get('/comment/create', commentControllers.comment_create_get);

// POST request for creating a comment
router.post('/comment/create', commentControllers.comment_create_post);

// POST request for deleting a comment
router.post('/comment/:id/delete', commentControllers.comment_delete_post);

module.exports = router;
