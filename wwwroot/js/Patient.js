const patientModal = document.getElementById('patientModal');
const viewBtns = document.querySelectorAll('.view-btn');
const closeModalBtns = document.querySelectorAll('.close-modal');

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        patientModal.style.display = 'flex';
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

const editPatientModal = document.getElementById('editPatientModal');
const addPatientBtn = document.getElementById('addPatientBtn');
const editPatientBtns = document.querySelectorAll('.edit-btn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

addPatientBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('editModalTitle').textContent = 'Nouveau Patient';
    document.getElementById('patientForm').reset();
    editPatientModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

editPatientBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('editModalTitle').textContent = 'Modifier Patient';
        const row = btn.closest('tr');
        fillFormFromRow(row);
        editPatientModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

cancelEditBtn.addEventListener('click', () => {
    editPatientModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

const searchInput = document.querySelector('.search-input');
const tableRows = document.querySelectorAll('.patients-table tbody tr');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    tableRows.forEach(row => {
        const patientName = row.cells[1].textContent.toLowerCase();
        if (patientName.includes(searchTerm)) {
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

document.getElementById('patientsTableBody').addEventListener('click', function(e) {
    if (e.target.closest('.delete-btn')) {
        const row = e.target.closest('tr');
        if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ? Cette action est irréversible.')) {
            row.remove();
        }
    }

    if (e.target.closest('.edit-btn')) {
        const row = e.target.closest('tr');
        document.getElementById('editModalTitle').textContent = 'Modifier Patient';
        fillFormFromRow(row);
        editPatientModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
});

document.getElementById('patientForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const row = document.querySelector('.edit-btn[data-patient="new"]')?.closest('tr');
    if (row) {
        updatePatientInTable(row);
    } else {
        addPatientToTable();
    }
    editPatientModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

document.getElementById('savePatientBtn').addEventListener('click', () => {
    document.getElementById('patientForm').dispatchEvent(new Event('submit'));
});

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

    const tableBody = document.getElementById('patientsTableBody');
    const newRow = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = `P-${Math.floor(Math.random() * 10000)}`;
    newRow.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = `${firstName} ${lastName}`;
    newRow.appendChild(nameCell);

    const birthDateCell = document.createElement('td');
    birthDateCell.textContent = formatDate(birthDate);
    newRow.appendChild(birthDateCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = phone;
    newRow.appendChild(phoneCell);

    const lastVisitCell = document.createElement('td');
    lastVisitCell.textContent = formatDate(new Date());
    newRow.appendChild(lastVisitCell);

    const statusCell = document.createElement('td');
    statusCell.innerHTML = '<span class="status status-active">Actif</span>';
    newRow.appendChild(statusCell);

    const actionsCell = document.createElement('td');
    actionsCell.innerHTML = `
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
    `;
    newRow.appendChild(actionsCell);

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

