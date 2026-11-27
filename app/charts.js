// Grafik kanvas untuk NusaData: garis, batang, dan donat, digambar dari data
// yang disematkan di data.js. Tidak ada pustaka grafik luar; semua digambar
// dengan Canvas 2D dan dilengkapi tooltip saat kursor menyentuh titik data.

const INK = '#17332f';
const MUTED = '#6b7a76';
const GRID = '#e3e0d6';
const TEAL = '#0f766e';
const AMBER = '#d97706';
const RUST = '#b45309';
const SAGE = '#65a30d';
const SKY = '#0369a1';
const ROSE = '#be123c';
const VIOLET = '#6d28d9';
const SLATE = '#475569';
const GOLD = '#ca8a04';

export const PALETTE = [TEAL, AMBER, SAGE, SKY, ROSE, VIOLET, RUST, SLATE, GOLD, '#0e7490'];

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function niceMax(max) {
  if (max <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

function niceMin(min) {
  if (min >= 0) return 0;
  const pow = Math.pow(10, Math.floor(Math.log10(Math.abs(min))));
  const n = Math.abs(min) / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return -step * pow;
}

function axes(ctx, box, labels, min, max, formatValue) {
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  const ticks = 4;
  for (let i = 0; i <= ticks; i++) {
    const v = min + ((max - min) * i) / ticks;
    const y = box.bottom - ((v - min) / (max - min)) * box.height;
    ctx.beginPath();
    ctx.moveTo(box.left, y);
    ctx.lineTo(box.right, y);
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatValue(v), box.left - 8, y);
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  labels.forEach((label, i) => {
    const x = box.left + (box.width * (labels.length === 1 ? 0.5 : i / (labels.length - 1)));
    ctx.fillText(String(label), x, box.bottom + 8);
  });
}

function showTooltip(canvas, text, x, y) {
  let tip = canvas.parentElement.querySelector('.chart-tip');
  if (!tip) {
    tip = document.createElement('div');
    tip.className = 'chart-tip';
    canvas.parentElement.appendChild(tip);
  }
  tip.textContent = text;
  tip.hidden = false;
  const rect = canvas.parentElement.getBoundingClientRect();
  const cx = Math.min(Math.max(x + 12, 8), rect.width - 150);
  const cy = Math.max(y - 14, 8);
  tip.style.left = cx + 'px';
  tip.style.top = cy + 'px';
}

function hideTooltip(canvas) {
  const tip = canvas.parentElement.querySelector('.chart-tip');
  if (tip) tip.hidden = true;
}

// Grafik garis dengan titik data dan tooltip.
export function drawLineChart(canvas, series, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const formatValue = options.formatValue || ((v) => String(Math.round(v)));
  const color = options.color || TEAL;
  const values = series.values;
  const labels = series.years;
  const min = options.min !== undefined ? options.min : niceMin(Math.min(...values));
  const max = options.max !== undefined ? options.max : niceMax(Math.max(...values));
  const box = { left: 56, right: width - 14, top: 14, bottom: height - 30 };
  box.width = box.right - box.left;
  box.height = box.bottom - box.top;
  ctx.clearRect(0, 0, width, height);
  axes(ctx, box, labels, min, max, formatValue);
  const points = values.map((v, i) => ({
    x: box.left + (box.width * (labels.length === 1 ? 0.5 : i / (labels.length - 1))),
    y: box.bottom - ((v - min) / (max - min)) * box.height,
    v,
    year: labels[i],
  }));
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.stroke();
  ctx.fillStyle = color;
  points.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = color;
  });
  canvas.onmousemove = (event) => {
    const rect = canvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    let best = null;
    let bestDist = Infinity;
    points.forEach((p) => {
      const d = Math.hypot(p.x - mx, p.y - my);
      if (d < bestDist) { bestDist = d; best = p; }
    });
    if (best && bestDist < 60) {
      showTooltip(canvas, `${best.year}: ${formatValue(best.v)} ${series.unit}`, best.x, best.y);
      canvas.style.cursor = 'pointer';
    } else {
      hideTooltip(canvas);
      canvas.style.cursor = 'default';
    }
  };
  canvas.onmouseleave = () => hideTooltip(canvas);
}

