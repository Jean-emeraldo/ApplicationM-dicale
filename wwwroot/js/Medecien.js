document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour valider un email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Fonction pour afficher une erreur
    function showError(inputElement, errorId) {
        inputElement.classList.add('invalid');
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = 'block';
        }
    }

    // Fonction pour masquer une erreur
    function hideError(inputElement, errorId) {
        inputElement.classList.remove('invalid');
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Ajout d'un écouteur d'événement pour le formulaire
    const medecinForm = document.getElementById('medecinForm');
    if (medecinForm) {
        medecinForm.addEventListener('submit', function(event) {
            let isValid = true;

            // Validation de l'ID
            const id = document.getElementById('id');
            if (!id.value || isNaN(id.value)) {
                showError(id, 'id-error');
                isValid = false;
            } else {
                hideError(id, 'id-error');
            }

            // Validation du nom
            const nom = document.getElementById('nom');
            if (!nom.value.trim()) {
                showError(nom, 'nom-error');
                isValid = false;
            } else {
                hideError(nom, 'nom-error');
            }

            // Validation du prénom
            const prenom = document.getElementById('prenom');
            if (!prenom.value.trim()) {
                showError(prenom, 'prenom-error');
                isValid = false;
            } else {
                hideError(prenom, 'prenom-error');
            }

            // Validation de la spécialité
            const specialite = document.getElementById('specialite');
            if (!specialite.value) {
                showError(specialite, 'specialite-error');
                isValid = false;
            } else {
                hideError(specialite, 'specialite-error');
            }

            // Validation du numéro RPPS
            const numeroRPPS = document.getElementById('numeroRPPS');
            const rppsRegex = /^[0-9]{11}$/;
            if (!numeroRPPS.value || !rppsRegex.test(numeroRPPS.value)) {
                showError(numeroRPPS, 'numeroRPPS-error');
                isValid = false;
            } else {
                hideError(numeroRPPS, 'numeroRPPS-error');
            }

            // Validation de l'email
            const email = document.getElementById('email');
            if (!email.value || !validateEmail(email.value)) {
                showError(email, 'email-error');
                isValid = false;
            } else {
                hideError(email, 'email-error');
            }

            // Validation du téléphone
            const telephone = document.getElementById('telephone');
            const phoneRegex = /^[0-9]{10}$/;
            if (!telephone.value || !phoneRegex.test(telephone.value)) {
                showError(telephone, 'telephone-error');
                isValid = false;
            } else {
                hideError(telephone, 'telephone-error');
            }

            // Empêcher la soumission du formulaire si des erreurs sont présentes
            if (!isValid) {
                event.preventDefault();
                const firstError = document.querySelector('.invalid');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // Ajout d'un écouteur d'événement pour le champ de téléphone
    const telephone = document.getElementById('telephone');
    if (telephone) {
        telephone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            e.target.value = value;
        });
    }

    // Ajout d'un écouteur d'événement pour le champ de numéro RPPS
    const numeroRPPS = document.getElementById('numeroRPPS');
    if (numeroRPPS) {
        numeroRPPS.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            e.target.value = value;
        });
    }
});
