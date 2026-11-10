// ==========================================================================
// Bambookart - Main Application Logic
// Features: Dual Language (En/Te), Cart, Wishlist, Auth, Checkout, Orders,
//           Search, Filtering, Responsive Drawers & Modals, Printable Invoice
// ==========================================================================

const AppState = {
  lang: localStorage.getItem('bk_lang') || 'en',
  cart: JSON.parse(localStorage.getItem('bk_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('bk_wishlist') || '[]'),
  user: JSON.parse(localStorage.getItem('bk_user') || 'null'),
  orders: JSON.parse(localStorage.getItem('bk_orders') || '[]'),
  activeCategory: 'all',
  searchQuery: '',
  priceFilter: 'all',
  sortBy: 'featured',
  currentDetailProduct: null,
  lastPlacedOrder: null
};

// --------------------------------------------------------------------------
// Persistence Helpers
// --------------------------------------------------------------------------
function saveCart() {
  localStorage.setItem('bk_cart', JSON.stringify(AppState.cart));
  updateCartBadges();
}

function saveWishlist() {
  localStorage.setItem('bk_wishlist', JSON.stringify(AppState.wishlist));
  updateWishlistBadges();
}

function saveUser(user) {
  AppState.user = user;
  localStorage.setItem('bk_user', JSON.stringify(user));
  updateAuthUI();
}

function saveOrders() {
  localStorage.setItem('bk_orders', JSON.stringify(AppState.orders));
}

// --------------------------------------------------------------------------
// Translation & Localization
// --------------------------------------------------------------------------
function t(key, params = {}) {
  const dict = TRANSLATIONS[AppState.lang] || TRANSLATIONS['en'];
  let text = dict[key] || TRANSLATIONS['en'][key] || key;
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'te') return;
  AppState.lang = lang;
  localStorage.setItem('bk_lang', lang);

  // Update lang buttons active states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Apply all static [data-i18n] text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Apply placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    el.placeholder = t(key);
  });

  // Re-render dynamic components
  renderCategoriesStrip();
  renderProducts();
  renderArtisans();
  renderCraftSteps();
  renderCartDrawer();
  renderWishlistView();
  renderOrdersView();
  updateAuthUI();

  if (AppState.currentDetailProduct) {
    showProductDetails(AppState.currentDetailProduct.id, false);
  }
}

// --------------------------------------------------------------------------
// Toast Notification
// --------------------------------------------------------------------------
function showToast(message, icon = '🎋') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --------------------------------------------------------------------------
// Navigation & Hash Routing
// --------------------------------------------------------------------------
function navigateTo(hash) {
  window.location.hash = hash;
}

function handleRoute() {
  const fullHash = window.location.hash.slice(1) || 'home';
  const [route, queryString] = fullHash.split('?');
  const params = new URLSearchParams(queryString || '');

  // Hide all app views
  document.querySelectorAll('.app-view').forEach(view => {
    view.classList.remove('active');
  });

  // Update active states on nav links
  document.querySelectorAll('.subnav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href === `#${route}`);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  switch (route) {
    case 'home':
      const homeView = document.getElementById('view-home');
      if (homeView) homeView.classList.add('active');
      renderProducts();
      break;

    case 'products':
      const productsView = document.getElementById('view-products');
      if (productsView) productsView.classList.add('active');
      if (params.get('cat')) {
        AppState.activeCategory = params.get('cat');
      }
      if (params.get('search')) {
        AppState.searchQuery = params.get('search');
        const searchInput = document.getElementById('main-search-input');
        if (searchInput) searchInput.value = AppState.searchQuery;
      }
      renderProducts();
      break;

    case 'product':
      const prodId = params.get('id');
      if (prodId) {
        showProductDetails(prodId);
      } else {
        navigateTo('products');
      }
      break;

    case 'artisans':
      const artisansView = document.getElementById('view-artisans');
      if (artisansView) artisansView.classList.add('active');
      renderArtisans();
      renderCraftSteps();
      break;

    case 'about':
      const aboutView = document.getElementById('view-about');
      if (aboutView) aboutView.classList.add('active');
      break;

    case 'contact':
      const contactView = document.getElementById('view-contact');
      if (contactView) contactView.classList.add('active');
      break;

    case 'cart':
      const cartView = document.getElementById('view-cart');
      if (cartView) cartView.classList.add('active');
      renderCartPageView();
      break;

    case 'wishlist':
      const wishlistView = document.getElementById('view-wishlist');
      if (wishlistView) wishlistView.classList.add('active');
      renderWishlistView();
      break;

    case 'checkout':
      const checkoutView = document.getElementById('view-checkout');
      if (checkoutView) checkoutView.classList.add('active');
      renderCheckoutView();
      break;

    case 'order-success':
      const successView = document.getElementById('view-order-success');
      if (successView) successView.classList.add('active');
      renderOrderSuccessView(params.get('id'));
      break;

    case 'orders':
      const ordersView = document.getElementById('view-orders');
      if (ordersView) ordersView.classList.add('active');
      renderOrdersView();
      break;

    default:
      navigateTo('home');
      break;
  }
}

// --------------------------------------------------------------------------
// Category Strips & Cards
// --------------------------------------------------------------------------
function renderCategoriesStrip() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  const isTe = AppState.lang === 'te';
  container.innerHTML = CATEGORIES_DATA.map(cat => {
    const active = AppState.activeCategory === cat.id ? 'active' : '';
    const label = isTe ? cat.nameTe : cat.name;
    return `
      <div class="category-card ${active}" onclick="selectCategory('${cat.id}')">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-name">${label}</div>
      </div>
    `;
  }).join('');
}

function selectCategory(catId) {
  AppState.activeCategory = catId;
  renderCategoriesStrip();
  if (window.location.hash.includes('products')) {
    renderProducts();
  } else {
    navigateTo(`products?cat=${catId}`);
  }
}

