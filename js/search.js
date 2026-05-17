import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
}
from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import {
  firebaseConfig
}
from "./firebase-config.js";

// init firebase
const app =
  initializeApp(firebaseConfig);

const db =
  getFirestore(app);

// =======================
// SEARCH
// =======================
const searchInput =
  document.getElementById("searchInput");

const searchDropdown =
  document.getElementById("searchDropdown");

let products = [];

// load products
async function loadProducts() {

  const snapshot =
    await getDocs(
      collection(db, "products")
    );

  products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

}

loadProducts();

// search input
searchInput.addEventListener("input", () => {

  const value =
    searchInput.value
      .trim()
      .toLowerCase();

  // empty
  if (!value) {

    searchDropdown.innerHTML = "";

    searchDropdown.classList.add("hidden");

    return;

  }

  // filter
  const filtered = products.filter((p) => {

    return p.name
      .toLowerCase()
      .includes(value);

  });

  // no result
  if (filtered.length === 0) {

    searchDropdown.innerHTML = `
      <div class="search-item">
        Không tìm thấy sản phẩm
      </div>
    `;

    searchDropdown.classList.remove("hidden");

    return;

  }

  // render
  searchDropdown.innerHTML =
    filtered.slice(0, 5).map((p) => `

      <a
        class="search-item"
        href="/html/product-information.html?id=${p.id}"
      >

        <img src="${p.image}" />

        <div class="search-info">

          <h4>${p.name}</h4>

          <p>${p.price}đ</p>

        </div>

      </a>

    `).join("");

  searchDropdown.classList.remove("hidden");

});

// click outside
document.addEventListener("click", (e) => {

  if (
    !e.target.closest(".search-box")
  ) {

    searchDropdown.classList.add("hidden");

  }

});