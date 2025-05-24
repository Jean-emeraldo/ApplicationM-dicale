const dossierModal = document.getElementById('dossierModal');
const viewBtns = document.querySelectorAll('.view-btn');
const closeModalBtns = document.querySelectorAll('.close-modal');

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        dossierModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

const editDossierModal = document.getElementById('editDossierModal');
const addDossierBtn = document.getElementById('addDossierBtn');
const editDossierBtns = document.querySelectorAll('.edit-btn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

addDossierBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('editModalTitle').textContent = 'Nouveau Dossier';
    document.getElementById('dossierForm').reset();
    editDossierModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

editDossierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('editModalTitle').textContent = 'Modifier Dossier';
        const row = btn.closest('tr');
        fillFormFromRow(row);
        editDossierModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

cancelEditBtn.addEventListener('click', () => {
    editDossierModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

const searchInput = document.querySelector('.search-input');
const tableRows = document.querySelectorAll('.dossiers-table tbody tr');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    tableRows.forEach(row => {
        const dossierName = row.cells[1].textContent.toLowerCase();
        if (dossierName.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

const filterSelect = document.querySelector('.filter-select');

filterSelect.addEventListener('change', () => {
    const filterValue = filterSelect.value;

    tableRows.forEach(row => {
        const status = row.cells[5].textContent.toLowerCase();

        if (filterValue === '' ||
            (filterValue === 'active' && status === 'actif') ||
            (filterValue === 'inactive' && status === 'inactif') ||
            (filterValue === 'recent' && isRecent(row.cells[4].textContent))) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

function isRecent(dateString) {
    const recordDate = new Date(dateString.split('/').reverse().join('-'));
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    return recordDate >= weekAgo;
}

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
        editDossierModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
});

document.getElementById('dossierForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const row = document.querySelector('.edit-btn[data-dossier="new"]')?.closest('tr');
    if (row) {
        updateDossierInTable(row);
    } else {
        addDossierToTable();
    }
    editDossierModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

document.getElementById('saveDossierBtn').addEventListener('click', () => {
    document.getElementById('dossierForm').dispatchEvent(new Event('submit'));
});

function fillFormFromRow(row) {
    const cells = row.cells;
    document.getElementById('dossierName').value = cells[1].textContent;
    document.getElementById('dossierId').value = cells[0].textContent;
    document.getElementById('creationDate').value = cells[2].textContent.split('/').reverse().join('-');
    document.getElementById('responsibleDoctor').value = cells[3].textContent;
    document.getElementById('lastUpdate').value = cells[4].textContent.split('/').reverse().join('-');
    document.getElementById('dossierStatus').value = cells[5].textContent.toLowerCase() === 'actif' ? 'active' : 'inactive';
}

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

function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}
