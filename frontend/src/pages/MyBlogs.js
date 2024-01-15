import React, { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext'


const MyBlogs = () => {
  // States to manage posts, confirmation dialog, selected post, edit dialogs, edited title, and content
  const [posts, setPosts] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editDialogs, setEditDialogs] = useState({});
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const { user } = useAuthContext();

useEffect(() => {
  const fetchUserPosts = async () => {
    try {
      const response = await fetch('/api/posts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      });

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

  if (user) {
    fetchUserPosts();
  }
}, [user]);

  // Delete post based on postId
  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${user.token}`}
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
        console.log('Post deleted successfully!');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Display confirmation dialog for deleting a post
  const confirmDelete = (postId) => {
    setShowConfirmDialog(true);
    setSelectedPostId(postId);
  };

  // Handle confirmation for deleting a post
  const handleConfirmDelete = () => {
    handleDelete(selectedPostId);
    setShowConfirmDialog(false);
    setSelectedPostId(null);
  };

  // Handle cancellation of post deletion
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setSelectedPostId(null);
  };

  // Confirm editing a post and set edited title, content, and show edit dialog
  const confirmEdit = (postId, postTitle, postContent) => {
    setEditedTitle(postTitle);
    setEditedContent(postContent);
    setEditDialogs({ ...editDialogs, [postId]: true });
  };

  // Handle editing a post and send PATCH request to update the post
  const handleEdit = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
        }),
      });
  
      if (response.ok) {
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              title: editedTitle,
              content: editedContent,
              updatedAt: new Date().toISOString(), // Update the updatedAt timestamp
            };
          }
          return post;
        });
  
        setPosts(updatedPosts);
        setEditDialogs({ ...editDialogs, [postId]: false });
        setSelectedPostId(null);
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  

  // Display posts and their respective actions
  return (
    <div className="blog-container">
      { posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="blogPost">
            <div className="post-details">
              {/* Display post details */}
              <h2 className="post-title">{post.title}</h2>
              <p className="post-content">{post.content}</p>
              <div className="post-meta">
                <p className="post-author">By {post.author}</p>
                {/* Display post's updated time */}
                <p>{formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })}</p>
              </div>
              {/* Display actions (Delete, Edit) */}
              <div className="post-actions">
                <button className="action-button" onClick={() => confirmDelete(post._id)}>
                  Delete
                </button>
                <button className="action-button" onClick={() => confirmEdit(post._id, post.title, post.content)}>
                  Edit
                </button>
              </div>
              {/* Display confirmation dialog for post deletion */}
              {showConfirmDialog && selectedPostId === post._id && (
                <div className="confirm-dialog">
                  <p>Are you sure you want to delete this post?</p>
                  <button className="action-button" onClick={handleConfirmDelete}>
                    Yes
                  </button>
                  <button className="action-button" onClick={handleCancelDelete}>
                    No
                  </button>
                </div>
              )}
              {/* Display edit dialog to edit post title and content */}
              {editDialogs[post._id] && (
                <div className="edit-dialog">
                  <h2>Edit Post</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEdit(post._id);
                    }}
                  >
                    {/* Input field to edit post title */}
                    <label htmlFor={`edited-title-${post._id}`}>Title:</label>
                    <input
                      type="text"
                      id={`edited-title-${post._id}`}
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />

                    {/* Textarea to edit post content */}
                    <label htmlFor={`edited-content-${post._id}`}>Content:</label>
                    <textarea
                      id={`edited-content-${post._id}`}
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    ></textarea>

                    {/* Save and cancel buttons */}
                    <button type="submit">Save</button>
                    <button onClick={() => setEditDialogs({ ...editDialogs, [post._id]: false })}>
                      Cancel
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))) : (
            // Display a message when there are no posts
            <div className="no-posts-message">
              <p>You currently have no Blogs. Post a new one.</p>
            </div>
        )}
    </div>
  );
};

export default MyBlogs;