// Grafik batang dengan tooltip.
export function drawBarChart(canvas, series, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const formatValue = options.formatValue || ((v) => String(Math.round(v)));
  const values = series.values;
  const labels = series.years;
  const min = options.min !== undefined ? options.min : niceMin(Math.min(...values));
  const max = options.max !== undefined ? options.max : niceMax(Math.max(...values));
  const box = { left: 56, right: width - 14, top: 14, bottom: height - 30 };
  box.width = box.right - box.left;
  box.height = box.bottom - box.top;
  ctx.clearRect(0, 0, width, height);
  axes(ctx, box, labels, min, max, formatValue);
  const slot = box.width / labels.length;
  const barWidth = Math.min(46, slot * 0.62);
  const zeroY = box.bottom - ((0 - min) / (max - min)) * box.height;
  const bars = values.map((v, i) => {
    const x = box.left + slot * i + (slot - barWidth) / 2;
    const y = box.bottom - ((v - min) / (max - min)) * box.height;
    return { x, y, w: barWidth, h: zeroY - y, v, year: labels[i] };
  });
  bars.forEach((b) => {
    ctx.fillStyle = b.v < 0 ? ROSE : (options.color || TEAL);
    ctx.beginPath();
    ctx.roundRect(b.x, Math.min(b.y, zeroY), b.w, Math.abs(b.h) || 1, [3, 3, 0, 0]);
    ctx.fill();
  });
  if (min < 0) {
    ctx.strokeStyle = MUTED;
    ctx.beginPath();
    ctx.moveTo(box.left, zeroY);
    ctx.lineTo(box.right, zeroY);
    ctx.stroke();
  }
  canvas.onmousemove = (event) => {
    const rect = canvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    const hit = bars.find((b) => mx >= b.x && mx <= b.x + b.w && my >= Math.min(b.y, zeroY) - 4 && my <= Math.max(b.y, zeroY) + 4);
    if (hit) {
      showTooltip(canvas, `${hit.year}: ${formatValue(hit.v)} ${series.unit}`, hit.x, hit.y);
      canvas.style.cursor = 'pointer';
    } else {
      hideTooltip(canvas);
      canvas.style.cursor = 'default';
    }
  };
  canvas.onmouseleave = () => hideTooltip(canvas);
}

// Grafik batang ganda (dua deret berdampingan) dengan tooltip.
export function drawGroupedBars(canvas, a, b, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const formatValue = options.formatValue || ((v) => String(Math.round(v)));
  const labels = a.years;
  const all = [...a.values, ...b.values];
  const max = niceMax(Math.max(...all));
  const box = { left: 56, right: width - 14, top: 14, bottom: height - 30 };
  box.width = box.right - box.left;
  box.height = box.bottom - box.top;
  ctx.clearRect(0, 0, width, height);
  axes(ctx, box, labels, 0, max, formatValue);
  const slot = box.width / labels.length;
  const barWidth = Math.min(26, slot * 0.3);
  const bars = [];
  labels.forEach((year, i) => {
    const baseX = box.left + slot * i + slot / 2;
    [[a, TEAL], [b, AMBER]].forEach(([s, color], k) => {
      const v = s.values[i];
      const h = (v / max) * box.height;
      const x = baseX + (k === 0 ? -barWidth - 2 : 2);
      const y = box.bottom - h;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, h, [3, 3, 0, 0]);
      ctx.fill();
      bars.push({ x, y, w: barWidth, h, v, year, name: s.label });
    });
  });
  canvas.onmousemove = (event) => {
    const rect = canvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    const hit = bars.find((bar) => mx >= bar.x && mx <= bar.x + bar.w && my >= bar.y - 4 && my <= bar.y + bar.h + 4);
    if (hit) {
      showTooltip(canvas, `${hit.year} — ${hit.name}: ${formatValue(hit.v)} ${a.unit}`, hit.x, hit.y);
      canvas.style.cursor = 'pointer';
    } else {
      hideTooltip(canvas);
      canvas.style.cursor = 'default';
    }
  };
  canvas.onmouseleave = () => hideTooltip(canvas);
}

// Grafik donat dengan legenda HTML di sampingnya.
export function drawDonut(canvas, parts, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 12;
  const inner = radius * 0.62;
  ctx.clearRect(0, 0, width, height);
  let angle = -Math.PI / 2;
  parts.forEach((part, i) => {
    const sweep = (part.value / total) * Math.PI * 2;
    ctx.fillStyle = PALETTE[i % PALETTE.length];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + sweep);
    ctx.closePath();
    ctx.fill();
    angle += sweep;
  });
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = '700 20px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(options.centerValue || '', cx, cy - 10);
  ctx.fillStyle = MUTED;
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillText(options.centerLabel || '', cx, cy + 12);
}

export function donutLegend(parts) {
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  return parts.map((part, i) => {
    const pct = ((part.value / total) * 100).toFixed(1).replace('.', ',');
    return `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>` +
      `<span class="legend-label">${part.label}</span>` +
      `<span class="legend-value">${part.value.toLocaleString('id-ID')} %</span>` +
      `<span class="legend-pct">${pct}%</span></li>`;
  }).join('');
}
