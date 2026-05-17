/**
 * cart.js - Logic giỏ hàng dùng chung cho toàn bộ project AQUAMEN
 * Lưu vào localStorage với key "aquamen_cart"
 * Mỗi item: { id, name, price, image, quantity }
 */

const CART_KEY = "aquamen_cart";

// =============================================
// 1. ĐỌC / GHI LOCALSTORAGE
// =============================================
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// =============================================
// 2. THÊM SẢN PHẨM VÀO GIỎ
// Nhận vào object product từ PRODUCTS_DB
// =============================================
function addToCart(product) {
  const cart = getCart();
  const found = cart.find(item => item.id === product.id);

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartBadge();

  // Nếu modal đang mở thì render lại luôn
  const modal = document.getElementById("cart-modal-overlay");
  if (modal && modal.classList.contains("cart-show")) {
    renderCartModal();
  }

  showCartToast(`🛒 Đã thêm "${product.name}" vào giỏ!`);
}

// =============================================
// 3. CẬP NHẬT SỐ LƯỢNG (+/-)
// delta = +1 hoặc -1
// Nếu quantity <= 0 thì tự động xóa
// =============================================
function updateCartQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
  updateCartBadge();
  renderCartModal();
}

// =============================================
// 4. XÓA SẢN PHẨM KHỎI GIỎ
// =============================================
function removeFromCart(productId) {
  let cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  updateCartBadge();
  renderCartModal();
}

// =============================================
// 5. TÍNH TỔNG TIỀN
// Giá trong PRODUCTS_DB dạng số nguyên (12 = 12.000đ)
// =============================================
function calcCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// =============================================
// 6. FORMAT GIÁ TIỀN: 12 → "12.000đ"
// =============================================
function formatCartPrice(price) {
  return price.toLocaleString("vi-VN") + ".000đ";
}

// =============================================
// 7. CẬP NHẬT BADGE SỐ LƯỢNG TRÊN NAVBAR
// =============================================
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const total = getCart().reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? "flex" : "none";
}

// =============================================
// 8. TOAST THÔNG BÁO NHỎ
// =============================================
function showCartToast(message) {
  const toast = document.getElementById("cart-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("cart-toast-show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("cart-toast-show"), 2500);
}

// =============================================
// 9. RENDER NỘI DUNG MODAL GIỎ HÀNG
// =============================================
function renderCartModal() {
  const body = document.getElementById("cart-modal-body");
  const footer = document.getElementById("cart-modal-footer");
  if (!body) return;

  const cart = getCart();
  body.innerHTML = "";

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Giỏ hàng trống</p>
        <small>Hãy thêm sản phẩm vào giỏ nhé!</small>
      </div>`;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "";

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img class="cart-item-img" src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-unit">${formatCartPrice(item.price)} / cái</div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, -1)">−</button>
          <span class="cart-qty-val">${item.quantity}</span>
          <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <button class="cart-remove-btn" onclick="removeFromCart(${item.id})" title="Xóa">🗑</button>
        <span class="cart-subtotal">${formatCartPrice(subtotal)}</span>
      </div>`;
    body.appendChild(div);
  });

  const totalEl = document.getElementById("cart-total-price");
  if (totalEl) totalEl.textContent = formatCartPrice(calcCartTotal());
}

// =============================================
// 10. MỞ / ĐÓNG MODAL
// =============================================
function openCartModal() {
  const overlay = document.getElementById("cart-modal-overlay");
  if (!overlay) return;
  renderCartModal();
  overlay.classList.add("cart-show");
  document.body.style.overflow = "hidden";
}

function closeCartModal() {
  const overlay = document.getElementById("cart-modal-overlay");
  if (!overlay) return;
  overlay.classList.remove("cart-show");
  document.body.style.overflow = "";
}

// =============================================
// 11. KHỞI TẠO KHI LOAD TRANG
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  const cartNavBtn = document.getElementById("cart-nav-btn");
  if (cartNavBtn) cartNavBtn.addEventListener("click", openCartModal);

  const overlay = document.getElementById("cart-modal-overlay");
  if (overlay) overlay.addEventListener("click", e => {
    if (e.target === overlay) closeCartModal();
  });

  const closeBtn = document.getElementById("cart-modal-close");
  if (closeBtn) closeBtn.addEventListener("click", closeCartModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeCartModal();
  });
});