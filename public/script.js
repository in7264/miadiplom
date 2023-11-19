document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result.message);

      // Optionally, you can redirect to another page after successful registration
      // window.location.href = '/success'; // Change '/success' to the desired URL
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  });

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result.message);

      // Optionally, you can redirect to another page after successful login
      // window.location.href = '/dashboard'; // Change '/dashboard' to the desired URL
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  });
});
