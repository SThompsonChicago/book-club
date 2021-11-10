const newFormHandler = async function(event) {
    event.preventDefault();
  
    const reviewTitle = document.querySelector('input[name="review-title"]').value;
    const reviewContent = document.querySelector('textarea[name="review-body"]').value;
  
    console.log(reviewTitle);
    console.log(reviewContent);
  
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        reviewTitle,
        reviewContent,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
  };
  
  document
    .querySelector('#new-review-form')
    .addEventListener('submit', newFormHandler);