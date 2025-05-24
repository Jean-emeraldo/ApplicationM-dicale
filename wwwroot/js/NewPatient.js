document.getElementById('toggleLoginPassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('loginPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('loginFormAction').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    const email = document.getElementById('loginEmail');
    if (!email.value || !validateEmail(email.value)) {
        showError(email, 'loginEmail-error');
        isValid = false;
    } else {
        hideError(email, 'loginEmail-error');
    }

    const password = document.getElementById('loginPassword');
    if (!password.value) {
        showError(password, 'loginPassword-error');
        isValid = false;
    } else {
        hideError(password, 'loginPassword-error');
    }

    if (isValid) {
        const userKey = 'medicare_user_' + email.value;
        const userData = localStorage.getItem(userKey);

        if (userData) {
            const user = JSON.parse(userData);
            if (user.password === password.value) {
                localStorage.setItem('medicare_current_user', JSON.stringify(user));
                localStorage.setItem('isAuthenticated', 'true');
                alert('Connexion réussie!');
                window.location.href = "@Url.Action('ApplicationUser', 'Home')"; // Corrected semicolon
            } else {
                alert('Mot de passe incorrect');
            }
        } else {
            alert('Aucun compte trouvé avec cet email');
        }
    }
});

function showError(inputElement, errorId) {
    inputElement.classList.add('invalid');
    document.getElementById(errorId).style.display = 'block';
}

function hideError(inputElement, errorId) {
    inputElement.classList.remove('invalid');
    document.getElementById(errorId).style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('medicare_current_user');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        alert(`Vous êtes déjà connecté en tant que ${user.fullName}`);
        window.location.href = "@Url.Action('ApplicationUser', 'Home')"; 
    }
});



