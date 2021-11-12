const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-input-signup').value.trim();
    const password = document.querySelector('#password-input-signup').value.trim();
    const first_name = document.querySelector('#first_name-input-signup').value.trim();
    const last_name = document.querySelector('#last_name-input-signup').value.trim();

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        first_name, last_name, email, password
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up');
    }
  };
  
  document
    .querySelector('#signup-submit')
    .addEventListener('click', signupFormHandler);