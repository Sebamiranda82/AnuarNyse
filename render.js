// ANUAR NYSE — shared render logic

const BANKS = [
  { name: "Pichincha",     color: "#FFC72C" },
  { name: "Guayaquil",     color: "#E6007E" },
  { name: "Internacional", color: "#FFC72C" },
  { name: "Pacífico",      color: "#1565C0" },
  { name: "Bolivariano",   color: "#2FB6A6" },
];

const MESES_ES = ["enero","febrero","marzo","abril","mayo","junio","julio",
  "agosto","septiembre","octubre","noviembre","diciembre"];

function todayLabel(){
  const d = new Date();
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', timeZone: 'America/Argentina/Buenos_Aires' }).format(d);
}

function formatARS(raw){
  const digits = String(raw || '').replace(/[^\d]/g,'');
  if(!digits) return '$0';
  return '$' + digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function bankIcon(x, y, color){
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

function bankChip(x, y, bank){
  return `
    <g transform="translate(${x},${y})">
      ${bankIcon(0,0,bank.color)}
      <text x="18" y="6" text-anchor="start" font-family="Poppins" font-weight="400" font-size="24" fill="#F5F1E8">${bank.name}</text>
    </g>`;
}

const ROW1_X = [-317, -77, 133];
const ROW2_X = [-195, 35];

function rateBlock(compraStr, ventaStr){
  return `
    <text x="-170" y="-52" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="17" letter-spacing="5" fill="#C9A227">COMPRA</text>
    <text x="-170" y="6" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="64" fill="url(#goldFoil)">${compraStr}</text>
    <line x1="0" y1="-52" x2="0" y2="16" stroke="#6b5f45" stroke-width="1.5"/>
    <text x="170" y="-52" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="17" letter-spacing="5" fill="#C9A227">VENTA</text>
    <text x="170" y="6" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="64" fill="url(#goldFoil)">${ventaStr}</text>`;
}

function buildSVG({ rate, percent, noComision }){
  const pct = (percent === undefined || percent === null || percent === '') ? 3 : parseFloat(percent);
  const compraStr = formatARS(rate);
  const ventaNum = Math.round(parseInt(String(rate||'0').replace(/[^\d]/g,''),10) * (1 + pct/100));
  const ventaStr = formatARS(ventaNum);
  const dateStr = todayLabel();

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

  <text x="540" y="200" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="66" letter-spacing="8" fill="url(#goldFoil)">ANUAR</text>
  <line x1="140" y1="240" x2="940" y2="240" stroke="url(#goldLine)" stroke-width="1"/>

  <text x="540" y="264" text-anchor="middle" font-family="Lora" font-style="italic" font-weight="500" font-size="27" letter-spacing="2" fill="#C9A227">Cotización · ${dateStr}</text>

  <text x="540" y="352" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="25" letter-spacing="4" fill="#F5F1E8">DÓLAR ECUADOR</text>
  <g transform="translate(540,432)">
    ${rateBlock(compraStr, ventaStr)}
  </g>

  <text x="540" y="522" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="27" fill="#F5F1E8">Transferimos a cuentas Argentina DOLARES</text>
  <text x="540" y="560" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="27" fill="#F5F1E8">y recibimos en Ecuador DOLARES.</text>
  <text x="540" y="604" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" letter-spacing="4" fill="url(#goldFoil)">1 = 1</text>

  ${noComision ? `<text x="540" y="644" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="24" letter-spacing="9" fill="#E8C468">SIN COMISIONES</text>` : ``}

  <g transform="translate(540,682)" stroke="#E8C468" stroke-width="1.5" fill="none" opacity="0.85">
    <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)"/>
    <line x1="-140" y1="0" x2="-24" y2="0"/>
    <line x1="24" y1="0" x2="140" y2="0"/>
  </g>

  <text x="540" y="742" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="28" fill="#F5F1E8">En Argentina trabajamos con todos los</text>
  <text x="540" y="780" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="28" fill="#F5F1E8">bancos y Billeteras Virtuales</text>

  <text x="540" y="832" text-anchor="middle" font-family="Lora" font-style="italic" font-weight="500" font-size="23" letter-spacing="2" fill="#C9A227">Recibimos en Ecuador en los bancos</text>

  <g transform="translate(540,884)">
    ${ROW1_X.map((x,i)=>bankChip(x,0,BANKS[i])).join('')}
  </g>
  <g transform="translate(540,934)">
    ${ROW2_X.map((x,i)=>bankChip(x,0,BANKS[i+3])).join('')}
  </g>


</svg>`;
}
