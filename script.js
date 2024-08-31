// Enhanced JavaScript for dynamic image loading, feedback, and timer controls



const words = [
    { image: src = "./image/dog.png.jpg", word: 'DOG' },
    { image: src = "./image/book.png.jpg", word: 'BOOK' },
    { image: src = "./image/fish.png.jpg", word: 'FISH' },
    { image: src = "./image/house.png.jpg", word: 'HOUSE' },
    { image: src = "./image/car.png.jpg", word: 'CAR' },
    { image: src = "./image/shoe.png.jpg", word: 'SHOE' },
    { image: src = "./image/mug.png.jpg", word: 'MUG' },

];

let currentImageIndex = 0;
let spelledWord = "";
let correctWord = words[currentImageIndex].word;
let timeLeft = 60;
let timeoutId, intervalId;
let isRunning = false;

function showImage() {
    document.getElementById('currentImage').src = words[currentImageIndex].image;
    spelledWord = "";
    updateWordBoxes();
    updateTimer();

    timeoutId = setTimeout(nextImage, timeLeft * 1000);
    intervalId = setInterval(() => {
        if (isRunning) {
            timeLeft--;
            updateTimer();
            if (timeLeft <= 0) {
                clearInterval(intervalId);
            }
        }
    }, 1000);
}

function nextImage() {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    currentImageIndex++;
    if (currentImageIndex < words.length) {
        correctWord = words[currentImageIndex].word;
        timeLeft = 60;
        showImage();
    } else {
        showReport();
    }
}

function updateTimer() {
    document.getElementById('timerDisplay').innerText = `Time Left: ${timeLeft}s`;
}

function updateWordBoxes() {
    const wordBoxes = document.getElementById('wordBoxes').children;
    for (let i = 0; i < wordBoxes.length; i++) {
        if (i < spelledWord.length) {
            wordBoxes[i].innerText = spelledWord[i];
            if (spelledWord[i] === correctWord[i]) {
                wordBoxes[i].classList.add('correct');
                wordBoxes[i].classList.remove('incorrect');
            } else {
                wordBoxes[i].classList.add('incorrect');
                wordBoxes[i].classList.remove('correct');
            }
        } else {
            wordBoxes[i].innerText = "";
            wordBoxes[i].classList.remove('correct', 'incorrect');
        }
    }
}

function checkSpelling() {
    updateWordBoxes();
    if (spelledWord.length === correctWord.length) {
        if (spelledWord === correctWord) {
            setTimeout(nextImage, 1000); // Automatically go to the next image if the word is correct
        } else {
            alert("Incorrect spelling!");
            spelledWord = ""; // Reset spelled word to allow the user to try again
            updateWordBoxes();
            timeLeft = 60;
        }
    }
}

function showReport() {
    let reportMessage = "Your Spelling Report: ";
    reportMessage += `<br> You spelled ${currentImageIndex} words correctly.`;
    document.getElementById('reportArea').innerHTML = reportMessage;
}

function startGame() {
    if (isRunning) return;
    isRunning = true;
    currentImageIndex = 0;
    timeLeft = 60;
    spelledWord = "";
    document.getElementById('reportArea').innerHTML = "";
    showImage();
}

function stopGame() {
    isRunning = false;
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    showReport();
}

document.querySelectorAll('.alphabet-area button').forEach(button => {
    button.addEventListener('click', () => {
        if (isRunning && spelledWord.length < correctWord.length) {
            spelledWord += button.textContent;
            checkSpelling();
        }
    });
});