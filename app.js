window.addEventListener("load", () => {
  const user = JSON.parse(window.localStorage.getItem("User"));
  if (window.location.pathname === "/Phase01-Task-4-Web-Master/login.html" && !user) {
    window.location.href = "/Phase01-Task-4-Web-Master/index.html";
  }
});

const regexEmail = /^[a-zA-Z]{4,}[a-zA-Z0-9._-]*@gmail\.com$/;
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

// Register Page
if ((window.location.pathname === "/Phase01-Task-4-Web-Master/index.html") || (window.location.pathname === "/Phase01-Task-4-Web-Master/")) {
  document.querySelector(".name").addEventListener("blur", (event) => {
    const inputValue = event.target.value;
    document.getElementById("error-name").style.display = inputValue.length < 3 ? 'block' : 'none';
  });
  
  document.querySelector(".email").addEventListener("blur", (event) => {
    const email = event.target.value;
    document.getElementById("error-email").style.display = !regexEmail.test(email) ? 'block' : 'none';
  });
  
  document.querySelector(".password").addEventListener("blur", (event) => {
    const password = event.target.value;
    document.getElementById("error-password").style.display = !regexPassword.test(password) ? 'block' : 'none';
  });

  const storedUser = JSON.parse(window.localStorage.getItem("User"));
  !storedUser ? document.getElementById("have-accont").addEventListener('click', (e) => {
    e.preventDefault();
  }) : null
  // ---------
  document.getElementById("sign-up-btn").addEventListener('click', (e) => {
    e.preventDefault();
  
    const name = document.querySelector(".name").value.trim();
    const email = document.querySelector(".email").value.trim();
    const password = document.querySelector(".password").value.trim();
  
    const isNameValid = name.length >= 3;
    const isEmailValid = regexEmail.test(email);
    const isPasswordValid = regexPassword.test(password);
  
    document.getElementById("error-name").style.display = !isNameValid ? 'block' : 'none';
    document.getElementById("error-email").style.display = !isEmailValid ? 'block' : 'none';
    document.getElementById("error-password").style.display = !isPasswordValid ? 'block' : 'none';
  
    if (isNameValid && isEmailValid && isPasswordValid) {
      const user = { name, email, password };
      window.localStorage.setItem("User", JSON.stringify(user));
      window.location.href = "/Phase01-Task-4-Web-Master/login.html";
    }
  });
}

// Login Page
if (window.location.pathname === "/Phase01-Task-4-Web-Master/login.html") {
  document.getElementById("login-btn").addEventListener('click', (e) => {
    e.preventDefault();
  
    const email = document.querySelector(".email").value.trim();
    const password = document.querySelector(".password").value.trim();
  
    const storedUser = JSON.parse(window.localStorage.getItem("User"));
  
    if (email === storedUser.email && password === storedUser.password) {
      window.location.href = "/Phase01-Task-4-Web-Master/profile.html";
    } else {
      alert("Email or Password is invalid")
    }
  });
}

// Profile page
if (window.location.pathname === "/Phase01-Task-4-Web-Master/profile.html") {
  const storedUser = JSON.parse(window.localStorage.getItem("User"));
  !storedUser ? window.location.href = "/Phase01-Task-4-Web-Master/index.html" : null
  const username = storedUser.name;
  const email = storedUser.email;
  document.querySelector("#username span").textContent += username
  document.querySelector("#email span").textContent += email

  document.getElementById("logout-btn").addEventListener('click', (e) => {
    e.preventDefault()

    window.localStorage.removeItem("User")
    window.location.href = "/Phase01-Task-4-Web-Master/index.html";
  })
}