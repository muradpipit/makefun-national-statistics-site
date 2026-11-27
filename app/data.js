// Data statistik nasional Indonesia.
// Sumber utama: Badan Pusat Statistik (BPS) — publikasi Statistik Indonesia,
// Berita Resmi Statistik, dan Survei Sosial Ekonomi Nasional; Kementerian
// Kesehatan (Survei Status Gizi Indonesia) dan APJII untuk pengguna internet.
// Setiap deret mencantumkan tahun dan sumbernya; nilai disajikan apa adanya
// dari publikasi sumber, tanpa pembulatan ulang yang mengubah makna.

export const SOURCES = {
  bps: 'BPS — Statistik Indonesia',
  bpsBrs: 'BPS — Berita Resmi Statistik',
  bpsSusenas: 'BPS — Survei Sosial Ekonomi Nasional',
  kemenkes: 'Kemenkes — Survei Status Gizi Indonesia',
  apjii: 'APJII — Survei Penetrasi Internet Indonesia',
};

export const COUNTRY = {
  name: 'Indonesia',
  capital: 'Jakarta (Ibu Kota Nusantara dalam pembangunan)',
  islands: 17508,
  landAreaKm2: 1904569,
  provinces: 38,
  districts: 514,
  language: 'Bahasa Indonesia',
  currency: 'Rupiah (IDR)',
};

// Deret tahunan nasional. unit menjelaskan satuan nilai.
export const SERIES = {
  population: {
    label: 'Jumlah penduduk (pertengahan tahun)',
    unit: 'juta jiwa',
    source: SOURCES.bps,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [270.2, 272.68, 275.77, 278.69, 281.6],
    note: '2020 hasil Sensus Penduduk; 2021–2024 proyeksi pertengahan tahun.',
  },
  gdpGrowth: {
    label: 'Pertumbuhan ekonomi (PDB harga konstan)',
    unit: '% per tahun',
    source: SOURCES.bpsBrs,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [-2.07, 3.7, 5.31, 5.05, 5.03],
    note: '2020 kontraksi akibat pandemi Covid-19.',
  },
  gdpNominal: {
    label: 'PDB atas dasar harga berlaku',
    unit: 'Rp triliun',
    source: SOURCES.bps,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [15443, 16977, 19588, 20892, 22139],
  },
  gdpPerCapita: {
    label: 'PDB per kapita',
    unit: 'Rp juta',
    source: SOURCES.bps,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [57.15, 62.25, 71.04, 74.96, 78.62],
  },
  unemployment: {
    label: 'Tingkat pengangguran terbuka (Agustus)',
    unit: '% angkatan kerja',
    source: SOURCES.bpsBrs,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [7.07, 6.49, 5.86, 5.32, 4.91],
    note: 'Februari 2025: 4,76%.',
  },
  poverty: {
    label: 'Tingkat kemiskinan (Maret)',
    unit: '% penduduk',
    source: SOURCES.bpsBrs,
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    values: [9.78, 10.14, 9.54, 9.36, 9.03, 8.47],
    note: 'September 2024: 8,57%.',
  },
  inflation: {
    label: 'Inflasi tahun kalender (Desember, year-on-year)',
    unit: '%',
    source: SOURCES.bpsBrs,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [1.68, 1.87, 5.51, 2.61, 1.57],
  },
  hdi: {
    label: 'Indeks Pembangunan Manusia (IPM)',
    unit: 'poin (skala 0–100)',
    source: SOURCES.bps,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [71.94, 72.29, 72.91, 74.39, 75.02],
    note: 'Status pembangunan manusia “tinggi” sejak 2023.',
  },
  lifeExpectancy: {
    label: 'Angka harapan hidup saat lahir',
    unit: 'tahun',
    source: SOURCES.bps,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [71.47, 71.57, 71.85, 73.93, 74.15],
    note: 'Kenaikan 2023 mengikuti pembaruan tabel kematian BPS.',
  },
  schooling: {
    label: 'Rata-rata lama sekolah penduduk 25 tahun ke atas',
    unit: 'tahun',
    source: SOURCES.bps,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [8.48, 8.54, 8.69, 8.77, 9.04],
  },
  exports: {
    label: 'Nilai ekspor barang',
    unit: 'US$ miliar',
    source: SOURCES.bpsBrs,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [163.19, 231.61, 291.9, 258.82, 264.7],
  },
  imports: {
    label: 'Nilai impor barang',
    unit: 'US$ miliar',
    source: SOURCES.bpsBrs,
    years: [2020, 2021, 2022, 2023, 2024],
    values: [141.57, 196.2, 237.51, 221.89, 233.66],
  },
  stunting: {
    label: 'Prevalensi stunting balita',
    unit: '% balita',
    source: SOURCES.kemenkes,
    years: [2021, 2022, 2023, 2024],
    values: [24.4, 21.6, 21.5, 19.8],
    note: 'Target nasional 2024: 14%.',
  },
};

