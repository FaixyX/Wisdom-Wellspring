import React from 'react';
import { useEffect, useState } from 'react';
// Importing a date-fns function to format dates
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Home = () => {
  // State to hold the fetched posts
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // Function to fetch posts from the API when the component mounts
    const fetchPosts = async () => {
      try {
        // Fetching data from the provided API endpoint
        const response = await fetch('http://localhost:5000/api/posts');
        if (response.ok) {
          // If the response is successful, parse JSON data and update state
          const json = await response.json();
          setPosts(json);
        } else {
          // If the response is not okay, throw an error
          throw new Error('Failed to fetch');
        }
      } catch (error) {
        // Handling errors in fetching data
        console.error('Error fetching data:', error.message);
      }
    };

    // Invoking the function to fetch posts when the component mounts
    fetchPosts();
  }, [setPosts]);
  
  return (
    <div className="home-container">
      {/* Checking if posts exist before rendering */}
      {posts && posts.map((post) => (
        <div key={post._id} className='blogPost'>
          <div className='post-details'>
            {/* Displaying the title and content of the post */}
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <div className="post-meta">
               {/* Displaying the author's name */}
               <p className="post-author">By {post.author}</p>
               {/* Displaying the time passed since post creation */}
               <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
             </div>
             {/* Buttons for actions related to the post */}
             <div className="post-actions">
               <button className="action-button">Like</button>
               <button className="action-button">Comment</button>
               <button className="action-button">Share</button>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
