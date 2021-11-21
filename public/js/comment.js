const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-comment').value.trim();

  if (comment) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      document.location.refresh();
    } else {
      alert('Failed to create comment');
    }
  } else {
    alert('Comment not submitted');
  }
};

document
.querySelector('#comment-submit')
.addEventListener('click', commentFormHandler);