//selecting all required elements
const info_box = document.querySelector(".info_box");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector(".header .time_line");
const timeText = document.querySelector(".timer .timer_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// show info box
info_box.classList.add("activeInfo"); //show info box

// Daftar pertanyaan dan jawabannya
const questions = [
    { question: "Saat semester pertama perkuliahan, Aaliya tergabung ke kelas", options: ["A", "B", "C", "D"], answer: "B" },
    { question: "Makanan favorit Aaliya di Tembalang?", options: ["OTI", "Nasi Ayam Bali", "Magelangan", "Ayam Kremes"], answer: "Nasi Ayam Bali" },
    { question: "Tanggal 26 Oktober 2024, konser siapa yang dihadiri Aaliya?", options: ["Jungkook", "Taehyung", "Siwon", "Taemin"], answer: "Taemin" },
    { question: "Dosen favorit Aaliya?", options: ["gak ada", "Bu Nikken", "Pak Heri", "Semua Dosen"], answer: "Semua Dosen" },
    { question: "Di ASMAT, Aaliya tergabung dalam divisi apa?", options: ["Akademik", "Media Kreatif", "Pengembangan", "Riset"], answer: "Riset" },
    { question: "Weton Aaliya?", options: ["Rabu Legi", "Rabu Pon", "Jumat Kliwon", "Rabu Kliwon"], answer: "Rabu Legi" },
    { question: "Mata Kuliah favorit di semester 3?", options: ["wkwkwk gaada", "Aljabar", "Kalkulus", "Algoritma Pemrograman"], answer: "wkwkwk gaada" },
    { question: "Mata kuliah yang paling dihindari Aaliya?", options: ["Aljabar", "Kalkulus", "Matematika Diskrit", "Statistika"], answer: "Statistika" },
    { question: "Hewan favorit Aaliya?", options: ["gada", "ikan", "kucing", "sugar glider"], answer: "gada" },
    { question: "Di bawah ini yang bukan temen Aaliya di depok adalah", options: ["apip", "alin", "naya", "fara"], answer: "naya" }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

// Fungsi untuk memulai timer
function startTimer() {
    clearInterval(timer); // Menghentikan timer jika ada yang masih berjalan
    timeLeft = 10;
    document.querySelector(".timer_sec").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.querySelector(".timer_sec").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            moveToNextQuestion();
        }
    }, 1000);
}

// Fungsi untuk menampilkan pertanyaan
function showQuestion(index) {
    document.querySelector(".que_text").textContent = questions[index].question;
    const optionsElement = document.querySelector(".option_list");
    optionsElement.innerHTML = ""; // Hapus pilihan sebelumnya
    questions[index].options.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.textContent = option;
        optionDiv.onclick = () => checkAnswer(optionDiv, option);
        optionsElement.appendChild(optionDiv);
    });
    startTimer();
}

// Fungsi untuk memeriksa jawaban
function checkAnswer(optionDiv, selectedAnswer) {
    clearInterval(timer); // Hentikan timer saat jawaban dipilih
    const correctAnswer = questions[currentQuestion].answer;

    // Tampilkan warna merah untuk jawaban yang salah dan hijau untuk yang benar
    if (selectedAnswer === correctAnswer) {
        optionDiv.classList.add("correct"); // Tambahkan kelas 'correct' untuk jawaban benar
        score++;
    } else {
        optionDiv.classList.add("incorrect"); // Tambahkan kelas 'incorrect' untuk jawaban salah

        // Temukan dan tandai jawaban yang benar
        const options = document.querySelectorAll(".option");
        options.forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add("correct"); // Tandai jawaban benar
            }
        });
    }

    disableOptions(); // Nonaktifkan semua pilihan setelah jawaban dipilih
    setTimeout(moveToNextQuestion, 1000); // Pindah ke pertanyaan berikutnya setelah 1 detik
}

// Fungsi untuk menonaktifkan opsi setelah memilih jawaban
function disableOptions() {
    const options = document.querySelectorAll(".option");
    options.forEach(option => option.classList.add("disabled"));
}

// Fungsi untuk berpindah ke pertanyaan berikutnya
function moveToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        showResult();
    }
}

// Fungsi untuk menampilkan hasil akhir
function showResult() {
    document.querySelector(".quiz_box").style.display = "none";
    const resultBox = document.querySelector(".result_box");
    resultBox.style.display = "block";
    resultBox.querySelector(".score_text").textContent = `Skor Akhir: ${score} dari ${questions.length}`;
}

// Fungsi untuk memulai ulang kuis
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.querySelector(".quiz_box").style.display = "block";
    document.querySelector(".result_box").style.display = "none";
    showQuestion(currentQuestion);
}

// Mulai kuis saat halaman dimuat atau tombol "continue" ditekan
document.querySelector(".restart").onclick = () => {
    document.querySelector(".info_box").style.display = "none";
    document.querySelector(".quiz_box").style.display = "block";
    showQuestion(currentQuestion);
};

// Tombol ulangi di result box
document.querySelector(".result_box .restart").onclick = restartQuiz;
document.querySelector(".result_box .quit").onclick = () => window.close();
