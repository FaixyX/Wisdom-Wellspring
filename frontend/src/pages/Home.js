import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Home = () => {
  const [posts, setPosts] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts/all');
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchPosts();
  }, []);

  // Assuming your existing handleLike function in the frontend
const handleLike = async (postId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {'Authorization': `Bearer ${user.token}`},
    });

    if (response.ok) {
      // Fetch updated posts after liking
      const updatedPostsResponse = await fetch('http://localhost:5000/api/posts');
      
      if (updatedPostsResponse.ok) {
        const updatedPosts = await updatedPostsResponse.json();
        setPosts(updatedPosts); // Update the state with updated posts
      } else {
        throw new Error('Failed to fetch updated posts');
      }
    } else {
      throw new Error('Failed to like the post');
    }
  } catch (error) {
    console.error('Error liking the post:', error);
  }
};

  const handleShare = (postId) => {
    // Handle sharing a post
    console.log(`Shared post with ID: ${postId}`);
  };

  const handleComment = (postId) => {
    // Handle commenting on a post
    console.log(`Commented on post with ID: ${postId}`);
  };

  return (
    <div className="blog-container">
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="blogPost">
            <div className="post-details">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-content">{post.content}</p>
              <div className="post-meta">
                <p className="post-author">By {post.author}</p>
                <p>{formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })}</p>
                {/* Display number of likes */}
                <p>Likes: {post.likes}</p>
                {/* Buttons for Like, Share, and Comment */}
                <div className="post-actions">
                  <button className="action-button" onClick={() => handleLike(post._id)}> Like </button>
                  <button className="action-button" onClick={() => handleComment(post._id)}> Comment </button>
                  <button className="action-button" onClick={() => handleShare(post._id)}> Share</button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
