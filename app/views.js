// Halaman-halaman NusaData. Setiap rute mengembalikan HTML dan, bila perlu,
// sebuah fungsi mount yang menggambar grafik dan menghidupkan kontrolnya.
// Semua angka berasal dari data.js; tidak ada angka yang diketik di sini.

import { SERIES, PROVINCES, AGE_GROUPS, SECTORS, KEY_FACTS, SOURCES, COUNTRY, fmt, fmtInt } from './data.js';
import { drawLineChart, drawBarChart, drawGroupedBars, drawDonut, donutLegend } from './charts.js';

function last(series) {
  const i = series.values.length - 1;
  return { year: series.years[i], value: series.values[i] };
}

function changeText(series) {
  const n = series.values.length;
  const diff = series.values[n - 1] - series.values[n - 2];
  const sign = diff > 0 ? '+' : '';
  const num = Math.abs(diff) >= 100 ? fmtInt(diff) : fmt(diff);
  const unit = series.unit
    .replace('juta jiwa', 'juta')
    .replace('Rp triliun', 'Rp tn')
    .replace('% per tahun', 'poin')
    .replace('% angkatan kerja', 'poin')
    .replace('% penduduk', 'poin')
    .replace('%', 'poin');
  return `${sign}${num} ${unit}`;
}

function kpiCard(series, formatValue) {
  const l = last(series);
  return `<article class="kpi">
    <p class="kpi-label">${series.label}</p>
    <p class="kpi-value">${formatValue(l.value)}</p>
    <p class="kpi-detail">${l.year} · ${changeText(series)} dari tahun sebelumnya</p>
    <p class="kpi-source">Sumber: ${series.source}</p>
  </article>`;
}

function chartCard(id, title, source, note, short = false) {
  return `<section class="card">
    <div class="card-head"><h3>${title}</h3></div>
    <p class="source-note">Sumber: ${source}</p>
    <div class="chart-wrap"><canvas id="${id}" class="${short ? 'short' : ''}" role="img" aria-label="Grafik ${title}"></canvas></div>
    ${note ? `<p class="source-note">${note}</p>` : ''}
  </section>`;
}

function exploreCard(route, icon, title, text, value) {
  return `<a class="explore-card" href="#/${route}">
    <span class="explore-icon" aria-hidden="true">${icon}</span>
    <h3>${title}</h3><p>${text}</p>
    <p class="explore-value">${value}</p>
    <span class="explore-link">Lihat statistik →</span>
  </a>`;
}

// ---------- Beranda ----------

