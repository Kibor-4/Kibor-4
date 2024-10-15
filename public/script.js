document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);  // Automatically collects all form fields
    
    fetch('/submit-report', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        displayMessage(data.message, 'success');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      displayMessage('Failed to submit report. Please try again.', 'error');
    });
  
    // Clear the form after submission
    this.reset();
  });
  