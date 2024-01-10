const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

const { getPosts, getPost, getUserPosts, createPost, deletePost, updatePost, likePost } = require('../controllers/postController'); // Assuming functions are in a file called postController.js

// Define routes
router.get('/', getPosts); // Route to get all posts
router.use(requireAuth); // Require a user to access the following routes
    router.get('/:id', getPost); // Route to get a single post by id
    router.get('/c_user', getUserPosts); // Route to get posts by user_id
    router.post('/', createPost); // Route to create a new post
    router.delete('/:id', deletePost) // Route to delete a single post by id
    router.patch('/:id', updatePost) // Route to update a single post by id
    router.patch('/:id/like', likePost); // This route will handle post likes


module.exports = router;
