import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Makepost = () => {

  const { user } = useAuthContext()

  // State to manage form data and success dialog visibility
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: user.username || '',
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Update form data based on user input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If form submission is successful
        console.log('Form data sent successfully!');
        setFormData({ title: '', content: '', author:user.username || '' }); // Reset form fields
        setShowSuccessDialog(true); // Show success dialog on successful submission
      } else {
        // If form submission fails
        console.error('Failed to send form data');
      }
    } catch (error) {
      // Handle error in form submission
      console.error('Error sending form data:', error);
    }
  };

  return (
    <div className="make-post">
      <h2>Make a Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title} // Use correct formData property for value
          onChange={handleChange}
          required
        />
        <label htmlFor="author">Author Name:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author} // Use correct formData property for value
          onChange={handleChange}
          required
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content} // Use correct formData property for value
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      {/* Success dialog shown conditionally */}
      {showSuccessDialog && (
        <div className="success-dialog">
          <p>Post submitted successfully!</p>
        </div>
      )}
    </div>
  );
};
export default Makepost;