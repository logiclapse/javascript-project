// Guess the Number - Enhanced Version
let randomNumber = 0;
let attempts = 0;
let maxNumber = 100;
let bestScore = localStorage.getItem('bestScore') || Infinity;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const bestScoreDisplay = document.getElementById('bestScore');

// Difficulty Buttons
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const difficulty = button.getAttribute('data-difficulty');
        startNewGame(difficulty);
        
        // Visual feedback
        difficultyButtons.forEach(btn => btn.style.opacity = 0.7);
        button.style.opacity = 1;
    });
});

function startNewGame(difficulty = 'medium') {
    if (difficulty === 'easy') {
        maxNumber = 50;
    } else if (difficulty === 'hard') {
        maxNumber = 200;
    } else {
        maxNumber = 100;
    }

    randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;
    
    attemptsDisplay.textContent = 0;
    feedback.textContent = `New ${difficulty} game started! Guess a number between 1-${maxNumber}`;
    feedback.style.color = "#333";
    
    guessBtn.disabled = false;
    guessInput.value = '';
    guessInput.focus();
    
    // Update best score display
    bestScoreDisplay.textContent = bestScore === Infinity ? '—' : bestScore;
}

function makeGuess() {
    const userGuess = parseInt(guessInput.value);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > maxNumber) {
        feedback.textContent = `Please enter a number between 1 and ${maxNumber}!`;
        feedback.style.color = "red";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    const difference = Math.abs(userGuess - randomNumber);

    if (userGuess === randomNumber) {
        feedback.innerHTML = `🎉 <strong>Correct!</strong> The number was ${randomNumber}.<br>You took <strong>${attempts}</strong> attempts!`;
        feedback.style.color = "#28a745";
        guessBtn.disabled = true;

        // Save best score
        if (attempts < bestScore) {
            bestScore = attempts;
            localStorage.setItem('bestScore', bestScore);
            bestScoreDisplay.textContent = bestScore;
        }
    } 
    else if (difference <= 5) {
        feedback.textContent = `${userGuess} is VERY HOT! 🔥🔥`;
        feedback.style.color = "#dc3545";
    } 
    else if (difference <= 15) {
        feedback.textContent = `${userGuess} is Warm 🌡️`;
        feedback.style.color = "#fd7e14";
    } 
    else if (userGuess < randomNumber) {
        feedback.textContent = `${userGuess} is too low ↑`;
        feedback.style.color = "#007bff";
    } 
    else {
        feedback.textContent = `${userGuess} is too high ↓`;
        feedback.style.color = "#007bff";
    }

    guessInput.value = '';
    guessInput.focus();
}

// Event Listeners
guessBtn.addEventListener('click', makeGuess);

resetBtn.addEventListener('click', () => {
    startNewGame('medium');
});

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        makeGuess();
    }
});

// Start the game when page loads
startNewGame('medium');