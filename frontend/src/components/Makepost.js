import React, { useState } from 'react';

const Makepost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Request was successful
        console.log('Form data sent successfully!');
        // Optionally, you can reset the form after successful submission
        setFormData({ title: '', content: '', author: '' });
      } else {
        // Request failed
        console.error('Failed to send form data');
      }
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };
  

  return (
    <div className="contact-us">
      <h2>Make a Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="author">Author Name:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Makepost;
