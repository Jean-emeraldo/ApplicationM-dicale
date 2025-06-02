document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    // Évite la redirection infinie sur la page elle-même
    if (currentPath !== '/Home/NewPatient') {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            window.location.href = '/Home/NewPatient';
            return; // STOP ici pour éviter le reste du code
        }
    }

    // Gestion de la visibilité du mot de passe
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function () {
            const passwordInput = document.getElementById(this.dataset.target);
            if (passwordInput) {
                const isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                this.classList.toggle('fa-eye-slash', isPassword);
                this.classList.toggle('fa-eye', !isPassword);
            }
        });
    });

    // Gestion du formulaire de connexion
    const loginForm = document.querySelector('form[asp-action="NewPatient"]');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.querySelector('input[name="User"]');
            const password = document.querySelector('input[name="Password"]');
            let isValid = true;

            if (!username.value) {
                showError(username, 'loginUsername-error', 'Veuillez entrer un nom d\'utilisateur valide.');
                isValid = false;
            } else {
                hideError(username, 'loginUsername-error');
            }

            if (!password.value) {
                showError(password, 'loginPassword-error', 'Le mot de passe est requis.');
                isValid = false;
            } else {
                hideError(password, 'loginPassword-error');
            }

            if (isValid) {
                alert('Connexion réussie!');
                window.location.href = "/Home/ApplicationUser"; // Redirection vers la page utilisateur
            }
        });
    }
});

function showError(inputElement, errorId, errorMessage) {
    inputElement.classList.add('invalid');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.display = 'block';
        errorElement.textContent = errorMessage;
    }
}

function hideError(inputElement, errorId) {
    inputElement.classList.remove('invalid');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.display = 'none';
        errorElement.textContent = '';
    }
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

