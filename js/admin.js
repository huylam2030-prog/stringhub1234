let products = JSON.parse(localStorage.getItem("products")) || [];

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
  const name = pname.value;
  const price = pprice.value;
  const quantity = pquantity.value;

  if (!name || !price || !quantity) return alert("Nhập đủ thông tin!");

  products.push({
    id: Date.now(),
    name,
    price,
    quantity
  });

  saveProducts();
  renderProducts();
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  saveProducts();
  renderProducts();
}

function editProduct(id) {
  const p = products.find(p => p.id === id);
  const newName = prompt("Tên mới:", p.name);
  const newPrice = prompt("Giá mới:", p.price);
  const newQty = prompt("Số lượng mới:", p.quantity);

  if (newName) p.name = newName;
  if (newPrice) p.price = newPrice;
  if (newQty) p.quantity = newQty;

  saveProducts();
  renderProducts();
}

function renderProducts() {
  productTable.innerHTML = "";
  products.forEach(p => {
    productTable.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.quantity}</td>
        <td>
          <button onclick="editProduct(${p.id})">Sửa</button>
          <button onclick="deleteProduct(${p.id})">Xóa</button>
        </td>
      </tr>
    `;
  });
}


let users = JSON.parse(localStorage.getItem("users")) || [
  { username: "admin", password: "123", role: "admin" }
];

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function addUser() {
  const username = uname.value;
  const password = upass.value;
  const role = urole.value;

  if (!username || !password) return alert("Nhập đủ thông tin!");

  users.push({ username, password, role });
  saveUsers();
  renderUsers();
}

function deleteUser(username) {
  if (username === "admin") return alert("Không xóa admin!");
  users = users.filter(u => u.username !== username);
  saveUsers();
  renderUsers();
}

function renderUsers() {
  userTable.innerHTML = "";
  users.forEach(u => {
    userTable.innerHTML += `
      <tr>
        <td>${u.username}</td>
        <td>${u.role}</td>
        <td>
          <button onclick="deleteUser('${u.username}')">Xóa</button>
        </td>
      </tr>
    `;
  });
}

renderProducts();
renderUsers();
