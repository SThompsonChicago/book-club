const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#review-name').value.trim();
  const content = document.querySelector('#review-content').value.trim();
  const ratingInput = document.querySelector('#review-rating').value.trim();
  const book_id = document.querySelector('#review-submit').getAttribute("data-book-id");
    //$('#review-submit').attr('data-book-id')

  console.log(`Inputs: ${title}, ${content}, ${ratingInput}, ${book_id}`);

  if (title && content && ratingInput && book_id) {
      rating = parseInt(ratingInput);
    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({ title, content, rating, book_id }),
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

  