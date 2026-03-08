// ====== Sound Effects ======
function playSuccessSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch(e) {
    // Fallback: no sound if Web Audio API not supported
  }
}

function playFailureSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(392, audioContext.currentTime); // G4
    oscillator.frequency.setValueAtTime(330, audioContext.currentTime + 0.1); // E4
    oscillator.frequency.setValueAtTime(262, audioContext.currentTime + 0.2); // C4
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch(e) {
    // Fallback: no sound if Web Audio API not supported
  }
}

// ====== Variables ======
let timer;
let timeLeft = 30;
let current;
let tries = 0;
let totalWrong = 0;
let totalScore = 0;
let totalAnswered = 0;
let questionAnswered = false;
let isInGameSession = false; // Track if user is actively playing

// ====== Warning for leaving during game ======
window.addEventListener('beforeunload', function(e) {
  if (isInGameSession) {
    e.preventDefault();
    e.returnValue = 'You are currently answering a question. Are you sure you want to leave? Your progress will be lost!';
    return e.returnValue;
  }
});

// Shuffle questions
function shuffleArray(array){
  for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ====== Load Question ======
function loadChallenge(){
  if(fullChallenges.length === 0){
    isInGameSession = false; // Game completed
    showFinalResult();
    return;
  }

  questionAnswered = false; // reset
  isInGameSession = true; // User is now actively playing
  current = fullChallenges[0];
  tries = 0;

  document.getElementById("tries").innerText = tries;
  document.getElementById("question").innerText = "Fill in the blank in the code below:";
  document.getElementById("code").innerText = current.q;
  document.getElementById("hint").innerText = "Hint: " + current.h;
  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";

  document.getElementById("questionCount").innerText = totalQuestions - fullChallenges.length + 1;

  // Update progress bar
  const currentQuestion = totalQuestions - fullChallenges.length + 1;
  const progressPercent = ((currentQuestion - 1) / totalQuestions) * 100;
  document.getElementById("progress-fill").style.width = progressPercent + "%";

  startTimer();
}

// ====== Timer ======
function startTimer(){
  clearInterval(timer);
  let t = timeLeft;
  document.getElementById("time").innerText = t;

  timer = setInterval(()=>{
    t--;
    document.getElementById("time").innerText = t;
    if(t <= 0){
      clearInterval(timer);
      if(!questionAnswered) totalWrong +=1;
      playFailureSound();
      isInGameSession = false; // Question timed out
      fullChallenges.shift();
      loadChallenge();
    }
  },1000);
}

// ====== Check Answer ======
function check(){
  let user = document.getElementById("answer").value.trim();

  if(user === current.a){
    let questionScore = Number(document.getElementById("time").innerText);
    totalScore += questionScore;
    questionAnswered = true;
    totalAnswered++;
    if(tries>0) totalWrong +=1;

    clearInterval(timer);
    document.getElementById("result").innerText = "✅ Correct!";
    playSuccessSound();
    isInGameSession = false; // Question completed

    setTimeout(()=>{
      fullChallenges.shift();
      loadChallenge();
    },1500);

  } else {
    tries++;
    document.getElementById("tries").innerText = tries;
    if(tries >=3){
      questionAnswered = true;
      totalWrong += 1;
      totalAnswered++;
      clearInterval(timer);
      document.getElementById("result").innerText = "📌 Correct Answer: "+current.a+" — moving to next question...";
      playFailureSound();
      isInGameSession = false; // Question completed (failed)

      setTimeout(()=>{
        fullChallenges.shift();
        loadChallenge();
      },2000);
    } else {
      document.getElementById("result").innerText = "❌ Wrong! Try again";
      playFailureSound();
    }
  }
}

function giveUp(){
  clearInterval(timer);
  if(!questionAnswered) totalWrong +=1;
  isInGameSession = false; // User gave up
  showFinalResult();
}

function showFinalResult(){
  clearInterval(timer);
  document.getElementById("gameSection").style.display="none";
  document.getElementById("finalResult").style.display="block";
  document.getElementById("totalAnswered").innerText = totalAnswered;
  document.getElementById("totalWrong").innerText = totalWrong;
  document.getElementById("totalScore").innerText = totalScore;

  // Save score
  const user = localStorage.getItem("loggedInUser");
  if(user){
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if(users[user]){
      const previousScore = users[user].scores.easy || 0;
      users[user].scores.easy = Math.max(users[user].scores.easy, totalScore);
      users[user].challenges += 1;
      // Update level based on score
      if(totalScore > 500) users[user].level = 'Intermediate';
      if(totalScore > 1000) users[user].level = 'Advanced';

      // Add activity
      if(!users[user].activities) users[user].activities = [];
      users[user].activities.unshift({
        type: 'easy',
        game: gameTitle,
        score: totalScore,
        timestamp: new Date().toISOString(),
        improved: totalScore > previousScore
      });
      // Keep only last 10 activities
      users[user].activities = users[user].activities.slice(0, 10);

      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}

// ====== Go Home ======
function goHome(){
  window.location.href = "../../index.html";
}