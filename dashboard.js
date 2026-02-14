const role = localStorage.getItem("role");
const nama = localStorage.getItem("nama");
const absen = localStorage.getItem("absen");

if (!role) {
  window.location.href = "login.html";
}

document.getElementById("userInfo").innerText =
  role === "admin" ? "Admin" : `${nama} (Absen ${absen})`;

document.getElementById("welcomeText").innerText =
  role === "admin"
    ? "Anda login sebagai ADMIN"
    : `Halo ${nama}, selamat belajar!`;

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