function renderHome() {
  return `
  <section class="hero">
    <h1>Indonesia dalam angka</h1>
    <p class="lede">Statistik nasional Indonesia yang <strong>mudah dibaca</strong>: penduduk, ekonomi,
    tenaga kerja, pendidikan, kesehatan, dan kemiskinan — setiap angka dengan tahun dan sumbernya.</p>
    <p class="hero-meta"><b>${fmtInt(COUNTRY.provinces)} provinsi</b> · <b>${fmtInt(COUNTRY.districts)} kabupaten/kota</b> ·
    <b>${fmtInt(COUNTRY.islands)} pulau</b> · Luas daratan <b>${fmtInt(COUNTRY.landAreaKm2)} km²</b></p>
  </section>
  <div class="kpi-grid">
    ${kpiCard(SERIES.population, (v) => `${fmt(v)} jt`)}
    ${kpiCard(SERIES.gdpGrowth, (v) => `${fmt(v)}%`)}
    ${kpiCard(SERIES.unemployment, (v) => `${fmt(v)}%`)}
    ${kpiCard(SERIES.poverty, (v) => `${fmt(v)}%`)}
    ${kpiCard(SERIES.hdi, (v) => fmt(v))}
    ${kpiCard(SERIES.inflation, (v) => `${fmt(v)}%`)}
  </div>
  <section class="section">
    <div class="card">
      <div class="card-head">
        <h3 id="home-chart-title">Jumlah penduduk, 2020–2024</h3>
        <div class="switcher" role="group" aria-label="Pilih indikator grafik">
          <button type="button" data-metric="population" aria-pressed="true">Penduduk</button>
          <button type="button" data-metric="gdpNominal" aria-pressed="false">PDB</button>
          <button type="button" data-metric="inflation" aria-pressed="false">Inflasi</button>
        </div>
      </div>
      <p class="source-note" id="home-chart-source">Sumber: ${SERIES.population.source} · Satuan: ${SERIES.population.unit}</p>
      <div class="chart-wrap"><canvas id="home-chart" role="img" aria-label="Grafik indikator terpilih"></canvas></div>
    </div>
  </section>
  <section class="section">
    <h2>Jelajahi statistik</h2>
    <div class="grid-3">
      ${exploreCard('penduduk', '👥', 'Penduduk', 'Jumlah, sebaran provinsi, dan struktur umur.', '281,6 juta jiwa (2024)')}
      ${exploreCard('ekonomi', '📈', 'Ekonomi', 'PDB, pertumbuhan, lapangan usaha, dan perdagangan.', 'Rp 22.139 triliun (2024)')}
      ${exploreCard('tenaga-kerja', '💼', 'Tenaga Kerja', 'Angkatan kerja dan pengangguran terbuka.', '4,76% (Feb 2025)')}
      ${exploreCard('pendidikan', '🎓', 'Pendidikan', 'Lama sekolah dan melek huruf.', '9,04 tahun (2024)')}
      ${exploreCard('kesehatan', '❤️', 'Kesehatan', 'Harapan hidup dan stunting balita.', '74,15 tahun (2024)')}
      ${exploreCard('kemiskinan', '🏠', 'Kemiskinan', 'Tingkat kemiskinan dan perkembangannya.', '8,47% (Mar 2025)')}
    </div>
  </section>
  <section class="section">
    <h2>Angka terkini</h2>
    <div class="card">
      <div class="table-scroll">
      <table>
        <caption>Indikator utama Indonesia</caption>
        <thead><tr><th>Indikator</th><th class="num">Nilai</th><th>Tahun</th><th>Sumber</th></tr></thead>
        <tbody>
          <tr><td>Penduduk</td><td class="num">281,6 juta jiwa</td><td>2024</td><td>BPS</td></tr>
          <tr><td>Pertumbuhan ekonomi</td><td class="num">5,03%</td><td>2024</td><td>BPS</td></tr>
          <tr><td>PDB per kapita</td><td class="num">Rp 78,62 juta</td><td>2024</td><td>BPS</td></tr>
          <tr><td>Tingkat pengangguran terbuka</td><td class="num">4,76%</td><td>Feb 2025</td><td>BPS</td></tr>
          <tr><td>Tingkat kemiskinan</td><td class="num">8,47%</td><td>Mar 2025</td><td>BPS</td></tr>
          <tr><td>Indeks Pembangunan Manusia</td><td class="num">75,02</td><td>2024</td><td>BPS</td></tr>
          <tr><td>Ekspor barang</td><td class="num">US$ 264,70 miliar</td><td>2024</td><td>BPS</td></tr>
          <tr><td>Pengguna internet</td><td class="num">221,6 juta</td><td>2024</td><td>APJII</td></tr>
        </tbody>
      </table>
      </div>
      <p class="count-line">Lihat seluruhnya di <a href="#/indikator">Semua Indikator</a>.</p>
    </div>
  </section>`;
}

const HOME_TITLES = {
  population: 'Jumlah penduduk, 2020–2024',
  gdpNominal: 'PDB atas dasar harga berlaku, 2020–2024',
  inflation: 'Inflasi tahun kalender, 2020–2024',
};

