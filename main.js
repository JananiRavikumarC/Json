let users = JSON.parse(localStorage.getItem("users")) || [
  { username: "janani", password: "janani@123", email: "janani@example.com" },
  { username: "mahesh", password: "mahesh@123", email: "mahesh@example.com" }
];

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(e){
    e.preventDefault();
    const newUser = {
      fullname: document.getElementById("fullName").value.trim(),
      username: document.getElementById("regUsername").value.trim(),
      password: document.getElementById("regPassword").value.trim(),
      email: document.getElementById("regEmail").value.trim(),
      phone: document.getElementById("regPhone").value.trim(),
      dob: document.getElementById("regDOB").value,
      gender: document.getElementById("regGender").value
    };

    if (!newUser.username || !newUser.password || !newUser.email){
      alert("Please fill all mandatory fields!");
      return;
    }

    const exists = users.find(u => u.username.toLowerCase() === newUser.username.toLowerCase());
    if(exists){
      alert("Username already exists! Please login.");
      window.location.href = "login.html";
      return;
    }

    users.push(newUser);
    saveUsers();
    alert("Registration successful! Please login now.");
    window.location.href = "login.html";
  });
}

const loginButton = document.querySelector("button[onclick='login()']");
if (loginButton){
  function login(){
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const found = users.find(u => u.username === username && u.password === password);
    if(found){
      alert(`Welcome ${found.username}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(found));
      window.location.href = "welcome.html";
    } else {
      alert("Invalid username or password.");
    }
  }
  window.login = login; 
}

const welcomeMsg = document.getElementById("welcomeMsg");
if (welcomeMsg){
  const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
  if(loggedIn){
    welcomeMsg.textContent = `Hello ${loggedIn.username}! Welcome to your dashboard 🌟`;
  } else {
    window.location.href = "login.html";
  }
}

function logout(){
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
window.logout = logout;
