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
  return `${d.getDate()} de ${MESES_ES[d.getMonth()]}`;
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
    <text x="-170" y="-38" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="4" fill="#C9A227">COMPRA</text>
    <text x="-170" y="4" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="50" fill="url(#goldFoil)">${compraStr}</text>
    <line x1="0" y1="-48" x2="0" y2="12" stroke="#6b5f45" stroke-width="1.5"/>
    <text x="170" y="-38" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="4" fill="#C9A227">VENTA</text>
    <text x="170" y="4" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="50" fill="url(#goldFoil)">${ventaStr}</text>`;
}

function buildSVG({ rate, percent, mayoristaCompra, percentMayorista, noComision }){
  const pct = (percent === undefined || percent === null || percent === '') ? 3 : parseFloat(percent);
  const pctMay = (percentMayorista === undefined || percentMayorista === null || percentMayorista === '') ? 2 : parseFloat(percentMayorista);
  const minoristaCompraStr = formatARS(rate);
  const minoristaVentaNum = Math.round(parseInt(String(rate||'0').replace(/[^\d]/g,''),10) * (1 + pct/100));
  const minoristaVentaStr = formatARS(minoristaVentaNum);
  const mayoristaCompraStr = formatARS(mayoristaCompra);
  const mayoristaVentaNum = Math.round(parseInt(String(mayoristaCompra||'0').replace(/[^\d]/g,''),10) * (1 + pctMay/100));
  const mayoristaVentaStr = formatARS(mayoristaVentaNum);
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

  <text x="540" y="176" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="62" letter-spacing="7" fill="url(#goldFoil)">ANUAR</text>

  <line x1="140" y1="210" x2="940" y2="210" stroke="url(#goldLine)" stroke-width="1"/>

  <text x="540" y="250" text-anchor="middle" font-family="Lora" font-style="italic" font-weight="500" font-size="24" letter-spacing="2" fill="#C9A227">Cotización · ${dateStr}</text>

  <text x="540" y="290" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="21" letter-spacing="2" fill="#F5F1E8">DÓLAR ECUADOR MAYORISTA <tspan fill="#C9A227" font-weight="500" font-size="18" letter-spacing="1">(≥100 USD)</tspan></text>
  <g transform="translate(540,352)">
    ${rateBlock(mayoristaCompraStr, mayoristaVentaStr)}
  </g>

  <text x="540" y="416" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="22" letter-spacing="3" fill="#F5F1E8">DÓLAR ECUADOR MINORISTA</text>
  <g transform="translate(540,478)">
    ${rateBlock(minoristaCompraStr, minoristaVentaStr)}
  </g>

  <g transform="translate(540,544)"><text x="-93" y="9" text-anchor="end" font-family="Poppins" font-weight="500" font-size="30" fill="#F5F1E8">1 Dólar</text><g transform="translate(-59,-3)"><circle r="22" fill="#0a0908" stroke="url(#goldFoil)" stroke-width="2"/><clipPath id="clipARmini"><circle r="18"/></clipPath><g clip-path="url(#clipARmini)"><rect x="-22" y="-22" width="44" height="14.666666666666666" fill="#74ACDF"/><rect x="-22" y="-7.333333333333333" width="44" height="14.666666666666666" fill="#FFFFFF"/><rect x="-22" y="7.333333333333333" width="44" height="14.666666666666666" fill="#74ACDF"/><circle r="6.16" fill="#F6B40E" stroke="#85340A" stroke-width="0.8"/></g></g><text x="0" y="9" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="30" fill="#8a7550">=</text><text x="30" y="9" text-anchor="start" font-family="Poppins" font-weight="500" font-size="30" fill="#F5F1E8">1 Dólar</text><g transform="translate(154,-3)"><circle r="22" fill="#0a0908" stroke="url(#goldFoil)" stroke-width="2"/><clipPath id="clipECmini"><circle r="18"/></clipPath><g clip-path="url(#clipECmini)"><rect x="-22" y="-22" width="44" height="22" fill="#FFD100"/><rect x="-22" y="0" width="44" height="11.0" fill="#0F47AF"/><rect x="-22" y="11.0" width="44" height="11.0" fill="#EF3340"/><circle r="6.6" fill="#FFFFFF" stroke="#3A3A3A" stroke-width="0.6"/></g></g></g>


  <g transform="translate(540,654)" stroke="#E8C468" stroke-width="1.5" fill="none" opacity="0.85">
    <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)"/>
    <line x1="-140" y1="0" x2="-24" y2="0"/>
    <line x1="24" y1="0" x2="140" y2="0"/>
  </g>

  <text x="540" y="700" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="25" fill="#F5F1E8">En Argentina trabajamos con todos los</text>
  <text x="540" y="732" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="25" fill="#F5F1E8">bancos y Billeteras Virtuales</text>

  <text x="540" y="772" text-anchor="middle" font-family="Lora" font-style="italic" font-weight="500" font-size="21" letter-spacing="2" fill="#C9A227">Recibimos en Ecuador en los bancos</text>

  <g transform="translate(540,816)">
    ${ROW1_X.map((x,i)=>bankChip(x,0,BANKS[i])).join('')}
  </g>
  <g transform="translate(540,860)">
    ${ROW2_X.map((x,i)=>bankChip(x,0,BANKS[i+3])).join('')}
  </g>

  <line x1="240" y1="908" x2="840" y2="908" stroke="url(#goldLine)" stroke-width="1"/>
  <text x="540" y="946" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="24" letter-spacing="8" fill="#E8C468">${noComision ? 'SIN COMISIONES' : 'SEGUI NUESTRAS COTIZACIONES DIARIAS'}</text>
</svg>`;
}