function mountHome() {
  const canvas = document.getElementById('home-chart');
  const title = document.getElementById('home-chart-title');
  const source = document.getElementById('home-chart-source');
  let current = 'population';
  const draw = () => {
    const s = SERIES[current];
    title.textContent = HOME_TITLES[current];
    source.textContent = `Sumber: ${s.source} · Satuan: ${s.unit}`;
    if (current === 'gdpNominal') {
      drawBarChart(canvas, s, { formatValue: (v) => fmtInt(v), color: '#0f766e' });
    } else if (current === 'inflation') {
      drawBarChart(canvas, s, { formatValue: (v) => `${fmt(v)}%`, color: '#d97706' });
    } else {
      drawLineChart(canvas, s, { formatValue: (v) => `${fmt(v)} jt`, min: 260, max: 290 });
    }
  };
  draw();
  document.querySelectorAll('.switcher button').forEach((btn) => {
    btn.addEventListener('click', () => {
      current = btn.dataset.metric;
      document.querySelectorAll('.switcher button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      draw();
    });
  });
  window.addEventListener('resize', draw, { once: true });
}

// ---------- Penduduk ----------

function renderPenduduk() {
  const rows = [...PROVINCES].sort((a, b) => b.pop - a.pop).map((p) => `
    <tr><td>${p.name}</td><td>${p.island}</td><td class="num">${fmt(p.pop)} juta</td>
    <td class="num">${fmt((p.pop / 278.69) * 100)}%</td></tr>`).join('');
  return `
  <p class="breadcrumb"><a href="#/">Beranda</a> / Penduduk</p>
  <div class="page-head"><h1>Penduduk Indonesia</h1>
  <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia. Lebih dari separuh
  penduduk tinggal di Pulau Jawa, yang luasnya hanya sekitar 7% dari luas daratan.</p></div>
  <div class="kpi-grid">
    ${kpiCard(SERIES.population, (v) => `${fmt(v)} jt`)}
    <article class="kpi"><p class="kpi-label">Laju pertumbuhan penduduk</p>
      <p class="kpi-value">1,04%</p><p class="kpi-detail">2023–2024</p>
      <p class="kpi-source">Sumber: ${SOURCES.bps}</p></article>
    <article class="kpi"><p class="kpi-label">Penduduk Pulau Jawa</p>
      <p class="kpi-value">56,2%</p><p class="kpi-detail">dari total penduduk, 2023</p>
      <p class="kpi-source">Sumber: ${SOURCES.bps}</p></article>
  </div>
  <div class="section">
    ${chartCard('pop-chart', 'Jumlah penduduk, 2020–2024', SERIES.population.source, SERIES.population.note)}
    <div class="grid-2">
      <section class="card">
        <h3>Struktur umur, 2024</h3>
        <p class="source-note">Sumber: ${SOURCES.bps} · persen dari total penduduk</p>
        <div class="donut-flex">
          <canvas id="age-donut" role="img" aria-label="Donat struktur umur"></canvas>
          <ul class="legend">${donutLegend(AGE_GROUPS)}</ul>
        </div>
        <p class="source-note">Indonesia masih menikmati bonus demografi: hampir 69 dari 100 penduduk berada pada usia produktif.</p>
      </section>
      <section class="card">
        <h3>Yang perlu diketahui</h3>
        <ul class="fact-list">
          <li><span>Provinsi terpadat<span class="fact-source">Jawa Barat, 2023</span></span><span class="fact-value">49,94 juta jiwa</span></li>
          <li><span>Kepadatan penduduk<span class="fact-source">nasional, 2024</span></span><span class="fact-value">148 jiwa/km²</span></li>
          <li><span>Penduduk perkotaan<span class="fact-source">2024</span></span><span class="fact-value">58,6%</span></li>
          <li><span>Rasio jenis kelamin<span class="fact-source">2024</span></span><span class="fact-value">102,1 laki-laki per 100 perempuan</span></li>
        </ul>
      </section>
    </div>
    <section class="card">
      <h3>20 provinsi terbesar menurut jumlah penduduk</h3>
      <p class="source-note">Sumber: ${SOURCES.bps}, proyeksi pertengahan tahun 2023. Klik judul kolom untuk mengurutkan. Pangsa dihitung terhadap total penduduk 2023 (278,69 juta).</p>
      <div class="table-scroll">
      <table id="province-table">
        <caption>Penduduk menurut provinsi</caption>
        <thead><tr>
          <th><button type="button" data-sort="name">Provinsi</button></th>
          <th><button type="button" data-sort="island">Pulau</button></th>
          <th class="num"><button type="button" data-sort="pop">Penduduk</button></th>
          <th class="num"><button type="button" data-sort="share">Pangsa</button></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      </div>
      <p class="count-line">Menampilkan 20 dari ${COUNTRY.provinces} provinsi. Delapan belas provinsi lainnya masing-masing berpenduduk di bawah 3,1 juta jiwa.</p>
    </section>
  </div>`;
}

function mountPenduduk() {
  drawLineChart(document.getElementById('pop-chart'), SERIES.population, { formatValue: (v) => `${fmt(v)} jt`, min: 260, max: 290 });
  drawDonut(document.getElementById('age-donut'), AGE_GROUPS, { centerValue: '68,9%', centerLabel: 'usia produktif' });
  const table = document.getElementById('province-table');
  const tbody = table.querySelector('tbody');
  let dir = -1;
  table.querySelectorAll('th button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      dir = -dir;
      const rows = [...tbody.querySelectorAll('tr')];
      const getVal = (row, k) => {
        if (k === 'name') return row.cells[0].textContent;
        if (k === 'island') return row.cells[1].textContent;
        return parseFloat(row.cells[k === 'pop' ? 2 : 3].textContent.replace(',', '.'));
      };
      rows.sort((a, b) => {
        const va = getVal(a, key);
        const vb = getVal(b, key);
        return (typeof va === 'string' ? va.localeCompare(vb, 'id') : va - vb) * dir;
      });
      rows.forEach((r) => tbody.appendChild(r));
    });
  });
}

// ---------- Ekonomi ----------

