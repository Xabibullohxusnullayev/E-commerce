const USER_API = "http://localhost:5000/api/users";

async function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${USER_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert("✅ Registered successfully!");
    localStorage.setItem("user", JSON.stringify(data));
    closeModal();
    updateNavbar();
  } else {
    alert("❌ " + data.message);
  }
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${USER_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  }).then(()=>{
   alert("Logging in...")
  })

  const data = await res.json();
  if (res.ok) {
    alert("✅ Logged in!");
    localStorage.setItem("user", JSON.stringify(data));
    closeModal();
    updateNavbar();
  } else {
    alert("❌ " + data.message);
  }
}

function updateNavbar() {
  const navRight = document.getElementById("nav-right");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.name) {
    navRight.innerHTML = `
      <span style="color:white; margin-right:10px;">Welcome, <b>${user.name}</b></span>
      <button onclick="logout()" style="padding:6px 12px; border:none; border-radius:6px; background:#dc3545; color:white; font-weight:bold; cursor:pointer;">
        Logout
      </button>
      <a href="cart.html">🛒 Cart (<span id="cart-count">0</span>)</a>
    `;
  } else {
    navRight.innerHTML = `
      <button onclick="openModal()" style="padding:8px 15px; border:none; border-radius:6px; background:#ff5722; color:white; font-weight:bold; cursor:pointer;">
        Login / Register
      </button>
      <a href="cart.html">🛒 Cart (<span id="cart-count">0</span>)</a>
    `;
  }
}

function logout() {
  localStorage.removeItem("user");
  updateNavbar();
}

updateNavbar(); // sahifa yuklanganda chaqirish
