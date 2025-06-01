// Theme switcher
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
    }
});

// Task management
let tasks = [];
let deletedTasks = [];
const taskTitleInput = document.getElementById('task-title');
const taskContentInput = document.getElementById('task-content');
const categoryInput = document.getElementById('category-input');
const dueDateInput = document.getElementById('due-date');
const addButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const completedTaskList = document.getElementById('completed-task-list');
const totalTasksElement = document.getElementById('total-tasks');
const completedTasksElement = document.getElementById('completed-tasks');
const deleteTaskList = document.getElementById('delete-task-list'); 
const pendingTasksElement = document.getElementById('pending-tasks');
const downloadActiveTasksButton = document.getElementById('download-active-tasks');
const downloadCompletedTasksButton = document.getElementById('download-completed-tasks');
const downloadDeleteTasksButton = document.getElementById('download-delete-tasks');


// Charts
let lineChart, pieChart, barChart;

function updateStats(){
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    totalTasksElement.textContent = totalTasks;
    completedTasksElement.textContent = completedTasks;
    pendingTasksElement.textContent = pendingTasks;
}

function initializeCharts() {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 12,
                        family: "'Poppins', sans-serif"
                    }
                }
            }
        }
    };

    // Line Chart
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    lineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Tamamlanan Görevler',
                data: [],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                title: {
                    display: true,
                    text: 'Gorev Tamamlama Trendi',
                    font: {
                        size: 16,
                        family: "'Poppins', sans-serif",
                        weight: '600'
                    }
                }
            }
        }
    });

    // Pie Chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        '#6366f1',
                        '#ec4899',
                        '#22c55e',
                        '#eab308',
                        '#ef4444',
                        '#8b5cf6'
                    ]
                }]
        },
        options: {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                title: {
                    display: true,
                    text: 'Gorev Kategorileri',
                    font: {
                        size: 16,
                        family: "'Poppins', sans-serif",
                        weight: '600'
                    }
                }
            }
        }
    });

    const barCtx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart (barCtx, {
        type: 'bar',
        data: {
            labels: ['Bugun', 'Bu Hafta', 'Bu Ay'],
            datasets: [
                {
                    label: 'Tamamlanan',
                    data: [0, 0, 0],
                    backgroundColor: '#22c55e'
                },
                {
                    label: 'Bekleyen',
                    data: [0, 0, 0],
                    backgroundColor: '#ef4444'
                }
            ]
        },
        options: {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                title: {
                    display: true,
                    text: 'Gorev Durumu Ozeti',
                    font: {
                        size: 16,
                        family: "'Poppins', sans-serif",
                        weight: '600'
                    }
                }
            }
        }
    });
}

function updateCharts() {
    // Update Line Chart
    const dates = [...new Set(tasks.map(task => task.date))];
    const completedByDate = dates.map(date => 
        tasks.filter(task => task.date === date && task.completed).length
    );

    lineChart.data.labels = dates;
    lineChart.data.datasets[0].data = completedByDate;
    lineChart.update();

    // Update Pie Chart
    const categories = [...new Set(tasks.map(task => task.category))];
    const tasksByCategory = categories.map(category =>
        tasks.filter(task => task.category === category).length
    );

    pieChart.data.labels = categories;
    pieChart.data.datasets[0].data = tasksByCategory;
    pieChart.update();

    //Update Bar Chart
    const now = new Date();
    const today = now.toLocaleDateString();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay())).toLocaleDateString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString();

    const completedToday = tasks.filter(task => new Date(task.date).toLocaleDateString() === today && task.completed).length;
    const completedThisWeek = tasks.filter(task => new Date(task.date) >= new Date(weekStart) && task.completed).length;
    const completedThisMonth = tasks.filter(task => new Date(task.date) >= new Date(monthStart) && task.completed).length;

    const pendingToday = tasks.filter(task => new Date(task.date).toLocaleDateString() === today && !task.completed).length;
    const pendingThisWeek = tasks.filter(task => new Date(task.date) >= new Date(weekStart) && !task.completed).length;
    const pendingThisMonth = tasks.filter(task => new Date(task.date) >= new Date(monthStart) && !task.completed).length;

    barChart.data.datasets[0].data = [completedToday, completedThisWeek, completedThisMonth];
    barChart.data.datasets[1].data = [pendingToday, pendingThisWeek, pendingThisMonth];
    barChart.update();
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function addTask() {
    const title = taskTitleInput.value.trim();
    const content = taskContentInput.value.trim();
    const category = categoryInput.value.trim() || 'Diger';
    const dueDate = dueDateInput.value;

    if (title) {
        const task = {
            id: Date.now(),
            title: title,
            content: content,
            category: category,
            dueDate: dueDate,
            completed: false,
            date: new Date().toLocaleDateString()
        };

        tasks.push(task);
        renderTask(task);
        updateCharts();
        updateStats();

        // Clear inputs
        taskTitleInput.value = '';
        taskContentInput.value = '';
        categoryInput.value = '';
        dueDateInput.value = '';
    }
}

function deleteTask(taskId, listItem) {
    const deletedTask = tasks.find(task => task.id === taskId);
    if (deletedTask) {
        deletedTasks.push(deletedTask);
        renderDeletedTask(deletedTask); // Silinen görevi listeye ekle
    }

    tasks = tasks.filter(task => task.id !== taskId);
    listItem.remove();
    updateStats();
    updateCharts();
}

