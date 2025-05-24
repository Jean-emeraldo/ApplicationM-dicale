document.getElementById('medecinForm').addEventListener('submit', function(event) {
    let isValid = true;
    

    const id = document.getElementById('id');
    if (!id.value || isNaN(id.value)) {
        showError(id, 'id-error');
        isValid = false;
    } else {
        hideError(id, 'id-error');
    }
    

    const nom = document.getElementById('nom');
    if (!nom.value.trim()) {
        showError(nom, 'nom-error');
        isValid = false;
    } else {
        hideError(nom, 'nom-error');
    }
    
 
    const prenom = document.getElementById('prenom');
    if (!prenom.value.trim()) {
        showError(prenom, 'prenom-error');
        isValid = false;
    } else {
        hideError(prenom, 'prenom-error');
    }

    const specialite = document.getElementById('specialite');
    if (!specialite.value) {
        showError(specialite, 'specialite-error');
        isValid = false;
    } else {
        hideError(specialite, 'specialite-error');
    }
    

    const numeroRPPS = document.getElementById('numeroRPPS');
    const rppsRegex = /^[0-9]{11}$/;
    if (!numeroRPPS.value || !rppsRegex.test(numeroRPPS.value)) {
        showError(numeroRPPS, 'numeroRPPS-error');
        isValid = false;
    } else {
        hideError(numeroRPPS, 'numeroRPPS-error');
    }
    

    const email = document.getElementById('email');
    if (!email.value || !validateEmail(email.value)) {
        showError(email, 'email-error');
        isValid = false;
    } else {
        hideError(email, 'email-error');
    }
    
   
    const telephone = document.getElementById('telephone');
    const phoneRegex = /^[0-9]{10}$/;
    if (!telephone.value || !phoneRegex.test(telephone.value)) {
        showError(telephone, 'telephone-error');
        isValid = false;
    } else {
        hideError(telephone, 'telephone-error');
    }
    
    if (!isValid) {
        event.preventDefault();
        
        const firstError = document.querySelector('.invalid');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
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




document.getElementById('telephone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    e.target.value = value;
});

document.getElementById('numeroRPPS').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.substring(0, 11);
    }
    e.target.value = value;
});
