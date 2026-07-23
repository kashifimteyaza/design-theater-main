import './style.css';

// ============================================================
// Data
// ============================================================
const CATEGORIES = [
  { icon: '🧶', name: 'Textiles', count: '1.2k' },
  { icon: '🪵', name: 'Woodwork', count: '847' },
  { icon: '🌿', name: 'Produce', count: '632' },
  { icon: '🏺', name: 'Ceramics', count: '594' },
  { icon: '💍', name: 'Jewelry', count: '1.1k' },
  { icon: '🕯️', name: 'Candles', count: '421' },
  { icon: '🖼️', name: 'Art', count: '783' },
  { icon: '🧴', name: 'Wellness', count: '356' },
];

const PRODUCTS = [
  { id: 1, name: 'Hand-Thrown Stoneware Mug', price: '$38', seller: 'Clara\'s Kiln', sellerInitial: 'C', badge: 'handmade', badgeLabel: 'Handmade', rating: '4.9', reviews: 128, img: 'https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'Wildflower Honey — 16oz', price: '$22', seller: 'Valley Apiary', sellerInitial: 'V', badge: 'local', badgeLabel: 'Local', rating: '5.0', reviews: 84, img: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'Woven Wall Hanging', price: '$95', seller: 'Thread & Loom', sellerInitial: 'T', badge: 'handmade', badgeLabel: 'Handmade', rating: '4.8', reviews: 56, img: 'https://images.pexels.com/photos/6858607/pexels-photo-6858607.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, name: 'Vintage Brass Candleholders', price: '$44', seller: 'Heirloom Finds', sellerInitial: 'H', badge: 'vintage', badgeLabel: 'Vintage', rating: '4.7', reviews: 39, img: 'https://images.pexels.com/photos/1123971/pexels-photo-1123971.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, name: 'Lavender Soy Candle Set', price: '$34', seller: 'Bloom Botanics', sellerInitial: 'B', badge: 'handmade', badgeLabel: 'Handmade', rating: '4.9', reviews: 201, img: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 6, name: 'Oak Cutting Board (Custom)', price: '$68', seller: 'Sawdust & Soul', sellerInitial: 'S', badge: 'handmade', badgeLabel: 'Handmade', rating: '4.8', reviews: 92, img: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 7, name: 'Heirloom Tomato Basket', price: '$18', seller: 'Sunrise Farm', sellerInitial: 'S', badge: 'local', badgeLabel: 'Local', rating: '5.0', reviews: 47, img: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 8, name: 'Hand-Forged Silver Ring', price: '$120', seller: 'Ironrose Studio', sellerInitial: 'I', badge: 'handmade', badgeLabel: 'Handmade', rating: '4.9', reviews: 73, img: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const ORDERS = [
  { id: '#1042', product: 'Stoneware Mug ×2', buyer: 'Jamie L.', date: 'Apr 28', amount: '$76.00', status: 'new' },
  { id: '#1041', product: 'Soap Set ×1', buyer: 'Robin M.', date: 'Apr 27', amount: '$29.00', status: 'shipped' },
  { id: '#1040', product: 'Custom Planter', buyer: 'Sam T.', date: 'Apr 26', amount: '$55.00', status: 'pending' },
  { id: '#1039', product: 'Wall Hanging ×1', buyer: 'Alex P.', date: 'Apr 25', amount: '$95.00', status: 'complete' },
  { id: '#1038', product: 'Candle Set ×3', buyer: 'Dana K.', date: 'Apr 23', amount: '$102.00', status: 'dispute' },
];

const APPLICATIONS = [
  { name: 'Rosewood Ceramics', meta: 'Ceramics · Applied Apr 27 · 3 sample photos', initial: 'R' },
  { name: 'Green Thumb Produce', meta: 'Local Produce · Applied Apr 26 · USDA cert attached', initial: 'G' },
  { name: 'Iron & Oak Workshop', meta: 'Woodwork · Applied Apr 25 · 7 portfolio items', initial: 'I' },
];

const FLAGS = [
  { title: 'Possible counterfeit item — "Vintage Chanel Bag"', meta: 'Seller: VintageLux · Reported by 3 users', severity: 'high', priority: 'High' },
  { title: 'Misleading product description in Honey listing', meta: 'Seller: Golden Hive · Customer complaint', severity: 'medium', priority: 'Med' },
  { title: 'Duplicate listing — Lavender Bundle ×2', meta: 'Seller: Bloom Co · System detection', severity: 'low', priority: 'Low' },
  { title: 'Pricing anomaly — $0.01 listing detected', meta: 'Seller: CraftHouse · Possible error', severity: 'medium', priority: 'Med' },
];

const DISPUTES = [
  { id: 'DSP-091', title: 'Item not as described — hand-thrown bowl', parties: 'Buyer: Casey R. vs Seller: Clay & Co.', amount: '$48.00', status: 'new' },
  { id: 'DSP-088', title: 'Package not received — candle set', parties: 'Buyer: Jordan T. vs Seller: Flame Works', amount: '$67.50', status: 'pending' },
];

// ============================================================
// Render helpers
// ============================================================
function renderStars(rating) {
  const full = Math.floor(parseFloat(rating));
  return '★'.repeat(full) + (parseFloat(rating) % 1 >= 0.5 ? '½' : '');
}

function renderProductCard(p) {
  return `
    <article class="product-card fade-in-up" role="article" aria-label="${p.name}">
      <div class="product-img-wrap">
        <img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy" />
        <span class="product-badge ${p.badge}" aria-label="${p.badgeLabel} item">${p.badgeLabel}</span>
        <button class="product-fav" aria-label="Save ${p.name} to favorites">♡</button>
      </div>
      <div class="product-body">
        <div class="product-seller">
          <div class="seller-avatar" aria-hidden="true">${p.sellerInitial}</div>
          <span class="seller-name">${p.seller}</span>
          <span class="seller-verified" aria-label="Verified seller">✓</span>
        </div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">
          <span class="stars" aria-label="${p.rating} out of 5 stars">${renderStars(p.rating)}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-footer">
          <span class="product-price">${p.price}</span>
          <button class="add-to-cart" aria-label="Add ${p.name} to cart">Add to cart</button>
        </div>
      </div>
    </article>`;
}

function renderCategoryCard(c) {
  return `
    <a href="#" class="category-card" aria-label="Browse ${c.name}, ${c.count} items">
      <span class="category-icon" aria-hidden="true">${c.icon}</span>
      <span class="category-name">${c.name}</span>
      <span class="category-count">${c.count} items</span>
    </a>`;
}

function renderStatusPill(status) {
  const labels = { new: 'New', shipped: 'Shipped', pending: 'Pending', complete: 'Complete', dispute: 'Dispute' };
  const dots = { new: '🟡', shipped: '🔵', pending: '🟠', complete: '🟢', dispute: '🔴' };
  return `<span class="status-pill ${status}" aria-label="Order status: ${labels[status]}">${dots[status]} ${labels[status]}</span>`;
}

// ============================================================
// Customer view
// ============================================================
function renderCustomerView() {
  return `
    <main id="main-content" class="view active" id="view-customer" role="main">

      <!-- Hero -->
      <section class="customer-hero" aria-label="Search for local goods">
        <div class="container">
          <div class="hero-eyebrow">
            <span aria-hidden="true">🌿</span>
            300+ artisans in your region
          </div>
          <h1 class="hero-headline">Discover Goods Made with Heart &amp; Hands</h1>
          <p class="hero-sub">From wheel-thrown ceramics to farm-fresh honey — shop handmade, vintage &amp; local.</p>
          <div class="hero-search-bar" role="search">
            <span class="search-icon" aria-hidden="true">🔍</span>
            <input type="search" placeholder="Search handmade goods, vintage items, local produce…" aria-label="Search products" />
            <button class="hero-search-btn">Search</button>
          </div>
          <div class="hero-tags" role="list" aria-label="Popular searches">
            ${['Ceramics','Honey','Candles','Vintage linen','Woodwork','Fresh herbs'].map(t => `<button class="hero-tag" role="listitem">${t}</button>`).join('')}
          </div>
          <div class="hero-stats" aria-label="Marketplace statistics">
            <div class="hero-stat">
              <span class="hero-stat-num">300+</span>
              <span class="hero-stat-label">Local sellers</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-num">12k+</span>
              <span class="hero-stat-label">Unique products</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-num">4.9★</span>
              <span class="hero-stat-label">Avg. rating</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-num">98%</span>
              <span class="hero-stat-label">On-time delivery</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust bar -->
      <div class="trust-bar" role="complementary" aria-label="Trust and security information">
        <div class="container">
          <div class="trust-item"><span class="trust-icon" aria-hidden="true">🔒</span> Secure checkout</div>
          <div class="trust-item"><span class="trust-icon" aria-hidden="true">↩️</span> Easy returns &amp; corrections</div>
          <div class="trust-item"><span class="trust-icon" aria-hidden="true">✅</span> Verified local sellers</div>
          <div class="trust-item"><span class="trust-icon" aria-hidden="true">💬</span> Direct seller messaging</div>
          <div class="trust-item"><span class="trust-icon" aria-hidden="true">📦</span> Tracked shipping</div>
        </div>
      </div>

      <!-- Categories -->
      <section class="section" aria-labelledby="categories-heading">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title" id="categories-heading">Shop by Category</h2>
              <p class="section-sub">Find exactly what you're looking for</p>
            </div>
            <a href="#" class="view-all-link" aria-label="View all product categories">All categories →</a>
          </div>
          <div class="category-grid" role="list">
            ${CATEGORIES.map(renderCategoryCard).join('')}
          </div>
        </div>
      </section>

      <!-- Featured products -->
      <section class="section" style="background:var(--neutral-100); padding-block: var(--sp-16);" aria-labelledby="featured-heading">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title" id="featured-heading">Featured This Week</h2>
              <p class="section-sub">Handpicked by our curation team</p>
            </div>
            <a href="#" class="view-all-link" aria-label="Browse all featured products">Browse all →</a>
          </div>
          <div class="product-grid">
            ${PRODUCTS.map(renderProductCard).join('')}
          </div>
        </div>
      </section>

      <!-- Seller spotlight -->
      <section class="section" aria-labelledby="spotlight-heading">
        <div class="container">
          <h2 class="section-title" id="spotlight-heading" style="margin-bottom:var(--sp-8)">Seller Spotlight</h2>
          <div class="seller-spotlight">
            <img
              class="spotlight-img"
              src="https://images.pexels.com/photos/3094219/pexels-photo-3094219.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Clara working at her pottery wheel in her studio"
              loading="lazy"
            />
            <div>
              <p class="spotlight-label">✦ Featured Artisan</p>
              <h3 class="spotlight-name">Clara's Kiln</h3>
              <p class="spotlight-bio">
                Clara has been throwing pots in her backyard studio for over 20 years.
                Every piece is hand-thrown with locally sourced stoneware clay, fired in her
                wood kiln, and glazed with minerals from the region. No two pieces are alike.
              </p>
              <div class="spotlight-stats">
                <div>
                  <span class="spotlight-stat-num">412</span>
                  <span class="spotlight-stat-label">Items sold</span>
                </div>
                <div>
                  <span class="spotlight-stat-num">4.9★</span>
                  <span class="spotlight-stat-label">Avg. rating</span>
                </div>
                <div>
                  <span class="spotlight-stat-num">6 yrs</span>
                  <span class="spotlight-stat-label">On ShopLocal</span>
                </div>
              </div>
              <a href="#" class="btn-primary" aria-label="Visit Clara's Kiln shop">Visit Shop →</a>
            </div>
          </div>
        </div>
      </section>

    </main>`;
}

// ============================================================
// Seller dashboard view
// ============================================================
function renderSellerView() {
  const orderRows = ORDERS.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.product}</td>
      <td>${o.buyer}</td>
      <td>${o.date}</td>
      <td><strong>${o.amount}</strong></td>
      <td>${renderStatusPill(o.status)}</td>
      <td>
        <button class="table-action">View</button>
        ${o.status === 'new' ? '<button class="table-action" style="margin-left:4px">Mark shipped</button>' : ''}
        ${o.status === 'dispute' ? '<button class="table-action" style="margin-left:4px;color:var(--error-600)">Respond</button>' : ''}
      </td>
    </tr>`).join('');

  return `
    <main id="main-content" class="view seller-view" id="view-seller" role="main">

      <div class="seller-topbar" role="banner">
        <div class="container">
          <div class="seller-greeting">
            <h2>Welcome back, Clara</h2>
            <p>Tuesday, April 29, 2026 · Clara's Kiln</p>
          </div>
          <div class="seller-topbar-actions">
            <button class="btn-secondary" id="quick-add-btn" aria-label="Add a new product listing">+ Add product</button>
            <button class="btn-ghost" aria-label="View your public shop page">View shop</button>
          </div>
        </div>
      </div>

      <div class="dashboard-layout">
        <div class="container">
          <div class="dashboard-grid">

            <!-- Sidebar -->
            <aside aria-label="Seller navigation">
              <nav class="sidebar">
                <div class="sidebar-profile">
                  <div class="sidebar-avatar" aria-hidden="true">C</div>
                  <div class="sidebar-name">Clara Meadows</div>
                  <div class="sidebar-shop">Clara's Kiln</div>
                  <span class="sidebar-status">● Active</span>
                </div>
                <ul class="sidebar-nav" role="list">
                  <li>
                    <button class="nav-item active" aria-current="page">
                      <span class="nav-item-icon" aria-hidden="true">📊</span>
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button class="nav-item" aria-label="View orders, 2 new">
                      <span class="nav-item-icon" aria-hidden="true">📦</span>
                      Orders
                      <span class="nav-badge" aria-hidden="true">2</span>
                    </button>
                  </li>
                  <li>
                    <button class="nav-item">
                      <span class="nav-item-icon" aria-hidden="true">🏷️</span>
                      Listings
                    </button>
                  </li>
                  <li>
                    <button class="nav-item">
                      <span class="nav-item-icon" aria-hidden="true">💬</span>
                      Messages
                    </button>
                  </li>
                  <li>
                    <button class="nav-item">
                      <span class="nav-item-icon" aria-hidden="true">💰</span>
                      Payments
                    </button>
                  </li>
                  <li>
                    <button class="nav-item">
                      <span class="nav-item-icon" aria-hidden="true">⭐</span>
                      Reviews
                    </button>
                  </li>
                  <li>
                    <button class="nav-item">
                      <span class="nav-item-icon" aria-hidden="true">⚙️</span>
                      Settings
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>

            <!-- Main content -->
            <div>
              <!-- Stats -->
              <div class="stats-row" role="list" aria-label="Dashboard statistics">
                <div class="stat-card" role="listitem">
                  <div class="stat-card-label">This month's revenue</div>
                  <div class="stat-card-value">$1,284</div>
                  <div class="stat-card-change up" aria-label="12% increase">↑ 12% vs last month</div>
                </div>
                <div class="stat-card" role="listitem">
                  <div class="stat-card-label">Orders this month</div>
                  <div class="stat-card-value">18</div>
                  <div class="stat-card-change up" aria-label="3 more than last month">↑ 3 more than last month</div>
                </div>
                <div class="stat-card" role="listitem">
                  <div class="stat-card-label">Active listings</div>
                  <div class="stat-card-value">24</div>
                  <div class="stat-card-change" style="color:var(--neutral-400)">— No change</div>
                </div>
                <div class="stat-card" role="listitem">
                  <div class="stat-card-label">Avg. review score</div>
                  <div class="stat-card-value">4.9★</div>
                  <div class="stat-card-change up" aria-label="0.1 improvement">↑ 0.1 this month</div>
                </div>
              </div>

              <!-- Quick add product -->
              <div class="panel" id="quick-add-panel">
                <div class="panel-header">
                  <h3 class="panel-title">Quick Add Product</h3>
                  <span style="font-size:var(--text-sm);color:var(--neutral-400)">All fields required</span>
                </div>
                <div class="panel-body">
                  <form class="quick-add-form" id="product-form" aria-label="Add a new product">
                    <div class="form-group">
                      <label class="form-label" for="product-name">Product name</label>
                      <input class="form-input" id="product-name" type="text" placeholder="e.g. Hand-thrown mug" required aria-required="true" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="product-price">Price ($)</label>
                      <input class="form-input" id="product-price" type="number" min="0.01" step="0.01" placeholder="0.00" required aria-required="true" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="product-qty">Qty in stock</label>
                      <input class="form-input" id="product-qty" type="number" min="0" placeholder="0" required aria-required="true" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="product-category">Category</label>
                      <select class="form-input" id="product-category" required aria-required="true">
                        <option value="">Choose…</option>
                        ${CATEGORIES.map(c => `<option>${c.name}</option>`).join('')}
                      </select>
                    </div>
                    <div class="form-group full">
                      <label class="form-label" for="product-desc">Description</label>
                      <textarea class="form-input" id="product-desc" placeholder="Describe your item…" required aria-required="true"></textarea>
                    </div>
                    <div class="form-group full">
                      <label class="form-label">Photos</label>
                      <div class="upload-zone" id="upload-zone" role="button" tabindex="0" aria-label="Upload product photos by clicking or dragging files here">
                        <div class="upload-icon" aria-hidden="true">📷</div>
                        <p class="upload-text">Click or drag photos here</p>
                        <p class="upload-hint">JPG, PNG or WEBP · Max 10MB each · Up to 8 photos</p>
                      </div>
                    </div>
                    <div class="form-group full" style="display:flex;gap:var(--sp-3);flex-wrap:wrap;margin-top:var(--sp-2)">
                      <button type="submit" class="btn-primary">Publish listing</button>
                      <button type="button" class="btn-secondary" id="save-draft-btn">Save as draft</button>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Orders -->
              <div class="panel">
                <div class="panel-header">
                  <h3 class="panel-title">Recent Orders</h3>
                  <button class="btn-ghost" style="font-size:var(--text-sm)">View all orders</button>
                </div>
                <div class="order-table-wrap">
                  <table class="order-table" aria-label="Recent orders">
                    <thead>
                      <tr>
                        <th scope="col">Order</th>
                        <th scope="col">Item</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>${orderRows}</tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>`;
}

// ============================================================
// Admin view
// ============================================================
function renderAdminView() {
  const appItems = APPLICATIONS.map(a => `
    <div class="application-item" role="article" aria-label="Vendor application from ${a.name}">
      <div class="app-avatar" aria-hidden="true">${a.initial}</div>
      <div class="app-info">
        <div class="app-name">${a.name}</div>
        <div class="app-meta">${a.meta}</div>
      </div>
      <div class="app-actions">
        <button class="btn-approve" aria-label="Approve ${a.name}">Approve</button>
        <button class="btn-reject"  aria-label="Reject ${a.name}">Reject</button>
        <button class="btn-review"  aria-label="Review ${a.name} application">Review</button>
      </div>
    </div>`).join('');

  const flagItems = FLAGS.map(f => `
    <div class="flag-item" role="article" aria-label="Flagged item: ${f.title}">
      <div class="flag-dot ${f.severity}" aria-hidden="true"></div>
      <div class="flag-info">
        <div class="flag-title">${f.title}</div>
        <div class="flag-meta">${f.meta}</div>
      </div>
      <span class="priority-chip ${f.severity}" aria-label="${f.priority} priority">${f.priority}</span>
      <button class="btn-review">Review</button>
    </div>`).join('');

  const disputeItems = DISPUTES.map(d => `
    <div class="dispute-card" role="article" aria-label="Dispute ${d.id}: ${d.title}">
      <div class="dispute-header">
        <div>
          <div class="dispute-id">${d.id}</div>
          <div class="dispute-title">${d.title}</div>
          <div class="dispute-parties">${d.parties}</div>
        </div>
        <div>
          <div class="dispute-amount">${d.amount}</div>
          ${renderStatusPill(d.status)}
        </div>
      </div>
      <div class="dispute-actions">
        <button class="btn-primary" style="font-size:var(--text-xs);padding:var(--sp-2) var(--sp-4);min-height:36px">Mediate</button>
        <button class="btn-secondary" style="font-size:var(--text-xs);padding:var(--sp-2) var(--sp-4);min-height:36px">Refund buyer</button>
        <button class="btn-ghost"   style="font-size:var(--text-xs);min-height:36px">Side with seller</button>
        <button class="btn-ghost"   style="font-size:var(--text-xs);min-height:36px">View messages</button>
      </div>
    </div>`).join('');

  return `
    <main id="main-content" class="view admin-view" id="view-admin" role="main">

      <div class="admin-header-bar">
        <div class="container">
          <div>
            <h2 class="admin-title">Admin Dashboard</h2>
            <p class="admin-sub">ShopLocal Marketplace · Last updated: just now</p>
          </div>
          <div style="display:flex;gap:var(--sp-3);flex-wrap:wrap">
            <button class="btn-secondary" style="background:transparent;color:var(--neutral-300);border-color:var(--neutral-600)">Export report</button>
            <button class="btn-primary">+ Add admin note</button>
          </div>
        </div>
      </div>

      <div class="admin-layout">
        <div class="container">

          <!-- Summary stats -->
          <div class="admin-stats-row" role="list" aria-label="Platform overview">
            <div class="admin-stat good" role="listitem">
              <div class="admin-stat-label">Active Sellers</div>
              <div class="admin-stat-value">312</div>
              <div class="admin-stat-detail">↑ 8 new this week</div>
            </div>
            <div class="admin-stat" role="listitem">
              <div class="admin-stat-label">Orders (30 days)</div>
              <div class="admin-stat-value">2,847</div>
              <div class="admin-stat-detail">$94k GMV</div>
            </div>
            <div class="admin-stat warn" role="listitem">
              <div class="admin-stat-label">Pending Applications</div>
              <div class="admin-stat-value">3</div>
              <div class="admin-stat-detail">Awaiting review</div>
            </div>
            <div class="admin-stat alert" role="listitem">
              <div class="admin-stat-label">Open Disputes</div>
              <div class="admin-stat-value">2</div>
              <div class="admin-stat-detail">Action required</div>
            </div>
            <div class="admin-stat warn" role="listitem">
              <div class="admin-stat-label">Flagged Listings</div>
              <div class="admin-stat-value">4</div>
              <div class="admin-stat-detail">1 high priority</div>
            </div>
            <div class="admin-stat good" role="listitem">
              <div class="admin-stat-label">Avg. Platform Rating</div>
              <div class="admin-stat-value">4.8★</div>
              <div class="admin-stat-detail">Based on 8.2k reviews</div>
            </div>
          </div>

          <!-- Applications + Flags -->
          <div class="admin-two-col">

            <div class="panel">
              <div class="panel-header">
                <h3 class="panel-title">Vendor Applications</h3>
                <span style="font-size:var(--text-sm);color:var(--neutral-400)">3 pending</span>
              </div>
              <div class="panel-body" style="padding-top:0">
                ${appItems}
              </div>
            </div>

            <div class="panel">
              <div class="panel-header">
                <h3 class="panel-title">Quality Flags</h3>
                <span style="font-size:var(--text-sm);color:var(--error-500);font-weight:var(--weight-bold)">1 high priority</span>
              </div>
              <div class="panel-body" style="padding-top:0">
                ${flagItems}
              </div>
            </div>

          </div>

          <!-- Disputes -->
          <div class="panel">
            <div class="panel-header">
              <h3 class="panel-title">Dispute Resolution</h3>
              <button class="btn-ghost" style="font-size:var(--text-sm)">View all disputes</button>
            </div>
            <div class="panel-body" style="padding-top:0">
              ${disputeItems}
            </div>
          </div>

          <!-- Recent platform activity table -->
          <div class="panel">
            <div class="panel-header">
              <h3 class="panel-title">Recent Platform Activity</h3>
              <button class="btn-ghost" style="font-size:var(--text-sm)">Full audit log →</button>
            </div>
            <div class="order-table-wrap">
              <table class="order-table" aria-label="Recent platform activity">
                <thead>
                  <tr>
                    <th scope="col">Time</th>
                    <th scope="col">Event</th>
                    <th scope="col">Actor</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2 min ago</td>
                    <td><span class="status-pill new">New</span></td>
                    <td>Rosewood Ceramics</td>
                    <td>Submitted vendor application</td>
                    <td><button class="table-action">Review</button></td>
                  </tr>
                  <tr>
                    <td>14 min ago</td>
                    <td><span class="status-pill dispute">Dispute</span></td>
                    <td>Casey R. (buyer)</td>
                    <td>Opened dispute DSP-091</td>
                    <td><button class="table-action">Investigate</button></td>
                  </tr>
                  <tr>
                    <td>1 hr ago</td>
                    <td><span class="status-pill pending">Flagged</span></td>
                    <td>System</td>
                    <td>Possible counterfeit detected in listing #4821</td>
                    <td><button class="table-action">Remove</button></td>
                  </tr>
                  <tr>
                    <td>3 hr ago</td>
                    <td><span class="status-pill complete">Approved</span></td>
                    <td>Admin: Jordan</td>
                    <td>Approved seller: Mountain Forge Jewelry</td>
                    <td><button class="table-action">View</button></td>
                  </tr>
                  <tr>
                    <td>Yesterday</td>
                    <td><span class="status-pill shipped">Resolved</span></td>
                    <td>Admin: Sam</td>
                    <td>Resolved dispute DSP-087 — refund issued</td>
                    <td><button class="table-action">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </main>`;
}

// ============================================================
// Navigation
// ============================================================
function renderHeader(activeRole) {
  return `
    <div class="role-banner" role="navigation" aria-label="Switch user perspective">
      <div class="container">
        <span class="role-banner-label">View as:</span>
        <ul class="role-tabs" role="tablist" aria-label="User role">
          <li role="presentation">
            <button
              class="role-tab ${activeRole === 'customer' ? 'active' : ''}"
              role="tab"
              aria-selected="${activeRole === 'customer'}"
              data-role="customer"
              id="tab-customer"
              aria-controls="view-customer"
            >Customer</button>
          </li>
          <li role="presentation">
            <button
              class="role-tab ${activeRole === 'seller' ? 'active' : ''}"
              role="tab"
              aria-selected="${activeRole === 'seller'}"
              data-role="seller"
              id="tab-seller"
              aria-controls="view-seller"
            >Seller</button>
          </li>
          <li role="presentation">
            <button
              class="role-tab ${activeRole === 'admin' ? 'active' : ''}"
              role="tab"
              aria-selected="${activeRole === 'admin'}"
              data-role="admin"
              id="tab-admin"
              aria-controls="view-admin"
            >Admin</button>
          </li>
        </ul>
      </div>
    </div>

    <header class="site-header" role="banner">
      <div class="container">
        <div class="header-inner">
          <a href="#" class="site-logo" aria-label="ShopLocal — go to homepage">
            <div class="site-logo-icon" aria-hidden="true">🛍</div>
            <span class="site-logo-text">Shop<span>Local</span></span>
          </a>
          <div class="header-search" role="search">
            <span class="search-icon" aria-hidden="true">🔍</span>
            <input type="search" placeholder="Search products, sellers…" aria-label="Search" />
          </div>
          <div class="header-actions">
            ${activeRole === 'customer' ? `
              <button class="btn-icon" aria-label="Saved items">
                ♡
              </button>
              <button class="btn-icon" aria-label="Shopping cart, 3 items">
                🛒
                <span class="badge" aria-hidden="true">3</span>
              </button>
              <a href="#" class="btn-primary">Sign in</a>
            ` : ''}
            ${activeRole === 'seller' ? `
              <button class="btn-icon" aria-label="Notifications, 2 new">
                🔔
                <span class="badge" aria-hidden="true">2</span>
              </button>
              <button class="btn-icon" aria-label="Messages">💬</button>
              <div class="sidebar-avatar" style="width:36px;height:36px;font-size:14px;cursor:pointer" aria-label="Account: Clara Meadows">C</div>
            ` : ''}
            ${activeRole === 'admin' ? `
              <button class="btn-icon" aria-label="Admin alerts, 5 items">
                🔔
                <span class="badge" aria-label="5 alerts">5</span>
              </button>
              <div class="sidebar-avatar" style="width:36px;height:36px;font-size:14px;cursor:pointer;background:var(--neutral-700);color:var(--neutral-200)" aria-label="Admin account">A</div>
            ` : ''}
          </div>
        </div>
      </div>
    </header>`;
}

function renderFooter() {
  return `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#" class="site-logo" aria-label="ShopLocal homepage">
              <div class="site-logo-icon" aria-hidden="true">🛍</div>
              <span class="site-logo-text">Shop<span>Local</span></span>
            </a>
            <p class="footer-tagline">Connecting local artisans with customers who care about craft, community, and quality.</p>
          </div>
          <div>
            <h4 class="footer-col-title">Shop</h4>
            <ul class="footer-links">
              <li><a href="#">All categories</a></li>
              <li><a href="#">Featured sellers</a></li>
              <li><a href="#">New arrivals</a></li>
              <li><a href="#">Local produce</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-col-title">Sell</h4>
            <ul class="footer-links">
              <li><a href="#">Apply to sell</a></li>
              <li><a href="#">Seller handbook</a></li>
              <li><a href="#">Pricing &amp; fees</a></li>
              <li><a href="#">Seller success</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-col-title">Help</h4>
            <ul class="footer-links">
              <li><a href="#">Help center</a></li>
              <li><a href="#">Returns &amp; refunds</a></li>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 ShopLocal Inc. All rights reserved.</span>
          <div class="footer-cert">
            <span class="cert-badge">WCAG 2.1 AA</span>
            <span class="cert-badge">SSL Secured</span>
            <span class="cert-badge">PCI Compliant</span>
          </div>
        </div>
      </div>
    </footer>`;
}

// ============================================================
// Toast utility
// ============================================================
function showToast(message, type = 'default') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const icons = { success: '✓', error: '✕', default: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${icons[type] || icons.default}</span>
    <span>${message}</span>
    <button class="toast-close" aria-label="Close notification">✕</button>`;

  document.body.appendChild(toast);
  requestAnimationFrame(() => { requestAnimationFrame(() => { toast.classList.add('show'); }); });

  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  });

  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// ============================================================
