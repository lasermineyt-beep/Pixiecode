let isLogin = true;

function toggleForm(){
  isLogin = !isLogin;
  document.getElementById('loginForm').classList.toggle('hidden');
  document.getElementById('registerForm').classList.toggle('hidden');
  document.getElementById('formTitle').innerText = isLogin ? 'Welcome Back' : 'Join JanellaCult';
  document.querySelector('.toggle').innerText = isLogin ? "New here? Create an account" : "Already have an account? Login";
  document.getElementById('error').innerText = '';
}

function login(){
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;

  if(!user || !pass){
    document.getElementById("error").innerText="Please fill all fields!";
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if(users[user] && users[user].password === pass){
    localStorage.setItem("loggedInUser", user);
    window.location.href = "index.html";
  }else{
    document.getElementById("error").innerText="Wrong username or password!";
  }
}

function register(){
  const user = document.getElementById("regUsername").value.trim();
  const pass = document.getElementById("regPassword").value;
  const confirm = document.getElementById("regConfirm").value;

  if(!user || !pass || !confirm){
    document.getElementById("error").innerText="Please fill all fields!";
    return;
  }

  if(pass !== confirm){
    document.getElementById("error").innerText="Passwords do not match!";
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if(users[user]){
    document.getElementById("error").innerText="Username already exists!";
    return;
  }

  users[user] = {password: pass, scores: {easy: 0, average: 0, difficult: 0}, level: 'Beginner', challenges: 0};
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById("error").innerText="Registration successful! Please login.";
  toggleForm();
}