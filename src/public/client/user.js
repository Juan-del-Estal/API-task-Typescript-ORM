document.addEventListener('DOMContentLoaded', function() {
  const postPhotoForm = document.querySelector('.post-photo');

  postPhotoForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(postPhotoForm); // Collect form data
    const url = 'http://localhost:3000/api/user/new-post';

    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Post submitted successfully:', data);
      // Handle success
    })
    .catch(error => {
      console.error('Error submitting post:', error);
      // Handle error
    });
  });
});
