document.getElementById('toggleSignupPassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('signupPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('toggleSignupConfirmPassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('signupConfirmPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('signupFormAction').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    const fullName = document.getElementById('signupFullName');
    if (!fullName.value) {
        showError(fullName, 'signupFullName-error');
        isValid = false;
    } else {
        hideError(fullName, 'signupFullName-error');
    }

    const email = document.getElementById('signupEmail');
    if (!email.value || !validateEmail(email.value)) {
        showError(email, 'signupEmail-error');
        isValid = false;
    } else {
        hideError(email, 'signupEmail-error');
    }

    const password = document.getElementById('signupPassword');
    if (!password.value) {
        showError(password, 'signupPassword-error');
        isValid = false;
    } else {
        hideError(password, 'signupPassword-error');
    }

    const confirmPassword = document.getElementById('signupConfirmPassword');
    if (!confirmPassword.value || confirmPassword.value !== password.value) {
        showError(confirmPassword, 'signupConfirmPassword-error');
        isValid = false;
    } else {
        hideError(confirmPassword, 'signupConfirmPassword-error');
    }

    if (isValid) {
        const userData = {
            fullName: fullName.value,
            email: email.value,
            password: password.value
        };

        localStorage.setItem('medicare_user_' + email.value, JSON.stringify(userData));
        alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
        window.location.href = "@Url.Action('NewPatient', 'Home')"; 
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

