// ANUAR NYSE — shared render logic

const BANKS = [
  { name: "Pichincha",     color: "#E0A100" },
  { name: "Guayaquil",     color: "#E6007E" },
  { name: "Internacional", color: "#E0A100" },
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
  return '<g transform="translate(' + x + ',' + y + ')" fill="none" stroke="' + color + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M-9,-8 L0,-13 L9,-8 Z" fill="' + color + '" stroke="none"/>' +
    '<line x1="-9" y1="-8" x2="-9" y2="6"/>' +
    '<line x1="-4.3" y1="-8" x2="-4.3" y2="6"/>' +
    '<line x1="4.3" y1="-8" x2="4.3" y2="6"/>' +
    '<line x1="9" y1="-8" x2="9" y2="6"/>' +
    '<line x1="-11" y1="6" x2="11" y2="6"/>' +
    '<line x1="-11" y1="9" x2="11" y2="9"/>' +
    '</g>';
}

function bankChip(x, y, bank){
  return '<g transform="translate(' + x + ',' + y + ')"><g transform="scale(1.18)">' + bankIcon(0,0,bank.color) + '</g>' +
    '<text x="24" y="9" text-anchor="start" font-family="Poppins" font-weight="400" font-size="28" fill="#1F2937">' + bank.name + '</text></g>';
}

const ROW1_X = [-325, -113, 99];
const ROW2_X = [-190, -2];

function arFlagMini(x, y, r){
  return '<g transform="translate(' + x + ',' + y + ')">' +
    '<circle r="' + r + '" fill="#FFFFFF" stroke="url(#goldFoil)" stroke-width="2"/>' +
    '<clipPath id="clipARmini"><circle r="' + (r-4) + '"/></clipPath>' +
    '<g clip-path="url(#clipARmini)">' +
    '<rect x="-' + r + '" y="-' + r + '" width="' + (r*2) + '" height="' + (r*2/3) + '" fill="#74ACDF"/>' +
    '<rect x="-' + r + '" y="-' + (r/3) + '" width="' + (r*2) + '" height="' + (r*2/3) + '" fill="#FFFFFF"/>' +
    '<rect x="-' + r + '" y="' + (r/3) + '" width="' + (r*2) + '" height="' + (r*2/3) + '" fill="#74ACDF"/>' +
    '<circle r="' + (r*0.28) + '" fill="#F6B40E" stroke="#85340A" stroke-width="0.8"/>' +
    '</g></g>';
}

// Escudo de Ecuador simplificado (cóndor, óvalo con montaña, sol, río y barco). Coordenadas locales ~ ±32 x ±36, escaladas por r.
function escudoEC(r){
  const k = r / 60;
  return '<g transform="scale(' + k + ')">' +
    '<clipPath id="clipEscudoEC"><ellipse cx="0" cy="4" rx="21" ry="25"/></clipPath>' +
    // cóndor
    '<path d="M0,-25 C-9,-35 -25,-31 -33,-22 C-25,-25 -16,-21 -8,-18 L0,-13 L8,-18 C16,-21 25,-25 33,-22 C25,-31 9,-35 0,-25 Z" fill="#4A3B2A"/>' +
    '<circle cx="0" cy="-26" r="3.2" fill="#4A3B2A"/>' +
    // óvalo del escudo
    '<ellipse cx="0" cy="4" rx="21" ry="25" fill="#9AD0F0" stroke="#C9A227" stroke-width="2.2"/>' +
    '<g clip-path="url(#clipEscudoEC)">' +
      '<circle cx="0" cy="-9" r="7" fill="#F6B40E"/>' +                                   // sol
      '<path d="M-24,12 L-8,-8 L-1,0 L8,-12 L24,12 Z" fill="#9CA3AF"/>' +                // montaña (Chimborazo)
      '<path d="M-8,-8 L-12,-3 L-4,-3 Z M8,-12 L3,-4 L13,-4 Z" fill="#FFFFFF"/>' +        // nieve
      '<path d="M-24,13 C-10,7 6,19 24,11 L24,32 L-24,32 Z" fill="#3B82F6"/>' +          // río
      '<path d="M-7,19 L7,19 L4.5,23 L-4.5,23 Z" fill="#8B5A2B"/>' +                      // barco: casco
      '<path d="M0,10 L0,19 M0,11 L6.5,18.5 L0,18.5 Z" fill="#FFFFFF" stroke="#8B5A2B" stroke-width="0.8"/>' +
    '</g>' +
  '</g>';
}

function ecFlagMini(x, y, r){
  return '<g transform="translate(' + x + ',' + y + ')">' +
    '<circle r="' + r + '" fill="#FFFFFF" stroke="url(#goldFoil)" stroke-width="2"/>' +
    '<clipPath id="clipECmini"><circle r="' + (r-4) + '"/></clipPath>' +
    '<g clip-path="url(#clipECmini)">' +
    '<rect x="-' + r + '" y="-' + r + '" width="' + (r*2) + '" height="' + r + '" fill="#FFD100"/>' +
    '<rect x="-' + r + '" y="0" width="' + (r*2) + '" height="' + (r/2) + '" fill="#0F47AF"/>' +
    '<rect x="-' + r + '" y="' + (r/2) + '" width="' + (r*2) + '" height="' + (r/2) + '" fill="#EF3340"/>' +
    escudoEC(r) +
    '</g></g>';
}

