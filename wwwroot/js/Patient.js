document.addEventListener('DOMContentLoaded', () => {
    const patientModal = document.getElementById('patientModal');
    const editPatientModal = document.getElementById('editPatientModal');
    const addPatientBtn = document.getElementById('addPatientBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');
    const tableRows = document.querySelectorAll('.patients-table tbody tr');
    const tableBody = document.getElementById('patientsTableBody');

    // Gestion des boutons "Voir" et "Fermer"
    addEvent('.view-btn', 'click', function () {
        patientModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    addEvent('.close-modal', 'click', hideModals);

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModals();
        }
    });

    // Gestion du bouton "Ajouter Patient"
    if (addPatientBtn) {
        addPatientBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('editModalTitle').textContent = 'Nouveau Patient';
            document.getElementById('patientForm').reset();
            showModal(editPatientModal);
        });
    }

    // Gestion des boutons "Modifier Patient"
    addEvent('.edit-btn', 'click', function () {
        const row = this.closest('tr');
        document.getElementById('editModalTitle').textContent = 'Modifier Patient';
        fillFormFromRow(row);
        showModal(editPatientModal);
    });

    // Gestion du bouton "Annuler"
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', hideModals);
    }

    // Gestion de la recherche
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            tableRows.forEach(row => {
                const patientName = row.cells[1].textContent.toLowerCase();
                row.style.display = patientName.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Gestion du filtre
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            const filterValue = filterSelect.value;
            tableRows.forEach(row => {
                const status = row.cells[5].textContent.toLowerCase();
                const lastVisit = row.cells[4].textContent;

                if (filterValue === '' ||
                    (filterValue === 'active' && status === 'actif') ||
                    (filterValue === 'inactive' && status === 'inactif') ||
                    (filterValue === 'recent' && isRecent(lastVisit))) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Gestion des actions dans le tableau
    tableBody.addEventListener('click', (e) => {
        const target = e.target.closest('.action-btn');
        if (!target) return;

        if (target.classList.contains('delete-btn')) {
            const row = target.closest('tr');
            if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ? Cette action est irréversible.')) {
                row.remove();
            }
        }

        if (target.classList.contains('edit-btn')) {
            const row = target.closest('tr');
            document.getElementById('editModalTitle').textContent = 'Modifier Patient';
            fillFormFromRow(row);
            showModal(editPatientModal);
        }
    });

    // Gestion du formulaire
    document.getElementById('patientForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const row = document.querySelector('.edit-btn[data-patient="new"]')?.closest('tr');
        if (row) {
            updatePatientInTable(row);
        } else {
            addPatientToTable();
        }
        hideModals();
    });

    document.getElementById('savePatientBtn').addEventListener('click', () => {
        document.getElementById('patientForm').dispatchEvent(new Event('submit'));
    });

    // Fonctions utilitaires
    function showModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function hideModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }

    function fillFormFromRow(row) {
        const cells = row.cells;
        document.getElementById('lastName').value = cells[1].textContent.split(' ')[1] || '';
        document.getElementById('firstName').value = cells[1].textContent.split(' ')[0] || '';
        document.getElementById('birthDate').value = cells[2].textContent.split('/').reverse().join('-');
        document.getElementById('phone').value = cells[3].textContent;
    }

    function updatePatientInTable(row) {
        const cells = row.cells;
        cells[1].textContent = `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`;
        cells[2].textContent = formatDate(document.getElementById('birthDate').value);
        cells[3].textContent = document.getElementById('phone').value;
    }

    function addPatientToTable() {
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const birthDate = document.getElementById('birthDate').value;
        const phone = document.getElementById('phone').value;

        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>P-${Math.floor(Math.random() * 10000)}</td>
            <td>${firstName} ${lastName}</td>
            <td>${formatDate(birthDate)}</td>
            <td>${phone}</td>
            <td>${formatDate(new Date())}</td>
            <td><span class="status status-active">Actif</span></td>
            <td>
                <div class="action-btns">
                    <button class="action-btn view-btn" data-patient="new">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" data-patient="new">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-patient="new">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;

        tableBody.appendChild(newRow);
        document.getElementById('patientForm').reset();
    }

    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    function isRecent(dateString) {
        const recordDate = new Date(dateString.split('/').reverse().join('-'));
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        return recordDate >= weekAgo;
    }

    function addEvent(selector, event, handler) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener(event, handler);
        });
    }
});

