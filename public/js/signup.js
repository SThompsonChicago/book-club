const signupForm = document.querySelector('#signup-form');

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-input-signup').value.trim();
  const password = document.querySelector('#password-input-signup').value.trim();
  const first_name = document.querySelector('#first_name-input-signup').value.trim();
  const last_name = document.querySelector('#last_name-input-signup').value.trim();

  console.log(email, password, first_name, last_name);

  if (email && password && first_name && last_name) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        "email": email,
        "password": password,
        "first_name": first_name,
        "last_name": last_name,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);

signupForm
.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('signup-submit').click();
  }
});