document.addEventListener('DOMContentLoaded', () => {
    // Vérification de l'authentification
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated || isAuthenticated !== 'true') {
        window.location.href = '/Home/NewPatient';
    }

    // Gestion de la visibilité du mot de passe
    addEvent('.toggle-password', 'click', function() {
        const passwordInput = document.getElementById(this.dataset.target);
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });

    // Gestion du formulaire de connexion
    document.getElementById('loginFormAction').addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');

        if (!email.value || !validateEmail(email.value)) {
            showError(email, 'loginEmail-error', 'Veuillez entrer un email valide.');
            isValid = false;
        } else {
            hideError(email, 'loginEmail-error');
        }

        if (!password.value) {
            showError(password, 'loginPassword-error', 'Le mot de passe est requis.');
            isValid = false;
        } else {
            hideError(password, 'loginPassword-error');
        }

        if (isValid) {
            const userKey = `medicare_user_${email.value}`;
            const userData = localStorage.getItem(userKey);

            if (userData) {
                const user = JSON.parse(userData);
                if (user.password === password.value) {
                    localStorage.setItem('medicare_current_user', JSON.stringify(user));
                    localStorage.setItem('isAuthenticated', 'true');
                    alert('Connexion réussie!');
                    window.location.href = "/Home/ApplicationUser";
                } else {
                    alert('Mot de passe incorrect');
                }
            } else {
                alert('Aucun compte trouvé avec cet email');
            }
        }
    });
});

function showError(inputElement, errorId, errorMessage) {
    inputElement.classList.add('invalid');
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = 'block';
    errorElement.textContent = errorMessage;
}

function hideError(inputElement, errorId) {
    inputElement.classList.remove('invalid');
    document.getElementById(errorId).style.display = 'none';
}



