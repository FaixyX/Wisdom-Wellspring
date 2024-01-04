import React from 'react';
import { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
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
  }, [setPosts]);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post._id !== postId));
        console.log('Post deleted successfully!');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const confirmDelete = (postId) => {
    setSelectedPostId(postId);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedPostId);
    setSelectedPostId(null);
    setShowConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setSelectedPostId(null);
    setShowConfirmDialog(false);
  };

  return (
    <div className="home-container">
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="blogPost">
            <div className="post-details">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-content">{post.content}</p>
              <div className="post-meta">
                <p className="post-author">By {post.author}</p>
                <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
              </div>
              <div className="post-actions">
                <button className="action-button" onClick={() => confirmDelete(post._id)}>
                  Delete
                </button>
                <button className="action-button">Share</button>
              </div>
              {/* Display the confirmation dialog next to the post */}
              {showConfirmDialog && selectedPostId === post._id && (
                <div className="confirm-dialog">
                  <p>Are you sure you want to delete this post?</p>
                  <button className="action-button" onClick={handleConfirmDelete}>Yes</button>
                  <button className="action-button" onClick={handleCancelDelete}>No</button>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