// --------------------------------------------------------------------------
// Product Rendering & Filtering
// --------------------------------------------------------------------------
function getFilteredProducts() {
  let list = [...PRODUCTS_DATA];

  // Category filter
  if (AppState.activeCategory && AppState.activeCategory !== 'all') {
    list = list.filter(p => p.category === AppState.activeCategory);
  }

  // Search filter
  if (AppState.searchQuery.trim()) {
    const q = AppState.searchQuery.toLowerCase().trim();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.nameTe.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.categoryNameTe.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.descriptionTe.toLowerCase().includes(q) ||
      p.artisanName.toLowerCase().includes(q) ||
      p.artisanNameTe.toLowerCase().includes(q)
    );
  }

  // Price filter
  if (AppState.priceFilter === 'under200') {
    list = list.filter(p => p.price < 200);
  } else if (AppState.priceFilter === '200to400') {
    list = list.filter(p => p.price >= 200 && p.price <= 400);
  } else if (AppState.priceFilter === 'above400') {
    list = list.filter(p => p.price > 400);
  }

  // Sort
  if (AppState.sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function renderProducts() {
  const isTe = AppState.lang === 'te';
  const products = getFilteredProducts();

  // Update both home featured grid and products view grid
  const containers = [
    document.getElementById('home-products-grid'),
    document.getElementById('catalog-products-grid')
  ];

  containers.forEach(container => {
    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #fff; border-radius: 12px; border: 1px dashed #dec8a2;">
          <div style="font-size: 48px; margin-bottom: 12px;">🎋</div>
          <h3 style="font-weight: 800; color: #432306; margin-bottom: 8px;">${t('noProductsFound')}</h3>
          <button class="btn btn-primary" onclick="resetFilters()">${t('resetFilter')}</button>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(product => {
      const title = isTe ? product.nameTe : product.name;
      const category = isTe ? product.categoryNameTe : product.categoryName;
      const artisan = isTe ? product.artisanNameTe : product.artisanName;
      const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      const isWishlisted = AppState.wishlist.includes(product.id);

      return `
        <div class="product-card" id="card-${product.id}">
          <div class="product-badges">
            <span class="badge-tag badge-green">${t('handcrafted')}</span>
            ${product.bestSeller ? `<span class="badge-tag badge-gold">${t('bestsellerBadge')}</span>` : ''}
          </div>

          <button class="wishlist-toggle-btn ${isWishlisted ? 'in-wishlist' : ''}" 
                  onclick="toggleWishlist('${product.id}', event)" 
                  title="${t('navWishlist')}">
            ${isWishlisted ? '♥' : '♡'}
          </button>

          <div class="product-thumb-wrap" onclick="showProductDetails('${product.id}')">
            <img src="${product.image}" alt="${title}" class="product-thumb" loading="lazy">
          </div>

          <div class="product-body">
            <div class="product-category-tag">${category}</div>
            <h3 class="product-title" onclick="showProductDetails('${product.id}')">${title}</h3>
            
            <div class="product-artisan-credit">
              <span>🌾 ${t('craftedBy')} <strong>${artisan}</strong></span>
            </div>

            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span class="rating-badge">★ ${product.rating}</span>
              <span class="rating-count">(${product.reviewsCount})</span>
            </div>

            <div class="product-price-row">
              <span class="product-price">₹${product.price}</span>
              <span class="product-mrp">₹${product.originalPrice}</span>
              <span class="product-discount">${discount}% OFF</span>
            </div>

            <div class="product-card-actions">
              <button class="btn-add-cart" onclick="addToCart('${product.id}', 1, event)">
                <span>🛒</span> <span>${t('addToCart')}</span>
              </button>
              <button class="btn-view-quick" onclick="showProductDetails('${product.id}')" title="${t('viewDetails')}">
                👁
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  });
}

function resetFilters() {
  AppState.activeCategory = 'all';
  AppState.searchQuery = '';
  AppState.priceFilter = 'all';
  AppState.sortBy = 'featured';

  const searchInput = document.getElementById('main-search-input');
  if (searchInput) searchInput.value = '';

  const priceSelect = document.getElementById('filter-price-select');
  if (priceSelect) priceSelect.value = 'all';

  const sortSelect = document.getElementById('sort-by-select');
  if (sortSelect) sortSelect.value = 'featured';

  renderCategoriesStrip();
  renderProducts();
}

// --------------------------------------------------------------------------
// Product Detail Modal View
// --------------------------------------------------------------------------
let detailQty = 1;

function showProductDetails(productId, openModal = true) {
  const product = getProductById(productId);
  if (!product) return;

  AppState.currentDetailProduct = product;
  detailQty = 1;

  const isTe = AppState.lang === 'te';
  const title = isTe ? product.nameTe : product.name;
  const category = isTe ? product.categoryNameTe : product.categoryName;
  const artisanName = isTe ? product.artisanNameTe : product.artisanName;
  const artisanLoc = isTe ? product.artisanLocationTe : product.artisanLocation;
  const craftTime = isTe ? product.craftTimeTe : product.craftTime;
  const dimensions = isTe ? product.dimensionsTe : product.dimensions;
  const desc = isTe ? product.descriptionTe : product.description;
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const modalBody = document.getElementById('product-detail-modal-body');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="product-detail-grid">
      <div class="detail-gallery">
        <img src="${product.image}" alt="${title}" class="detail-main-img">
        
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 10px;">
          <div style="background: var(--green-tint); padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 700; color: var(--green-dark);">
            🌱 100% Biodegradable
          </div>
          <div style="background: var(--bg-cream-alt); padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 700; color: var(--bamboo-brown);">
            ✋ Pure Handloom Weave
          </div>
        </div>
      </div>

      <div class="detail-info">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="product-category-tag">${category}</span>
          <span style="font-size: 12px; font-weight: 700; color: var(--green-medium); background: var(--green-soft); padding: 2px 8px; border-radius: 4px;">
            ${t('inStock')} (${product.stock} units left)
          </span>
        </div>

        <h1 class="detail-title">${title}</h1>

        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="rating-badge">★ ${product.rating}</span>
          <span style="font-size: 13px; color: var(--text-muted); font-weight: 600;">${product.reviewsCount} ${t('productRatingReviews')}</span>
        </div>

        <div class="product-price-row" style="margin: 4px 0 10px;">
          <span class="product-price" style="font-size: 26px;">₹${product.price}</span>
          <span class="product-mrp" style="font-size: 16px;">₹${product.originalPrice}</span>
          <span class="product-discount" style="font-size: 15px;">${discount}% OFF</span>
        </div>

        <p style="font-size: 14.5px; color: var(--text-muted); line-height: 1.6;">${desc}</p>

        <!-- Artisan Box -->
        <div class="artisan-highlight-box">
          <div class="artisan-highlight-title">🌾 ${t('artisanStoryTitle')}</div>
          <div class="artisan-highlight-name">${artisanName}</div>
          <div class="artisan-highlight-loc">📍 ${artisanLoc} • ${craftTime} ${t('daysCraftTime')}</div>
        </div>

        <!-- Specifications Table -->
        <div>
          <div style="font-weight: 800; font-size: 14px; color: var(--bamboo-dark); margin-bottom: 6px;">
            ${t('specifications')}
          </div>
          <table class="spec-table">
            <tr>
              <td>${t('specMaterial')}</td>
              <td>${product.material}</td>
            </tr>
            <tr>
              <td>${t('specDimensions')}</td>
              <td>${dimensions}</td>
            </tr>
            <tr>
              <td>${t('specCraftTime')}</td>
              <td>${craftTime}</td>
            </tr>
            <tr>
              <td>${t('specOrigin')}</td>
              <td>${artisanLoc}</td>
            </tr>
          </table>
        </div>

        <!-- Quantity & Action Buttons -->
        <div style="display: flex; align-items: center; gap: 16px; margin-top: 10px;">
          <span style="font-weight: 700; font-size: 14px;">${t('quantity')}:</span>
          <div class="qty-control">
            <button class="qty-btn" onclick="updateDetailQty(-1)">-</button>
            <span class="qty-val" id="detail-qty-val">1</span>
            <button class="qty-btn" onclick="updateDetailQty(1)">+</button>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 16px;">
          <button class="btn btn-primary" style="flex: 1;" onclick="addDetailToCart(false)">
            🛒 ${t('addToCart')}
          </button>
          <button class="btn btn-accent" style="flex: 1;" onclick="addDetailToCart(true)">
            ⚡ ${t('buyNow')}
          </button>
        </div>
      </div>
    </div>
  `;

  if (openModal) {
    const modal = document.getElementById('product-detail-modal');
    if (modal) modal.classList.add('show');
  }
}

function closeProductModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) modal.classList.remove('show');
}

function updateDetailQty(delta) {
  detailQty = Math.max(1, detailQty + delta);
  const valEl = document.getElementById('detail-qty-val');
  if (valEl) valEl.textContent = detailQty;
}

function addDetailToCart(buyNow = false) {
  if (!AppState.currentDetailProduct) return;
  addToCart(AppState.currentDetailProduct.id, detailQty);
  closeProductModal();
  if (buyNow) {
    navigateTo('checkout');
  }
}

// --------------------------------------------------------------------------
// Cart Functionality
// --------------------------------------------------------------------------
function addToCart(productId, qty = 1, event) {
  if (event) event.stopPropagation();

  const product = getProductById(productId);
  if (!product) return;

  const existing = AppState.cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    AppState.cart.push({ productId, quantity: qty });
  }

  saveCart();
  const title = AppState.lang === 'te' ? product.nameTe : product.name;
  showToast(`${title} ${t('addedToCart')}`, '🛒');
  renderCartDrawer();
  renderCartPageView();
}

function removeFromCart(productId) {
  AppState.cart = AppState.cart.filter(item => item.productId !== productId);
  saveCart();
  renderCartDrawer();
  renderCartPageView();
}

function updateCartQuantity(productId, delta) {
  const item = AppState.cart.find(i => i.productId === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCartDrawer();
  renderCartPageView();
}

function clearCart() {
  if (confirm(AppState.lang === 'te' ? 'కార్ట్‌ని ఖాళీ చేయాలనుకుంటున్నారా?' : 'Are you sure you want to clear your cart?')) {
    AppState.cart = [];
    saveCart();
    renderCartDrawer();
    renderCartPageView();
  }
}

function calculateCartTotals() {
  let subtotal = 0;
  let itemsCount = 0;

  AppState.cart.forEach(item => {
    const product = getProductById(item.productId);
    if (product) {
      subtotal += product.price * item.quantity;
      itemsCount += item.quantity;
    }
  });

  const freeShippingThreshold = 499;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 40;
  const total = subtotal + shipping;
  const neededForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  return { subtotal, shipping, total, itemsCount, neededForFreeShip };
}

function updateCartBadges() {
  const { itemsCount } = calculateCartTotals();
  document.querySelectorAll('.cart-badge-count').forEach(el => {
    el.textContent = itemsCount;
    el.style.display = itemsCount > 0 ? 'flex' : 'none';
  });
}

function openCartDrawer() {
  renderCartDrawer();
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('show');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
}

function renderCartDrawer() {
  const isTe = AppState.lang === 'te';
  const itemsContainer = document.getElementById('cart-drawer-items');
  const footerContainer = document.getElementById('cart-drawer-footer');
  const shippingMsgContainer = document.getElementById('cart-drawer-shipping-msg');
  if (!itemsContainer || !footerContainer) return;

  const { subtotal, shipping, total, neededForFreeShip } = calculateCartTotals();

  // Free shipping banner
  if (shippingMsgContainer) {
    if (subtotal === 0) {
      shippingMsgContainer.style.display = 'none';
    } else if (neededForFreeShip === 0) {
      shippingMsgContainer.style.display = 'block';
      shippingMsgContainer.innerHTML = t('cartFreeShipCongrats');
    } else {
      shippingMsgContainer.style.display = 'block';
      shippingMsgContainer.innerHTML = t('cartFreeShipNote', { amount: neededForFreeShip });
    }
  }

  if (AppState.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 10px;">
        <div style="font-size: 48px; margin-bottom: 12px;">🧺</div>
        <h4 style="font-weight: 800; color: var(--bamboo-dark); margin-bottom: 6px;">${t('cartEmptyTitle')}</h4>
        <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 20px;">${t('cartEmptySub')}</p>
        <button class="btn btn-primary" onclick="closeCartDrawer(); navigateTo('products');">
          ${t('cartBrowseBtn')}
        </button>
      </div>
    `;
    footerContainer.style.display = 'none';
    return;
  }

  footerContainer.style.display = 'block';
  itemsContainer.innerHTML = AppState.cart.map(item => {
    const product = getProductById(item.productId);
    if (!product) return '';

    const title = isTe ? product.nameTe : product.name;
    const itemTotal = product.price * item.quantity;

    return `
      <div class="cart-item-card">
        <img src="${product.image}" alt="${title}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${title}</div>
          <div class="cart-item-price">₹${product.price} × ${item.quantity} = ₹${itemTotal}</div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateCartQuantity('${product.id}', -1)">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity('${product.id}', 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${product.id}')">
              ${t('cartRemove')}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  footerContainer.innerHTML = `
    <div class="cart-summary-line">
      <span>${t('cartSubtotal')}</span>
      <span style="font-weight: 700;">₹${subtotal}</span>
    </div>
    <div class="cart-summary-line">
      <span>${t('cartShipping')}</span>
      <span style="font-weight: 700; color: ${shipping === 0 ? 'var(--green-primary)' : 'inherit'};">
        ${shipping === 0 ? t('cartShippingFree') : `₹${shipping}`}
      </span>
    </div>
    <div class="cart-summary-line">
      <span>${t('cartEcoPack')}</span>
      <span style="font-weight: 700; color: var(--green-primary);">${t('cartShippingFree')}</span>
    </div>
    <div class="cart-summary-line total">
      <span>${t('cartTotal')}</span>
      <span>₹${total}</span>
    </div>

    <div style="display: flex; gap: 10px; margin-top: 16px;">
      <button class="btn btn-primary btn-block" onclick="closeCartDrawer(); navigateTo('checkout');">
        🔒 ${t('cartCheckoutBtn')}
      </button>
    </div>
    <button style="background: none; border: none; color: var(--text-muted); font-size: 12px; margin-top: 8px; width: 100%; text-align: center; cursor: pointer;" onclick="clearCart()">
      ${t('cartClear')}
    </button>
  `;
}

// Full Cart Page View
function renderCartPageView() {
  const container = document.getElementById('cart-page-content');
  if (!container) return;

  const isTe = AppState.lang === 'te';
  const { subtotal, shipping, total, itemsCount, neededForFreeShip } = calculateCartTotals();

  if (AppState.cart.length === 0) {
    container.innerHTML = `
      <div style="background: #fff; border-radius: 12px; border: 1px solid var(--border-light); padding: 60px 20px; text-align: center; max-width: 600px; margin: 40px auto;">
        <div style="font-size: 60px; margin-bottom: 16px;">🧺</div>
        <h2 style="font-size: 22px; font-weight: 800; color: var(--bamboo-dark); margin-bottom: 8px;">${t('cartEmptyTitle')}</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">${t('cartEmptySub')}</p>
        <button class="btn btn-primary" onclick="navigateTo('products')">${t('cartBrowseBtn')}</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="checkout-grid">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="font-size: 22px; font-weight: 800; color: var(--bamboo-dark);">${t('cartTitle')} (${itemsCount})</h2>
          <button class="btn btn-sm btn-danger" onclick="clearCart()">${t('cartClear')}</button>
        </div>

        ${neededForFreeShip > 0 ? `
          <div style="background: var(--green-tint); border: 1px solid var(--green-light); padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; font-weight: 600; color: var(--green-dark);">
            ${t('cartFreeShipNote', { amount: neededForFreeShip })}
          </div>
        ` : `
          <div style="background: var(--green-soft); border: 1px solid var(--green-medium); padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; font-weight: 700; color: var(--green-dark);">
            ${t('cartFreeShipCongrats')}
          </div>
        `}

        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${AppState.cart.map(item => {
            const product = getProductById(item.productId);
            if (!product) return '';
            const title = isTe ? product.nameTe : product.name;
            const artisan = isTe ? product.artisanNameTe : product.artisanName;
            const itemTotal = product.price * item.quantity;

            return `
              <div style="background: #fff; border: 1px solid var(--border-light); border-radius: 10px; padding: 16px; display: flex; gap: 16px; align-items: center;">
                <img src="${product.image}" alt="${title}" style="width: 80px; height: 80px; object-fit: contain; background: var(--bg-cream); border-radius: 6px; padding: 6px;">
                <div style="flex: 1;">
                  <h4 style="font-weight: 700; font-size: 15px; margin-bottom: 4px;">${title}</h4>
                  <div style="font-size: 12.5px; color: var(--bamboo-brown); margin-bottom: 6px;">🌾 ${t('craftedBy')} ${artisan}</div>
                  <div style="font-size: 16px; font-weight: 900; color: var(--bamboo-dark);">₹${product.price}</div>
                </div>

                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
                  <div class="qty-control">
                    <button class="qty-btn" onclick="updateCartQuantity('${product.id}', -1)">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQuantity('${product.id}', 1)">+</button>
                  </div>
                  <div style="font-weight: 800; font-size: 15px;">₹${itemTotal}</div>
                  <button class="cart-item-remove" onclick="removeFromCart('${product.id}')">${t('cartRemove')}</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Summary Sidebar -->
      <div>
        <div class="checkout-box" style="position: sticky; top: 90px;">
          <h3>📋 ${t('checkoutSummaryHeading')}</h3>
          <div class="cart-summary-line">
            <span>${t('cartSubtotal')}</span>
            <span style="font-weight: 700;">₹${subtotal}</span>
          </div>
          <div class="cart-summary-line">
            <span>${t('cartShipping')}</span>
            <span style="font-weight: 700; color: ${shipping === 0 ? 'var(--green-primary)' : 'inherit'};">
              ${shipping === 0 ? t('cartShippingFree') : `₹${shipping}`}
            </span>
          </div>
          <div class="cart-summary-line">
            <span>${t('cartEcoPack')}</span>
            <span style="font-weight: 700; color: var(--green-primary);">${t('cartShippingFree')}</span>
          </div>
          <div class="cart-summary-line total">
            <span>${t('cartTotal')}</span>
            <span>₹${total}</span>
          </div>

          <button class="btn btn-primary btn-block" style="margin-top: 20px;" onclick="navigateTo('checkout')">
            🔒 ${t('cartCheckoutBtn')}
          </button>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Wishlist Functionality
// --------------------------------------------------------------------------
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();

  const idx = AppState.wishlist.indexOf(productId);
  const product = getProductById(productId);
  const title = product ? (AppState.lang === 'te' ? product.nameTe : product.name) : 'Product';

  if (idx > -1) {
    AppState.wishlist.splice(idx, 1);
    showToast(`${title} removed from Wishlist`, '♡');
  } else {
    AppState.wishlist.push(productId);
    showToast(`${title} added to Wishlist`, '♥');
  }

  saveWishlist();
  renderProducts();
  if (window.location.hash.includes('wishlist')) {
    renderWishlistView();
  }
}

function updateWishlistBadges() {
  const count = AppState.wishlist.length;
  document.querySelectorAll('.wishlist-badge-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderWishlistView() {
  const container = document.getElementById('wishlist-content');
  if (!container) return;

  const isTe = AppState.lang === 'te';

  if (AppState.wishlist.length === 0) {
    container.innerHTML = `
      <div style="background: #fff; border-radius: 12px; border: 1px solid var(--border-light); padding: 60px 20px; text-align: center; max-width: 600px; margin: 40px auto;">
        <div style="font-size: 60px; margin-bottom: 16px; color: var(--accent-red);">♡</div>
        <h2 style="font-size: 22px; font-weight: 800; color: var(--bamboo-dark); margin-bottom: 8px;">${t('wishlistEmpty')}</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">${t('wishlistEmptySub')}</p>
        <button class="btn btn-primary" onclick="navigateTo('products')">${t('cartBrowseBtn')}</button>
      </div>
    `;
    return;
  }

  const items = AppState.wishlist.map(id => getProductById(id)).filter(Boolean);

  container.innerHTML = `
    <h2 style="font-size: 24px; font-weight: 800; color: var(--bamboo-dark); margin-bottom: 20px;">
      ${t('wishlistTitle')} (${items.length})
    </h2>
    <div class="products-grid">
      ${items.map(product => {
        const title = isTe ? product.nameTe : product.name;
        const category = isTe ? product.categoryNameTe : product.categoryName;
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

        return `
          <div class="product-card">
            <button class="wishlist-toggle-btn in-wishlist" onclick="toggleWishlist('${product.id}', event)">
              ♥
            </button>
            <div class="product-thumb-wrap" onclick="showProductDetails('${product.id}')">
              <img src="${product.image}" alt="${title}" class="product-thumb">
            </div>
            <div class="product-body">
              <div class="product-category-tag">${category}</div>
              <h3 class="product-title" onclick="showProductDetails('${product.id}')">${title}</h3>
              <div class="product-price-row">
                <span class="product-price">₹${product.price}</span>
                <span class="product-mrp">₹${product.originalPrice}</span>
                <span class="product-discount">${discount}% OFF</span>
              </div>
              <div class="product-card-actions">
                <button class="btn-add-cart" onclick="addToCart('${product.id}', 1, event); toggleWishlist('${product.id}', event);">
                  🛒 ${t('moveToCart')}
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// --------------------------------------------------------------------------
// User Authentication (Demo Simulation)
// --------------------------------------------------------------------------
function updateAuthUI() {
  const authDisplay = document.getElementById('nav-user-display');
  if (!authDisplay) return;

  if (AppState.user) {
    authDisplay.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>👤</span>
        <span style="max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${AppState.user.name}
        </span>
        <button onclick="handleLogout(event)" title="${t('navLogout')}" style="background: rgba(255,255,255,0.2); border: none; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 11px; cursor: pointer; margin-left: 4px;">
          ${t('navLogout')}
        </button>
      </div>
    `;
  } else {
    authDisplay.innerHTML = `
      <div onclick="openAuthModal()" style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
        <span>👤</span> <span>${t('navLogin')}</span>
      </div>
    `;
  }
}

function openAuthModal(mode = 'login') {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    switchAuthTab(mode);
    modal.classList.add('show');
  }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.remove('show');
}

function switchAuthTab(mode) {
  const loginForm = document.getElementById('auth-form-login');
  const registerForm = document.getElementById('auth-form-register');
  const tabLogin = document.getElementById('tab-btn-login');
  const tabRegister = document.getElementById('tab-btn-register');

  if (mode === 'login') {
    if (loginForm) loginForm.style.display = 'block';
    if (registerForm) registerForm.style.display = 'none';
    if (tabLogin) tabLogin.classList.add('active');
    if (tabRegister) tabRegister.classList.remove('active');
  } else {
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'block';
    if (tabLogin) tabLogin.classList.remove('active');
    if (tabRegister) tabRegister.classList.add('active');
  }
}

function fillDemoUser() {
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  if (emailInput) emailInput.value = 'ramesh.csp@bambookart.in';
  if (passInput) passInput.value = 'bamboo2026';
  showToast('Demo credentials filled!', '⚡');
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const name = email.split('@')[0].replace('.', ' ').toUpperCase();

  const user = {
    name: name.includes('RAMESH') ? 'K. Ramesh' : name,
    email: email,
    phone: '98480 22334',
    address: 'House # 4-82, Gandhi Road, Rajahmundry, East Godavari, AP - 533101'
  };

  saveUser(user);
  closeAuthModal();
  showToast(`${t('navHello')}, ${user.name}!`, '👋');
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;

  const user = {
    name,
    email,
    phone,
    address: ''
  };

  saveUser(user);
  closeAuthModal();
  showToast(`Account created! Welcome, ${name}.`, '🎉');
}

function handleLogout(event) {
  if (event) event.stopPropagation();
  AppState.user = null;
  localStorage.removeItem('bk_user');
  updateAuthUI();
  showToast('Logged out successfully', '👋');
}

// --------------------------------------------------------------------------
// Checkout & Order Placement
// --------------------------------------------------------------------------
let selectedPaymentMethod = 'cod';

function renderCheckoutView() {
  const container = document.getElementById('checkout-content');
  if (!container) return;

  const { subtotal, shipping, total, itemsCount } = calculateCartTotals();
  if (itemsCount === 0) {
    navigateTo('cart');
    return;
  }

  const isTe = AppState.lang === 'te';

  container.innerHTML = `
    <div class="checkout-grid">
      <div>
        <!-- Step 1: Customer & Delivery Address -->
        <div class="checkout-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h3 style="margin: 0; border: none; padding: 0;">📍 ${t('checkoutDeliveryHeading')}</h3>
            <button type="button" class="btn btn-sm btn-secondary" style="color: var(--green-dark); background: var(--green-tint); border: 1px solid var(--green-light);" onclick="fillSampleAddress()">
              ${t('fillSampleAddressBtn')}
            </button>
          </div>

          <form id="checkout-address-form" onsubmit="event.preventDefault();">
            <div class="form-row">
              <div class="form-group">
                <label>${t('fullNameLabel')} *</label>
                <input type="text" id="chk-name" class="form-control" placeholder="${t('namePlaceholder')}" required value="${AppState.user?.name || ''}">
              </div>
              <div class="form-group">
                <label>${t('phoneLabel')} *</label>
                <input type="tel" id="chk-phone" class="form-control" placeholder="${t('phonePlaceholder')}" required value="${AppState.user?.phone || ''}">
              </div>
            </div>

            <div class="form-group">
              <label>${t('deliveryAddressLabel')} *</label>
              <textarea id="chk-address" class="form-control" rows="2" placeholder="${t('addressPlaceholder')}" required>${AppState.user?.address || ''}</textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Landmark</label>
                <input type="text" id="chk-landmark" class="form-control" placeholder="${t('landmarkPlaceholder')}">
              </div>
              <div class="form-group">
                <label>Town / City / Mandal *</label>
                <input type="text" id="chk-city" class="form-control" placeholder="${t('cityPlaceholder')}" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>State *</label>
                <select id="chk-state" class="form-control" required>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Other State">Other State</option>
                </select>
              </div>
              <div class="form-group">
                <label>PIN Code *</label>
                <input type="text" id="chk-pincode" class="form-control" placeholder="${t('pinPlaceholder')}" maxlength="6" required>
              </div>
            </div>
          </form>
        </div>

        <!-- Step 2: Payment Method -->
        <div class="checkout-box">
          <h3>💳 ${t('checkoutPaymentHeading')}</h3>

          <!-- COD Option -->
          <div class="payment-method-card selected" id="pay-card-cod" onclick="selectPaymentMethod('cod')">
            <input type="radio" name="paymentMethod" id="radio-cod" value="cod" checked>
            <div>
              <label for="radio-cod" style="font-weight: 800; cursor: pointer; color: var(--bamboo-dark);">
                💵 ${t('paymentCodTitle')}
              </label>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">
                ${t('paymentCodDesc')}
              </div>
            </div>
          </div>

          <!-- Demo Online Payment Option -->
          <div class="payment-method-card" id="pay-card-online" onclick="selectPaymentMethod('online')">
            <input type="radio" name="paymentMethod" id="radio-online" value="online">
            <div>
              <label for="radio-online" style="font-weight: 800; cursor: pointer; color: var(--bamboo-dark);">
                ⚡ ${t('paymentOnlineTitle')}
              </label>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">
                ${t('paymentOnlineDesc')}
              </div>

              <!-- Online Demo Simulation Details -->
              <div id="online-pay-details" style="display: none; margin-top: 12px; background: #fff; padding: 12px; border-radius: 6px; border: 1px dashed var(--green-medium);">
                <div style="font-size: 12px; font-weight: 700; color: var(--green-primary); margin-bottom: 6px;">
                  DEMO UPI / QR GATEWAY (Simulated)
                </div>
                <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                  <span style="background: #E8F5E9; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 700;">GPay</span>
                  <span style="background: #E8F5E9; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 700;">PhonePe</span>
                  <span style="background: #E8F5E9; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 700;">Paytm</span>
                </div>
                <input type="text" class="form-control" placeholder="UPI ID (e.g. 9848012345@upi)" value="user@okhdfcbank" style="font-size: 13px; padding: 6px 10px;">
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                  ✓ Payment simulation auto-verifies upon clicking Confirm Order
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Order Summary & Confirmation -->
      <div>
        <div class="checkout-box" style="position: sticky; top: 90px;">
          <h3>📋 ${t('checkoutSummaryHeading')}</h3>

          <div style="max-height: 220px; overflow-y: auto; margin-bottom: 14px; padding-right: 4px;">
            ${AppState.cart.map(item => {
              const prod = getProductById(item.productId);
              if (!prod) return '';
              const title = isTe ? prod.nameTe : prod.name;
              return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
                  <span style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${title} <span style="color: var(--text-muted);">× ${item.quantity}</span>
                  </span>
                  <span style="font-weight: 700;">₹${prod.price * item.quantity}</span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="cart-summary-line">
            <span>${t('cartSubtotal')}</span>
            <span style="font-weight: 700;">₹${subtotal}</span>
          </div>
          <div class="cart-summary-line">
            <span>${t('cartShipping')}</span>
            <span style="font-weight: 700; color: ${shipping === 0 ? 'var(--green-primary)' : 'inherit'};">
              ${shipping === 0 ? t('cartShippingFree') : `₹${shipping}`}
            </span>
          </div>
          <div class="cart-summary-line">
            <span>${t('cartEcoPack')}</span>
            <span style="font-weight: 700; color: var(--green-primary);">${t('cartShippingFree')}</span>
          </div>
          <div class="cart-summary-line total">
            <span>${t('cartTotal')}</span>
            <span>₹${total}</span>
          </div>

          <div style="background: var(--bg-cream); padding: 10px; border-radius: 6px; font-size: 12px; color: var(--bamboo-brown); margin: 14px 0; border: 1px dashed var(--bamboo-beige);">
            🌾 <strong>CSP Promise:</strong> ₹${Math.round(total * 0.85)} of this order will go directly to our rural artisan families.
          </div>

          <button class="btn btn-primary btn-block" style="padding: 14px; font-size: 16px;" onclick="placeOrder()">
            🔒 ${t('placeOrderBtn')}
          </button>
        </div>
      </div>
    </div>
  `;
}

function fillSampleAddress() {
  document.getElementById('chk-name').value = 'K. Ramesh Kumar';
  document.getElementById('chk-phone').value = '98480 22334';
  document.getElementById('chk-address').value = 'D.No 4-82, Godavari Bund Road, Medara Colony';
  document.getElementById('chk-landmark').value = 'Opposite Sri Rama Temple';
  document.getElementById('chk-city').value = 'Rajahmundry';
  document.getElementById('chk-state').value = 'Andhra Pradesh';
  document.getElementById('chk-pincode').value = '533101';
  showToast('Sample Andhra address filled!', '⚡');
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;
  document.getElementById('pay-card-cod').classList.toggle('selected', method === 'cod');
  document.getElementById('pay-card-online').classList.toggle('selected', method === 'online');
  document.getElementById('radio-cod').checked = method === 'cod';
  document.getElementById('radio-online').checked = method === 'online';

  const onlineDetails = document.getElementById('online-pay-details');
  if (onlineDetails) {
    onlineDetails.style.display = method === 'online' ? 'block' : 'none';
  }
}

function placeOrder() {
  const name = document.getElementById('chk-name')?.value.trim();
  const phone = document.getElementById('chk-phone')?.value.trim();
  const address = document.getElementById('chk-address')?.value.trim();
  const city = document.getElementById('chk-city')?.value.trim();
  const state = document.getElementById('chk-state')?.value;
  const pincode = document.getElementById('chk-pincode')?.value.trim();

  if (!name || !phone || !address || !city || !pincode) {
    alert(AppState.lang === 'te' ? 'దయచేసి అన్ని వివరాలను నమోదు చేయండి.' : 'Please fill all required delivery address fields.');
    return;
  }

  const { subtotal, shipping, total } = calculateCartTotals();
  const orderId = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const orderItems = AppState.cart.map(item => {
    const prod = getProductById(item.productId);
    return {
      productId: item.productId,
      name: prod.name,
      nameTe: prod.nameTe,
      price: prod.price,
      quantity: item.quantity,
      image: prod.image,
      artisanName: prod.artisanName,
      artisanNameTe: prod.artisanNameTe
    };
  });

  const fullAddress = `${address}, ${city}, ${state} - ${pincode}`;

  const newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    items: orderItems,
    subtotal,
    shipping,
    total,
    paymentMethod: selectedPaymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Demo Online Payment (UPI Verified)',
    customer: {
      name,
      phone,
      address: fullAddress
    },
    status: 'Placed'
  };

  AppState.orders.unshift(newOrder);
  saveOrders();

  // Also save customer details to profile
  saveUser({
    name,
    email: AppState.user?.email || 'customer@bambookart.in',
    phone,
    address: fullAddress
  });

  // Clear cart
  AppState.cart = [];
  saveCart();

  AppState.lastPlacedOrder = newOrder;
  showToast(t('orderConfirmedTitle'), '🎉');
  navigateTo(`order-success?id=${orderId}`);
}

// --------------------------------------------------------------------------
// Order Confirmation & Printable Invoice
// --------------------------------------------------------------------------
function renderOrderSuccessView(orderId) {
  const container = document.getElementById('order-success-content');
  if (!container) return;

  const order = AppState.orders.find(o => o.id === orderId) || AppState.lastPlacedOrder;
  if (!order) {
    navigateTo('home');
    return;
  }

  const isTe = AppState.lang === 'te';

  container.innerHTML = `
    <div class="order-success-card">
      <div class="success-check-icon">✓</div>
      <h2 style="font-size: 26px; font-weight: 800; color: var(--green-dark); margin-bottom: 6px;">
        ${t('orderConfirmedTitle')}
      </h2>
      <p style="color: var(--text-muted); font-size: 15px; margin-bottom: 24px;">
        ${t('orderConfirmedSub')}
      </p>

      <div class="invoice-preview-box" id="printable-invoice">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--border-light); padding-bottom: 12px; margin-bottom: 14px;">
          <div>
            <h3 style="font-weight: 900; color: var(--green-dark); font-size: 20px;">Bambookart</h3>
            <div style="font-size: 11px; color: var(--bamboo-brown); font-weight: 700;">
              COMMUNITY SERVICE PROJECT • ARTISAN DIRECT
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 800; color: var(--bamboo-dark);">${t('orderIdLabel')}: ${order.id}</div>
            <div style="font-size: 12px; color: var(--text-muted);">${order.date}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div>
            <strong>${t('deliveryAddressLabel')}:</strong>
            <div>${order.customer.name}</div>
            <div style="color: var(--text-muted); font-size: 13px;">${order.customer.address}</div>
            <div style="color: var(--text-muted); font-size: 13px;">📞 ${order.customer.phone}</div>
          </div>
          <div style="text-align: right;">
            <strong>${t('paymentModeLabel')}:</strong>
            <div style="color: var(--green-dark); font-weight: 700;">${order.paymentMethod}</div>
            <div style="margin-top: 6px;"><strong>Status:</strong> <span style="background: var(--green-soft); color: var(--green-dark); padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 12px;">Confirmed ✓</span></div>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px; margin: 14px 0;">
          <thead>
            <tr style="background: var(--bamboo-light); text-align: left;">
              <th style="padding: 6px 10px;">Item</th>
              <th style="padding: 6px 10px; text-align: center;">Qty</th>
              <th style="padding: 6px 10px; text-align: right;">Price</th>
              <th style="padding: 6px 10px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 8px 10px;">
                  <div style="font-weight: 700;">${isTe ? item.nameTe : item.name}</div>
                  <div style="font-size: 11px; color: var(--bamboo-brown);">Artisan: ${isTe ? item.artisanNameTe : item.artisanName}</div>
                </td>
                <td style="padding: 8px 10px; text-align: center;">${item.quantity}</td>
                <td style="padding: 8px 10px; text-align: right;">₹${item.price}</td>
                <td style="padding: 8px 10px; text-align: right; font-weight: 700;">₹${item.price * item.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
          <div style="width: 220px; font-size: 13.5px;">
            <div style="display: flex; justify-content: space-between; padding: 2px 0;">
              <span>Subtotal:</span>
              <span style="font-weight: 700;">₹${order.subtotal}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 2px 0;">
              <span>Delivery:</span>
              <span style="font-weight: 700; color: var(--green-primary);">${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-top: 1px solid var(--border-light); font-size: 16px; font-weight: 900; color: var(--bamboo-dark);">
              <span>Grand Total:</span>
              <span>₹${order.total}</span>
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-secondary" style="color: var(--bamboo-dark); border-color: var(--bamboo-brown);" onclick="printInvoice()">
          ${t('printInvoiceBtn')}
        </button>
        <button class="btn btn-accent" onclick="navigateTo('orders')">
          ${t('trackOrderBtn')}
        </button>
        <button class="btn btn-primary" onclick="navigateTo('products')">
          ${t('continueShoppingBtn')}
        </button>
      </div>
    </div>
  `;
}

function printInvoice() {
  window.print();
}

// --------------------------------------------------------------------------
// My Orders Page
// --------------------------------------------------------------------------
function renderOrdersView() {
  const container = document.getElementById('orders-content');
  if (!container) return;

  const isTe = AppState.lang === 'te';

  if (AppState.orders.length === 0) {
    container.innerHTML = `
      <div style="background: #fff; border-radius: 12px; border: 1px solid var(--border-light); padding: 60px 20px; text-align: center; max-width: 600px; margin: 40px auto;">
        <div style="font-size: 60px; margin-bottom: 16px;">📦</div>
        <h2 style="font-size: 22px; font-weight: 800; color: var(--bamboo-dark); margin-bottom: 8px;">${t('noOrdersTitle')}</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">${t('noOrdersSub')}</p>
        <button class="btn btn-primary" onclick="navigateTo('products')">${t('cartBrowseBtn')}</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <h2 style="font-size: 24px; font-weight: 800; color: var(--bamboo-dark); margin-bottom: 20px;">
      ${t('ordersTitle')} (${AppState.orders.length})
    </h2>
    <div style="display: flex; flex-direction: column; gap: 20px;">
      ${AppState.orders.map(order => `
        <div style="background: #fff; border: 1px solid var(--border-light); border-radius: 12px; padding: 20px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div>
              <span style="font-weight: 800; color: var(--bamboo-dark); font-size: 16px;">${order.id}</span>
              <span style="color: var(--text-muted); font-size: 13px; margin-left: 10px;">Placed on ${order.date}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="background: var(--green-soft); color: var(--green-dark); padding: 4px 10px; border-radius: var(--radius-full); font-weight: 700; font-size: 12px;">
                ● ${t('orderStatusPlaced')}
              </span>
              <span style="font-weight: 900; font-size: 16px; color: var(--bamboo-dark);">₹${order.total}</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${order.items.map(item => `
              <div style="display: flex; gap: 12px; align-items: center;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; background: var(--bg-cream); border-radius: 6px;">
                <div style="flex: 1;">
                  <div style="font-weight: 700; font-size: 14px;">${isTe ? item.nameTe : item.name}</div>
                  <div style="font-size: 12px; color: var(--bamboo-brown);">Qty: ${item.quantity} • ₹${item.price} each</div>
                </div>
                <button class="btn btn-sm btn-secondary" onclick="addToCart('${item.productId}', 1); navigateTo('cart');">
                  ${t('reorderBtn')}
                </button>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 16px; padding-top: 12px; border-top: 1px dashed var(--border-subtle); display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--text-muted);">
            <div>📍 Delivered to: <strong>${order.customer.name}</strong>, ${order.customer.address}</div>
            <button class="btn btn-sm btn-primary" onclick="navigateTo('order-success?id=${order.id}')">
              ${t('viewInvoiceBtn')}
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// --------------------------------------------------------------------------
// Artisans Directory & Crafting Steps
// --------------------------------------------------------------------------
function renderArtisans() {
  const container = document.getElementById('artisans-grid-container');
  if (!container) return;

  const isTe = AppState.lang === 'te';

  container.innerHTML = ARTISANS_DATA.map(artisan => {
    const name = isTe ? artisan.nameTe : artisan.name;
    const village = isTe ? artisan.villageTe : artisan.village;
    const district = isTe ? artisan.districtTe : artisan.district;
    const exp = isTe ? artisan.experienceTe : artisan.experience;
    const specialty = isTe ? artisan.specialtyTe : artisan.specialty;
    const story = isTe ? artisan.storyTe : artisan.story;
    const quote = isTe ? artisan.quoteTe : artisan.quote;

    return `
      <div class="artisan-card">
        <img src="${artisan.image}" alt="${name}" class="artisan-card-img">
        <div class="artisan-card-body">
          <h3 class="artisan-name">${name}</h3>
          <div class="artisan-loc">📍 ${village}, ${district}</div>
          <div style="font-size: 12.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
            ⏳ ${exp}
          </div>
          <div style="font-size: 13px; font-weight: 600; color: var(--bamboo-dark); margin-bottom: 8px;">
            🎋 <strong>Specialty:</strong> ${specialty}
          </div>
          <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5; margin-bottom: 10px;">
            ${story}
          </p>
          <div class="artisan-quote">
            "${quote}"
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCraftSteps() {
  const container = document.getElementById('craft-steps-container');
  if (!container) return;

  const isTe = AppState.lang === 'te';

  container.innerHTML = CRAFTING_STEPS.map(step => {
    const title = isTe ? step.titleTe : step.title;
    const desc = isTe ? step.descTe : step.desc;

    return `
      <div class="craft-step-card">
        <div class="craft-step-num">${step.step}</div>
        <h4 class="craft-step-title">${title}</h4>
        <p class="craft-step-desc">${desc}</p>
      </div>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// Search Bar & Instant Suggestions
// --------------------------------------------------------------------------
function setupSearch() {
  const searchInput = document.getElementById('main-search-input');
  const suggestionsBox = document.getElementById('search-suggestions-box');
  const searchBtn = document.getElementById('main-search-btn');

  if (!searchInput) return;

  function handleSearchInput() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      if (suggestionsBox) suggestionsBox.classList.remove('show');
      return;
    }

    const matches = PRODUCTS_DATA.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.nameTe.toLowerCase().includes(query) ||
      p.categoryName.toLowerCase().includes(query) ||
      p.artisanName.toLowerCase().includes(query)
    ).slice(0, 5);

    if (suggestionsBox) {
      if (matches.length > 0) {
        suggestionsBox.innerHTML = matches.map(p => `
          <div class="suggestion-item" onclick="selectSuggestion('${p.id}')">
            <img src="${p.image}" class="suggestion-img" alt="${p.name}">
            <div>
              <div style="font-weight: 700; font-size: 13.5px;">${AppState.lang === 'te' ? p.nameTe : p.name}</div>
              <div style="font-size: 12px; color: var(--bamboo-brown);">₹${p.price} • ${p.categoryName}</div>
            </div>
          </div>
        `).join('');
        suggestionsBox.classList.add('show');
      } else {
        suggestionsBox.classList.remove('show');
      }
    }
  }

  searchInput.addEventListener('input', handleSearchInput);

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  });

  if (searchBtn) {
    searchBtn.addEventListener('click', executeSearch);
  }

  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container') && suggestionsBox) {
      suggestionsBox.classList.remove('show');
    }
  });
}

function selectSuggestion(productId) {
  const suggestionsBox = document.getElementById('search-suggestions-box');
  if (suggestionsBox) suggestionsBox.classList.remove('show');
  showProductDetails(productId);
}

function executeSearch() {
  const searchInput = document.getElementById('main-search-input');
  const suggestionsBox = document.getElementById('search-suggestions-box');
  if (suggestionsBox) suggestionsBox.classList.remove('show');

  const q = searchInput ? searchInput.value.trim() : '';
  AppState.searchQuery = q;
  navigateTo(`products?search=${encodeURIComponent(q)}`);
}

// --------------------------------------------------------------------------
// Contact Form & FAQ Accordion
// --------------------------------------------------------------------------
function setupContactAndFaq() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cnt-name')?.value || 'Friend';
      showToast(t('contactSuccess'), '✉️');
      contactForm.reset();
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      parent.classList.toggle('open');
    });
  });
}

// --------------------------------------------------------------------------
// Initialization
// --------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // Setup language
  setLanguage(AppState.lang);

  // Initial Badges
  updateCartBadges();
  updateWishlistBadges();
  updateAuthUI();

  // Setup dynamic components
  setupSearch();
  setupContactAndFaq();

  // Filters change listeners
  const priceSelect = document.getElementById('filter-price-select');
  if (priceSelect) {
    priceSelect.addEventListener('change', (e) => {
      AppState.priceFilter = e.target.value;
      renderProducts();
    });
  }

  const sortSelect = document.getElementById('sort-by-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Initial route
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
});
