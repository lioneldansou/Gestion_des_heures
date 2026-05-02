let login = document.getElementById('login');
let password = document.getElementById('password');
let email = document.getElementById('email');

login.addEventListener('click', async function() {
  let emailValue = email.value;
  let passwordValue = password.value;

  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailValue, mot_de_passe: passwordValue })
  });

  const data = await response.json();

  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    if (data.enseignant_id) {
      localStorage.setItem('enseignant_id', data.enseignant_id);
    }

    if (data.role === 'admin') {
      window.location.href = 'pages/dashboard-admin.html';
    } else if (data.role === 'rh') {
      window.location.href = 'pages/dashboard-rh.html';
    } else {
      window.location.href = 'pages/dashboard-enseignant.html';
    }
  } else {
    alert(data.message);
  }
});