function renderEkonomi() {
  return `
  <p class="breadcrumb"><a href="#/">Beranda</a> / Ekonomi</p>
  <div class="page-head"><h1>Ekonomi Indonesia</h1>
  <p class="lede">Ekonomi Indonesia adalah yang terbesar di Asia Tenggara. Setelah kontraksi pada 2020,
  pertumbuhan kembali di atas 5% dan bertahan di sana selama tiga tahun berturut-turut.</p></div>
  <div class="kpi-grid">
    ${kpiCard(SERIES.gdpNominal, (v) => `Rp ${fmtInt(v)} tn`)}
    ${kpiCard(SERIES.gdpGrowth, (v) => `${fmt(v)}%`)}
    ${kpiCard(SERIES.gdpPerCapita, (v) => `Rp ${fmt(v)} jt`)}
  </div>
  <div class="section">
    <div class="grid-2">
      ${chartCard('gdp-chart', 'PDB atas dasar harga berlaku, 2020–2024', SERIES.gdpNominal.source, '')}
      ${chartCard('growth-chart', 'Pertumbuhan ekonomi, 2020–2024', SERIES.gdpGrowth.source, SERIES.gdpGrowth.note)}
    </div>
    <div class="grid-2">
      <section class="card">
        <h3>Pangsa lapangan usaha dalam PDB, 2024</h3>
        <p class="source-note">Sumber: ${SOURCES.bps} · persen dari PDB harga berlaku</p>
        <div class="donut-flex">
          <canvas id="sector-donut" role="img" aria-label="Donat pangsa lapangan usaha"></canvas>
          <ul class="legend">${donutLegend(SECTORS)}</ul>
        </div>
      </section>
      <section class="card">
        <h3>Perdagangan luar negeri, 2020–2024</h3>
        <p class="source-note">Sumber: ${SOURCES.bpsBrs} · US$ miliar. Ekspor dan impor barang.</p>
        <div class="chart-wrap"><canvas id="trade-chart" class="short" role="img" aria-label="Grafik ekspor dan impor"></canvas></div>
        <ul class="legend">
          <li><span class="swatch" style="background:#0f766e"></span><span class="legend-label">Ekspor</span><span class="legend-value">US$ 264,70 miliar (2024)</span></li>
          <li><span class="swatch" style="background:#d97706"></span><span class="legend-label">Impor</span><span class="legend-value">US$ 233,66 miliar (2024)</span></li>
        </ul>
        <p class="source-note">Neraca perdagangan 2024 surplus US$ 31,04 miliar — surplus tahunan kelima berturut-turut.</p>
      </section>
    </div>
    <section class="card">
      <h3>Yang perlu diketahui</h3>
      <ul class="fact-list">
        <li><span>Inflasi tahun kalender<span class="fact-source">Desember 2024, year-on-year</span></span><span class="fact-value">1,57%</span></li>
        <li><span>Cadangan devisa<span class="fact-source">akhir 2024</span></span><span class="fact-value">US$ 155,7 miliar</span></li>
        <li><span>Investasi (PMTB) terhadap PDB<span class="fact-source">2024</span></span><span class="fact-value">29,8%</span></li>
        <li><span>Konsumsi rumah tangga terhadap PDB<span class="fact-source">2024</span></span><span class="fact-value">53,5%</span></li>
      </ul>
    </section>
  </div>`;
}

function mountEkonomi() {
  drawBarChart(document.getElementById('gdp-chart'), SERIES.gdpNominal, { formatValue: (v) => fmtInt(v) });
  drawBarChart(document.getElementById('growth-chart'), SERIES.gdpGrowth, { formatValue: (v) => `${fmt(v)}%`, color: '#0f766e' });
  drawDonut(document.getElementById('sector-donut'), SECTORS, { centerValue: '18,7%', centerLabel: 'industri' });
  drawGroupedBars(document.getElementById('trade-chart'), SERIES.exports, SERIES.imports, { formatValue: (v) => fmtInt(v) });
}

// ---------- Tenaga kerja ----------

