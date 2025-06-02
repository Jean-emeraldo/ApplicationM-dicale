document.addEventListener('DOMContentLoaded', () => {
    const fields = {
        fullName: document.getElementById('signupFullName'),
        email: document.getElementById('signupEmail'),
        password: document.getElementById('signupPassword'),
        confirmPassword: document.getElementById('signupConfirmPassword'),
    };

    document.getElementById('signupFormAction')?.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateSignUpForm(fields)) {
            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            window.location.href = "/Home/NewPatient"; // Redirection vers la page de connexion
        }
    });
});

/**
 * Ajoute un bouton de visibilité de mot de passe
 */
function addTogglePasswordVisibility(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    if (toggle && input) {
        toggle.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            toggle.classList.toggle('fa-eye-slash', isPassword);
        });
    }
}

/**
 * Valide le formulaire d'inscription
 */
function validateSignUpForm(fields) {
    let isValid = true;

    const validations = [
        {
            field: fields.fullName,
            errorId: 'signupFullName-error',
            condition: !fields.fullName.value,
            message: 'Le nom complet est requis.'
        },
        {
            field: fields.email,
            errorId: 'signupEmail-error',
            condition: !fields.email.value || !validateEmail(fields.email.value),
            message: 'Veuillez entrer un email valide.'
        },
        {
            field: fields.password,
            errorId: 'signupPassword-error',
            condition: !fields.password.value,
            message: 'Le mot de passe est requis.'
        },
        {
            field: fields.confirmPassword,
            errorId: 'signupConfirmPassword-error',
            condition: !fields.confirmPassword.value || fields.confirmPassword.value !== fields.password.value,
            message: 'Les mots de passe ne correspondent pas.'
        }
    ];

    validations.forEach(({ field, errorId, condition, message }) => {
        if (condition) {
            showError(field, errorId, message);
            isValid = false;
        } else {
            hideError(field, errorId);
        }
    });

    return isValid;
}

function showError(field, errorId, message) {
    field.classList.add('invalid');
    const error = document.getElementById(errorId);
    if (error) {
        error.style.display = 'block';
        error.textContent = message;
    }
}

function hideError(field, errorId) {
    field.classList.remove('invalid');
    const error = document.getElementById(errorId);
    if (error) {
        error.style.display = 'none';
        error.textContent = '';
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
