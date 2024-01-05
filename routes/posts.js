const express = require('express');
const router = express.Router();

const { getPosts, getPost,  createPost, deletePost, updatePost, likePost } = require('../controllers/postController'); // Assuming functions are in a file called postController.js

// Define routes
router.get('/', getPosts); // Route to get all posts
router.get('/:id', getPost); // Route to get a single post by id
router.post('/', createPost); // Route to create a new post
router.delete('/:id', deletePost) // Route to delete a single post by id
router.patch('/:id', updatePost) // Route to update a single post by id
router.patch('/:id/like', likePost); // This route will handle post likes


module.exports = router;