function renderTenagaKerja() {
  return `
  <p class="breadcrumb"><a href="#/">Beranda</a> / Tenaga Kerja</p>
  <div class="page-head"><h1>Tenaga Kerja</h1>
  <p class="lede">Dari 153 juta penduduk angkatan kerja, hampir 146 juta orang bekerja.
  Pengangguran terbuka turun ke titik terendah dalam satu dekade.</p></div>
  <div class="kpi-grid">
    ${kpiCard(SERIES.unemployment, (v) => `${fmt(v)}%`)}
    <article class="kpi"><p class="kpi-label">Angkatan kerja</p>
      <p class="kpi-value">153,05 jt</p><p class="kpi-detail">Februari 2025</p>
      <p class="kpi-source">Sumber: ${SOURCES.bpsBrs}</p></article>
    <article class="kpi"><p class="kpi-label">Tingkat partisipasi angkatan kerja</p>
      <p class="kpi-value">70,71%</p><p class="kpi-detail">Februari 2025</p>
      <p class="kpi-source">Sumber: ${SOURCES.bpsBrs}</p></article>
  </div>
  <div class="section">
    ${chartCard('tpt-chart', 'Tingkat pengangguran terbuka (Agustus), 2020–2024', SERIES.unemployment.source, SERIES.unemployment.note)}
    <div class="grid-2">
      <section class="card">
        <h3>Di mana orang bekerja</h3>
        <p class="source-note">Sumber: ${SOURCES.bpsBrs}, Februari 2025 · persen dari penduduk bekerja</p>
        <ul class="fact-list">
          <li><span>Jasa-jasa</span><span class="fact-value">49,19%</span></li>
          <li><span>Pertanian</span><span class="fact-value">28,54%</span></li>
          <li><span>Industri (pengolahan, konstruksi, pertambangan)</span><span class="fact-value">22,27%</span></li>
          <li><span>Pekerja informal</span><span class="fact-value">59,40%</span></li>
        </ul>
      </section>
      <section class="card">
        <h3>Pengangguran menurut kelompok</h3>
        <p class="source-note">Sumber: ${SOURCES.bpsBrs}, Februari 2025</p>
        <ul class="fact-list">
          <li><span>Pengangguran laki-laki<span class="fact-source">dari angkatan kerja laki-laki</span></span><span class="fact-value">4,79%</span></li>
          <li><span>Pengangguran perempuan<span class="fact-source">dari angkatan kerja perempuan</span></span><span class="fact-value">4,73%</span></li>
          <li><span>Pengangguran perkotaan<span class="fact-source">dari angkatan kerja perkotaan</span></span><span class="fact-value">5,73%</span></li>
          <li><span>Pengangguran perdesaan<span class="fact-source">dari angkatan kerja perdesaan</span></span><span class="fact-value">3,46%</span></li>
        </ul>
      </section>
    </div>
    <div class="callout"><p><strong>Catatan:</strong> tingkat pengangguran terbuka mengukur penduduk angkatan kerja
    yang tidak bekerja dan sedang mencari pekerjaan. Pekerja yang bekerja kurang dari 35 jam seminggu dan masih
    mencari pekerjaan tambahan tercatat sebagai setengah penganggur — 7,28 juta orang pada Februari 2025.</p></div>
  </div>`;
}

function mountTenagaKerja() {
  drawLineChart(document.getElementById('tpt-chart'), SERIES.unemployment, { formatValue: (v) => `${fmt(v)}%` });
}

// ---------- Pendidikan ----------

function renderPendidikan() {
  return `
  <p class="breadcrumb"><a href="#/">Beranda</a> / Pendidikan</p>
  <div class="page-head"><h1>Pendidikan</h1>
  <p class="lede">Rata-rata lama sekolah terus naik dan kini melewati 9 tahun — setara tamat SMP.
  Tantangan berikutnya adalah mutu dan pemerataan hingga jenjang menengah.</p></div>
  <div class="kpi-grid">
    ${kpiCard(SERIES.schooling, (v) => `${fmt(v)} thn`)}
    <article class="kpi"><p class="kpi-label">Angka melek huruf usia 15+</p>
      <p class="kpi-value">96,36%</p><p class="kpi-detail">2023</p>
      <p class="kpi-source">Sumber: ${SOURCES.bpsSusenas}</p></article>
    <article class="kpi"><p class="kpi-label">Harapan lama sekolah</p>
      <p class="kpi-value">13,37 thn</p><p class="kpi-detail">2024</p>
      <p class="kpi-source">Sumber: ${SOURCES.bps}</p></article>
  </div>
  <div class="section">
    ${chartCard('school-chart', 'Rata-rata lama sekolah, 2020–2024', SERIES.schooling.source, '')}
    <div class="grid-2">
      <section class="card">
        <h3>Partisipasi sekolah</h3>
        <p class="source-note">Sumber: ${SOURCES.bpsSusenas}, 2023 · angka partisipasi murni</p>
        <ul class="fact-list">
          <li><span>SD / sederajat (7–12 tahun)</span><span class="fact-value">99,06%</span></li>
          <li><span>SMP / sederajat (13–15 tahun)</span><span class="fact-value">95,71%</span></li>
          <li><span>SMA / sederajat (16–18 tahun)</span><span class="fact-value">73,71%</span></li>
          <li><span>Perguruan tinggi (19–23 tahun)</span><span class="fact-value">23,38%</span></li>
        </ul>
      </section>
      <section class="card">
        <h3>Belanja negara untuk pendidikan</h3>
        <p class="source-note">Sumber: Kementerian Keuangan, APBN 2024</p>
        <ul class="fact-list">
          <li><span>Anggaran pendidikan<span class="fact-source">APBN 2024</span></span><span class="fact-value">Rp 665,0 triliun</span></li>
          <li><span>Pangsa terhadap APBN<span class="fact-source">amanat UUD 1945: 20%</span></span><span class="fact-value">20,0%</span></li>
          <li><span>Guru dan tenaga kependidikan<span class="fact-source">2023/2024</span></span><span class="fact-value">3,4 juta orang</span></li>
          <li><span>Sekolah (SD–SMA)<span class="fact-source">2023/2024</span></span><span class="fact-value">216 ribu unit</span></li>
        </ul>
      </section>
    </div>
  </div>`;
}

