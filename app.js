/*

GAME FUNCTIONS
 - Players must guess a number between a min and max number
 - Player gets a certain amount of guesses based
 - Notify Player of Guesses Remaining
 - Notify the Player of the Correct answer if lose
 - Let Player Choose to Play Again
*/


// Game Values

let min         = 1, 
    max         = 10,
    winningNum  = getRandomNumber(min, max),
    guessesLeft = 3;

// UI Events

const gameUI = document.querySelector('#game'),
      minNumUI = document.querySelector('.min-num'),
      maxNumUI = document.querySelector('.max-num'),
      guessButtonUI = document.querySelector('#guess-btn'),    
      guessInputUI = document.querySelector('#guess-input'),
      messageUI = document.querySelector('.message');

// Assign UI min and max to

minNumUI.textContent = min;    
maxNumUI.textContent = max;  

// Play again event listener
gameUI.addEventListener('mousedown', (e) => {
    if (e.target.className == 'play-again') {
        window.location.reload();
    }
});

// Listen for Guesses

guessButtonUI.addEventListener('click', () => {
    const guess = parseInt(guessInputUI.value);

    // Validate Guesses
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please Enter a Number between ${min} and ${max}`, 'red')
    }

    // Check if Won

    if (guess == winningNum) {
        // Game Over - Won
        gameOver(true, `${winningNum} is Correct!, YOU WIN`);
    }else {
        // Wrong Number
        guessesLeft -= 1;

        if (guessesLeft === 0 ) {
            // Game Over
           gameOver(false, `Game Over, You Lost. The correct number was ${winningNum}`);
        }else {
            // Game Continues - Answer Wrong
            guessInputUI.value = '';
            // Change Border color
            guessInputUI.style.borderColor = 'red';
             // Set Message
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, 'red')
        }
    }
});


// Game Over

function gameOver(won, message) {

    let color;
    won === true ? color = 'green': color = 'red';

    // Disable Input UI
    guessInputUI.disable = true;
    // Change Border Color
    guessInputUI.style.borderColor = color;
    // Set Message Color
    setMessage(message, color);

    // Play Again?
    guessButtonUI.value = 'Play Again';
    guessButtonUI.className += 'play-again';
}


// Get Winning Number

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

// Set Message

function setMessage(message, color) {
    messageUI.style.color = color;
    messageUI.textContent = message;
}