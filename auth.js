/* =========================
   AUTH CORE - QUARTRIX
========================= */

// cek apakah user sudah login
function isLoggedIn() {
  return localStorage.getItem("isLogin") === "true";
}

// ambil data user
function getUser() {
  return {
    role: localStorage.getItem("role"),
    nama: localStorage.getItem("nama"),
    absen: localStorage.getItem("absen"),
  };
}

// wajib login (redirect kalau belum)
function requireAuth() {
  if (!isLoggedIn()) {
    location.replace("login.html");
  }
}

// logout
function logout() {
  localStorage.clear();
  location.replace("login.html");
}

// update tombol login / nama user
function setupLoginButton(buttonId = "loginBtn") {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  if (isLoggedIn()) {
    const user = getUser();
    btn.textContent = user.nama || "Akun";
    btn.href = "#";
  } else {
    btn.textContent = "Login";
    btn.href = "login.html";
  }
}
