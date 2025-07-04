let currentUser = {
    firstName: '',
    lastName: '',
    phone: ''
};

let examState = {
    answers: new Array(questions.length).fill(null),
    startTime: null,
    endTime: null,
    timeLeft: 30 * 60,
    timer: null,
    currentQuestion: 0
};

const userInfoForm = document.getElementById('userInfoForm');
const instructionsDiv = document.getElementById('instructions');
const examInterface = document.getElementById('examInterface');
const resultsDiv = document.getElementById('results');

document.getElementById('infoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    currentUser.firstName = document.getElementById('firstName').value;
    currentUser.lastName = document.getElementById('lastName').value;
    currentUser.phone = document.getElementById('phone').value;

    userInfoForm.classList.add('hidden');
    instructionsDiv.classList.remove('hidden');
});

document.getElementById('startExam').addEventListener('click', () => {
    instructionsDiv.classList.add('hidden');
    examInterface.classList.remove('hidden');
    startExam();
});

function startExam() {
    examState.startTime = new Date();
    renderQuestions();
    renderQuestionNumbers();
    startTimer();
    updateProgressBar();
}

function renderQuestions() {
    const container = document.getElementById('questionContainer');
    container.innerHTML = questions.map((question, index) => `
        <div id="question-${index}" class="question ${index === examState.currentQuestion ? 'highlight' : ''}">
            <h3>Soru ${index + 1} <span class="difficulty ${question.difficulty}">${getDifficultyText(question.difficulty)}</span></h3>
            <p>${question.text}</p>
            <div class="options">
                ${question.options.map((option, optIndex) => `
                    <label class="option">
                        <input type="radio" name="question-${index}" value="${optIndex}"
                            ${examState.answers[index] === optIndex ? 'checked' : ''}>
                        ${option}
                    </label>
                `).join('')}
                <label class="option">
                    <input type="radio" name="question-${index}" value="skip"
                        ${examState.answers[index] === 'skip' ? 'checked' : ''}>
                    Boş Bırak
                </label>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', handleAnswerSelection);
    });
}

function getDifficultyText(difficulty) {
    switch(difficulty) {
        case 'easy': return 'Kolay';
        case 'medium': return 'Orta';
        case 'hard': return 'Zor';
        default: return '';
    }
}

function renderQuestionNumbers() {
    const container = document.querySelector('.question-numbers');
    container.innerHTML = examState.answers.map((answer, index) => `
        <div class="question-number ${getQuestionNumberClass(answer)}" data-index="${index}">
            ${index + 1}
        </div>
    `).join('');

    container.querySelectorAll('.question-number').forEach(num => {
        num.addEventListener('click', () => {
            navigateToQuestion(parseInt(num.dataset.index));
        });
    });
}

function getQuestionNumberClass(answer) {
    if (answer === null) return '';
    if (answer === 'skip') return 'skipped';
    return 'answered';
}

function handleAnswerSelection(e) {
    const questionIndex = parseInt(e.target.name.split('-')[1]);
    const value = e.target.value;
    examState.answers[questionIndex] = value === 'skip' ? 'skip' : parseInt(value);
    updateProgressBar();
    renderQuestionNumbers();
}

function navigateToQuestion(index) {
    examState.currentQuestion = index;
    document.querySelectorAll('.question').forEach(q => q.classList.remove('highlight'));
    document.getElementById(`question-${index}`).classList.add('highlight');
    document.getElementById(`question-${index}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function updateProgressBar() {
    const answered = examState.answers.filter(a => a !== null).length;
    const progress = (answered / questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function startTimer() {
    const timerDisplay = document.getElementById('timeLeft');
    examState.timer = setInterval(() => {
        examState.timeLeft--;
        
        if (examState.timeLeft <= 0) {
            clearInterval(examState.timer);
            finishExam();
        }

        const minutes = Math.floor(examState.timeLeft / 60);
        const seconds = examState.timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

document.getElementById('finishExam').addEventListener('click', finishExam);

function finishExam() {
    clearInterval(examState.timer);
    examState.endTime = new Date();
    examInterface.classList.add('hidden');
    resultsDiv.classList.remove('hidden');
    showResults();
}

function showResults() {
    const results = calculateResults();

    document.getElementById('completionTime').textContent = formatTime(results.completionTime);
    document.getElementById('answeredCount').textContent = results.answeredCount;
    document.getElementById('correctCount').textContent = results.correctCount;
    document.getElementById('wrongCount').textContent = results.wrongCount;

    const detailedResults = document.getElementById('detailedResults');
    detailedResults.innerHTML = questions.map((question, index) => `
        <div class="detailed-result">
            <h4>Soru ${index + 1} <span class="difficulty ${question.difficulty}">${getDifficultyText(question.difficulty)}</span></h4>
            <p>${question.text}</p>
            <p class="${getResultClass(examState.answers[index], question.correctAnswer)}">
                Verilen Cevap: ${getAnswerText(examState.answers[index], question.options)}
                <br>
                Dogru Cevap: ${question.options[question.correctAnswer]}
            </p>
        </div>
    `).join('');
}

function calculateResults() {
    const results = {
        completionTime: examState.endTime - examState.startTime,
        answeredCount: examState.answers.filter(a => a !== null).length,
        correctCount: 0,
        wrongCount: 0
    };

    examState.answers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
            results.correctCount++;
        } else if (answer !== null && answer !== 'skip') {
            results.wrongCount++;
        }
    });

    return results;
}

function getResultClass(answer, correctAnswer) {
    if (answer === null || answer === 'skip') return 'skipped';
    return answer === correctAnswer ? 'correct' : 'incorrect';
}

function getAnswerText(answer, options) {
    if (answer === null) return 'Cevapsiz';
    if (answer === 'skip') return 'Bos Birakildi';
    return options[answer];
}

function formatTime(ms) {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('downloadResults').addEventListener('click', generatePDF);

function generatePDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
    });

    doc.setFontSize(22);
    doc.setTextColor(52, 152, 219);
    doc.text('Sinav Sonuc Raporu', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    
    doc.setDrawColor(52, 152, 219);
    doc.setFillColor(241, 248, 255);
    doc.roundedRect(20, 30, 170, 40, 3, 3, 'FD');
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Katilimci Bilgileri', 30, 40);
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Ad: ${currentUser.firstName}`, 30, 50);
    doc.text(`Soyad: ${currentUser.lastName}`, 30, 58);
    doc.text(`Telefon: ${currentUser.phone}`, 30, 66);

    const results = calculateResults();

    doc.setDrawColor(46, 204, 113);
    doc.setFillColor(212, 237, 218);
    doc.roundedRect(20, 80, 170, 50, 3, 3, 'FD');
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Sinav Ozeti', 30, 90);
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Tamamlama Suresi: ${formatTime(results.completionTime)}`, 30, 100);
    doc.text(`Cevaplanan Soru: ${results.answeredCount}`, 30, 108);
    doc.text(`Dogru Sayisi: ${results.correctCount}`, 30, 116);
    doc.text(`Yanlis Sayisi: ${results.wrongCount}`, 30, 124);

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Detayli Sonuclar', 105, 140, { align: 'center' });
    
    let yPos = 150;
    
    examState.answers.forEach((answer, index) => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }

        const isCorrect = answer === questions[index].correctAnswer;
        const isSkipped = answer === 'skip' || answer === null;
        
        if (isCorrect) {
            doc.setDrawColor(46, 204, 113);
            doc.setFillColor(212, 237, 218);
        } else if (isSkipped) {
            doc.setDrawColor(241, 196, 15);
            doc.setFillColor(255, 243, 205);
        } else {
            doc.setDrawColor(231, 76, 60);
            doc.setFillColor(248, 215, 218);
        }
        
        doc.roundedRect(20, yPos, 170, 30, 3, 3, 'FD');

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(44, 62, 80);

        const difficultyText = getDifficultyText(questions[index].difficulty);
        doc.text(`Soru ${index + 1} (${difficultyText})`, 25, yPos + 8);

        doc.setFont(undefined, 'normal');
        const questionText = questions[index].text;
        const maxLength = 80;
        const displayText = questionText.length > maxLength 
            ? questionText.substring(0, maxLength) + '...' 
            : questionText;
        
        doc.text(displayText, 25, yPos + 16);

        if (isCorrect) {
            doc.setTextColor(21, 87, 36);
            doc.text(`Dogru: ${questions[index].options[questions[index].correctAnswer]}`, 25, yPos + 24);
        } else if (isSkipped) {
            doc.setTextColor(133, 100, 4);
            doc.text(`! Bos Birakildi. Dogru Cevap: ${questions[index].options[questions[index].correctAnswer]}`, 25, yPos + 24);
        } else {
            doc.setTextColor(114, 28, 36);
            doc.text(`X Yanlis: ${getAnswerText(answer, questions[index].options)}`, 25, yPos + 24);
            doc.text(`Dogru Cevap: ${questions[index].options[questions[index].correctAnswer]}`, 25, yPos + 32);
            yPos += 8;
        }
        yPos += 40;
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(108, 117, 125);
        doc.text(`Sayfa ${i} / ${pageCount}`, 105, 290, { align: 'center' });
        doc.text('Egitim Teknolojileri  © 2025', 105, 297, { align: 'center' });
    }

    doc.save('sinav-sonuclari.pdf');
}