# Aplikasi MEDEL (PWA): Panduan Pemasangan

## Kenapa perlu folder ini?
Google Apps Script **tidak membenarkan** fail `manifest` dan *service worker* (dua syarat wajib PWA)
dipasang terus pada `script.google.com`. Folder ini ialah "pintu masuk" aplikasi kecil yang di-host
di laman HTTPS anda sendiri. Bila dibuka dari ikon skrin utama, ia terus membawa pengguna ke Sistem MEDEL.

Sistem MEDEL (Code.gs & Index.html) tetap berjalan di Apps Script seperti biasa.

## Kandungan
| Fail | Fungsi |
|---|---|
| `index.html` | Skrin pembuka + arahan pasang |
| `config.js` | **URL sistem MEDEL**, satu-satunya fail yang mungkin perlu diubah |
| `manifest.webmanifest` | Nama, warna & ikon aplikasi |
| `sw.js` | Service worker (pemasangan & mesej luar talian) |
| `icons/` | Ikon aplikasi & logo MEDEL rasmi (logo-penuh.svg) |

## Langkah 1: Host folder ini (pilih satu)

### Pilihan A: GitHub Pages (percuma)
1. Daftar/log masuk di https://github.com
2. **New repository** → nama: `medel` → **Public** → Create.
3. **Add file → Upload files** → seret *semua kandungan* folder `medel-pwa` (termasuk folder `icons`) → **Commit**.
4. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → **Save**.
5. Selepas 1–2 minit, aplikasi tersedia di `https://<nama-pengguna>.github.io/medel/`

### Pilihan B: Pelayan web jabatan / Netlify / Firebase Hosting
Muat naik semua fail ke mana-mana laman yang menggunakan **HTTPS**. PWA tidak berfungsi tanpa HTTPS.

## Langkah 2: Kongsi pautan kepada pegawai
Pegawai buka pautan tersebut di telefon:
- **Android (Chrome):** tekan **⬇ Pasang Aplikasi**, atau menu ⋮ → *Install app*.
- **iPhone (Safari):** butang Kongsi → *Add to Home Screen*.

Ikon **MEDEL** akan muncul di skrin utama. Bila ditekan, sistem MEDEL dibuka terus.

## Bila perlu kemaskini `config.js`?
- **Edit → New version** (cara disyorkan): URL kekal sama. **Tiada apa perlu diubah.**
- **New deployment**: URL baharu. Kemaskini `MEDEL_URL` dalam `config.js` sekali sahaja.
  Telefon pengguna akan mendapat URL baharu secara automatik bila aplikasi dibuka dalam talian.

## Nota
- Kali pertama dibuka dari aplikasi, pengguna mungkin perlu log masuk akaun Google moh.gov.my sekali lagi
  (terutamanya iPhone, kerana aplikasi skrin utama menyimpan log masuk berasingan daripada Safari).
- Jika anda mengubah fail dalam folder ini, naikkan versi `CACHE` dalam `sw.js` (contoh `medel-pwa-v2`).
