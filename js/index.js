function toggleDashboard(){

const dash = document.getElementById("dashboard");

dash.style.display =
dash.style.display === "block" ? "none" : "block";

}

// close if click outside
document.addEventListener("click", function(e){

const profile = document.querySelector(".profile-container");

if(!profile.contains(e.target)){
document.getElementById("dashboard").style.display = "none";
}

});

function logout(){
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

window.addEventListener("load", () => {

  const logo = document.querySelector(".logo");
  const intro = document.querySelector(".intro-loader");

  setTimeout(() => {
    logo.style.opacity = "1";
    logo.style.transform = "translateY(0)";
  }, 300);

  setTimeout(() => {
    intro.style.top = "-100%";
  }, 2000);

  // Load user data
  const user = localStorage.getItem("loggedInUser");
  if(!user){
    window.location.href = "login.html";
    return;
  }
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const userData = users[user];
  if(userData){
    document.getElementById('username').innerText = `Username: ${user}`;
    document.getElementById('level').innerText = `Level: ${userData.level}`;
    document.getElementById('challenges').innerText = `Challenges Completed: ${userData.challenges}`;
    document.getElementById('easyScore').innerText = `Easy Score: ${userData.scores.easy}`;
    document.getElementById('averageScore').innerText = `Average Score: ${userData.scores.average}`;
    document.getElementById('difficultScore').innerText = `Difficult Score: ${userData.scores.difficult}`;
  }
});




let selectedTarget = null;

// Apply logic to ALL custom selects
document.querySelectorAll(".custom-select").forEach(select => {
  const selected = select.querySelector(".select-selected");
  const options = select.querySelector(".select-options");

  selected.addEventListener("click", e => {
    e.stopPropagation();

    // close others
    document.querySelectorAll(".select-options").forEach(o => {
      if (o !== options) o.style.display = "none";
    });

    options.style.display =
      options.style.display === "block" ? "none" : "block";
  });

  options.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      selectedTarget = option.dataset.value;
      options.style.display = "none";
    });
  });
});

// Close on outside click
document.addEventListener("click", () => {
  document.querySelectorAll(".select-options").forEach(o => {
    o.style.display = "none";
  });
});

// Start button (shared)
function startEasy() {
  if (!selectedTarget) {
    alert("Please select a topic first!");
    return;
  }
  window.location.href = selectedTarget;
}


const originalTitle = document.title;

	document.addEventListener("visibilitychange", () => {
		document.title = document.hidden ?
		"Come back" :
		originalTitle;
	});

const navbarHeight = document.querySelector("nav").offsetHeight;


const navLinks = document.querySelectorAll('nav a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {

      const offsetTop = targetSection.offsetTop - navbarHeight - 10; // extra 10px padding
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  });
});

// Hero button scroll
function scrollToLevels() {
  const levelsSection = document.getElementById("levels");
  if (levelsSection) {
    const offsetTop = levelsSection.offsetTop - navbarHeight - 10;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
}

let clickCount = 0;
const logo = document.querySelector('.logo-img');
logo.addEventListener('click', () => {
  clickCount++;
  if (clickCount === 5) {
    const audio = new Audio('Assets/CCCP.mp3');
    audio.play();
    clickCount = 0; // reset counter
  }
});
