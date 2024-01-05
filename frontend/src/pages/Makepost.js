import React, { useState } from 'react';

const Makepost = () => {
  // State to manage form data and success dialog visibility
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
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
      const response = await fetch('http://localhost:5000/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // If form submission is successful
        console.log('Form data sent successfully!');
        setFormData({ title: '', content: '', author: '' }); // Reset form fields
        setShowSuccessDialog(true); // Show success dialog on successful submission
        setTimeout(() => {
          setShowSuccessDialog(false); // Hide success dialog after a certain time (optional)
        }, 3000); // Adjust the time as needed
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