function renderTask(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <div class="task-header">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <div class="task-content">
                <h3 class="task-title ${task.completed ? 'completed' : ''}">${task.title}</h3>
                <p class="task-description">${task.content}</p>
                <div class="task-meta">
                    <span class="task-category">${task.category}</span>
                    ${task.dueDate ? `<span class="task-date">Son Tarih: ${task.dueDate}</span>` : ''}
                </div>
            </div>
            <button class="delete-task">Sil</button>
        </div>
    `;

    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        li.querySelector('.task-title').classList.toggle('completed', task.completed);
        
        // Move task to appropriate list
        if (task.completed) {
            completedTaskList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
        
        updateStats();
        updateCharts();
    });

    const deleteButton = li.querySelector('.delete-task');
    deleteButton.addEventListener('click', () => {
        deleteTask(task.id, li);
    });

    if (task.completed) {
        completedTaskList.appendChild(li);
    } else {
        taskList.appendChild(li);
    }
}

function renderDeletedTask(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <div class="task-content">
            <h3 class="task-title deleted" style="text-decoration: line-through; text-decoration-color: red;">${task.title}</h3>
            <p class="task-description">${task.content}</p>
            <div class="task-meta">
                <span class="task-category">${task.category}</span>
                ${task.dueDate ? `<span class="task-date">Son Tarih: ${task.dueDate}</span>` : ''}
            </div>
        </div>
    `;
    deleteTaskList.appendChild(li);
}



addButton.addEventListener('click', addTask);
taskTitleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function generatePDF(tasksToDownload, filename){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    
    const titleYPosition = 30;
    doc.text("GOREV LISTESI", 105, titleYPosition, { align: "center"});

    const titleToTableSpacing = 20;
    let startY = titleYPosition + titleToTableSpacing;

    const headers = ["Gorev Basligi", "Gorev Icerigi", "Kategori", "Son Tarih"];
    const colWidth = 40;
    const rowHeight = 10;

    const pageWidth = doc.internal.pageSize.width;
    const totalTableWidth = headers.length * colWidth;
    const startX = (pageWidth - totalTableWidth) / 2;

    let currentY = startY -5;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);

    headers.forEach((header, index) => {
        const cellX = startX + index * colWidth;
        doc.text(header, cellX + colWidth / 2, currentY + rowHeight / 2 + 2, { align: "center"});
    });

    currentY += rowHeight;
    doc.line(startX, startY - 5, startX + totalTableWidth, startY - 5);
    doc.line(startX, currentY, startX + totalTableWidth, currentY);

    for(let i = 0; i <= headers.length; i++){
        doc.line(startX + i * colWidth, startY - 5, startX + i * colWidth, currentY);
    }

    doc.setFont("Helvetica", "normal");

    function splitTextByLimit(text, maxLength) {
        let lines = [];
        let currentLine = "";

        const words = text.split(" ");

        words.forEach(word => {
            if (word.length > maxLength) {
                let wordPart = word;
                while(wordPart.length > maxLength){
                    lines.push(wordPart.slice(0, maxLength));
                    wordPart = wordPart.slice(maxLength);
                }
                if (wordPart.length > 0) {
                    lines.push(wordPart);
                }
            }
            else{
                if ((currentLine + " " + word).length <= maxLength) {
                    currentLine = currentLine + " " + word;
                }
                else{
                    lines.push(currentLine.trim());
                    currentLine = word;
                }
            }
        });

        if (currentLine.length > 0) {
            lines.push(currentLine.trim());
        }

        return lines;
    }

    tasksToDownload.forEach((task) => {
        let rowData = [task.title, task.content, task.category, task.dueDate];

        let cellHeights = rowData.map(cell => {
            let textLines = splitTextByLimit(cell, 12);
            return textLines.length * 5 + 5;
        });

        let maxHeight = Math.max(...cellHeights);

        rowData.forEach((cell, colIndex) => {
            const cellX = startX + colIndex * colWidth;
            let textLines = splitTextByLimit(cell, 12);
            let textHeight = textLines.length * 5;
            let startTextY = currentY + (maxHeight - textHeight) / 2 + 2;

            textLines.forEach((line, lineIndex) => {
                doc.text(line, cellX + colWidth / 2, startTextY + (lineIndex * 5), { align: "center"});
            });
        });

        doc.line(startX, currentY + maxHeight, startX + totalTableWidth, currentY + maxHeight);
        for (let i = 0; i <= headers.length; i++) {
            doc.line(startX + i * colWidth, currentY, startX + i * colWidth, currentY + maxHeight);
        }

        currentY += maxHeight;
    });

    doc.save(filename);
}

downloadActiveTasksButton.addEventListener('click', () => {
    const activeTasks = tasks.filter(task => !task.completed);
    generatePDF(activeTasks, "aktif_gorevler.pdf");
});

downloadCompletedTasksButton.addEventListener('click', () => {
    const completedTasks = tasks.filter(task => task.completed);
    generatePDF(completedTasks, "tamamlanan_gorevler.pdf");
});

downloadDeleteTasksButton.addEventListener('click', () => {
    const deleteTasks = tasks.filter(task => task.completed);
    generatePDF(deleteTasks, "silinen_gorevler.pdf");
});

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    updateStats();
});