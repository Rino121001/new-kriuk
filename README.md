# Bintang Kriuk — Aplikasi Kasir & Penjualan Keripik

Aplikasi Next.js untuk mengelola penjualan keripik "Bintang Kriuk" dengan 3 peran:
Kasir, Admin, dan Reseller. Data disimpan di **localStorage** browser (statis, tanpa
server/database), jadi tinggal jalankan dan langsung bisa dipakai.

## Cara Menjalankan

1. Pastikan Node.js versi 18 ke atas sudah terpasang.
2. Buka folder ini di terminal, lalu jalankan:
   ```bash
   npm install
   npm run dev
   ```
3. Buka `http://localhost:3000` di browser.

## Akun Demo

| Peran     | Username   | Kata Sandi   |
|-----------|------------|--------------|
| Admin     | admin      | admin123     |
| Kasir     | kasir      | kasir123     |
| Reseller  | reseller   | reseller123  |

Tombol akun demo juga tersedia langsung di halaman login.

## Fitur

**Kasir**
- Memilih produk keripik lewat kartu bergambar besar (klik foto untuk memperbesar)
- Melihat stok barang secara langsung (stok menipis/habis ditandai)
- Checkout dengan pilihan QRIS atau Tunai (cash)
- Pembayaran tunai: input uang dari pembeli (atau pilih nominal cepat), kembalian dihitung otomatis
- Invoice otomatis muncul setelah pembayaran (bisa dicetak atau disimpan sebagai PDF)
- Menu Riwayat & Invoice untuk membuka/cetak ulang invoice lama

**Admin**
- Ringkasan: total stok, produk hampir habis, transaksi & pendapatan hari ini
- Grafik penjualan 7 hari terakhir
- Daftar barang terjual (jumlah & pendapatan per produk)
- Tabel stok barang lengkap
- Riwayat & Invoice: cari, lihat, dan cetak ulang semua invoice
- CRUD produk penuh: tambah, edit, hapus varian keripik beserta foto, harga & stok
- Upload foto per produk (otomatis dikecilkan) yang tampil besar di kasir & reseller
- Unggah gambar QRIS toko secara manual (tampil otomatis di layar pembayaran)

**Reseller**
- Membuat pesanan delivery: pilih produk, isi nama pembeli & alamat
- Checkout dengan QRIS yang sama seperti kasir toko
- Invoice pesanan (lengkap dengan nama & alamat pembeli) setelah pembayaran dikonfirmasi

## Struktur Proyek

```
app/
  login/             halaman login
  dashboard/
    layout.js        proteksi login + sidebar
    kasir/            halaman kasir
    admin/            ringkasan, CRUD produk, pengaturan QRIS
    reseller/         halaman pesanan delivery
components/           komponen UI yang dipakai bersama
lib/data.js           seed data, helper localStorage (produk, penjualan, sesi, QRIS)
```

## Mengganti Data Awal

Produk contoh dan akun demo ada di `lib/data.js` (`DEFAULT_PRODUCTS` dan `USERS`).
Ubah sesuai kebutuhan toko sebelum deploy.

## Catatan

Karena data tersimpan di localStorage browser, setiap perangkat/browser punya
data sendiri-sendiri. Untuk penggunaan multi-perangkat sungguhan (misal kasir
dan admin di HP berbeda), langkah selanjutnya adalah menghubungkan `lib/data.js`
ke database/backend (misalnya lewat API routes Next.js + database seperti
Postgres/Supabase).
