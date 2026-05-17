import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🧠 LẤY ID TỪ URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("Product ID:", id);

// DOM
const title = document.querySelector(".info-top h1");
const price = document.querySelector(".info-top p:nth-child(2)");
const desc = document.querySelector(".info-top p:nth-child(3)");
const img = document.querySelector(".product-img img");

// LOAD DATA
async function loadProduct() {

  if (!id) {
    console.log("❌ Không có ID");
    return;
  }

  const docRef =
    doc(db, "products", id);

  const snap =
    await getDoc(docRef);

  if (!snap.exists()) {

    console.log(
      "❌ Không tìm thấy sản phẩm"
    );

    return;
  }

  const data = snap.data();

  console.log("📦 Product:", data);

  // UI
  title.textContent =
    data.name;

  price.textContent =
    data.price.toLocaleString()
    + " VND";

  desc.innerHTML =
    "Description:<br>"
    + (data.description || "");

  img.src = data.image;

  // CART DATASET
  const productInfo =
    document.getElementById(
      "productInfo"
    );

  productInfo.dataset.id =
    id;

  productInfo.dataset.name =
    data.name;

  productInfo.dataset.price =
    data.price;

  productInfo.dataset.image =
    data.image;

}

loadProduct();

const productInfo =
  document.getElementById("productInfo");

// GÁN DATA
title.textContent = data.name;
price.textContent = data.price.toLocaleString() + " VND";
desc.innerHTML = "Description:<br>" + (data.description || "");
img.src = data.image;
// dataset cho cart
productInfo.dataset.id = id;

productInfo.dataset.name =
  data.name;

productInfo.dataset.price =
  data.price;

productInfo.dataset.image =
  data.image;