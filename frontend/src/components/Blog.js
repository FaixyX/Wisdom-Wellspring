import React from "react";


export default function Blog({posts}) {
   

    return (
    <section className="blogContainer">
        <h2 className="blogs">Blogs</h2>
          <div className="blog-container">
          
         {posts.map((post) => (
         <div key={post.id} className="blog-post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <span className="readmore">Read more</span>
          </div>
          ))}
          </div>
     </section>
      
    )
}
