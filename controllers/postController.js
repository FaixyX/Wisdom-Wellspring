const Post = require("../models/postModel")
const mongoose = require('mongoose')

// Get all Posts
const getPosts = async(req, res) => {
    // Fetch all posts from the database, sorted by createdAt in descending order
    const posts = await Post.find().sort({createdAt:-1})

    // Respond with a 200 OK status and the fetched posts as JSON
    res.status(200).json(posts)
}

// Get a single Post
const getPost = async (req, res) => {
    // Extract the 'id' parameter from the request URL
    const { id } = req.params;

    // Check if the 'id' is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // If the 'id' is invalid, respond with a 404 status and an error message
        return res.status(404).json({ error: "Invalid ID" });
    }

    // Attempt to find the post by its ID in the database
    const post = await Post.findById(id);

    // Check if the post with the given ID exists
    if (!post) {
        // If no post is found, respond with a 404 status and an error message
        return res.status(404).json({ error: "No Such Post" });
    }

    // If the post is found, respond with a 200 status and send the retrieved post as JSON
    res.status(200).json(post);
};


// Create a new Post
const createPost = async(req,res) => {

    // Extract title and content from the request body
    const {title, author, content} = req.body

    // Check if title and content are present
    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!author){
        emptyFields.push('author')
    }
    if(!content){
        emptyFields.push('content')
    }
    // If any fields are missing, respond with a 400 Bad Request status
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // Attempt to add the post to the database
    try{
        const user_id = req.user._id
        // Assuming there's a Post model or schema defined somewhere
        const post = await Post.create({title, author, content, user_id})
        // Respond with a 200 OK status and the created post
        res.status(200).json(post)}
    catch(error){
        // If an error occurs during the database operation, respond with a 400 status and the error message
        res.status(400).json({error: error.message})}
}

// Delete a Post
const deletePost = async (req, res) => {
    // Extract the 'id' parameter from the request URL
    const { id } = req.params;

    // Check if the 'id' is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // If the 'id' is invalid, respond with a 404 status and an error message
        return res.status(404).json({ error: "Invalid ID" });
    }

    // Attempt to find and delete the post by its ID from the database
    const post = await Post.findOneAndDelete({ _id: id });

    // Check if a post with the given ID was found and deleted
    if (!post) {
        // If no post is found, respond with a 404 status and an error message
        return res.status(404).json({ error: "No Such Post to Delete" });
    }

    // If the post is successfully deleted, respond with a 200 status and send the deleted post as JSON
    res.status(200).json(post);
};

// Update a workout
const updatePost = async (req, res) => {
    // Extract the 'id' parameter from the request URL
    const { id } = req.params;

    // Check if the 'id' is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // If the 'id' is invalid, respond with a 404 status and an error message
        return res.status(404).json({ error: "Invalid ID" });
    }

    // Attempt to find and update the post by its ID with the data from the request body
    const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body });

    // Check if a post with the given ID was found and updated
    if (!post) {
        // If no post is found, respond with a 404 status and an error message
        return res.status(404).json({ error: "No Such Post to Update" });
    }

    // If the post is successfully updated, respond with a 200 status and send the updated post as JSON
    res.status(200).json({ post });
};

// Route for liking a post
const likePost = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the post by ID
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Increment the likes count without modifying updatedAt
      await Post.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } }, // Increment likes count by 1
        { new: true, runValidators: true, setDefaultsOnInsert: true, timestamps: false } // Options to prevent touching updatedAt
      );
  
      // Respond with a success message or updated post
      res.status(200).json({ message: 'Post liked successfully' });
    } catch (error) {
      console.error('Error liking the post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// Get logged-in user's posts
const getUserPosts = async (req, res) => {
    try {
      // Ensure user is authenticated and get the user_id
      const user_id = req.user._id; 
  
      // Fetch all posts from the database for the specific user's id
      const posts = await Post.find({ user_id }).sort({ createdAt: -1 });
  
      // Respond with a 200 OK status and the fetched posts as JSON
      res.status(202).json(posts);
    } 
    catch (error) {
      // Handle any errors that occur during the process
      console.error('Error fetching user posts:', error);
  
      // Respond with a 500 Internal Server Error status and an error message
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Export Functions to other Files
module.exports = {
    getPosts,
    getUserPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    likePost,
}