function mountPendidikan() {
  drawLineChart(document.getElementById('school-chart'), SERIES.schooling, { formatValue: (v) => `${fmt(v)} thn`, min: 8, max: 9.5 });
}

// ---------- Kesehatan ----------

function renderKesehatan() {
  return `
  <p class="breadcrumb"><a href="#/">Beranda</a> / Kesehatan</p>
  <div class="page-head"><h1>Kesehatan</h1>
  <p class="lede">Orang Indonesia hidup lebih lama dari sebelumnya — harapan hidup mencapai 74,15 tahun.
  Pekerjaan rumah terbesar adalah stunting, yang masih menimpa satu dari lima balita.</p></div>
  <div class="kpi-grid">
    ${kpiCard(SERIES.lifeExpectancy, (v) => `${fmt(v)} thn`)}
    ${kpiCard(SERIES.stunting, (v) => `${fmt(v)}%`)}
    <article class="kpi"><p class="kpi-label">Angka kematian bayi</p>
      <p class="kpi-value">16,9</p><p class="kpi-detail">per 1.000 kelahiran hidup, 2023</p>
      <p class="kpi-source">Sumber: ${SOURCES.bps}</p></article>
  </div>
  <div class="section">
    <div class="grid-2">
      ${chartCard('ahh-chart', 'Angka harapan hidup, 2020–2024', SERIES.lifeExpectancy.source, SERIES.lifeExpectancy.note)}
      ${chartCard('stunting-chart', 'Prevalensi stunting balita, 2021–2024', SERIES.stunting.source, SERIES.stunting.note)}
    </div>
    <div class="grid-2">
      <section class="card">
        <h3>Layanan kesehatan</h3>
        <p class="source-note">Sumber: ${SOURCES.bps}, 2023–2024</p>
        <ul class="fact-list">
          <li><span>Rumah sakit<span class="fact-source">2023</span></span><span class="fact-value">3.168 unit</span></li>
          <li><span>Puskesmas<span class="fact-source">2023</span></span><span class="fact-value">10.374 unit</span></li>
          <li><span>Dokter<span class="fact-source">2023</span></span><span class="fact-value">~155 ribu orang</span></li>
          <li><span>Peserta JKN<span class="fact-source">BPJS Kesehatan, 2024</span></span><span class="fact-value">277,5 juta jiwa</span></li>
        </ul>
      </section>
      <section class="card">
        <h3>Belanja kesehatan</h3>
        <p class="source-note">Sumber: Kementerian Keuangan, APBN 2024</p>
        <ul class="fact-list">
          <li><span>Anggaran kesehatan<span class="fact-source">APBN 2024</span></span><span class="fact-value">Rp 187,5 triliun</span></li>
          <li><span>Pangsa terhadap APBN</span><span class="fact-value">5,6%</span></li>
          <li><span>Belanja kesehatan per kapita<span class="fact-source">2024</span></span><span class="fact-value">± Rp 666 ribu</span></li>
        </ul>
        <div class="callout"><p>Stunting turun dari 24,4% (2021) menjadi 19,8% (2024), tetapi masih di atas
        target nasional 14% pada 2024.</p></div>
      </section>
    </div>
  </div>`;
}

function mountKesehatan() {
  drawLineChart(document.getElementById('ahh-chart'), SERIES.lifeExpectancy, { formatValue: (v) => `${fmt(v)} thn`, min: 70, max: 75 });
  drawBarChart(document.getElementById('stunting-chart'), SERIES.stunting, { formatValue: (v) => `${fmt(v)}%`, color: '#be123c' });
}

// ---------- Kemiskinan ----------

