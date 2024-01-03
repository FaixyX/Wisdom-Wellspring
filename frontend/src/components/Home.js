import React from 'react';
import image1 from '../assets/logoimg.jpg';


const posts = [
  {
    id: 1,
    title: 'Sample Blog Post 1',
    image: `${image1}`,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec velit nec augue tincidunt elementum. Integer sit amet dui ac elit suscipit convallis. Fusce lacinia, velit nec cursus interdum, augue est eleifend libero, ut suscipit turpis lectus nec metus. Quisque fermentum, dolor et consectetur pharetra, est leo rhoncus neque, vel pulvinar augue turpis nec tellus. Curabitur bibendum sem in bibendum ullamcorper. Nulla facilisi. Proin id cursus odio. Sed eu ligula vel arcu bibendum fringilla. Donec hendrerit dapibus quam, eu volutpat sem fringilla id. Integer et elit nec mauris rhoncus vestibulum. Duis auctor nisl eu augue vehicula, eget venenatis purus blandit. Sed facilisis, justo vel sagittis dictum, libero nunc laoreet orci, vel feugiat est elit vel nunc.',
    author: 'Jamal Khan',
    date: 'December 11, 2023',
  },
  // Add more blog posts as needed
];

const Home = () => {
  return (
    <div className="home-container">
      {posts.map(post => (
        <div key={post.id} className="blogPost">
          <img src={post.image} alt={post.title} className="post-image" />
          <div className="post-details">
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
  );
};

export default Home;
