// ANUAR NYSE — promo render logic

const ALL_BANKS = {
  pichincha:     { name: "Pichincha",     color: "#FFC72C" },
  guayaquil:     { name: "Guayaquil",     color: "#E6007E" },
  internacional: { name: "Internacional", color: "#FFC72C" },
  pacifico:      { name: "Pacífico",      color: "#1565C0" },
  bolivariano:   { name: "Bolivariano",   color: "#2FB6A6" },
};

const MESES_ES_PROMO = ["enero","febrero","marzo","abril","mayo","junio","julio",
  "agosto","septiembre","octubre","noviembre","diciembre"];

function formatARSPromo(raw){
  const digits = String(raw || '').replace(/[^\d]/g,'');
  if(!digits) return '$0';
  return '$' + digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function promoBankIcon(x, y, color){
  return `
    <g transform="translate(${x},${y})" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-9,-8 L0,-13 L9,-8 Z" fill="${color}" stroke="none"/>
      <line x1="-9" y1="-8" x2="-9" y2="6"/>
      <line x1="-4.3" y1="-8" x2="-4.3" y2="6"/>
      <line x1="4.3" y1="-8" x2="4.3" y2="6"/>
      <line x1="9" y1="-8" x2="9" y2="6"/>
      <line x1="-11" y1="6" x2="11" y2="6"/>
      <line x1="-11" y1="9" x2="11" y2="9"/>
    </g>`;
}

function promoBankChip(x, y, bank){
  return `
    <g transform="translate(${x},${y})">
      ${promoBankIcon(0,0,bank.color)}
      <text x="18" y="6" text-anchor="start" font-family="Poppins" font-weight="400" font-size="34" fill="#F5F1E8">${bank.name}</text>
    </g>`;
}

// Dynamically measure each bank name so the row can be centered evenly,
// regardless of which banks/how many are selected.
function measureTextWidthPromo(text, font){
  if (typeof document === 'undefined') return text.length * 17.5; // fallback for non-browser testing
  const canvas = measureTextWidthPromo._c || (measureTextWidthPromo._c = document.createElement('canvas'));
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  return ctx.measureText(text).width;
}

function layoutPromoBankRow(banks){
  const gap = 46;      // space between chips
  const iconLeft = 11; // icon extends ~11px left of its center
  const textStart = 18; // text starts 18px right of icon center
  const widths = banks.map(b => iconLeft + textStart + measureTextWidthPromo(b.name, '400 34px Poppins'));
  const total = widths.reduce((a,w) => a + w, 0) + gap * Math.max(0, banks.length - 1);
  let cursor = -total / 2;
  const positions = [];
  widths.forEach(w => {
    positions.push(cursor + iconLeft);
    cursor += w + gap;
  });
  return positions;
}

function buildPromoSVG({ promoRate, promoBanks }){
  const rateStr = formatARSPromo(promoRate);
  const bankKeys = (promoBanks && promoBanks.length) ? promoBanks : ['internacional','bolivariano','pacifico'];
  const banks = bankKeys.map(k => ALL_BANKS[k]).filter(Boolean);
  const positions = layoutPromoBankRow(banks);
  const bankRow = banks.map((b,i) => promoBankChip(positions[i], 0, b)).join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="38%" r="75%">
      <stop offset="0%" stop-color="#141210"/>
      <stop offset="55%" stop-color="#0a0908"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3D98B"/>
      <stop offset="30%" stop-color="#C9A227"/>
      <stop offset="55%" stop-color="#F6E3A1"/>
      <stop offset="80%" stop-color="#B8901E"/>
      <stop offset="100%" stop-color="#E8C468"/>
    </linearGradient>
    <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8a6c1a" stop-opacity="0"/>
      <stop offset="50%" stop-color="#E8C468"/>
      <stop offset="100%" stop-color="#8a6c1a" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="1080" fill="url(#bgGlow)"/>
  <rect x="66" y="66" width="948" height="948" fill="none" stroke="#B8901E" stroke-width="1.5" opacity="0.55"/>
  <rect x="78" y="78" width="924" height="924" fill="none" stroke="#E8C468" stroke-width="1" opacity="0.35"/>
  <g stroke="#E8C468" stroke-width="2" opacity="0.8">
    <path d="M66 110 L66 66 L110 66"/>
    <path d="M970 66 L1014 66 L1014 110"/>
    <path d="M1014 970 L1014 1014 L970 1014"/>
    <path d="M110 1014 L66 1014 L66 970"/>
  </g>

  <text x="540" y="185" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="58" letter-spacing="7" fill="url(#goldFoil)">ANUAR</text>
  <line x1="140" y1="220" x2="940" y2="220" stroke="url(#goldLine)" stroke-width="1"/>

  <g transform="translate(540,290)">
    <line x1="-230" y1="0" x2="-140" y2="0" stroke="url(#goldLine)" stroke-width="1.5"/>
    <text x="0" y="8" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="32" letter-spacing="3" fill="url(#goldFoil)">CAMBIO PROMOCIONAL DEL DÍA</text>
    <line x1="140" y1="0" x2="230" y2="0" stroke="url(#goldLine)" stroke-width="1.5"/>
  </g>

  <g transform="translate(540,320)" stroke="#E8C468" stroke-width="1.4" fill="none" opacity="0.85">
    <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)"/>
  </g>

  <g transform="translate(540,540)">
    <rect x="-380" y="-160" width="760" height="320" rx="24" fill="none" stroke="url(#goldFoil)" stroke-width="2" opacity="0.5"/>
    <text x="0" y="0" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="150" fill="url(#goldFoil)">${rateStr}</text>
    <text x="0" y="105" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="42" letter-spacing="4" fill="#F5F1E8">= 1 USD ECUADOR</text>
  </g>

  <text x="540" y="792" text-anchor="middle" font-family="Lora" font-style="italic" font-weight="500" font-size="35" letter-spacing="2" fill="#C9A227">Solo para Bancos</text>

  <g transform="translate(540,860)">
    ${bankRow}
  </g>
</svg>`;
}
