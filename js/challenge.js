// Global variables
let counter = 0;
let timer;
let likes = {};
let isPaused = false;

// DOM elements
const counterElement = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const likesList = document.querySelector('.likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('list');

// Function to update the counter display
function updateCounter() {
  counterElement.textContent = counter;
}

// Function to start the timer
function startTimer() {
  timer = setInterval(() => {
    if (!isPaused) {
      counter++;
      updateCounter();
    }
  }, 1000);
}

// Function to toggle pause/resume
function togglePause() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? 'resume' : 'pause';
  plusBtn.disabled = isPaused;
  minusBtn.disabled = isPaused;
  heartBtn.disabled = isPaused;
}

// Event listener for plus button
plusBtn.addEventListener('click', () => {
  counter++;
  updateCounter();
});

// Event listener for minus button
minusBtn.addEventListener('click', () => {
  counter--;
  updateCounter();
});

// Event listener for heart button
heartBtn.addEventListener('click', () => {
  likes[counter] = (likes[counter] || 0) + 1;
  updateLikes();
});

// Function to update likes display
function updateLikes() {
  likesList.innerHTML = '';
  for (let num in likes) {
    const li = document.createElement('li');
    li.textContent = `${num} has been liked ${likes[num]} time${likes[num] > 1 ? 's' : ''}`;
    likesList.appendChild(li);
  }
}

// Event listener for pause button
pauseBtn.addEventListener('click', togglePause);

// Event listener for comment form submission
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const comment = commentInput.value;
  if (comment.trim()) {
    const li = document.createElement('li');
    li.textContent = comment;
    commentsList.appendChild(li);
    commentInput.value = '';
  }
});

// Start the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updateCounter();
  startTimer();
});