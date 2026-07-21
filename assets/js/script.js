// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Apply saved theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
});

// Login/Logout functionality
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const loginLogoutButton = document.getElementById('loginLogoutButton');
const loginLogoutText = document.getElementById('loginLogoutText');

function updateLoginState() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        loginLogoutText.innerText = 'Logout';
        if (loginLogoutButton) {
            loginLogoutButton.setAttribute('data-bs-toggle', '');
            loginLogoutButton.setAttribute('data-bs-target', '');
            loginLogoutButton.onclick = logout;
        }
    } else {
        loginLogoutText.innerText = 'Login';
        if (loginLogoutButton) {
            loginLogoutButton.setAttribute('data-bs-toggle', 'modal');
            loginLogoutButton.setAttribute('data-bs-target', '#loginModal');
            loginLogoutButton.onclick = null;
        }
    }
}

function login(event) {
    if(event) {
        event.preventDefault();
    }
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        loginError.innerText = 'Please enter a valid email address.';
        loginError.classList.remove('d-none');
        return;
    }

    if (password.length < 6) {
        loginError.innerText = 'Password must be at least 6 characters long.';
        loginError.classList.remove('d-none');
        return;
    }

    // If validation passes, simulate successful login
    sessionStorage.setItem('isLoggedIn', 'true');
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if(loginModal) {
        loginModal.hide();
    }
    updateLoginState();
    loginError.classList.add('d-none'); // Hide any previous error
    
    // Reload the page to reflect login state
    location.reload();
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    updateLoginState();
    window.location.href = 'quize.html'; // Redirect to home page after logout
}

if(loginForm) {
    loginForm.addEventListener('submit', login);
}

document.addEventListener('DOMContentLoaded', updateLoginState);
