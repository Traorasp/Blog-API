var express = require('express');
var router = express.Router();

const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');
const commentControllers = require('../controllers/commentControllers');

/// POST ROUTES ///

// GET request for blog list(Only those published)
router.get('/', postControllers.post_list_get);

// GET request for blog list
router.get('/posts', postControllers.post_list_get_all);

// POST request for creating a post
router.post('/post/create', postControllers.post_create_post);

// POST request for updating a post
router.post('/post/:id/update', postControllers.post_update_post);

// POST request for deleting a post
router.post('/post/:id/delete', postControllers.post_delete_post);

// GET request for post details
router.get('/post/:id', postControllers.post_detail_get);

/// USER ROUTES ///

// POST request for sign in
router.post('/signin', userControllers.user_signin_post);

// POST request for sign out
router.post('/signout', userControllers.user_signout_post);

/// COMMENT ROUTES ///

// POST request for creating a comment on id post
router.post('/comment/:id/create', commentControllers.comment_create_post);

module.exports = router;
