// Mock user data with Turkish names
const users = [
    { username: 'admin', password: 'admin123', role: 'Baskan', name: 'name1', title: 'Baskan', department: 'IT' },
    { username: '', password: '', role: 'Team Lead', name: '', title: '', department: ' ' },
    { username: '', password: '', role: 'Uye', name: '', title: '', department: ' ' },
    { username: '', password: '', role: 'Uye', name: '', title: '', department: ' ' },
    { username: '', password: '', role: 'Uye', name: '', title: '', department: ' ' },
    { username: '', password: '', role: 'Uye', name: '', title: '', department: ' ' },
    { username: '', password: '', role: 'Uye', name: '', title: '', department: ' ' },
    { username: '', password: '', role: 'Uye', name: '', title: '', department: ' ' }
];

// Mock task data with more tasks and status
let tasks = [
    {
        id: 1, 
        title: 'Egitim Icerigi Yazilacak',
        category: 'Egitim Planlamasi',
        priority: 'Yuksek',
        assignedTo: 'name1',
        status: 'yapiliyor',
        tamamlandi: false
    },
    {
        id: 2,
        title: 'Egitim Icerikleri Kontrol Edilecek',
        category: 'Egitim Materyalleri',
        priority: 'Orta',
        assignedTo: 'name1',
        status: 'baslanmadi',
        tamamlandi: false
    },
    {
        id: 3,
        title: '2025 Yil Plani yapilacak.',
        category: 'Egitime Katilim',
        priority: 'Yuksek',
        assignedTo: 'name1',
        status: 'tamamlandi',
        tamamlandi: true
    },
    {
        id: 4,
        title: 'VeriTabani kontrol edilecek.',
        category: 'Geri Bildirim',
        priority: 'Yuksek',
        assignedTo: 'name1',
        status: 'yapiliyor',
        tamamlandi: false
    },
    {
        id: 5,
        title: 'Egitim Atamalari Saglanacak',
        category: 'Egitim Planlamasi',
        priority: 'Kritik',
        assignedTo: 'name1',
        status: 'baslanmadi',
        tamamlandi: false
    },
    {
        id: 6,
        title: 'Toplanti Planlamasi Yapilacak.',
        category: 'Egitim Analitigi',
        priority: 'Orta',
        assignedTo: 'name1',
        status: 'tamamlandi',
        tamamlandi: true
    },
    {
        id: 7,
        title: 'Code Review',
        category: 'Sertifikasyon',
        priority: 'Dusuk',
        assignedTo: 'name1',
        status: 'yapiliyor',
        tamamlandi: false
    },
    {
        id: 8,
        title: 'Network Infrastructure Update',
        category: 'Sertifikasyon',
        priority: 'Yuksek',
        assignedTo: 'name1',
        status: 'baslanmadi',
        tamamlandi: false
    }
];

// Current user state and selected category
let currentUser = null;
let selectedCategory = null;
let chartVisibility = {
    tamamlandi: true,
    yapiliyor: true,
    baslanmadi: true
};

// DOM Elements
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');
const loginForm = document.getElementById('login-form');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const logoutBtn = document.getElementById('logout-btn');
const taskList = document.querySelector('.task-list');
const teamStats = document.getElementById('team-stats');
const taskCategories = document.querySelector('.task-categories');

// Login handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        loginPage.classList.remove('active');
        dashboardPage.classList.add('active');
        updateUserInfo(user);
        loadDashboard();
    } else {
        alert('Kullanıcı Adı veya Şifre Yanlış!');
    }
});

// Update user information in the UI
function updateUserInfo(user) {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-role').textContent = `${user.role} - ${user.title}`;
    document.getElementById('header-username').textContent = user.name.split(' ')[0];
}

// Calculate task statistics
function getTaskStats() {
    const tamamlandi = tasks.filter(task => task.status === 'tamamlandi').length;
    const yapiliyor = tasks.filter(task => task.status === 'yapiliyor').length;
    const baslanmadi = tasks.filter(task => task.status === 'baslanmadi').length;
    return { tamamlandi, yapiliyor, baslanmadi };
}

// Store chart instance
let taskChart = null;

// Update task status and chart
function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        task.tamamlandi = newStatus === 'tamamlandi';
        drawTaskChart();
        updateTaskCategories();
        loadTasks(selectedCategory);
    }
}

// Delete task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    drawTaskChart();
    updateTaskCategories();
    loadTasks(selectedCategory);
}