// App shell
// ============================================================
let currentRole = 'customer';

function renderViewContent(role) {
  if (role === 'customer') return renderCustomerView();
  if (role === 'seller')   return renderSellerView();
  if (role === 'admin')    return renderAdminView();
  return '';
}

function mountApp(role) {
  currentRole = role;
  const app = document.getElementById('app');
  app.innerHTML = renderHeader(role) + renderViewContent(role) + renderFooter();
  bindEvents();
}

function bindEvents() {
  // Role switcher
  document.querySelectorAll('.role-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      if (role !== currentRole) {
        mountApp(role);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Product form submit
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('product-name').value.trim();
      if (!name) return;
      showToast(`"${name}" published successfully!`, 'success');
      productForm.reset();
    });
  }

  // Save draft
  const saveDraft = document.getElementById('save-draft-btn');
  if (saveDraft) {
    saveDraft.addEventListener('click', () => {
      showToast('Draft saved — you can return to it any time.', 'default');
    });
  }

  // Upload zone drag-over feedback
  const uploadZone = document.getElementById('upload-zone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
    uploadZone.addEventListener('drop', e => {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      const count = e.dataTransfer.files.length;
      if (count > 0) showToast(`${count} photo${count > 1 ? 's' : ''} ready to upload`, 'success');
    });
    uploadZone.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); uploadZone.click(); }
    });
  }

  // Admin approve/reject buttons
  document.querySelectorAll('.btn-approve').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.closest('.application-item').querySelector('.app-name').textContent;
      btn.closest('.application-item').style.opacity = '0.5';
      showToast(`${name} approved — welcome email sent!`, 'success');
    });
  });
  document.querySelectorAll('.btn-reject').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.closest('.application-item').querySelector('.app-name').textContent;
      btn.closest('.application-item').style.opacity = '0.5';
      showToast(`${name} application declined.`, 'error');
    });
  });

  // Add to cart
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const name = btn.closest('.product-card').querySelector('.product-name').textContent;
      btn.textContent = '✓ Added';
      btn.style.background = 'var(--success-500)';
      showToast(`"${name}" added to cart`, 'success');
      setTimeout(() => {
        btn.textContent = 'Add to cart';
        btn.style.background = '';
      }, 2000);
    });
  });

  // Favorite
  document.querySelectorAll('.product-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const saved = btn.getAttribute('data-saved') === 'true';
      btn.setAttribute('data-saved', !saved);
      btn.textContent = saved ? '♡' : '♥';
      btn.style.color = saved ? '' : 'var(--accent-500)';
      btn.setAttribute('aria-label', (saved ? 'Save' : 'Remove') + ' from favorites');
    });
  });
}

// ============================================================
// Boot
// ============================================================
mountApp('customer');
