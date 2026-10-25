// Semua data disimpan di localStorage (aplikasi statis, tanpa server/database).

export const USERS = [
  { username: "admin", password: "admin123", role: "admin", name: "Bu Sri (Admin)" },
  { username: "kasir", password: "kasir123", role: "kasir", name: "Dedi (Kasir)" },
  { username: "reseller", password: "reseller123", role: "reseller", name: "Vina (Reseller)" },
];

const DEFAULT_PRODUCTS = [
  { id: "p1", name: "Keripik Singkong Original", category: "Singkong", price: 12000, stock: 42, color: "#EFA23E" },
  { id: "p2", name: "Keripik Singkong Balado", category: "Singkong", price: 13000, stock: 35, color: "#D6402A" },
  { id: "p3", name: "Keripik Singkong Keju", category: "Singkong", price: 15000, stock: 20, color: "#F0C94A" },
  { id: "p4", name: "Keripik Pisang Manis", category: "Pisang", price: 11000, stock: 30, color: "#C97F26" },
  { id: "p5", name: "Keripik Tempe Renyah", category: "Tempe", price: 10000, stock: 25, color: "#5B7F3A" },
  { id: "p6", name: "Keripik Usus Pedas", category: "Usus", price: 14000, stock: 18, color: "#A62E1C" },
  { id: "p7", name: "Keripik Kentang Rumput Laut", category: "Kentang", price: 16000, stock: 15, color: "#42602A" },
  { id: "p8", name: "Basreng Pedas Daun Jeruk", category: "Basreng", price: 13500, stock: 8, color: "#8B3A2B" },
];

const KEYS = {
  products: "bk_products",
  sales: "bk_sales",
  settings: "bk_settings",
  session: "bk_session",
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function ensureSeed() {
  if (!isBrowser()) return;
  if (!localStorage.getItem(KEYS.products)) {
    localStorage.setItem(KEYS.products, JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem(KEYS.sales)) {
    localStorage.setItem(KEYS.sales, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.settings)) {
    localStorage.setItem(
      KEYS.settings,
      JSON.stringify({ qrisImage: null, storeName: "Bintang Kriuk" })
    );
  }
}

// ---------- Produk ----------
export function getProducts() {
  if (!isBrowser()) return [];
  ensureSeed();
  return JSON.parse(localStorage.getItem(KEYS.products) || "[]");
}

export function saveProducts(products) {
  if (!isBrowser()) return false;
  try {
    localStorage.setItem(KEYS.products, JSON.stringify(products));
    return true;
  } catch (e) {
    alert("Penyimpanan browser penuh. Gunakan gambar yang lebih kecil atau hapus gambar produk lain.");
    return false;
  }
}

export function addProduct(product) {
  const products = getProducts();
  const id = "p" + Date.now();
  const newProduct = { id, ...product };
  saveProducts([...products, newProduct]);
  return newProduct;
}

export function updateProduct(id, updates) {
  const products = getProducts().map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveProducts(products);
}

export function deleteProduct(id) {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
}

export function adjustStock(id, delta) {
  const products = getProducts().map((p) =>
    p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
  );
  saveProducts(products);
}

// ---------- Penjualan ----------
export function getSales() {
  if (!isBrowser()) return [];
  ensureSeed();
  return JSON.parse(localStorage.getItem(KEYS.sales) || "[]");
}

export function addSale(sale) {
  const sales = getSales();
  const newSale = {
    id: "TRX" + Date.now(),
    date: new Date().toISOString(),
    ...sale,
    // gambar tidak perlu disimpan di riwayat penjualan (hemat penyimpanan)
    items: sale.items.map(({ image, color, ...rest }) => rest),
  };
  localStorage.setItem(KEYS.sales, JSON.stringify([newSale, ...sales]));

  // Kurangi stok otomatis
  sale.items.forEach((item) => adjustStock(item.productId, -item.qty));

  return newSale;
}

// ---------- Pengaturan (QRIS dll) ----------
export function getSettings() {
  if (!isBrowser()) return { qrisImage: null, storeName: "Bintang Kriuk" };
  ensureSeed();
  return JSON.parse(localStorage.getItem(KEYS.settings) || "{}");
}

export function saveSettings(settings) {
  if (!isBrowser()) return;
  const current = getSettings();
  localStorage.setItem(KEYS.settings, JSON.stringify({ ...current, ...settings }));
}

// ---------- Sesi login ----------
export function login(username, password) {
  const user = USERS.find((u) => u.username === username && u.password === password);
  if (user && isBrowser()) {
    localStorage.setItem(KEYS.session, JSON.stringify({ username: user.username, role: user.role, name: user.name }));
  }
  return user || null;
}

export function getSession() {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(KEYS.session);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  if (!isBrowser()) return;
  localStorage.removeItem(KEYS.session);
}

export function formatRupiah(value) {
  return "Rp" + Number(value || 0).toLocaleString("id-ID");
}