function renderKemiskinan() {
  const rows = SERIES.poverty.years.map((y, i) => {
    const poor = [26.42, 27.54, 26.16, 25.9, 25.22, 23.85][i];
    return `<tr><td>${y}</td><td class="num">${fmt(SERIES.poverty.values[i])}%</td><td class="num">${fmt(poor)} juta</td></tr>`;
  }).join('');
  return `
  <p class="breadcrumb"><a href="#/">Beranda</a> / Kemiskinan</p>
  <div class="page-head"><h1>Kemiskinan</h1>
  <p class="lede">Tingkat kemiskinan turun ke 8,47% pada Maret 2025 — terendah sepanjang sejarah pencatatan.
  Sekitar 23,85 juta penduduk masih hidup di bawah garis kemiskinan.</p></div>
  <div class="kpi-grid">
    ${kpiCard(SERIES.poverty, (v) => `${fmt(v)}%`)}
    <article class="kpi"><p class="kpi-label">Penduduk miskin</p>
      <p class="kpi-value">23,85 jt</p><p class="kpi-detail">Maret 2025</p>
      <p class="kpi-source">Sumber: ${SOURCES.bpsBrs}</p></article>
    <article class="kpi"><p class="kpi-label">Garis kemiskinan</p>
      <p class="kpi-value">Rp 609.160</p><p class="kpi-detail">per kapita per bulan, Mar 2025</p>
      <p class="kpi-source">Sumber: ${SOURCES.bpsBrs}</p></article>
  </div>
  <div class="section">
    ${chartCard('poverty-chart', 'Tingkat kemiskinan (Maret), 2020–2025', SERIES.poverty.source, SERIES.poverty.note)}
    <div class="grid-2">
      <section class="card">
        <h3>Tingkat kemiskinan menurut tahun</h3>
        <p class="source-note">Sumber: ${SOURCES.bpsBrs}. Jumlah penduduk miskin dihitung dari tingkat dan jumlah penduduk.</p>
        <div class="table-scroll">
        <table>
          <caption>Kemiskinan Maret 2020–2025</caption>
          <thead><tr><th>Tahun</th><th class="num">Tingkat</th><th class="num">Jumlah penduduk miskin</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        </div>
      </section>
      <section class="card">
        <h3>Kota dan desa</h3>
        <p class="source-note">Sumber: ${SOURCES.bpsBrs}, Maret 2025</p>
        <ul class="fact-list">
          <li><span>Kemiskinan perkotaan</span><span class="fact-value">7,03%</span></li>
          <li><span>Kemiskinan perdesaan</span><span class="fact-value">11,03%</span></li>
          <li><span>Kedalaman kemiskinan (P1)<span class="fact-source">indeks, Mar 2025</span></span><span class="fact-value">1,30</span></li>
          <li><span>Keparahan kemiskinan (P2)<span class="fact-source">indeks, Mar 2025</span></span><span class="fact-value">0,30</span></li>
        </ul>
        <div class="callout"><p>Kemiskinan sempat naik pada 2020–2021 karena pandemi, lalu turun
        enam kali pengukuran berturut-turut hingga Maret 2025.</p></div>
      </section>
    </div>
  </div>`;
}

function mountKemiskinan() {
  drawLineChart(document.getElementById('poverty-chart'), SERIES.poverty, { formatValue: (v) => `${fmt(v)}%`, min: 8, max: 11 });
}

// ---------- Semua indikator ----------

const INDICATOR_ROWS = [
  ...Object.entries(SERIES).map(([key, s]) => ({
    name: s.label, category: 'Deret tahunan', key,
    year: last(s).year, value: fmt(last(s).value), unit: s.unit, source: s.source,
  })),
  ...KEY_FACTS.map((f) => ({
    name: f.label, category: 'Angka kunci', key: '',
    year: f.detail, value: f.value, unit: '', source: f.source,
  })),
];

function renderIndikator() {
  const rows = INDICATOR_ROWS.map((r) => `
    <tr data-name="${r.name.toLowerCase()} ${r.source.toLowerCase()}">
      <td>${r.name}</td><td>${r.category}</td><td class="num">${r.value}</td>
      <td>${r.unit}</td><td>${r.year}</td><td>${r.source}</td>
    </tr>`).join('');
  return `
  <p class="breadcrumb"><a href="#/">Beranda</a> / Semua Indikator</p>
  <div class="page-head"><h1>Semua Indikator</h1>
  <p class="lede">Seluruh angka yang ditampilkan situs ini dalam satu tabel. Ketik untuk mencari —
  misalnya “kemiskinan”, “ekspor”, atau “BPS” — atau saring menurut jenisnya.</p></div>
  <section class="card">
    <div class="search-row">
      <label for="indicator-search">Cari indikator</label>
      <input type="search" id="indicator-search" placeholder="Contoh: penduduk, PDB, stunting…" autocomplete="off">
      <label for="indicator-category">Jenis</label>
      <select id="indicator-category">
        <option value="">Semua jenis</option>
        <option value="Deret tahunan">Deret tahunan</option>
        <option value="Angka kunci">Angka kunci</option>
      </select>
    </div>
    <div class="table-scroll">
    <table id="indicator-table">
      <caption>Daftar indikator NusaData</caption>
      <thead><tr><th>Indikator</th><th>Jenis</th><th class="num">Nilai terakhir</th><th>Satuan</th><th>Tahun</th><th>Sumber</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    </div>
    <p class="count-line" id="indicator-count"></p>
    <div class="empty-note" id="indicator-empty" hidden>Tidak ada indikator yang cocok. Coba kata kunci lain.</div>
  </section>`;
}

