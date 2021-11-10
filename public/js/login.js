const loginFormHandler = async (event) => {
  event.preventDefault();

  const emailEl = document.querySelector('#email-input-login');
  const passwordEl = document.querySelector('#password-input-login');

  console.log(emailEl, passwordEl)

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      email: emailEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('#login-submit')
  .addEventListener('click', loginFormHandler);