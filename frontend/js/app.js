const API_URL = "http://localhost:5000/api/products";

// savatcha sonini ko‘rsatish
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  cartCount.innerText = cart.length;

  // animatsiya
  cartCount.classList.add("cart-bounce");
  setTimeout(() => cartCount.classList.remove("cart-bounce"), 400);
}

// mahsulotlarni backenddan olish
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const products = await res.json();

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product");

      // ✅ rasm fallback
      const imgSrc =
        product.imageUrl && product.imageUrl.startsWith("http")
          ? product.imageUrl
          : "https://picsum.photos/300/200";

      div.innerHTML = `
        <img src="${imgSrc}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description || "No description available."}</p>
        <strong>$${product.price}</strong>
        <div>
          <button class="add-btn" onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
          <button class="buy-btn" onclick="buyNow('${product._id}', '${product.name}', ${product.price})">Buy Now</button>
        </div>
      `;
      productList.appendChild(div);
    });
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

// savatchaga qo‘shish
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// "Buy Now" bosilganda
function buyNow(id, name, price) {
  alert(`🛒 You chose to buy: ${name} for $${price}.`);
}

fetchProducts();
updateCartCount();