function mountIndikator() {
  const search = document.getElementById('indicator-search');
  const category = document.getElementById('indicator-category');
  const rows = [...document.querySelectorAll('#indicator-table tbody tr')];
  const count = document.getElementById('indicator-count');
  const empty = document.getElementById('indicator-empty');
  const apply = () => {
    const q = search.value.trim().toLowerCase();
    const cat = category.value;
    let shown = 0;
    rows.forEach((row) => {
      const hitQ = !q || row.dataset.name.includes(q);
      const hitC = !cat || row.cells[1].textContent === cat;
      const show = hitQ && hitC;
      row.hidden = !show;
      if (show) shown += 1;
    });
    count.textContent = `Menampilkan ${shown} dari ${rows.length} indikator.`;
    empty.hidden = shown !== 0;
  };
  search.addEventListener('input', apply);
  category.addEventListener('change', apply);
  apply();
}

// ---------- Tentang ----------

function renderTentang() {
  return `
  <p class="breadcrumb"><a href="#/">Beranda</a> / Tentang</p>
  <div class="page-head"><h1>Tentang NusaData</h1>
  <p class="lede">NusaData adalah situs statistik independen tentang Indonesia. Situs ini menyusun ulang
  angka-angka resmi menjadi bacaan yang mudah dijelajahi — bukan salinan situs lembaga mana pun.</p></div>
  <section class="card">
    <h2>Metodologi</h2>
    <p>Angka di situs ini diambil dari publikasi resmi dan disajikan apa adanya, dengan tahun dan sumber
    yang dicantumkan di setiap grafik dan tabel. Nilai persentase dihitung dari angka publikasi; bila situs
    ini menghitung sendiri (misalnya pangsa provinsi terhadap total penduduk), cara hitungnya dijelaskan
    di bawah tabel yang bersangkutan.</p>
    <p>Deret tahunan memakai tahun yang dipakai sumbernya: penduduk memakai pertengahan tahun, kemiskinan
    memakai Maret, pengangguran memakai Agustus, dan inflasi memakai Desember (year-on-year). Bila sumber
    merevisi angka — seperti pembaruan tabel kematian pada harapan hidup 2023 — catatan itu dituliskan.</p>
  </section>
  <section class="card">
    <h2>Sumber data</h2>
    <ul class="fact-list">
      <li><span>Badan Pusat Statistik (BPS)<span class="fact-source">Statistik Indonesia, Berita Resmi Statistik, Susenas</span></span><span class="fact-value">Penduduk, PDB, tenaga kerja, kemiskinan, pendidikan, kesehatan</span></li>
      <li><span>Kementerian Kesehatan<span class="fact-source">Survei Status Gizi Indonesia</span></span><span class="fact-value">Stunting balita</span></li>
      <li><span>APJII<span class="fact-source">Survei Penetrasi Internet Indonesia 2024</span></span><span class="fact-value">Pengguna internet</span></li>
      <li><span>Kementerian Keuangan<span class="fact-source">APBN 2024</span></span><span class="fact-value">Anggaran pendidikan dan kesehatan</span></li>
      <li><span>BPJS Kesehatan<span class="fact-source">Laporan 2024</span></span><span class="fact-value">Peserta JKN</span></li>
    </ul>
  </section>
  <section class="card">
    <h2>Cara mengutip</h2>
    <p>Contoh kutipan: “Jumlah penduduk Indonesia pertengahan 2024 adalah 281,6 juta jiwa
    (BPS, Statistik Indonesia).” Setiap halaman mencantumkan sumber di bawah judul grafik atau tabelnya.</p>
    <p>Situs ini bekerja sepenuhnya tanpa jaringan: seluruh data tersimpan di dalam berkas situs.
    Pembaruan data dilakukan dengan memperbarui berkas data situs, dan tanggal pembaruan tercantum di kaki halaman.</p>
  </section>`;
}

// ---------- Rute ----------

export const ROUTES = {
  '': { render: renderHome, mount: mountHome },
  'penduduk': { render: renderPenduduk, mount: mountPenduduk },
  'ekonomi': { render: renderEkonomi, mount: mountEkonomi },
  'tenaga-kerja': { render: renderTenagaKerja, mount: mountTenagaKerja },
  'pendidikan': { render: renderPendidikan, mount: mountPendidikan },
  'kesehatan': { render: renderKesehatan, mount: mountKesehatan },
  'kemiskinan': { render: renderKemiskinan, mount: mountKemiskinan },
  'indikator': { render: renderIndikator, mount: mountIndikator },
  'tentang': { render: renderTentang, mount: null },
};
