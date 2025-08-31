function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image || 'https://picsum.photos/100'}" alt="${item.name}">
      <h4>${item.name}</h4>
      <div class="price">$${item.price}</div>
      <div class="quantity-control">
        <button onclick="changeQty(${index}, -1)">-</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">🗑</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.innerText = total.toFixed(2);
}

function changeQty(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart[index].qty = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("❌ Your cart is empty!");
    return;
  }
  alert("✅ Order placed successfully!");
  localStorage.removeItem("cart");
  loadCart();
}

loadCart();
