document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments du DOM
    const dossierModal = document.getElementById('dossierModal');
    const editDossierModal = document.getElementById('editDossierModal');
    const viewBtns = document.querySelectorAll('.view-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const addDossierBtn = document.getElementById('addDossierBtn');
    const editDossierBtns = document.querySelectorAll('.edit-btn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');
    const tableRows = document.querySelectorAll('.dossiers-table tbody tr');

    // Fonction pour afficher les modales
    const showModal = (modal) => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // Fonction pour masquer les modales
    const hideModals = () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    };

    // Ajout des écouteurs d'événements pour les boutons de vue
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => showModal(dossierModal));
    });

    // Ajout des écouteurs d'événements pour les boutons de fermeture des modales
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', hideModals);
    });

    // Fermeture des modales en cliquant en dehors
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModals();
        }
    });

    // Ajout d'un écouteur d'événement pour le bouton d'ajout de dossier
    if (addDossierBtn) {
        addDossierBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('editModalTitle').textContent = 'Nouveau Dossier';
            document.getElementById('dossierForm').reset();
            showModal(editDossierModal);
        });
    }

    // Ajout des écouteurs d'événements pour les boutons d'édition
    editDossierBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('editModalTitle').textContent = 'Modifier Dossier';
            const row = btn.closest('tr');
            fillFormFromRow(row);
            showModal(editDossierModal);
        });
    });

    // Ajout d'un écouteur d'événement pour le bouton d'annulation
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', hideModals);
    }

    // Ajout d'un écouteur d'événement pour la recherche
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            tableRows.forEach(row => {
                const dossierName = row.cells[1].textContent.toLowerCase();
                row.style.display = dossierName.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Ajout d'un écouteur d'événement pour le filtre
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            const filterValue = filterSelect.value;
            tableRows.forEach(row => {
                const status = row.cells[5].textContent.toLowerCase();
                const shouldDisplay = filterValue === '' ||
                    (filterValue === 'active' && status === 'actif') ||
                    (filterValue === 'inactive' && status === 'inactif') ||
                    (filterValue === 'recent' && isRecent(row.cells[4].textContent));
                row.style.display = shouldDisplay ? '' : 'none';
            });
        });
    }

    // Ajout d'un écouteur d'événement pour le corps du tableau
    document.getElementById('dossiersTableBody').addEventListener('click', function(e) {
        if (e.target.closest('.delete-btn')) {
            const row = e.target.closest('tr');
            if (confirm('Êtes-vous sûr de vouloir supprimer ce dossier ? Cette action est irréversible.')) {
                row.remove();
            }
        }

        if (e.target.closest('.edit-btn')) {
            const row = e.target.closest('tr');
            document.getElementById('editModalTitle').textContent = 'Modifier Dossier';
            fillFormFromRow(row);
            showModal(editDossierModal);
        }
    });

    // Ajout d'un écouteur d'événement pour le formulaire
    document.getElementById('dossierForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const row = document.querySelector('.edit-btn[data-dossier="new"]')?.closest('tr');
        if (row) {
            updateDossierInTable(row);
        } else {
            addDossierToTable();
        }
        hideModals();
    });

    // Ajout d'un écouteur d'événement pour le bouton de sauvegarde
    document.getElementById('saveDossierBtn').addEventListener('click', () => {
        document.getElementById('dossierForm').dispatchEvent(new Event('submit'));
    });

    // Fonction pour remplir le formulaire à partir d'une ligne
    function fillFormFromRow(row) {
        const cells = row.cells;
        document.getElementById('dossierName').value = cells[1].textContent;
        document.getElementById('dossierId').value = cells[0].textContent;
        document.getElementById('creationDate').value = cells[2].textContent.split('/').reverse().join('-');
        document.getElementById('responsibleDoctor').value = cells[3].textContent;
        document.getElementById('lastUpdate').value = cells[4].textContent.split('/').reverse().join('-');
        document.getElementById('dossierStatus').value = cells[5].textContent.toLowerCase() === 'actif' ? 'active' : 'inactive';
    }

    // Fonction pour mettre à jour un dossier dans le tableau
    function updateDossierInTable(row) {
        const cells = row.cells;
        cells[1].textContent = document.getElementById('dossierName').value;
        cells[2].textContent = formatDate(document.getElementById('creationDate').value);
        cells[3].textContent = document.getElementById('responsibleDoctor').value;
        cells[4].textContent = formatDate(document.getElementById('lastUpdate').value);
        cells[5].innerHTML = document.getElementById('dossierStatus').value === 'active'
            ? '<span class="status status-active">Actif</span>'
            : '<span class="status status-inactive">Inactif</span>';
    }

    // Fonction pour ajouter un dossier au tableau
    function addDossierToTable() {
        const dossierName = document.getElementById('dossierName').value;
        const dossierId = document.getElementById('dossierId').value;
        const creationDate = document.getElementById('creationDate').value;
        const responsibleDoctor = document.getElementById('responsibleDoctor').value;
        const lastUpdate = document.getElementById('lastUpdate').value;
        const dossierStatus = document.getElementById('dossierStatus').value;

        const tableBody = document.getElementById('dossiersTableBody');
        const newRow = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = dossierId;
        newRow.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = dossierName;
        newRow.appendChild(nameCell);

        const creationDateCell = document.createElement('td');
        creationDateCell.textContent = formatDate(creationDate);
        newRow.appendChild(creationDateCell);

        const doctorCell = document.createElement('td');
        doctorCell.textContent = responsibleDoctor;
        newRow.appendChild(doctorCell);

        const lastUpdateCell = document.createElement('td');
        lastUpdateCell.textContent = formatDate(lastUpdate);
        newRow.appendChild(lastUpdateCell);

        const statusCell = document.createElement('td');
        statusCell.innerHTML = dossierStatus === 'active'
            ? '<span class="status status-active">Actif</span>'
            : '<span class="status status-inactive">Inactif</span>';
        newRow.appendChild(statusCell);

        const actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <div class="action-btns">
                <button class="action-btn view-btn" data-dossier="new">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" data-dossier="new">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" data-dossier="new">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        newRow.appendChild(actionsCell);

        tableBody.appendChild(newRow);

        document.getElementById('dossierForm').reset();
    }

    // Fonction pour formater une date
    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    // Fonction pour vérifier si une date est récente
    function isRecent(dateString) {
        const recordDate = new Date(dateString.split('/').reverse().join('-'));
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        return recordDate >= weekAgo;
    }
});
