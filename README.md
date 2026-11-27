# NusaData — Statistik Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/muradpipit/makefun-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/muradpipit/makefun-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Entri untuk bounty [Make the best national statistics site](https://make.fun/c/best-national-statistics-site-20261126-0539).

## Situsnya

NusaData adalah situs statistik nasional Indonesia yang lengkap dan berdiri sendiri:
seluruh data tersimpan di dalam berkas situs, sehingga situs berjalan tanpa satu pun
permintaan jaringan. Situs ini menampilkan statistik nyata Indonesia — penduduk,
ekonomi/PDB, tenaga kerja, pendidikan, kesehatan, dan kemiskinan — dengan angka,
tahun, dan sumber (BPS, Kemenkes, APJII, Kementerian Keuangan) yang dicantumkan
di setiap grafik dan tabel.

Halaman-halaman (semua bisa dibuka lewat tautan navigasi):

- **Beranda** — kartu angka kunci, grafik yang bisa diganti indikatornya
  (penduduk / PDB / inflasi), kartu jelajah ke semua bagian, dan tabel angka terkini.
- **Penduduk** — deret jumlah penduduk 2020–2024, struktur umur, dan tabel 20 provinsi
  terbesar yang bisa diurutkan dengan mengklik judul kolom.
- **Ekonomi** — PDB, pertumbuhan ekonomi, pangsa lapangan usaha, dan perdagangan
  luar negeri (ekspor vs impor).
- **Tenaga Kerja** — tingkat pengangguran terbuka, angkatan kerja, dan sebaran lapangan pekerjaan.
- **Pendidikan** — rata-rata lama sekolah, partisipasi sekolah, dan anggaran pendidikan.
- **Kesehatan** — harapan hidup, stunting balita, layanan kesehatan, dan belanja kesehatan.
- **Kemiskinan** — tingkat dan jumlah penduduk miskin 2020–2025, kemiskinan kota/desa.
- **Semua Indikator** — seluruh angka situs dalam satu tabel yang bisa dicari dan disaring.
- **Tentang & Metodologi** — cara data dikumpulkan, daftar sumber, dan cara mengutip.

Grafik digambar dengan Canvas 2D dari data yang disematkan di `app/data.js`,
lengkap dengan tooltip saat kursor menyentuh titik data. Tampilan responsif:
navigasi berubah menjadi menu lipat dan kartu menumpuk satu kolom di layar ponsel.

## Menjalankan

Sajikan `app/` dengan server statis apa pun, misalnya:

```sh
cd app && python3 -m http.server 8080
```

Lalu buka http://localhost:8080 di desktop Chrome atau di ponsel.

## Menyerahkan

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library saja) menyalin `app/` dan `screenshots/`
ke direktori keluaran dan menulis `dossier.json` dengan pustaka `vendor/makefun-frontend.ts`.

## Lisensi

MIT — lihat `LICENSE`.
