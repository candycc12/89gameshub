const readStore = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const writeStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Some file:// previews block localStorage. The shop should still work for the session.
  }
};

const state = {
  cart: readStore("dhc-cart"),
  favorites: readStore("dhc-favorites"),
};

const saveState = () => {
  writeStore("dhc-cart", state.cart);
  writeStore("dhc-favorites", state.favorites);
};

const money = (value) => `$${value}`;
const productData = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : (typeof PRODUCTS !== "undefined" ? PRODUCTS : []);
const findProduct = (id) => productData.find((product) => product.id === id);
const linkifyGame = (text) => text.replaceAll("War Inc: Rising", '<a class="inline-link" href="game-download.html">War Inc: Rising</a>');

function updateCounts() {
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = state.cart.reduce((sum, item) => sum + item.qty, 0);
  });
  document.querySelectorAll("[data-favorite-count]").forEach((node) => {
    node.textContent = state.favorites.length;
  });
}

function renderProductGrid() {
  const grid = document.querySelector("[data-product-grid]");
  if (!grid || !productData.length) return;

  grid.innerHTML = productData.map((product) => `
    <article class="product-card">
      <a class="product-link" href="${product.page}" aria-label="View ${product.name}">
        <img class="product-image" src="${product.image}" alt="${product.alt}">
      </a>
      <div class="product-meta">
        <div>
          <p class="label">${product.category}</p>
          <h2>${product.name}</h2>
        </div>
        <div class="buy-row">
          <strong>${money(product.price)}</strong>
          <button class="text-button" type="button" data-buy-now="${product.id}">Buy Now</button>
        </div>
        <div class="card-actions">
          <button type="button" data-favorite="${product.id}">${state.favorites.includes(product.id) ? "Saved" : "Favorite"}</button>
          <button type="button" data-add-cart="${product.id}">Add Cart</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderProductDetail() {
  const page = document.querySelector("[data-product-page]");
  if (!page) return;
  const product = findProduct(page.dataset.productPage);
  if (!product) return;

  document.title = `${product.name} | Rising Bones Supply`;
  page.innerHTML = `
    <nav class="crumb"><a href="index.html">Shop</a><span>/</span><span>${product.name}</span></nav>
    <section class="detail-layout">
      <div class="detail-gallery">
        <img class="detail-image" src="${product.image}" alt="${product.alt}">
        <div class="thumb-row">
          <img src="${product.image}" alt="">
          <img src="assets/merch-collection-concept.png" alt="">
        </div>
      </div>
      <div class="detail-info">
        <p class="label">${product.category}</p>
        <h1>${product.name}</h1>
        <p class="price">${money(product.price)}</p>
        <p class="short-desc">${linkifyGame(product.description)}</p>
        <div class="option-group" aria-label="Options">
          ${product.options.map((option) => `<button type="button">${option}</button>`).join("")}
        </div>
        <div class="detail-actions">
          <button class="secondary-button" type="button" data-favorite="${product.id}">
            ${state.favorites.includes(product.id) ? "Saved" : "Favorite"}
          </button>
          <button class="secondary-button" type="button" data-add-cart="${product.id}">Add Cart</button>
          <button class="primary-button" type="button" data-buy-now="${product.id}">Buy Now</button>
        </div>
        <dl class="spec-list">
          ${product.specs.map((spec) => `<div><dt>${spec[0]}</dt><dd>${spec[1]}</dd></div>`).join("")}
        </dl>
      </div>
    </section>
  `;
}

function addCart(id, qty = 1) {
  const item = state.cart.find((entry) => entry.id === id);
  if (item) item.qty += qty;
  else state.cart.push({ id, qty });
  saveState();
  updateCounts();
}

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((entry) => entry !== id);
  } else {
    state.favorites.push(id);
  }
  saveState();
  renderProductGrid();
  renderProductDetail();
  updateCounts();
}

function renderDrawer(mode = "cart") {
  const drawer = document.querySelector("[data-drawer]");
  const title = document.querySelector("[data-drawer-title]");
  const list = document.querySelector("[data-drawer-list]");
  const foot = document.querySelector("[data-cart-foot]");
  if (!drawer || !title || !list || !foot) return;

  const isCart = mode === "cart";
  const entries = isCart ? state.cart : state.favorites.map((id) => ({ id, qty: 1 }));
  title.textContent = isCart ? "Cart" : "Favorites";
  foot.hidden = !isCart;

  if (!entries.length) {
    list.innerHTML = `<p class="empty-state">${isCart ? "Your cart is empty." : "No favorites yet."}</p>`;
  } else {
    list.innerHTML = entries.map((entry) => {
      const product = findProduct(entry.id);
      return `
        <div class="drawer-item">
          <img src="${product.image}" alt="${product.alt}">
          <div>
            <h3>${product.name}</h3>
            <p>${money(product.price)}${isCart ? ` × ${entry.qty}` : ""}</p>
          </div>
          <button class="text-button" type="button" data-remove="${product.id}" data-mode="${mode}">Remove</button>
        </div>
      `;
    }).join("");
  }

  const total = state.cart.reduce((sum, entry) => {
    const product = findProduct(entry.id);
    return sum + product.price * entry.qty;
  }, 0);
  document.querySelector("[data-cart-total]").textContent = money(total);
  drawer.hidden = false;
}

function openOrder(id = null) {
  const dialog = document.querySelector("[data-order-dialog]");
  const summary = document.querySelector("[data-order-summary]");
  if (!dialog || !summary) return;

  if (id) {
    const product = findProduct(id);
    summary.textContent = `${product.name} · ${money(product.price)}`;
  } else {
    const total = state.cart.reduce((sum, entry) => sum + findProduct(entry.id).price * entry.qty, 0);
    summary.textContent = `${state.cart.length} item(s) · ${money(total)}`;
  }
  dialog.showModal();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.matches("[data-add-cart]")) {
    addCart(target.dataset.addCart);
    renderDrawer("cart");
  }
  if (target.matches("[data-favorite]")) toggleFavorite(target.dataset.favorite);
  if (target.matches("[data-buy-now]")) openOrder(target.dataset.buyNow);
  if (target.matches("[data-open-cart]")) renderDrawer("cart");
  if (target.matches("[data-open-favorites]")) renderDrawer("favorites");
  if (target.matches("[data-close-drawer]")) document.querySelector("[data-drawer]").hidden = true;
  if (target.matches("[data-checkout-cart]")) openOrder();
  if (target.matches("[data-remove]")) {
    if (target.dataset.mode === "cart") {
      state.cart = state.cart.filter((entry) => entry.id !== target.dataset.remove);
    } else {
      state.favorites = state.favorites.filter((id) => id !== target.dataset.remove);
    }
    saveState();
    updateCounts();
    renderDrawer(target.dataset.mode);
    renderProductGrid();
    renderProductDetail();
  }
});

renderProductGrid();
renderProductDetail();
updateCounts();
