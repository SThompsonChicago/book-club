const bookFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('#book-title').value.trim();
    const author = document.querySelector('#book-author').value.trim();
    const genre = document.querySelector('#book-genre').value.trim();

    const response = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify({
        title, author, genre
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/book');
    } else {
      alert('Failed to add book.');
    }
  };
  
  document
    .querySelector('#add-submit')
    .addEventListener('click', bookFormHandler);