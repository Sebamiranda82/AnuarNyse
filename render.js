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

function buildSVG({ rate, noComision }){
  const rateStr = formatARS(rate);
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

  <text x="540" y="182" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="62" letter-spacing="7" fill="url(#goldFoil)">ANUAR</text>
  <line x1="410" y1="212" x2="470" y2="212" stroke="url(#goldLine)" stroke-width="1.5"/>
  <text x="540" y="220" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="20" letter-spacing="10" fill="#F5F1E8">NYSE</text>
  <line x1="610" y1="212" x2="670" y2="212" stroke="url(#goldLine)" stroke-width="1.5"/>

  <line x1="140" y1="264" x2="940" y2="264" stroke="url(#goldLine)" stroke-width="1"/>

  <text x="540" y="330" text-anchor="middle" font-family="Lora" font-style="italic" font-weight="500" font-size="26" letter-spacing="2" fill="#C9A227">Cotización · ${dateStr}</text>

  <g transform="translate(540,470)">
    <g transform="translate(-340,-15)">
      <circle r="52" fill="#0a0908" stroke="url(#goldFoil)" stroke-width="3"/>
      <clipPath id="clipAR2"><circle r="46"/></clipPath>
      <g clip-path="url(#clipAR2)">
        <rect x="-46" y="-46" width="92" height="30.7" fill="#74ACDF"/>
        <rect x="-46" y="-15.3" width="92" height="30.7" fill="#FFFFFF"/>
        <rect x="-46" y="15.3" width="92" height="30.7" fill="#74ACDF"/>
        <g fill="#F6B40E" stroke="#85340A" stroke-width="0.9">
          <g id="sunray2"><path d="M0,-18 L3.5,-10 L-3.5,-10 Z"/></g>
          <use href="#sunray2" transform="rotate(30)"/><use href="#sunray2" transform="rotate(60)"/>
          <use href="#sunray2" transform="rotate(90)"/><use href="#sunray2" transform="rotate(120)"/>
          <use href="#sunray2" transform="rotate(150)"/><use href="#sunray2" transform="rotate(180)"/>
          <use href="#sunray2" transform="rotate(210)"/><use href="#sunray2" transform="rotate(240)"/>
          <use href="#sunray2" transform="rotate(270)"/><use href="#sunray2" transform="rotate(300)"/>
          <use href="#sunray2" transform="rotate(330)"/>
        </g>
        <circle r="8" fill="#F6B40E" stroke="#85340A" stroke-width="1.3"/>
      </g>
    </g>

    <text x="-160" y="0" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="68" fill="url(#goldFoil)">${rateStr}</text>
    <text x="0" y="-2" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="40" fill="#8a7550">=</text>
    <text x="165" y="0" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="68" fill="#F5F1E8">1 USD</text>

    <g transform="translate(340,-15)">
      <circle r="52" fill="#0a0908" stroke="url(#goldFoil)" stroke-width="3"/>
      <clipPath id="clipEC2"><circle r="46"/></clipPath>
      <g clip-path="url(#clipEC2)">
        <rect x="-46" y="-46" width="92" height="46" fill="#FFD100"/>
        <rect x="-46" y="0" width="92" height="23" fill="#0F47AF"/>
        <rect x="-46" y="23" width="92" height="23" fill="#EF3340"/>
        <ellipse rx="13" ry="10.5" fill="#FFFFFF" stroke="#3A3A3A" stroke-width="0.9"/>
        <path d="M-13,-2.5 Q0,-13 13,-2.5 L13,2.5 Q0,-5 -13,2.5 Z" fill="#8B5A2B"/>
        <circle cy="1" r="5.2" fill="#FFD100" stroke="#EF3340" stroke-width="0.9"/>
      </g>
    </g>
  </g>

  ${noComision ? `
  <g transform="translate(540,590)">
    <rect x="-160" y="-24" width="320" height="48" rx="24" fill="none" stroke="url(#goldFoil)" stroke-width="1.5"/>
    <text x="0" y="7" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="24" letter-spacing="6" fill="#E8C468">SIN COMISIONES</text>
  </g>` : ``}

  <g transform="translate(540,654)" stroke="#E8C468" stroke-width="1.5" fill="none" opacity="0.85">
    <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)"/>
    <line x1="-140" y1="0" x2="-24" y2="0"/>
    <line x1="24" y1="0" x2="140" y2="0"/>
  </g>

  <text x="540" y="700" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="26" fill="#F5F1E8">Transferimos a CVU / CBU.</text>
  <text x="540" y="734" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="26" fill="#F5F1E8">Billeteras Virtuales y Bancos.</text>

  <text x="540" y="776" text-anchor="middle" font-family="Lora" font-style="italic" font-weight="500" font-size="22" letter-spacing="2" fill="#C9A227">Recibimos en Ecuador en los bancos</text>

  <g transform="translate(540,822)">
    ${ROW1_X.map((x,i)=>bankChip(x,0,BANKS[i])).join('')}
  </g>
  <g transform="translate(540,870)">
    ${ROW2_X.map((x,i)=>bankChip(x,0,BANKS[i+3])).join('')}
  </g>

  <line x1="240" y1="922" x2="840" y2="922" stroke="url(#goldLine)" stroke-width="1"/>
  <text x="540" y="962" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="21" letter-spacing="5" fill="#C9A227">SEGUI NUESTRAS COTIZACIONES DIARIAS</text>
</svg>`;
}
