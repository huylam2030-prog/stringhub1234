import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.querySelector(".product-container");

// 🧠 lấy category từ tên file
function getCategory() {
  const file = window.location.pathname.split("/").pop();
  return file.replace(".html", "");
}

// 💰 format tiền
function formatPrice(price) {
  return price.toLocaleString() + " VND";
}

// LOAD
async function loadProducts() {
  const category = getCategory();
  console.log("Loading category:", category);

  const q = query(
    collection(db, "products"),
    where("category", "==", category)
  );

  const snapshot = await getDocs(q);

  container.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const p = docSnap.data();

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <a href="product-information.html?id=${docSnap.id}">
        <img src="${p.image || ""}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description || ""}</p>
        <p style="font-weight: bold">
          Giá: ${formatPrice(p.price)}
        </p>
      </a>
    `;

    container.appendChild(card);
  });

  if (snapshot.empty) {
    container.innerHTML = "<p>Không có sản phẩm</p>";
  }
}

loadProducts();