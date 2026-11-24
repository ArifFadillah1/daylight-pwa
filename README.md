# Daylight — Deploy ke GitHub Pages (tanpa SSH!)

Semua langkah lewat browser. Tidak perlu git, tidak perlu SSH, tidak perlu terminal.

## 1. Bikin repo public
1. Login ke github.com → tombol **+** (kanan atas) → **New repository**
2. Nama bebas, misalnya `daylight`
3. Pilih **Public** → **Create repository**

## 2. Upload file
1. Di halaman repo baru, klik **uploading an existing file**
2. Drag semua isi folder ini (6 file): `index.html`, `manifest.webmanifest`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`
   (file `README.md` ini boleh ikut, tidak masalah)
3. Klik **Commit changes**

## 3. Nyalakan GitHub Pages
1. Di repo: **Settings** → menu kiri **Pages**
2. Source: **Deploy from a branch** → Branch: **main** → folder **/ (root)** → **Save**
3. Tunggu ±1–2 menit, refresh — muncul link:
   `https://USERNAME.github.io/daylight/`

## 4. Pasang di iPhone (PWA)
1. Buka link itu di **Safari**
2. Tombol **Share** (kotak + panah ke atas) → **Add to Home Screen** → **Add**
3. Daylight sekarang jadi app sendiri di Home Screen: fullscreen, ada ikonnya, dan **jalan offline** berkat service worker

## 5. Pindahkan data lama
Penting: storage PWA ini **terpisah** dari file lama di Documents.
1. Di app lama (Documents): **⬇ Export Data**
2. Buka PWA dari Home Screen → scroll ke kartu Backup → **⬆ Import Data** → pilih file json → Confirm
Selesai — semua riwayat pindah.

## Update app ke depannya
1. Minta versi baru `index.html` ke Claude
2. Di repo: klik `index.html` → ikon **pensil** (atau hapus & upload ulang) → commit
3. Pages auto-deploy. Buka PWA saat online → versi baru langsung terpakai (service worker-nya network-first). Data aman, tidak tersentuh.

## Catatan
- Data tersimpan di perangkat masing-masing (tidak sync antar-device). Pakai Export/Import untuk pindah data.
- Tetap rajin **Export** sesekali sebagai cadangan.
- SSH hanya perlu kalau nanti mau pakai `git push` dari laptop. Kalau mau: jalankan `ssh-keygen` di Mac sendiri, dan **private key jangan pernah dibagikan ke siapa pun — termasuk AI.**
