// Guess the Number Game

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');

// Focus on input when page loads
guessInput.focus();

guessBtn.addEventListener('click', makeGuess);

resetBtn.addEventListener('click', startNewGame);

// Allow pressing Enter key
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        makeGuess();
    }
});

function makeGuess() {
    const userGuess = parseInt(guessInput.value);
    
    // Validation
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        feedback.textContent = "Please enter a number between 1 and 100!";
        feedback.style.color = "red";
        return;
    }
    
    attempts++;
    attemptsDisplay.textContent = attempts;
    
    if (userGuess === randomNumber) {
        feedback.textContent = `🎉 Correct! The number was ${randomNumber}`;
        feedback.style.color = "green";
        guessBtn.disabled = true;
    } 
    else if (userGuess < randomNumber) {
        feedback.textContent = `${userGuess} is too low! Try higher ↑`;
        feedback.style.color = "orange";
    } 
    else {
        feedback.textContent = `${userGuess} is too high! Try lower ↓`;
        feedback.style.color = "orange";
    }
    
    guessInput.value = '';   // Clear input
    guessInput.focus();
}

function startNewGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = 0;
    feedback.textContent = '';
    guessBtn.disabled = false;
    guessInput.value = '';
    guessInput.focus();
}