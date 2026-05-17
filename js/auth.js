import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

import { firebaseConfig } from "./firebase-config.js";

// =======================
// INIT FIREBASE
// =======================
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// =======================
// ELEMENTS
// =======================
const el = {
  email: document.getElementById("email"),

  password: document.getElementById("password"),

  loginForm: document.getElementById("loginForm"),

  btnRegister: document.getElementById("btnRegister"),

  btnLogout: document.getElementById("btnLogout")
};

// dropdown menu
const accountBtn =
  document.getElementById("accountBtn");

const dropdownMenu =
  document.getElementById("dropdownMenu");

const adminLink =
  document.getElementById("adminLink");

// =======================
// LOGIN
// =======================
if (el.loginForm) {

  el.loginForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const email =
        el.email.value.trim();

      const password =
        el.password.value.trim();

      if (!email || !password) {

        alert(
          "Vui lòng nhập email và mật khẩu."
        );

        return;

      }

      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert("Đăng nhập thành công!");

        window.location.href =
          "/html/index.html";

      } catch (error) {

        alert(error.message);

      }

    }
  );

}

// =======================
// SIGNUP
// =======================
const signupForm =
  document.getElementById("signupForm");

if (signupForm) {

  signupForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const email =
        document
          .getElementById("email")
          .value.trim();

      const password =
        document
          .getElementById("password")
          .value.trim();

      const username =
        document
          .getElementById("username")
          .value.trim();

      if (
        !email ||
        !password ||
        !username
      ) {

        alert(
          "Vui lòng nhập đầy đủ thông tin."
        );

        return;

      }

      try {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert("Đăng ký thành công!");

        window.location.href =
          "/html/signin.html";

      } catch (error) {

        alert(error.message);

      }

    }
  );

}

// =======================
// ACCOUNT MENU
// =======================

// toggle dropdown
if (accountBtn) {

  accountBtn.addEventListener(
    "click",
    () => {

      dropdownMenu.classList.toggle(
        "hidden"
      );

    }
  );

}

// click outside
document.addEventListener(
  "click",
  (e) => {

    if (
      !e.target.closest(".account-menu")
    ) {

      dropdownMenu.classList.add(
        "hidden"
      );

    }

  }
);

// =======================
// AUTH STATE
// =======================
onAuthStateChanged(auth, (user) => {

  // chưa login
  if (!user) {

    console.log("Chưa đăng nhập");

    return;

  }

  console.log(
    "Đã đăng nhập:",
    user.email
  );

  // admin
  if (
    user.email === "admin@gmail.com"
    && adminLink
  ) {

    adminLink.hidden = false;

  }

});

// =======================
// LOGOUT
// =======================
if (el.btnLogout) {

  el.btnLogout.addEventListener(
    "click",
    async () => {

      try {

        await signOut(auth);

        alert("Đã đăng xuất!");

        window.location.href =
          "/html/signin.html";

      } catch (error) {

        alert(error.message);

      }

    }
  );

}