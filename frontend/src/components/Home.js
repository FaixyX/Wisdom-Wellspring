import React from 'react';
import { useEffect, useState } from 'react';


const Home = () => {
  const [posts, setPosts] = useState(null);

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
  


  return (
    <div className="home-container">
      {posts && posts.map((post) => (
        <div key={post._id} className='blogPost'>
          <div className='post-details'>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <div className="post-meta">
               <p className="post-author">By {post.author}</p>
               <p className="post-date">{post.date}</p>
             </div>
             <div className="post-actions">
               <button className="action-button">Like</button>
               <button className="action-button">Comment</button>
               <button className="action-button">Share</button>
             </div>
          </div>
        </div>
      ))}
    </div>

    // <div className="home-container">
    //   {posts.map(post => (
    //     <div key={post.id} className="blogPost">
    //       <img src={post.image} alt={post.title} className="post-image" />
    //       <div className="post-details">
    //         <h2 className="post-title">{post.title}</h2>
    //         <p className="post-content">{post.content}</p>
    //         <div className="post-meta">
    //           <p className="post-author">By {post.author}</p>
    //           <p className="post-date">{post.date}</p>
    //         </div>
    //         <div className="post-actions">
    //           <button className="action-button">Like</button>
    //           <button className="action-button">Comment</button>
    //           <button className="action-button">Share</button>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Home;