function rateBlock(compraStr, ventaStr){
  return '<text x="-170" y="-52" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="17" letter-spacing="5" fill="#9A7A12">COMPRA</text>' +
    '<text x="-170" y="6" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="64" fill="url(#goldFoil)">' + compraStr + '</text>' +
    '<line x1="0" y1="-52" x2="0" y2="16" stroke="#C8B67A" stroke-width="1.5"/>' +
    '<text x="170" y="-52" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="17" letter-spacing="5" fill="#9A7A12">VENTA</text>' +
    '<text x="170" y="6" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="64" fill="url(#goldFoil)">' + ventaStr + '</text>';
}

function buildSVG(state){
  const pct = (state.percent === undefined || state.percent === null || state.percent === '') ? 3 : parseFloat(state.percent);
  const compraStr = formatARS(state.rate);
  const ventaNum = Math.round(parseInt(String(state.rate||'0').replace(/[^\d]/g,''),10) * (1 + pct/100));
  const ventaStr = formatARS(ventaNum);
  const noComision = state.noComision;
  const dateStr = todayLabel();

  const row1 = ROW1_X.map(function(x,i){ return bankChip(x,0,BANKS[i]); }).join('');
  const row2 = ROW2_X.map(function(x,i){ return bankChip(x,0,BANKS[i+3]); }).join('');

  // Bloque único: banderas + "Transferencias internacionales" / "sin comisión" (la 2ª línea solo si noComision)
  const flagY = noComision ? 12 : -4;
  const flagsLine = '<g transform="translate(540,' + (noComision ? 548 : 566) + ')">' +
    ecFlagMini(-350, flagY, 48) +
    '<text x="0" y="0" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="32" fill="#1F2937">Transferencias internacionales</text>' +
    (noComision ? '<text x="0" y="42" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" fill="#15803D">sin comisi\u00f3n</text>' : '') +
    arFlagMini(350, flagY, 48) +
    '</g>';

  return '<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">' +
  '<defs>' +
    '<radialGradient id="bgGlow" cx="50%" cy="38%" r="75%">' +
      '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="55%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#FFFFFF"/>' +
    '</radialGradient>' +
    '<linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#C9A227"/><stop offset="30%" stop-color="#A57F12"/><stop offset="55%" stop-color="#D4B13A"/>' +
      '<stop offset="80%" stop-color="#8F6D0B"/><stop offset="100%" stop-color="#B8901E"/>' +
    '</linearGradient>' +
    '<linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" stop-color="#8a6c1a" stop-opacity="0"/><stop offset="50%" stop-color="#B8901E"/><stop offset="100%" stop-color="#8a6c1a" stop-opacity="0"/>' +
    '</linearGradient>' +
  '</defs>' +
  '<rect width="1080" height="1080" fill="url(#bgGlow)"/>' +
  '<rect x="66" y="66" width="948" height="948" fill="none" stroke="#B8901E" stroke-width="1.5" opacity="0.8"/>' +
  '<rect x="78" y="78" width="924" height="924" fill="none" stroke="#C9A227" stroke-width="1" opacity="0.55"/>' +
  '<g fill="none" stroke="#B8901E" stroke-width="2" opacity="0.9">' +
    '<path d="M66 110 L66 66 L110 66"/><path d="M970 66 L1014 66 L1014 110"/>' +
    '<path d="M1014 970 L1014 1014 L970 1014"/><path d="M110 1014 L66 1014 L66 970"/>' +
  '</g>' +
  '<text x="540" y="200" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="62" letter-spacing="8" fill="url(#goldFoil)">ANUAR CAMBIOS</text>' +
  '<line x1="140" y1="240" x2="940" y2="240" stroke="url(#goldLine)" stroke-width="1"/>' +
  '<text x="540" y="264" text-anchor="middle" font-family="Lora" font-style="italic" font-weight="500" font-size="27" letter-spacing="2" fill="#9A7A12">Cotización · ' + dateStr + '</text>' +
  '<text x="540" y="352" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="25" letter-spacing="4" fill="#15803D">D\u00d3LAR ECUADOR</text>' +
  '<g transform="translate(540,432)">' + rateBlock(compraStr, ventaStr) + '</g>' +
  flagsLine +
  '<g transform="translate(540,650)" stroke="#B8901E" stroke-width="1.5" fill="none" opacity="0.9">' +
    '<rect x="-8" y="-8" width="16" height="16" transform="rotate(45)"/>' +
    '<line x1="-140" y1="0" x2="-24" y2="0"/><line x1="24" y1="0" x2="140" y2="0"/>' +
  '</g>' +
  '<text x="540" y="716" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="28" fill="#1F2937">En Argentina trabajamos con todos los</text>' +
  '<text x="540" y="754" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="28" fill="#1F2937">bancos y Billeteras Virtuales</text>' +
  '<text x="540" y="820" text-anchor="middle" font-family="Lora" font-style="italic" font-weight="500" font-size="27" letter-spacing="2" fill="#9A7A12">Recibimos en Ecuador en los bancos</text>' +
  '<g transform="translate(540,880)">' + row1 + '</g>' +
  '<g transform="translate(540,942)">' + row2 + '</g>' +
  '</svg>';
}
