const cartBtn =
    document.getElementById("cartBtn");

const cartDropdown =
    document.getElementById("cartDropdown");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const addToCartBtn =
    document.getElementById("addToCartBtn");

const productInfo =
    document.getElementById("productInfo");

// =======================
// DROPDOWN
// =======================
if (cartBtn) {

    cartBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        cartDropdown.classList.toggle("hidden");

    });

}

document.addEventListener("click", (e) => {

    if (
        !e.target.closest(".cart-menu")
    ) {

        cartDropdown.classList.add("hidden");

    }

});

// =======================
// GET CART
// =======================
let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

// =======================
// FORMAT PRICE
// =======================
function formatPrice(price) {

    return Number(price)
        .toLocaleString("vi-VN") + "đ";

}

// =======================
// RENDER CART
// =======================
function renderCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cartCount.textContent = cart.length;

    // empty
    if (cart.length === 0) {

        cartItems.innerHTML = `
      <div class="cart-item">
        Giỏ hàng trống
      </div>
    `;

        cartTotal.textContent =
            "Tổng: 0đ";

        return;

    }

    // render items
    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

      <div class="cart-item">

        <img src="${item.image}" />

        <div class="cart-info">

            <h4>${item.name}</h4>

            <p>
            SL: ${item.quantity}
            </p>

            <p>
            ${formatPrice(item.price * item.quantity)}
            </p>

        </div>

        <button
            class="remove-cart"
            onclick="removeCart('${item.id}')"
        >
            ✖
        </button>

    </div>

    `;

    });

    cartTotal.textContent =
        `Tổng: ${formatPrice(total)}`;

}

// =======================
// REMOVE CART
// =======================
window.removeCart = function (id) {

    const item =
        cart.find(p => p.id === id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart = cart.filter(
            p => p.id !== id
        );

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

};

// =======================
// ADD TO CART
// =======================
if (addToCartBtn && productInfo) {

    addToCartBtn.addEventListener("click", () => {

        const product = {
            id: productInfo.dataset.id,
            name: productInfo.dataset.name,
            price:
                Number(
                    productInfo.dataset.price
                ) || 0,
            image: productInfo.dataset.image,
            quantity: 1
        };

        // kiểm tra đã có chưa
        const existing = cart.find(
            item => item.id === product.id
        );

        if (existing) {

            existing.quantity++;

        } else {

            cart.push(product);

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        renderCart();

        alert("Đã thêm vào giỏ hàng!");

    });

}
// start
renderCart();