// Add new task with assignee selection for admin
function addNewTask(title, priority, category, assignedTo = null) {
    const newTask = {
        id: tasks.length + 1,
        title,
        category,
        priority,
        assignedTo: assignedTo || currentUser.name,
        status: 'baslanmadi',
        tamamlandi: false
    };
    tasks.push(newTask);
    drawTaskChart();
    updateTaskCategories();
    loadTasks(selectedCategory);
}

// Load tasks into the task list
function loadTasks(category) {
    selectedCategory = category;
    taskList.innerHTML = '';

    const hasAllTasksPermission = currentUser.role === 'Baskan' || currentUser.role === 'Team Lead';
    const isAllTasksView = !category && document.querySelector('.nav-links a[data-page="tasks"].active');

    if (!isAllTasksView) {
        const newTaskForm = document.createElement('div');
        newTaskForm.className = 'new-task-form';

        if (currentUser.role === 'Baskan' || currentUser.role === 'Team Lead') {
            newTaskForm.innerHTML = `
                <h3>Yeni ${category ? category.charAt(0).toUpperCase() + category.slice(1) : ''} Görev Ekle</h3>
                <div class="form-group">
                    <input type="text" id="new-task-title" placeholder="Görev İçeriği" class="task-input">
                    <select id="new-task-category" class="task-input">
                        <option value="">Kategori Seçiniz</option>
                        <option value="Egitim Planlamasi">Eğitim Planlaması</option>
                        <option value="Egitim Materyalleri">Eğitim Materyalleri</option>
                        <option value="Egitime Katilim">Eğitime Katılım</option>
                        <option value="Katilim Takip">Katılım Takip</option>
                        <option value="Geri Bildirim">Geri Bildirim</option>
                        <option value="Degerlendirme">Degerlendirme</option>
                        <option value="Sertifikasyon">Sertifikasyon</option>
                        <option value="Egitim Analitigi">Eğitim Analitiği</option>
                        <option value="Egitim Raporlama">Eğitim Raporlama</option>
                        <option value="Sinav Basari">Sınav Başarı</option>
                    </select>
                    <select id="new-task-priority" class="task-input">
                        <option value="Dusuk">Düşük Aciliyet</option>
                        <option value="Orta">Orta Aciliyet</option>
                        <option value="Yuksek">Yüksek Aciliyet</option>
                        <option value="Kritik">Kritik</option>
                    </select>
                    <select id="task-assignee" class="task-input">
                        ${users.filter(u => u.role !== 'Baskan' || u.role !== 'Team Lead').map(u => 
                            `<option value="${u.name}">${u.name} (${u.title})</option>`
                        ).join('')}
                    </select>
                    
                    <div class="button-group">
                        <button onclick="handleNewTask()" class="add-task-btn">
                            <span class="button-text">Ekle</span>
                        </button>
                        <button onclick="downloadTasksPDF()" class="action-btn download-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            <span class="button-text">Görevleri Indir</span>
                        </button>
                    </div>
                </div>
            `;
        } else if (currentUser.role === 'Uye'){
            newTaskForm.innerHTML = `
                <h3>Yeni ${category ? category.charAt(0).toUpperCase() + category.slice(1) : ''} Görevi Ekle</h3>
                <div class="form-group">
                    <input type="text" id="new-task-title" placeholder="Görev İçeriği" class="task-input">
                    <select id="new-task-category" class="task-input">
                        <option value="">Kategori Seçiniz</option>
                        <option value="Egitim Planlamasi">Eğitim Planlaması</option>
                        <option value="Egitim Materyalleri">Eğitim Materyalleri</option>
                        <option value="Egitime Katilim">Eğitime Katılım</option>
                        <option value="Katilim Takip">Katılım Takip</option>
                        <option value="Geri Bildirim">Geri Bildirim</option>
                        <option value="Degerlendirme">Degerlendirme</option>
                        <option value="Sertifikasyon">Sertifikasyon</option>
                        <option value="Egitim Analitigi">Eğitim Analitiği</option>
                        <option value="Egitim Raporlama">Eğitim Raporlama</option>
                        <option value="Sinav Basari">Sınav Başarı</option>
                    </select>
                    <select id="new-task-priority" class="task-input">
                        <option value="Dusuk">Düşük Aciliyet</option>
                        <option value="Orta">Orta Aciliyet</option>
                        <option value="Yuksek">Yüksek Aciliyet</option>
                        <option value="Kritik">Kritik</option>
                    </select>
                    <div class="button-group">
                        <button onclick="handleNewTask()" class="add-task-btn">
                            <span class="button-text">Ekle</span>
                        </button>
                        <button onclick="downloadTasksPDF()" class="action-btn download-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            <span class="button-text">Görevleri Indir</span>
                        </button>
                    </div>
                </div>
            `;
        }
        taskList.appendChild(newTaskForm);
    }


    // Filter tasks based on user role and category
    let filteredTasks;
    if (hasAllTasksPermission && !category){
        filteredTasks = tasks;
    } else if (currentUser.role === 'Baskan' || currentUser.role === 'Team Lead') {
        // Admin sees all tasks, filtered by category if selected
        filteredTasks = category 
            ? tasks.filter(task => task.category === category)
            : tasks;
    } else {
        // Regular users only see their own tasks
        filteredTasks = tasks.filter(task => task.assignedTo === currentUser.name);
        if (category) {
            filteredTasks = filteredTasks.filter(task => task.category === category);
        }
    }

    if (isAllTasksView && hasAllTasksPermission) {
        filteredTasks.sort((a, b) => {
            const priorityOrder = { 'Kritik': 4, 'Yuksek': 3, 'Orta': 2, 'Dusuk': 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });

        const indirButton = document.createElement('button');
        indirButton.textContent = 'İndir';
        indirButton.className = 'action-btn download-btn';
        indirButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span class="button-text">İndir</span>
        `;
        indirButton.addEventListener('click', () => {
            downloadSortTasksPDF(); 
        });
        taskList.appendChild(indirButton);
    }

    // Display tasks
    if (filteredTasks.length === 0) {
        const noTasksMessage = document.createElement('div');
        noTasksMessage.className = 'no-tasks-message';
        noTasksMessage.textContent = category
            ? `${category} kategorisinde göreviniz bulunamadı.`
            : 'Görev bulunamadı.';
        taskList.appendChild(noTasksMessage);
    } else {
        filteredTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            taskElement.innerHTML = `
                <div class="task-info">
                    <span class="priority priority-${task.priority}">${task.priority}</span>
                    <div class="task-title">${task.title}</div>
                </div>
                <div class="task-meta">
                    <div class="task-assignee">${task.assignedTo}</div>
                    <select class="task-status-select" data-task-id="${task.id}">
                        <option value="baslanmadi" ${task.status === 'baslanmadi' ? 'selected' : ''}>Başlanmadı</option>
                        <option value="yapiliyor" ${task.status === 'yapiliyor' ? 'selected' : ''}>Yapılıyor</option>
                        <option value="tamamlandi" ${task.status === 'tamamlandi' ? 'selected' : ''}>Tamamlandı</option>
                    </select>
                    ${currentUser.role === 'Baskan' || task.assignedTo === currentUser.name 
                        ? `<button onclick="deleteTask(${task.id})" class="delete-task-btn">Sil</button>`
                        : ''}
                </div>
            `;

            const statusSelect = taskElement.querySelector('.task-status-select');
            statusSelect.addEventListener('change', (e) => {
                const taskId = parseInt(e.target.dataset.taskId);
                updateTaskStatus(taskId, e.target.value);
            });
            taskList.appendChild(taskElement);
        });
    }
}

// Handle new task submission
function handleNewTask() {
    const title = document.getElementById('new-task-title').value;
    const category = document.getElementById('new-task-category').value;
    const priority = document.getElementById('new-task-priority').value;
    
    if (!category) {
        alert('Lütfen bir kategori seçin.');
        return;
    }

    if (title) {
        if (currentUser.role === 'Baskan' || currentUser.role === 'Team Lead') {
            const assignee = document.getElementById('task-assignee').value;
            addNewTask(title, priority, category, assignee);
        } else {
            addNewTask(title, priority, category);
        }
        document.getElementById('new-task-title').value = '';
        document.getElementById('new-task-category').value = '';
    }
}

// Function to toggle chart section visibility
function toggleChartSection(status) {
    chartVisibility[status] = !chartVisibility[status];
    drawTaskChart();
}

// Draw pie chart using Chart.js
function drawTaskChart() {
    const userTasks = currentUser.role === 'Baskan' || currentUser.role === 'Team Lead'
    ? tasks
    : tasks.filter(task => task.assignedTo === currentUser.name);
    
    const stats = {
        tamamlandi: userTasks.filter(task => task.status === 'tamamlandi').length,
        yapiliyor: userTasks.filter(task => task.status === 'yapiliyor').length,
        baslanmadi: userTasks.filter(task => task.status === 'baslanmadi').length,
    };
    
    const ctx = document.getElementById('taskChart').getContext('2d');
    
    if (taskChart) {
        taskChart.destroy();
    }

    // Prepare data based on visibility
    const labels = [];
    const data = [];
    const backgroundColor = [];
    
    if (chartVisibility.tamamlandi) {
        labels.push('Tamamlandı');
        data.push(stats.tamamlandi);
        backgroundColor.push('#09124f');
    }
    if (chartVisibility.yapiliyor) {
        labels.push('Yapılıyor');
        data.push(stats.yapiliyor);
        backgroundColor.push('#d64550');
    }
    if (chartVisibility.baslanmadi) {
        labels.push('Başlanmadı');
        data.push(stats.baslanmadi);
        backgroundColor.push('#b3b3b3');
    }
    
    taskChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    const chartContainer = document.querySelector('.charts-container');
    const existingLegend = chartContainer.querySelector('.chart-legend');
    if (existingLegend) {
        existingLegend.remove();
    }
    
    const legendContainer = document.createElement('div');
    legendContainer.className = 'chart-legend';
    legendContainer.innerHTML = `
        <button class="chart-legend-btn tamamlandı ${!chartVisibility.tamamlandi ? 'inactive' : ''}" onclick="toggleChartSection('tamamlandi')">
            <span class="legend-color tamamlandı-color"></span>
            Tamamlandı (${stats.tamamlandi})
        </button>
        <button class="chart-legend-btn yapılıyor ${!chartVisibility.yapiliyor ? 'inactive' : ''}" onclick="toggleChartSection('yapiliyor')">
            <span class="legend-color yapılıyor-color"></span>
            Yapılıyor (${stats.yapiliyor})
        </button>
        <button class="chart-legend-btn baslanmadı ${!chartVisibility.baslanmadi ? 'inactive' : ''}" onclick="toggleChartSection('baslanmadi')">
            <span class="legend-color baslanmadı-color"></span>
            Baslanmadı (${stats.baslanmadi})
        </button>
    `;
    chartContainer.appendChild(legendContainer);
}

// Update task categories display
function updateTaskCategories() {
    const categories = document.querySelectorAll('.task-card');
    categories.forEach(category => {
        const categoryName = category.dataset.category;
        const categoryTasks = tasks.filter(task => task.category === categoryName);
        const totalTasks = categoryTasks.length;
        const criticalTasks = categoryTasks.filter(task => task.priority === 'Kritik').length;
        
        const statsDiv = category.querySelector('.task-stats');
        statsDiv.innerHTML = `
            <div class="stat">
                <span class="stat-value">${totalTasks}</span>
                <span class="stat-label">Toplam</span>
            </div>
            <div class="stat">
                <span class="stat-value">${criticalTasks}</span>
                <span class="stat-label">Kritik</span>
            </div>
        `;
    });

    // Add click handlers for task categories
    categories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryName = category.dataset.category;
            loadTasks(categoryName);
            
            // Update UI to show we're viewing a category
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');
            
            // Show task list and hide team stats
            document.querySelector('.task-list').style.display = 'block';
            teamStats.style.display = 'none';
        });
    });
}


// Load team statistics
function loadTeamStats() {
    teamStats.innerHTML = '<h2 class="section-title">Ekip Üyeleri</h2>';
    
    // Group users by department
    const departments = {};
    users.forEach(user => {
        if (user.username !== 'admin') { // Exclude admin from the display
            if (!departments[user.department]) {
                departments[user.department] = [];
            }
            departments[user.department].push(user);
        }
    });

    // Create department sections
    Object.entries(departments).forEach(([dept, members]) => {
        const departmentSection = document.createElement('div');
        departmentSection.className = 'department-section';
        departmentSection.innerHTML = `
           
            <div class="team-members-grid">
                ${members.map(member => `
                    <div class="member-card">
                        <div class="member-card-header ${member.role.toLowerCase().replace(' ', '-')}">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400" alt="${member.name}" class="member-image">
                        </div>
                        <div class="member-info">
                            <h4 class="member-name">${member.name}</h4>
                            <p class="member-title">${member.title}</p>
                            <p class="member-role">${member.department}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        teamStats.appendChild(departmentSection);
    });
}

function updateNavigation() {
    const navLinks = document.querySelector('.nav-links');
    const hasAllTasksPermission = currentUser.role === 'Baskan' || currentUser.role === 'Team Lead';

    navLinks.innerHTML = `
            <li><a href='#' data-page="dashboard" class="active">Anasayfa</a></li>
            <li><a href='#' data-page="team">Ekip Üyeleri</a></li>
            ${hasAllTasksPermission ? '<li><a href="#" data-page="tasks">Tüm Görevler</a></li>' : ''}
        `;

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const page = e.target.dataset.page;
            if (page ==='team') {
                document.querySelector('.task-categories').style.display = 'none';
                document.querySelector('.task-list').style.display = 'none';
                teamStats.style.display = 'grid';
                selectedCategory = null;
            } else if (page === 'dashboard') {
                document.querySelector('.task-categories').style.display = 'grid';
                document.querySelector('.task-list').style.display = 'block';
                teamStats.style.display = 'none';
                selectedCategory = null;
                loadTasks();
            } else if (page === 'tasks' && hasAllTasksPermission) {
                document.querySelector('.task-categories').style.display = 'none';
                document.querySelector('.task-list').style.display = 'block';
                teamStats.style.display = 'none';
                loadTasks();
            }
        });
    });

}

function downloadTasksPDF(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let tasksToDownload;
    if (currentUser.role === 'Baskan' || currentUser.role === 'Team Lead') {
        // Admin sees all tasks, filtered by category if selected
        tasksToDownload = selectedCategory 
            ? tasks.filter(task => task.category === selectedCategory)
            : tasks;
    } else {
        // Regular users only see their own tasks
        tasksToDownload = tasks.filter(task => task.assignedTo === currentUser.name);
        if (selectedCategory) {
            tasksToDownload = tasksToDownload.filter(task => task.category === selectedCategory);
        }
    }

    const columns = ['Gorev Basligi', 'Kategori', 'Aciliyet Durumu', 'Yapan', 'Durum'];

    const data = tasksToDownload.map(task => [
        task.title,
        task.category,
        task.priority,
        task.assignedTo,
        task.status.replace('_', ' ')
    ]);

    doc.setFontSize(16);
    doc.text('Gorev Raporu', 14, 15);
    doc.setFontSize(10);
    doc.text(`Olusturulma Tarihi: ${new Date().toLocaleDateString()}`, 14, 25);

    doc.autoTable({
        startY: 30,
        head: [columns],
        body: data,
        theme: 'grid',
        styles: { fontSize: 8},
        headStyles: { fillColor: [255, 71, 87] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    const filename = selectedCategory
        ? `${selectedCategory}_gorevleri.pdf`
        : `${currentUser.name.toLowerCase().replace(' ', '_')}_gorevleri.pdf`;

    doc.save(filename);
}

function downloadSortTasksPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let tasksToDownload;
    if (currentUser.role === 'Baskan' || currentUser.role === 'Team Lead') {
        tasksToDownload = selectedCategory 
            ? tasks.filter(task => task.category === selectedCategory)
            : tasks;
    } else {
        tasksToDownload = tasks.filter(task => task.assignedTo === currentUser.name);
        if (selectedCategory) {
            tasksToDownload = tasksToDownload.filter(task => task.category === selectedCategory);
        }
    }

    tasksToDownload.sort((a, b) => {
        const priorityOrder = { 'Kritik': 4, 'Yuksek': 3, 'Orta': 2, 'Dusuk': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    const columns = ['Görev Basligi', 'Kategori', 'Öncelik Durumu', 'Yapan', 'Durum'];

    const data = tasksToDownload.map(task => [
        task.title,
        task.category,
        task.priority,
        task.assignedTo,
        task.status.replace('_', ' ')
    ]);

    doc.setFontSize(16);
    doc.text('Oncelige Gore Sirali Gorev Raporu', 14, 15);
    doc.setFontSize(10);
    doc.text(`Olusturma Tarihi: ${new Date().toLocaleDateString()}`, 14, 25);

    doc.autoTable({
        startY: 30,
        head: [columns],
        body: data,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [255, 71, 87] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    const filename = selectedCategory
        ? `${selectedCategory}_oncelikli_gorevler.pdf`
        : `${currentUser.name.toLowerCase().replace(' ', '_')}_oncelikli_gorevler.pdf`;

    doc.save(filename);
}

// Load dashboard content
function loadDashboard() {
    updateNavigation();
    loadTasks();
    loadTeamStats();
    drawTaskChart();
    updateTaskCategories();
}

// Theme toggle
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Logout handler
logoutBtn.addEventListener('click', () => {
    currentUser = null;
    dashboardPage.classList.remove('active');
    loginPage.classList.add('active');
    loginForm.reset();
});
