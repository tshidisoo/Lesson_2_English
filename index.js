// Possessive Adjectives Game - Expanded Version

// Game questions (expanded from previous set + new questions from worksheet)
const questions = [
    // Original questions
    {
        pronoun: 'she',
        possessiveAdjective: 'her',
        sentence: '______ new job is exciting.',
        correctAnswer: 'her'
    },
    {
        pronoun: 'I',
        possessiveAdjective: 'my',
        sentence: 'This is ______ brother. His name is Tom.',
        correctAnswer: 'my'
    },
    {
        pronoun: 'it',
        possessiveAdjective: 'its',
        sentence: 'The dog wagged ______ tail happily.',
        correctAnswer: 'its'
    },
    {
        pronoun: 'we',
        possessiveAdjective: 'our',
        sentence: 'We should bring ______ passports for the trip.',
        correctAnswer: 'our'
    },
    {
        pronoun: 'you',
        possessiveAdjective: 'your',
        sentence: 'Is this ______ phone? I found it on the table.',
        correctAnswer: 'your'
    },
    {
        pronoun: 'they',
        possessiveAdjective: 'their',
        sentence: 'John and Mike finished ______ homework early.',
        correctAnswer: 'their'
    },
    {
        pronoun: 'he',
        possessiveAdjective: 'his',
        sentence: 'That\'s ______ car, the red one over there.',
        correctAnswer: 'his'
    },
    
    // New questions from worksheet
    {
        pronoun: 'I',
        possessiveAdjective: 'my',
        sentence: 'Where is ______ classroom? We can\'t find it.',
        correctAnswer: 'my'
    },
    {
        pronoun: 'she',
        possessiveAdjective: 'her',
        sentence: 'Susan, is that ______ pen on the table?',
        correctAnswer: 'her'
    },
    {
        pronoun: 'I',
        possessiveAdjective: 'my',
        sentence: 'A: What is ______ name? B: My name is Thomas.',
        correctAnswer: 'my'
    },
    {
        pronoun: 'she',
        possessiveAdjective: 'her',
        sentence: 'I think this is ______ book. She dropped it on the floor.',
        correctAnswer: 'her'
    },
    {
        pronoun: 'they',
        possessiveAdjective: 'their',
        sentence: '______ names are Kevin and Stewart. They are my friends.',
        correctAnswer: 'their'
    },
    {
        pronoun: 'he',
        possessiveAdjective: 'his',
        sentence: 'He forgot to write ______ name on the test!',
        correctAnswer: 'his'
    },
    {
        pronoun: 'I',
        possessiveAdjective: 'my',
        sentence: 'A: What is your phone number? B: ______ phone number is 555-9826.',
        correctAnswer: 'my'
    },
    {
        pronoun: 'it',
        possessiveAdjective: 'its',
        sentence: 'Did the cat eat all of ______ food?',
        correctAnswer: 'its'
    },
    {
        pronoun: 'they',
        possessiveAdjective: 'their',
        sentence: 'The children are crying because they can\'t find ______ toys.',
        correctAnswer: 'their'
    },
    {
        pronoun: 'they',
        possessiveAdjective: 'their',
        sentence: 'Mariam and Jennifer like ______ new teacher.',
        correctAnswer: 'their'
    },
    {
        pronoun: 'I',
        possessiveAdjective: 'my',
        sentence: 'I really like my new home, especially ______ location.',
        correctAnswer: 'my'
    },
    {
        pronoun: 'he',
        possessiveAdjective: 'his',
        sentence: 'This is a picture of my friend. He is ______ best friend.',
        correctAnswer: 'his'
    }
];

// DOM Elements
const pronounDisplay = document.getElementById('pronoun-display');
const sentenceDisplay = document.getElementById('sentence-display');
const optionsContainer = document.getElementById('options-container');
const feedbackDisplay = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const totalQuestionsDisplay = document.getElementById('total-questions');
const nextButton = document.getElementById('next-btn');

// Add event listener for the next button
nextButton.addEventListener('click', nextQuestion);

// Game state variables
let currentQuestionIndex = 0;
let score = 0;

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate options for current question
function generateOptions(correctAnswer) {
    const allPossessiveAdjectives = ['my', 'your', 'his', 'her', 'its', 'our', 'their'];
    
    // Remove the correct answer from the list and select 2 random incorrect options
    const incorrectOptions = allPossessiveAdjectives
        .filter(adj => adj !== correctAnswer)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
    
    // Combine correct and incorrect options
    const options = [...incorrectOptions, correctAnswer];
    
    // Shuffle the options
    return shuffleArray(options);
}

// Display current question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Display pronoun
    pronounDisplay.textContent = `(${currentQuestion.pronoun})`;
    
    // Display sentence
    sentenceDisplay.textContent = currentQuestion.sentence.replace('______', '______');
    
    // Generate and display options
    const options = generateOptions(currentQuestion.correctAnswer);
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option-btn');
        optionButton.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(optionButton);
    });
    
    // Reset feedback and next button
    feedbackDisplay.textContent = '';
    nextButton.classList.add('hidden');
    
    // Update total questions display
    totalQuestionsDisplay.textContent = questions.length;
}

// Check selected answer
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Disable buttons after selection
    optionButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    // Check if answer is correct
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        scoreDisplay.textContent = score;
        feedbackDisplay.textContent = 'Correct! Well done!';
        feedbackDisplay.style.color = 'green';
        
        // Highlight correct answer
        optionButtons.forEach(btn => {
            if (btn.textContent === selectedOption) {
                btn.classList.add('correct');
            }
        });
    } else {
        feedbackDisplay.textContent = `Incorrect. The correct answer is "${currentQuestion.correctAnswer}".`;
        feedbackDisplay.style.color = 'red';
        
        // Highlight incorrect and correct answers
        optionButtons.forEach(btn => {
            if (btn.textContent === selectedOption) {
                btn.classList.add('incorrect');
            }
            if (btn.textContent === currentQuestion.correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }
    
    // Show next button
    nextButton.classList.remove('hidden');
    nextButton.style.display = 'inline-block';
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // Game over
        showGameOver();
    }
}

// Game over screen
function showGameOver() {
    sentenceDisplay.innerHTML = `
        <h2>Game Over!</h2>
        <p>Your final score: ${score} / ${questions.length}</p>
        <button onclick="restartGame()" class="option-btn">Play Again</button>
    `;
    
    // Hide other elements
    pronounDisplay.textContent = '';
    optionsContainer.innerHTML = '';
    feedbackDisplay.textContent = '';
    nextButton.classList.add('hidden');
}

// Restart the game
function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    
    // Shuffle questions
    questions.sort(() => 0.5 - Math.random());
    
    // Display first question
    displayQuestion();
}

// Start the game when the page loads
window.onload = displayQuestion;