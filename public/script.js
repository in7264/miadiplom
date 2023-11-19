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
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result.message);

      // По желанию, после успешной регистрации можно перенаправить пользователя на другую страницу
      // window.location.href = '/success'; // Измените '/success' на требуемый URL
    } catch (error) {
      console.error('Ошибка во время регистрации:', error.message);
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
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result.message);

      // По желанию, после успешного входа можно перенаправить пользователя на другую страницу
      // window.location.href = '/dashboard'; // Измените '/dashboard' на требуемый URL
    } catch (error) {
      console.error('Ошибка во время входа:', error.message);
    }
  });
});
