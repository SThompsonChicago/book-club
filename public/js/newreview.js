const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#review-name').value.trim();
    const content = document.querySelector('#review-content').value.trim();
    const rating = document.querySelector('#review-rating').value.trim();
    const bookId = document.querySelector('#review-book-id').value.trim();

    console.log(`Inputs: ${title}, ${content}`);
  
    if (title && content && rating && bookId) {
        alert('All review elements received by form.');
        ratingInt = parseInt(rating);
        bookIdInt = parseInt(bookId);
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({ title, content, ratingInt, bookIdInt }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create review');
      }
    } else {
        alert('Review not submitted.');
    }
  };
  
  document
  .querySelector('#review-submit')
  .addEventListener('click', newFormHandler);
  