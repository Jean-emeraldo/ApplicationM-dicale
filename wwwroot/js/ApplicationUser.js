document.addEventListener('DOMContentLoaded', () => {
    // Vérification de l'authentification
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated || isAuthenticated !== 'true') {
        window.location.href = '@Url.Action("NewPatient", "Home")';
    }

    // Sélection des éléments du DOM
    const userModal = document.getElementById('userModal');
    const editUserModal = document.getElementById('editUserModal');
    const viewBtns = document.querySelectorAll('.view-btn');
    const editBtns = document.querySelectorAll('.edit-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const addUserBtn = document.getElementById('addUserBtn');
    const editUserBtn = document.getElementById('editUserBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const saveUserBtn = document.getElementById('saveUserBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

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
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            fillUserModalFromRow(row);
            showModal(userModal);
        });
    });

    // Ajout des écouteurs d'événements pour les boutons d'édition
    editBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            fillEditUserFormFromRow(row);
            showModal(editUserModal);
        });
    });

    // Ajout d'un écouteur d'événement pour le bouton d'ajout d'utilisateur
    if (addUserBtn) {
        addUserBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('editModalTitle').textContent = 'Ajouter Utilisateur';
            document.getElementById('userForm').reset();
            showModal(editUserModal);
        });
    }

    // Ajout d'un écouteur d'événement pour le bouton d'édition d'utilisateur
    if (editUserBtn) {
        editUserBtn.addEventListener('click', () => {
            userModal.style.display = 'none';
            const row = document.querySelector('.view-btn[data-user="active"]').closest('tr');
            fillEditUserFormFromRow(row);
            showModal(editUserModal);
        });
    }

    // Ajout d'un écouteur d'événement pour le bouton d'annulation
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', hideModals);
    }

    // Ajout d'un écouteur d'événement pour le bouton de fermeture de modale
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            userModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

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

    // Ajout d'un écouteur d'événement pour le formulaire
    document.getElementById('userForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const row = document.querySelector('.edit-btn[data-user="active"]').closest('tr');
        if (row) {
            updateUserInTable(row);
        } else {
            addUserToTable();
        }
        hideModals();
    });

    // Ajout d'un écouteur d'événement pour le bouton de sauvegarde
    if (saveUserBtn) {
        saveUserBtn.addEventListener('click', () => {
            document.getElementById('userForm').dispatchEvent(new Event('submit'));
        });
    }

    // Fonction pour remplir la modale utilisateur à partir d'une ligne
    function fillUserModalFromRow(row) {
        const cells = row.cells;
        document.getElementById('userName').value = cells[0].querySelector('strong').textContent;
        document.getElementById('userEmail').value = cells[1].textContent;
        document.getElementById('userRole').value = cells[2].querySelector('span').textContent;
        document.getElementById('userStatus').value = cells[3].querySelector('span').textContent;
        document.getElementById('userLastLogin').value = cells[4].textContent;
    }

    // Fonction pour remplir le formulaire d'édition d'utilisateur à partir d'une ligne
    function fillEditUserFormFromRow(row) {
        const cells = row.cells;
        document.getElementById('editUserName').value = cells[0].querySelector('strong').textContent;
        document.getElementById('editUserEmail').value = cells[1].textContent;
        document.getElementById('editUserRole').value = cells[2].querySelector('span').textContent;
        document.getElementById('editUserStatus').value = cells[3].querySelector('span').textContent.toLowerCase() === 'actif' ? 'active' : 'inactive';
        document.getElementById('editUserLastLogin').value = cells[4].textContent.replace(' ', 'T');
    }

    // Fonction pour mettre à jour un utilisateur dans le tableau
    function updateUserInTable(row) {
        const cells = row.cells;
        cells[0].querySelector('strong').textContent = document.getElementById('editUserName').value;
        cells[1].textContent = document.getElementById('editUserEmail').value;
        cells[2].querySelector('span').textContent = document.getElementById('editUserRole').value;
        cells[3].innerHTML = document.getElementById('editUserStatus').value === 'active'
            ? '<span class="badge badge-success">Actif</span>'
            : '<span class="badge badge-danger">Inactif</span>';
        cells[4].textContent = formatDateTime(document.getElementById('editUserLastLogin').value);
    }

    // Fonction pour ajouter un utilisateur au tableau
    function addUserToTable() {
        const userName = document.getElementById('editUserName').value;
        const userEmail = document.getElementById('editUserEmail').value;
        const userRole = document.getElementById('editUserRole').value;
        const userStatus = document.getElementById('editUserStatus').value;
        const userLastLogin = document.getElementById('editUserLastLogin').value;

        const tableBody = document.querySelector('#usersTable tbody');
        const newRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="../images/default-avatar.png" alt="Avatar" class="user-avatar">
                <div>
                    <strong>${userName}</strong>
                    <div style="color: var(--text-muted); font-size: 0.875rem;">${userRole}</div>
                </div>
            </div>
        `;
        newRow.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = userEmail;
        newRow.appendChild(emailCell);

        const roleCell = document.createElement('td');
        roleCell.innerHTML = `<span class="badge badge-${getBadgeClass(userRole)}">${userRole}</span>`;
        newRow.appendChild(roleCell);

        const statusCell = document.createElement('td');
        statusCell.innerHTML = userStatus === 'active'
            ? '<span class="badge badge-success">Actif</span>'
            : '<span class="badge badge-danger">Inactif</span>';
        newRow.appendChild(statusCell);

        const lastLoginCell = document.createElement('td');
        lastLoginCell.textContent = formatDateTime(userLastLogin);
        newRow.appendChild(lastLoginCell);

        const actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <div class="action-buttons">
                <button class="btn btn-primary btn-sm edit-btn" data-user="new">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-secondary btn-sm view-btn" data-user="new">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        newRow.appendChild(actionsCell);

        tableBody.appendChild(newRow);

        document.getElementById('userForm').reset();
    }

    // Fonction pour formater une date et une heure
    function formatDateTime(dateTime) {
        const d = new Date(dateTime);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        let hour = '' + d.getHours();
        let minute = '' + d.getMinutes();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hour.length < 2) hour = '0' + hour;
        if (minute.length < 2) minute = '0' + minute;

        return [year, month, day].join('-') + ' ' + [hour, minute].join(':');
    }

    // Fonction pour obtenir la classe de badge en fonction du rôle
    function getBadgeClass(role) {
        switch(role) {
            case 'Admin':
                return 'primary';
            case 'Médecin':
                return 'success';
            case 'Secrétaire':
                return 'warning';
            default:
                return 'secondary';
        }
    }

    // Fonction pour supprimer un utilisateur
    function deleteUser(button) {
        const row = button.closest('tr');
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            row.remove();
            alert('Utilisateur supprimé avec succès.');
        }
    }

    // Ajout d'un écouteur d'événement pour le bouton de recherche
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchInputValue = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll('#usersTable tbody tr');

            rows.forEach(row => {
                const name = row.querySelector('td:first-child strong').textContent.toLowerCase();
                const email = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const role = row.querySelector('td:nth-child(3) span').textContent.toLowerCase();

                if (name.includes(searchInputValue) || email.includes(searchInputValue) || role.includes(searchInputValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Ajout d'un écouteur d'événement pour le champ de recherche
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchInputValue = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll('#usersTable tbody tr');

            rows.forEach(row => {
                const name = row.querySelector('td:first-child strong').textContent.toLowerCase();
                const email = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const role = row.querySelector('td:nth-child(3) span').textContent.toLowerCase();

                if (name.includes(searchInputValue) || email.includes(searchInputValue) || role.includes(searchInputValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Ajout des écouteurs d'événements pour les boutons de période
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.period-selector');
            parent.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialisation des graphiques
    const ctx1 = document.getElementById('userStatsChart').getContext('2d');
    const userStatsChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
            datasets: [{
                label: 'Utilisateurs Actifs',
                data: [15, 16, 15, 17, 17, 18, 18],
                borderColor: '#00d97e',
                backgroundColor: 'rgba(0, 217, 126, 0.05)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#00d97e',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Utilisateurs Inactifs',
                data: [5, 5, 6, 5, 6, 6, 6],
                borderColor: '#e63757',
                backgroundColor: 'rgba(230, 55, 87, 0.05)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#e63757',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { size: 14 },
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        stepSize: 5
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });

    const ctx2 = document.getElementById('userRolesChart').getContext('2d');
    const userRolesChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Administrateurs', 'Médecins', 'Secrétaires', 'Techniciens'],
            datasets: [{
                data: [2, 8, 6, 8],
                backgroundColor: [
                    '#2c7be5',
                    '#00d97e',
                    '#f6c343',
                    '#6c757d'
                ],
                borderWidth: 0,
                hoverOffset: 10,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
});