// Penduduk 20 provinsi terbesar, proyeksi pertengahan tahun 2023 (juta jiwa).
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 49.94, island: 'Jawa' },
  { name: 'Jawa Timur', pop: 41.81, island: 'Jawa' },
  { name: 'Jawa Tengah', pop: 37.89, island: 'Jawa' },
  { name: 'Sumatera Utara', pop: 15.59, island: 'Sumatera' },
  { name: 'Banten', pop: 12.43, island: 'Jawa' },
  { name: 'DKI Jakarta', pop: 10.68, island: 'Jawa' },
  { name: 'Sulawesi Selatan', pop: 9.46, island: 'Sulawesi' },
  { name: 'Lampung', pop: 9.35, island: 'Sumatera' },
  { name: 'Sumatera Selatan', pop: 9.01, island: 'Sumatera' },
  { name: 'Riau', pop: 6.97, island: 'Sumatera' },
  { name: 'Sumatera Barat', pop: 5.76, island: 'Sumatera' },
  { name: 'Nusa Tenggara Timur', pop: 5.66, island: 'Nusa Tenggara' },
  { name: 'Nusa Tenggara Barat', pop: 5.6, island: 'Nusa Tenggara' },
  { name: 'Aceh', pop: 5.55, island: 'Sumatera' },
  { name: 'Bali', pop: 4.34, island: 'Bali' },
  { name: 'Kalimantan Selatan', pop: 4.22, island: 'Kalimantan' },
  { name: 'Kalimantan Timur', pop: 3.93, island: 'Kalimantan' },
  { name: 'DI Yogyakarta', pop: 3.76, island: 'Jawa' },
  { name: 'Jambi', pop: 3.68, island: 'Sumatera' },
  { name: 'Sulawesi Tengah', pop: 3.12, island: 'Sulawesi' },
];

// Struktur umur penduduk 2024 (persen dari total penduduk).
export const AGE_GROUPS = [
  { label: '0–14 tahun', value: 24.4 },
  { label: '15–64 tahun', value: 68.9 },
  { label: '65 tahun ke atas', value: 6.7 },
];

// Pangsa lapangan usaha dalam PDB 2024 (persen).
export const SECTORS = [
  { label: 'Industri pengolahan', value: 18.7 },
  { label: 'Perdagangan', value: 12.8 },
  { label: 'Pertanian, kehutanan, dan perikanan', value: 12.5 },
  { label: 'Konstruksi', value: 9.5 },
  { label: 'Pertambangan dan penggalian', value: 9.1 },
  { label: 'Transportasi dan pergudangan', value: 5.6 },
  { label: 'Jasa keuangan dan asuransi', value: 4.3 },
  { label: 'Informasi dan komunikasi', value: 4.2 },
  { label: 'Real estat', value: 2.6 },
  { label: 'Lapangan usaha lainnya', value: 20.7 },
];

// Angka kunci sekali ukur (bukan deret tahunan).
export const KEY_FACTS = [
  { label: 'Penduduk', value: '281,6 juta', detail: 'pertengahan 2024', source: SOURCES.bps },
  { label: 'Laju pertumbuhan penduduk', value: '1,04%', detail: '2023–2024', source: SOURCES.bps },
  { label: 'Angkatan kerja', value: '153,05 juta', detail: 'Februari 2025', source: SOURCES.bpsBrs },
  { label: 'Tingkat partisipasi angkatan kerja', value: '70,71%', detail: 'Februari 2025', source: SOURCES.bpsBrs },
  { label: 'Penduduk bekerja', value: '145,77 juta', detail: 'Februari 2025', source: SOURCES.bpsBrs },
  { label: 'Angka melek huruf usia 15+', value: '96,36%', detail: '2023', source: SOURCES.bpsSusenas },
  { label: 'Harapan lama sekolah', value: '13,37 tahun', detail: '2024', source: SOURCES.bps },
  { label: 'Angka kematian bayi', value: '16,9 per 1.000', detail: 'kelahiran hidup, 2023', source: SOURCES.bps },
  { label: 'Pengguna internet', value: '221,6 juta', detail: '79,5% penduduk, 2024', source: SOURCES.apjii },
  { label: 'Wisatawan mancanegara', value: '13,9 juta', detail: 'kunjungan, 2024', source: SOURCES.bps },
  { label: 'Cadangan devisa', value: 'US$ 155,7 miliar', detail: 'akhir 2024', source: SOURCES.bpsBrs },
  { label: 'Surplus neraca perdagangan', value: 'US$ 31,04 miliar', detail: '2024', source: SOURCES.bpsBrs },
];

// Format angka Indonesia: koma desimal, titik ribuan.
export function fmt(value, decimals = 2) {
  return value.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtInt(value) {
  return value.toLocaleString('id-ID');
}
