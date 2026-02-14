// login.js - Kode diperbarui untuk menggunakan Firebase dan mendukung ganti absen login

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Config Firebase (sama seperti di dashboard.html)
const firebaseConfig = {
  apiKey: "AIzaSyCP-Gha19gZ6ZkYCzZ9vh9QL2tKYmNVoCk",
  authDomain: "quartrix-eb95f.firebaseapp.com",
  databaseURL:
    "https://quartrix-eb95f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quartrix-eb95f",
  storageBucket: "quartrix-eb95f.firebasestorage.app",
  messagingSenderId: "589369640106",
  appId: "1:589369640106:web:7239da0bd98bae284fbcd3",
  measurementId: "G-HG1GL8D03G",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elemen form (pastikan ID ini ada di login.html)
const loginForm = document.getElementById("loginForm");
const adminForm = document.getElementById("adminForm");

// Event listener untuk form siswa
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const absen = document.getElementById("absen").value.trim();

  if (!nama || !absen) {
    alert("Isi nama dan absen!");
    return;
  }

  // Query Firebase untuk validasi absen
  const userRef = ref(db, "siswa/" + absen);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const data = snapshot.val();
    // Pastikan nama cocok (opsional, untuk keamanan tambahan)
    if (data.nama.toLowerCase() === nama.toLowerCase()) {
      localStorage.setItem("role", "siswa");
      localStorage.setItem("nama", data.nama);
      localStorage.setItem("absen", absen);
      window.location.href = "dashboard.html";
    } else {
      alert("Nama tidak cocok dengan absen!");
    }
  } else {
    alert(
      "Absen tidak ditemukan! Pastikan absen sudah terdaftar atau gunakan absen baru jika sudah diubah.",
    );
  }
});

// Fungsi untuk toggle form admin (tetap sama)
function showAdmin() {
  adminForm.classList.toggle("hidden");
}

// Fungsi login admin (tetap sama, tanpa Firebase karena admin tidak di database)
function loginAdmin() {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  if (user === "admin" && pass === "quartrix") {
    localStorage.setItem("role", "admin");
    localStorage.setItem("nama", "Admin");
    localStorage.setItem("absen", "admin"); // Absen dummy untuk admin
    window.location.href = "dashboard.html";
  } else {
    alert("Username atau password salah");
  }
}

// Export fungsi agar bisa dipanggil dari HTML
window.showAdmin = showAdmin;
window.loginAdmin = loginAdmin;
