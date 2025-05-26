document.addEventListener('DOMContentLoaded', () => {
    // Gestion de la visibilité des mots de passe
    addTogglePasswordVisibility('toggleSignupPassword', 'signupPassword');
    addTogglePasswordVisibility('toggleSignupConfirmPassword', 'signupConfirmPassword');

    // Gestion du formulaire d'inscription
    document.getElementById('signupFormAction').addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateSignUpForm()) {
            const fullName = document.getElementById('signupFullName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;

            const userData = {
                fullName: fullName,
                email: email,
                password: password
            };

            localStorage.setItem('medicare_user_' + email, JSON.stringify(userData));
            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            window.location.href = "/Home/NewPatient"; // URL corrigée
        }
    });
});

/**
 * Ajoute la gestion de la visibilité du mot de passe
 * @param {string} toggleId - ID du bouton de bascule
 * @param {string} inputId - ID du champ de mot de passe
 */
function addTogglePasswordVisibility(toggleId, inputId) {
    const toggleButton = document.getElementById(toggleId);
    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            const passwordInput = document.getElementById(inputId);
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }
}

/**
 * Valide le formulaire d'inscription
 * @returns {boolean} - Retourne true si le formulaire est valide, sinon false
 */
function validateSignUpForm() {
    let isValid = true;

    const fullName = document.getElementById('signupFullName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('signupConfirmPassword');

    // Validation du nom complet
    if (!fullName.value) {
        showError(fullName, 'signupFullName-error', 'Le nom complet est requis.');
        isValid = false;
    } else {
        hideError(fullName, 'signupFullName-error');
    }

    // Validation de l'email
    if (!email.value || !validateEmail(email.value)) {
        showError(email, 'signupEmail-error', 'Veuillez entrer un email valide.');
        isValid = false;
    } else {
        hideError(email, 'signupEmail-error');
    }

    // Validation du mot de passe
    if (!password.value) {
        showError(password, 'signupPassword-error', 'Le mot de passe est requis.');
        isValid = false;
    } else {
        hideError(password, 'signupPassword-error');
    }

    // Validation de la confirmation du mot de passe
    if (!confirmPassword.value || confirmPassword.value !== password.value) {
        showError(confirmPassword, 'signupConfirmPassword-error', 'Les mots de passe ne correspondent pas.');
        isValid = false;
    } else {
        hideError(confirmPassword, 'signupConfirmPassword-error');
    }

    return isValid;
}

/**
 * Affiche un message d'erreur pour un champ
 * @param {HTMLElement} inputElement - Champ d'entrée
 * @param {string} errorId - ID de l'élément d'erreur
 * @param {string} message - Message d'erreur
 */
function showError(inputElement, errorId, message) {
    inputElement.classList.add('invalid');
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = 'block';
    errorElement.textContent = message;
}

/**
 * Masque le message d'erreur pour un champ
 * @param {HTMLElement} inputElement - Champ d'entrée
 * @param {string} errorId - ID de l'élément d'erreur
 */
function hideError(inputElement, errorId) {
    inputElement.classList.remove('invalid');
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = 'none';
    errorElement.textContent = '';
}

/**
 * Valide une adresse email
 * @param {string} email - Adresse email à valider
 * @returns {boolean} - Retourne true si l'email est valide, sinon false
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

