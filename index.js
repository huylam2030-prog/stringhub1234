import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const auth = getAuth();

const accountBtn =
  document.getElementById("accountBtn");

const dropdownMenu =
  document.getElementById("dropdownMenu");

const logoutBtn =
  document.getElementById("btnLogout");

const adminLink =
  document.getElementById("adminLink");

// toggle dropdown
if (accountBtn && dropdownMenu) {

  accountBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    dropdownMenu.classList.toggle("hidden");

  });

}

// click outside
document.addEventListener("click", (e) => {

  if (
    dropdownMenu &&
    !e.target.closest(".account-menu")
  ) {

    dropdownMenu.classList.add("hidden");

  }

});

// auth check
onAuthStateChanged(auth, (user) => {

  // chưa login
  if (!user) {

    adminLink.classList.add("hidden");

    return;
  }

  // admin account
  if (user.email === "admin@gmail.com") {

    adminLink.classList.remove("hidden");

  } else {

    adminLink.classList.add("hidden");

  }

});