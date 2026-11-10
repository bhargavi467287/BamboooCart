// Script to generate rich, self-contained SVG graphics for Bambookart
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');

// Helper to write SVG file
function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(imgDir, filename), svgContent.trim());
  console.log(`Generated: ${filename}`);
}

// 1. Logo SVG
writeSvg('logo.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  <defs>
    <linearGradient id="bambooGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D6A4F" />
      <stop offset="100%" stop-color="#52B788" />
    </linearGradient>
    <linearGradient id="stalkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#74C69D" />
      <stop offset="50%" stop-color="#D8F3DC" />
      <stop offset="100%" stop-color="#52B788" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4A373" />
      <stop offset="100%" stop-color="#A98467" />
    </linearGradient>
  </defs>

  <!-- Bamboo Stalk Icon -->
  <g transform="translate(10, 10)">
    <!-- Main stalk 1 -->
    <rect x="18" y="10" width="9" height="42" rx="4.5" fill="url(#stalkGrad)" stroke="#1B4332" stroke-width="1.5" />
    <line x1="16" y1="24" x2="29" y2="24" stroke="#1B4332" stroke-width="2.5" stroke-linecap="round" />
    <line x1="16" y1="38" x2="29" y2="38" stroke="#1B4332" stroke-width="2.5" stroke-linecap="round" />

    <!-- Main stalk 2 -->
    <rect x="31" y="4" width="10" height="48" rx="5" fill="url(#stalkGrad)" stroke="#1B4332" stroke-width="1.5" />
    <line x1="29" y1="20" x2="43" y2="20" stroke="#1B4332" stroke-width="2.5" stroke-linecap="round" />
    <line x1="29" y1="36" x2="43" y2="36" stroke="#1B4332" stroke-width="2.5" stroke-linecap="round" />

    <!-- Bamboo Leaves -->
    <path d="M38 12 Q52 4 58 10 Q48 16 38 15 Z" fill="#40916C" />
    <path d="M38 14 Q56 16 56 24 Q46 22 38 16 Z" fill="#2D6A4F" />
    <path d="M18 20 Q6 14 2 20 Q10 24 18 22 Z" fill="#52B788" />
    <path d="M32 26 Q18 28 14 36 Q24 35 32 30 Z" fill="#40916C" />

    <!-- Mini woven basket base -->
    <path d="M12 50 Q30 58 48 50 L44 58 Q30 63 16 58 Z" fill="url(#goldGrad)" stroke="#7F4F24" stroke-width="1.2" />
  </g>

  <!-- Brand Text -->
  <text x="75" y="44" font-family="'Segoe UI', Roboto, 'Noto Sans', sans-serif" font-size="34" font-weight="900" fill="#1B4332" letter-spacing="-0.5">
    Bamboo<tspan fill="#D4A373">kart</tspan>
  </text>
  <text x="77" y="60" font-family="'Segoe UI', Roboto, 'Noto Sans', sans-serif" font-size="11" font-weight="700" fill="#7F4F24" letter-spacing="1.2">
    HANDMADE • SUSTAINABLE • ARTISAN DIRECT
  </text>
</svg>
`);

// 2. Vegetable Basket SVG
writeSvg('vegetable-basket.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBF7EE" />
      <stop offset="100%" stop-color="#EFE6D5" />
    </linearGradient>
    <linearGradient id="bambooLight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DEB887" />
      <stop offset="50%" stop-color="#FFE4B5" />
      <stop offset="100%" stop-color="#CD853F" />
    </linearGradient>
    <linearGradient id="bambooDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A0522D" />
      <stop offset="100%" stop-color="#6E3714" />
    </linearGradient>
    <pattern id="weavePattern" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="10" height="10" fill="#E2BA7A" />
      <rect x="10" width="10" height="10" fill="#D39F57" />
      <rect y="10" width="10" height="10" fill="#D39F57" />
      <rect x="10" y="10" width="10" height="10" fill="#C5893F" />
      <line x1="0" y1="0" x2="20" y2="0" stroke="#8A4B1A" stroke-width="0.8" opacity="0.6"/>
      <line x1="0" y1="10" x2="20" y2="10" stroke="#8A4B1A" stroke-width="0.8" opacity="0.6"/>
      <line x1="0" y1="0" x2="0" y2="20" stroke="#8A4B1A" stroke-width="0.8" opacity="0.6"/>
      <line x1="10" y1="0" x2="10" y2="20" stroke="#8A4B1A" stroke-width="0.8" opacity="0.6"/>
    </pattern>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#4A3B2C" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="500" height="400" fill="url(#bgG)" />

  <!-- Soft Ground Shadow -->
  <ellipse cx="250" cy="355" rx="170" ry="24" fill="#3D2914" opacity="0.2" filter="blur(6px)" />

  <!-- Vegetables inside basket (Brinjals, Tomatoes, Greens) -->
  <g id="vegetables">
    <!-- Purple Brinjal -->
    <ellipse cx="205" cy="180" rx="28" ry="36" fill="#4A154B" transform="rotate(-15 205 180)" />
    <path d="M205 145 C200 142 208 135 210 130 C212 135 218 140 216 148 Z" fill="#2D6A4F" />
    <!-- Bright Red Tomatoes -->
    <circle cx="250" cy="190" r="28" fill="#E63946" />
    <path d="M250 162 L246 166 L250 160 L254 166 Z" fill="#2D6A4F" stroke="#1B4332" stroke-width="1.5" />
    <circle cx="288" cy="182" r="26" fill="#D90429" />
    <path d="M288 156 L285 160 L288 154 L291 160 Z" fill="#2D6A4F" />
    <!-- Fresh Green chillies & Coriander -->
    <path d="M165 195 Q180 150 200 165 Q185 200 165 195 Z" fill="#52B788" />
    <path d="M305 185 Q325 150 340 165 Q320 200 305 185 Z" fill="#40916C" />
  </g>

  <!-- Main Bamboo Basket Body -->
  <g filter="url(#shadow)">
    <!-- Basket Outline & Fill -->
    <path d="M90 200 C80 280 140 340 250 340 C360 340 420 280 410 200 Z" fill="url(#weavePattern)" stroke="#8B4513" stroke-width="3" />
    
    <!-- Weave texture bands -->
    <path d="M102 230 Q250 260 398 230" fill="none" stroke="#7A3D0B" stroke-width="4" opacity="0.6"/>
    <path d="M118 265 Q250 295 382 265" fill="none" stroke="#7A3D0B" stroke-width="4" opacity="0.6"/>
    <path d="M142 300 Q250 325 358 300" fill="none" stroke="#7A3D0B" stroke-width="4" opacity="0.6"/>

    <!-- Vertical Ribs -->
    <path d="M120 210 Q145 285 180 330" fill="none" stroke="#A75D1E" stroke-width="3" opacity="0.7"/>
    <path d="M170 205 Q190 285 220 338" fill="none" stroke="#A75D1E" stroke-width="3" opacity="0.7"/>
    <path d="M250 205 L250 340" fill="none" stroke="#A75D1E" stroke-width="3.5" opacity="0.7"/>
    <path d="M330 205 Q310 285 280 338" fill="none" stroke="#A75D1E" stroke-width="3" opacity="0.7"/>
    <path d="M380 210 Q355 285 320 330" fill="none" stroke="#A75D1E" stroke-width="3" opacity="0.7"/>

    <!-- Reinforced Rim -->
    <ellipse cx="250" cy="200" rx="160" ry="24" fill="none" stroke="url(#bambooDark)" stroke-width="12" />
    <ellipse cx="250" cy="200" rx="160" ry="24" fill="none" stroke="url(#bambooLight)" stroke-width="8" stroke-dasharray="14 6" />
  </g>

  <!-- Tag / Label Badge -->
  <g transform="translate(360, 40)">
    <rect width="110" height="34" rx="17" fill="#2D6A4F" />
    <text x="55" y="22" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">100% ECO</text>
  </g>
</svg>
`);

// 3. Fruit Basket with Handle SVG
writeSvg('fruit-basket.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgF" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCF9F2" />
      <stop offset="100%" stop-color="#EFE2CF" />
    </linearGradient>
    <linearGradient id="goldBamboo" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C68B45" />
      <stop offset="50%" stop-color="#ECC686" />
      <stop offset="100%" stop-color="#AA6C2A" />
    </linearGradient>
    <filter id="shadowF">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#3B2610" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="500" height="400" fill="url(#bgF)" />

  <!-- Shadow -->
  <ellipse cx="250" cy="358" rx="160" ry="22" fill="#3D2914" opacity="0.22" filter="blur(6px)" />

  <!-- Tall Arched Bamboo Handle (Back section) -->
  <path d="M125 210 C125 50 375 50 375 210" fill="none" stroke="#7A4312" stroke-width="14" stroke-linecap="round" />
  <path d="M125 210 C125 50 375 50 375 210" fill="none" stroke="url(#goldBamboo)" stroke-width="10" stroke-linecap="round" />
  <!-- Handle woven grips -->
  <path d="M220 62 C230 60 270 60 280 62" fill="none" stroke="#4A2508" stroke-width="14" stroke-dasharray="6 4" />

  <!-- Colorful Fresh Fruits in Basket -->
  <!-- Mangoes -->
  <path d="M180 185 Q195 130 240 155 Q245 190 200 205 Z" fill="#F4A261" stroke="#E76F51" stroke-width="2" />
  <path d="M250 160 Q270 125 310 150 Q315 185 270 195 Z" fill="#E9C46A" stroke="#E76F51" stroke-width="2" />
  <!-- Apple -->
  <circle cx="240" cy="180" r="28" fill="#E63946" />
  <path d="M240 152 Q245 140 252 142" stroke="#4A2508" stroke-width="3" fill="none" />
  <!-- Bananas -->
  <path d="M275 180 Q325 155 350 195 Q330 180 275 195 Z" fill="#F9C74F" stroke="#D4A373" stroke-width="2" />
  <path d="M280 170 Q330 145 355 185 Q335 170 280 185 Z" fill="#FFE382" stroke="#D4A373" stroke-width="2" />

  <!-- Basket Body -->
  <g filter="url(#shadowF)">
    <!-- Base Body -->
    <path d="M100 205 C115 315 175 345 250 345 C325 345 385 315 400 205 Z" fill="#DDB26F" stroke="#8A4A15" stroke-width="3" />
    
    <!-- Open Diamond Cane Weave pattern -->
    <g stroke="#97581B" stroke-width="2.5" opacity="0.65">
      <line x1="120" y1="220" x2="230" y2="340" />
      <line x1="150" y1="210" x2="270" y2="345" />
      <line x1="190" y1="205" x2="310" y2="340" />
      <line x1="240" y1="205" x2="345" y2="325" />
      <line x1="290" y1="205" x2="380" y2="300" />

      <line x1="380" y1="220" x2="270" y2="340" />
      <line x1="350" y1="210" x2="230" y2="345" />
      <line x1="310" y1="205" x2="190" y2="340" />
      <line x1="260" y1="205" x2="155" y2="325" />
      <line x1="210" y1="205" x2="120" y2="300" />
    </g>

    <!-- Top Rim -->
    <ellipse cx="250" cy="205" rx="150" ry="24" fill="none" stroke="#7A3F11" stroke-width="12" />
    <ellipse cx="250" cy="205" rx="150" ry="24" fill="none" stroke="#FFDF9E" stroke-width="7" stroke-dasharray="12 6" />

    <!-- Cane handle joints -->
    <rect x="117" y="195" width="16" height="24" rx="4" fill="#5A2E0C" />
    <rect x="367" y="195" width="16" height="24" rx="4" fill="#5A2E0C" />
  </g>
</svg>
`);

// 4. Winnowing Basket (Chattamu / చేట) SVG
writeSvg('winnowing-basket.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgW" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBF7EE" />
      <stop offset="100%" stop-color="#ECE3D0" />
    </linearGradient>
    <linearGradient id="bambooStrips" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8CA8C" />
      <stop offset="50%" stop-color="#D6AA5B" />
      <stop offset="100%" stop-color="#B88331" />
    </linearGradient>
    <filter id="shadowW">
      <feDropShadow dx="4" dy="16" stdDeviation="14" flood-color="#3F2B14" flood-opacity="0.32"/>
    </filter>
  </defs>

  <rect width="500" height="400" fill="url(#bgW)" />

  <!-- Shadow -->
  <path d="M90 350 Q250 375 410 350 Q390 280 250 280 Q110 280 90 350 Z" fill="#3D2914" opacity="0.25" filter="blur(8px)" />

  <!-- Winnowing Basket (Chattam / చేట) Body -->
  <g filter="url(#shadowW)">
    <!-- Flat Scoop Shape -->
    <!-- Authentic scoop: U-shaped curved back rim, flat wide front lip -->
    <path d="M120 120 
             C120 70 380 70 380 120 
             L410 310 
             C410 335 390 345 250 345 
             C110 345 90 335 90 310 
             Z" 
          fill="url(#bambooStrips)" stroke="#744111" stroke-width="3" />

    <!-- Detailed Longitudinal bamboo slivers / splints weave -->
    <g stroke="#91581F" stroke-width="1.8" opacity="0.75">
      <!-- Cross weaving strips -->
      <line x1="130" y1="120" x2="370" y2="120" stroke-dasharray="10 4"/>
      <line x1="125" y1="145" x2="375" y2="145" stroke-dasharray="12 4"/>
      <line x1="120" y1="170" x2="380" y2="170" stroke-dasharray="14 4"/>
      <line x1="115" y1="195" x2="385" y2="195" stroke-dasharray="16 4"/>
      <line x1="110" y1="220" x2="390" y2="220" stroke-dasharray="14 5"/>
      <line x1="105" y1="245" x2="395" y2="245" stroke-dasharray="14 5"/>
      <line x1="100" y1="270" x2="400" y2="270" stroke-dasharray="12 4"/>
      <line x1="95" y1="295" x2="405" y2="295" stroke-dasharray="10 4"/>
      <line x1="92" y1="320" x2="408" y2="320" stroke-dasharray="8 4"/>

      <!-- Vertical Warp Splints -->
      <line x1="150" y1="100" x2="135" y2="330" />
      <line x1="180" y1="88" x2="170" y2="340" />
      <line x1="210" y1="82" x2="205" y2="344" />
      <line x1="250" y1="80" x2="250" y2="345" stroke-width="2.5" />
      <line x1="290" y1="82" x2="295" y2="344" />
      <line x1="320" y1="88" x2="330" y2="340" />
      <line x1="350" y1="100" x2="365" y2="330" />
    </g>

    <!-- Traditional Raised Thick Edge Rim (Cane Binding) -->
    <!-- High U-Back and side walls -->
    <path d="M90 310 L120 120 C120 60 380 60 380 120 L410 310" 
          fill="none" stroke="#5C310A" stroke-width="16" stroke-linecap="round" />
    <path d="M90 310 L120 120 C120 60 380 60 380 120 L410 310" 
          fill="none" stroke="#E6A74C" stroke-width="10" stroke-dasharray="14 6" stroke-linecap="round" />

    <!-- Front Open Lip Reinforced Lip -->
    <path d="M86 312 Q250 355 414 312" fill="none" stroke="#462205" stroke-width="8" stroke-linecap="round" />
    <path d="M86 312 Q250 355 414 312" fill="none" stroke="#FFCE79" stroke-width="4" stroke-dasharray="8 6" />

    <!-- Grains of Rice / Paddy scattered on winnowing tray for realistic tradition -->
    <g fill="#FFFDF0" stroke="#E8D19F" stroke-width="0.8">
      <ellipse cx="230" cy="220" rx="6" ry="2.2" transform="rotate(30 230 220)" />
      <ellipse cx="245" cy="235" rx="6" ry="2.2" transform="rotate(-20 245 235)" />
      <ellipse cx="260" cy="215" rx="6" ry="2.2" transform="rotate(60 260 215)" />
      <ellipse cx="275" cy="240" rx="6" ry="2.2" transform="rotate(10 275 240)" />
      <ellipse cx="220" cy="250" rx="6" ry="2.2" transform="rotate(-40 220 250)" />
      <ellipse cx="250" cy="265" rx="6" ry="2.2" transform="rotate(25 250 265)" />
      <ellipse cx="280" cy="260" rx="6" ry="2.2" transform="rotate(-15 280 260)" />
    </g>
  </g>

  <!-- Telugu Name Tag Badge -->
  <g transform="translate(320, 25)">
    <rect width="150" height="36" rx="8" fill="#1B4332" />
    <text x="75" y="23" font-family="'Noto Sans', 'Segoe UI', sans-serif" font-size="14" font-weight="700" fill="#E8D5B5" text-anchor="middle">వెదురు చేట (Chattam)</text>
  </g>
</svg>
`);

// 5. Bamboo Sieve (Jalleda / జల్లెడ) SVG
writeSvg('bamboo-sieve.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgS" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCF9F2" />
      <stop offset="100%" stop-color="#EFE4D2" />
    </linearGradient>
    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A56226" />
      <stop offset="50%" stop-color="#D99B58" />
      <stop offset="100%" stop-color="#6F390E" />
    </linearGradient>
    <pattern id="sieveMesh" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#FBF3E3" />
      <line x1="0" y1="0" x2="8" y2="0" stroke="#C89656" stroke-width="1.2" />
      <line x1="0" y1="0" x2="0" y2="8" stroke="#C89656" stroke-width="1.2" />
    </pattern>
    <filter id="shadowS">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#3A240E" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="500" height="400" fill="url(#bgS)" />

  <!-- Shadow -->
  <ellipse cx="250" cy="340" rx="170" ry="30" fill="#3D2914" opacity="0.25" filter="blur(8px)" />

  <!-- Bamboo Sieve Cylinder & Fine Mesh -->
  <g filter="url(#shadowS)">
    <!-- Lower cylindrical bentwood bamboo ring -->
    <path d="M90 220 C90 280 410 280 410 220 L410 250 C410 310 90 310 90 250 Z" fill="#753C11" stroke="#4A2508" stroke-width="2" />
    
    <!-- Ultra fine woven sieve base (Seen through angle) -->
    <ellipse cx="250" cy="220" rx="160" ry="70" fill="url(#sieveMesh)" stroke="#B37837" stroke-width="3" />

    <!-- Upper deep circular bamboo rim -->
    <path d="M90 190 C90 130 410 130 410 190 L410 220 C410 280 90 280 90 220 Z" fill="url(#rimGrad)" stroke="#4A2508" stroke-width="2" />

    <!-- Rim binding stitches / cane ties -->
    <g stroke="#3D1D05" stroke-width="3" opacity="0.8">
      <line x1="120" y1="185" x2="120" y2="225" />
      <line x1="180" y1="210" x2="180" y2="245" />
      <line x1="250" y1="220" x2="250" y2="255" />
      <line x1="320" y1="210" x2="320" y2="245" />
      <line x1="380" y1="185" x2="380" y2="225" />
    </g>

    <!-- Top lip highlight -->
    <ellipse cx="250" cy="190" rx="160" ry="60" fill="none" stroke="#FFE7B0" stroke-width="6" stroke-dasharray="16 6" />
    <ellipse cx="250" cy="190" rx="160" ry="60" fill="none" stroke="#522706" stroke-width="3" />
  </g>

  <!-- Traditional Flour Sifting Accent -->
  <g opacity="0.7">
    <circle cx="230" cy="210" r="30" fill="#FFFDF8" opacity="0.6" filter="blur(8px)" />
    <circle cx="270" cy="225" r="25" fill="#FFFDF8" opacity="0.6" filter="blur(6px)" />
  </g>
</svg>
`);

// 6. Bamboo Storage Basket with Lid SVG
writeSvg('storage-basket.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgST" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCF9F2" />
      <stop offset="100%" stop-color="#EEE1CB" />
    </linearGradient>
    <pattern id="tightWeave" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="14" height="14" fill="#DDB275" />
      <rect x="0" y="0" width="7" height="7" fill="#C89752" />
      <rect x="7" y="7" width="7" height="7" fill="#BD8942" />
      <line x1="0" y1="0" x2="14" y2="0" stroke="#87511D" stroke-width="0.8" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="#87511D" stroke-width="0.8" />
      <line x1="0" y1="0" x2="0" y2="14" stroke="#87511D" stroke-width="0.8" />
      <line x1="7" y1="0" x2="7" y2="14" stroke="#87511D" stroke-width="0.8" />
    </pattern>
    <filter id="shadowST">
      <feDropShadow dx="0" dy="14" stdDeviation="15" flood-color="#3A240E" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="500" height="400" fill="url(#bgST)" />

  <!-- Shadow -->
  <ellipse cx="250" cy="360" rx="150" ry="22" fill="#3D2914" opacity="0.25" filter="blur(6px)" />

  <g filter="url(#shadowST)">
    <!-- Main Cylinder Basket Body -->
    <path d="M125 180 L140 335 C140 355 360 355 360 335 L375 180 Z" fill="url(#tightWeave)" stroke="#744111" stroke-width="3" />

    <!-- Vertical Accent ribs -->
    <g stroke="#91581F" stroke-width="2.5" opacity="0.7">
      <line x1="165" y1="180" x2="175" y2="340" />
      <line x1="205" y1="180" x2="212" y2="346" />
      <line x1="250" y1="180" x2="250" y2="348" />
      <line x1="295" y1="180" x2="288" y2="346" />
      <line x1="335" y1="180" x2="325" y2="340" />
    </g>

    <!-- Mid Basket Ring Reinforcement -->
    <path d="M133 260 Q250 285 367 260" fill="none" stroke="#5C310A" stroke-width="7" />
    <path d="M133 260 Q250 285 367 260" fill="none" stroke="#FFCE79" stroke-width="3" stroke-dasharray="10 5" />

    <!-- Basket Top Opening Rim -->
    <ellipse cx="250" cy="180" rx="125" ry="25" fill="#5A2E0C" />

    <!-- Fitting Bamboo Lid (Slightly tilted up to show it has a lid) -->
    <g transform="translate(0, -25)">
      <!-- Lid Dome -->
      <path d="M110 160 C110 110 390 110 390 160 C390 185 110 185 110 160 Z" fill="url(#tightWeave)" stroke="#6C390B" stroke-width="3" />
      
      <!-- Lid Rim Edge -->
      <ellipse cx="250" cy="165" rx="140" ry="24" fill="none" stroke="#522706" stroke-width="10" />
      <ellipse cx="250" cy="165" rx="140" ry="24" fill="none" stroke="#FFE09B" stroke-width="5" stroke-dasharray="12 5" />

      <!-- Top Hand Knob / Bamboo Loop Handle -->
      <path d="M230 118 C230 88 270 88 270 118" fill="none" stroke="#462205" stroke-width="10" stroke-linecap="round" />
      <path d="M230 118 C230 88 270 88 270 118" fill="none" stroke="#F4CA78" stroke-width="5" stroke-linecap="round" />
      <!-- Knob base wrapping -->
      <rect x="225" y="115" width="50" height="8" rx="3" fill="#6A3609" />
    </g>
  </g>
</svg>
`);

// 7. Bamboo Serving Tray SVG
writeSvg('serving-tray.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgTR" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBF7EE" />
      <stop offset="100%" stop-color="#EBE0CC" />
    </linearGradient>
    <pattern id="herringbone" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#E5BD7D" />
      <path d="M0 0 L10 10 L0 20 M10 0 L20 10 L10 20" fill="none" stroke="#B88034" stroke-width="2" />
    </pattern>
    <filter id="shadowTR">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#3A240E" flood-opacity="0.28"/>
    </filter>
  </defs>

  <rect width="500" height="400" fill="url(#bgTR)" />

  <!-- Shadow -->
  <ellipse cx="250" cy="310" rx="190" ry="35" fill="#3D2914" opacity="0.25" filter="blur(8px)" />

  <!-- Tray Body in 3D Perspective -->
  <g filter="url(#shadowTR)">
    <!-- Base Woven Board -->
    <polygon points="70,180 430,180 470,290 30,290" fill="url(#herringbone)" stroke="#7F4411" stroke-width="3" />

    <!-- Side Wooden Bamboo Walls -->
    <!-- Left Wall -->
    <polygon points="30,290 70,180 60,170 18,278" fill="#8B4A15" stroke="#522706" stroke-width="2" />
    <!-- Back Wall -->
    <polygon points="60,170 440,170 430,180 70,180" fill="#66340B" stroke="#522706" stroke-width="2" />
    <!-- Right Wall -->
    <polygon points="440,170 482,278 470,290 430,180" fill="#A85D1E" stroke="#522706" stroke-width="2" />
    <!-- Front Wall -->
    <polygon points="18,278 482,278 470,295 30,295" fill="#B96D26" stroke="#522706" stroke-width="2" />

    <!-- Tray Handles Cut-out / Bamboo Rods -->
    <rect x="25" y="215" width="28" height="12" rx="6" fill="#3A1C04" />
    <rect x="447" y="215" width="28" height="12" rx="6" fill="#3A1C04" />

    <!-- Corner Joint Bindings -->
    <g stroke="#F8CF88" stroke-width="3">
      <line x1="20" y1="280" x2="32" y2="292" />
      <line x1="480" y1="280" x2="468" y2="292" />
    </g>
  </g>

  <!-- Traditional Chai Glass & Clay Cup on Tray -->
  <g transform="translate(180, 165)">
    <!-- Terracotta Cup -->
    <path d="M40 50 L46 90 C46 95 74 95 74 90 L80 50 Z" fill="#B3542E" stroke="#7A3011" stroke-width="2" />
    <ellipse cx="60" cy="50" rx="20" ry="7" fill="#6E2308" />
    <!-- Steaming Hot Tea Aroma -->
    <path d="M55 40 Q50 25 55 15" stroke="#D3A588" stroke-width="2" fill="none" opacity="0.6" stroke-linecap="round" />
    <path d="M65 38 Q70 23 65 12" stroke="#D3A588" stroke-width="2" fill="none" opacity="0.6" stroke-linecap="round" />
  </g>
</svg>
`);

// 8. Bamboo Pooja & Flower Tray SVG
writeSvg('pooja-tray.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgP" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCF9F2" />
      <stop offset="100%" stop-color="#EDE0CC" />
    </linearGradient>
    <filter id="shadowP">
      <feDropShadow dx="0" dy="14" stdDeviation="15" flood-color="#3A240E" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="500" height="400" fill="url(#bgP)" />

  <!-- Shadow -->
  <ellipse cx="250" cy="330" rx="180" ry="32" fill="#3D2914" opacity="0.25" filter="blur(8px)" />

  <!-- Circular Bamboo Platter / Tray -->
  <g filter="url(#shadowP)">
    <!-- Base Plate -->
    <ellipse cx="250" cy="220" rx="180" ry="90" fill="#E2B771" stroke="#783F0C" stroke-width="3" />

    <!-- Concentric Starburst Bamboo Weave -->
    <g stroke="#9F611E" stroke-width="1.8" opacity="0.7">
      <ellipse cx="250" cy="220" rx="140" ry="70" fill="none" />
      <ellipse cx="250" cy="220" rx="100" ry="50" fill="none" />
      <ellipse cx="250" cy="220" rx="60" ry="30" fill="none" />
      
      <!-- Radial Spokes -->
      <line x1="250" y1="130" x2="250" y2="310" />
      <line x1="70" y1="220" x2="430" y2="220" />
      <line x1="122" y1="156" x2="378" y2="284" />
      <line x1="122" y1="284" x2="378" y2="156" />
      <line x1="180" y1="136" x2="320" y2="304" />
      <line x1="180" y1="304" x2="320" y2="136" />
    </g>

    <!-- Thick Bamboo Outer Rim -->
    <ellipse cx="250" cy="220" rx="180" ry="90" fill="none" stroke="#5E2F09" stroke-width="12" />
    <ellipse cx="250" cy="220" rx="180" ry="90" fill="none" stroke="#FFD88A" stroke-width="6" stroke-dasharray="14 6" />
  </g>

  <!-- Fresh Marigold & Jasmine Pooja Flowers -->
  <g id="pooja-flowers">
    <!-- Center Yellow Marigold (Banthipuvvu) -->
    <circle cx="250" cy="220" r="22" fill="#F48C06" />
    <circle cx="250" cy="220" r="16" fill="#FAA307" stroke="#DC2F02" stroke-width="2" stroke-dasharray="5 3" />
    <circle cx="250" cy="220" r="8" fill="#FFBA08" />

    <!-- Orange Marigold -->
    <circle cx="295" cy="210" r="18" fill="#E85D04" />
    <circle cx="295" cy="210" r="12" fill="#F48C06" stroke="#9D0208" stroke-width="2" stroke-dasharray="4 2" />

    <!-- White Jasmine Petals Ring -->
    <g fill="#FFFDF8" stroke="#E6D3A3" stroke-width="1">
      <ellipse cx="205" cy="210" rx="10" ry="6" transform="rotate(20 205 210)" />
      <ellipse cx="215" cy="235" rx="10" ry="6" transform="rotate(-30 215 235)" />
      <ellipse cx="270" cy="245" rx="10" ry="6" transform="rotate(45 270 245)" />
      <ellipse cx="240" cy="255" rx="10" ry="6" transform="rotate(-15 240 255)" />
    </g>
    <!-- Sacred Turmeric / Kumkum mini bowls -->
    <circle cx="180" cy="215" r="14" fill="#D4A373" stroke="#8A4A15" stroke-width="2" />
    <circle cx="180" cy="215" r="10" fill="#E63946" />
    
    <circle cx="320" cy="225" r="14" fill="#D4A373" stroke="#8A4A15" stroke-width="2" />
    <circle cx="320" cy="225" r="10" fill="#FFB703" />
  </g>
</svg>
`);

// 9. Bamboo Sticks and Crafts SVG
writeSvg('bamboo-sticks.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgSTK" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBF7EF" />
      <stop offset="100%" stop-color="#EBE0CC" />
    </linearGradient>
    <linearGradient id="stick1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8DA765" />
      <stop offset="50%" stop-color="#B8D588" />
      <stop offset="100%" stop-color="#6F8847" />
    </linearGradient>
    <linearGradient id="stick2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CCA261" />
      <stop offset="50%" stop-color="#F3D194" />
      <stop offset="100%" stop-color="#AC803E" />
    </linearGradient>
    <filter id="shadowSTK">
      <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#3A240E" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="500" height="400" fill="url(#bgSTK)" />

  <!-- Shadow -->
  <ellipse cx="250" cy="350" rx="170" ry="24" fill="#3D2914" opacity="0.25" filter="blur(7px)" />

  <!-- Bundle of Seasoned Bamboo Poles & Craft Sticks -->
  <g filter="url(#shadowSTK)" transform="rotate(-25 250 200)">
    <!-- Stick 1 (Golden) -->
    <rect x="180" y="30" width="18" height="340" rx="9" fill="url(#stick2)" stroke="#7F561D" stroke-width="2" />
    <line x1="178" y1="100" x2="200" y2="100" stroke="#5E3B09" stroke-width="4" stroke-linecap="round"/>
    <line x1="178" y1="210" x2="200" y2="210" stroke="#5E3B09" stroke-width="4" stroke-linecap="round"/>
    <line x1="178" y1="300" x2="200" y2="300" stroke="#5E3B09" stroke-width="4" stroke-linecap="round"/>

    <!-- Stick 2 (Fresh Green) -->
    <rect x="202" y="10" width="22" height="370" rx="11" fill="url(#stick1)" stroke="#4A6529" stroke-width="2" />
    <line x1="200" y1="80" x2="226" y2="80" stroke="#2B4013" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="200" y1="180" x2="226" y2="180" stroke="#2B4013" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="200" y1="280" x2="226" y2="280" stroke="#2B4013" stroke-width="4.5" stroke-linecap="round"/>

    <!-- Stick 3 (Golden Yellow) -->
    <rect x="228" y="25" width="20" height="350" rx="10" fill="url(#stick2)" stroke="#7F561D" stroke-width="2" />
    <line x1="226" y1="120" x2="250" y2="120" stroke="#5E3B09" stroke-width="4" stroke-linecap="round"/>
    <line x1="226" y1="230" x2="250" y2="230" stroke="#5E3B09" stroke-width="4" stroke-linecap="round"/>
    <line x1="226" y1="320" x2="250" y2="320" stroke="#5E3B09" stroke-width="4" stroke-linecap="round"/>

    <!-- Stick 4 (Green) -->
    <rect x="252" y="15" width="19" height="365" rx="9.5" fill="url(#stick1)" stroke="#4A6529" stroke-width="2" />
    <line x1="250" y1="90" x2="273" y2="90" stroke="#2B4013" stroke-width="4" stroke-linecap="round"/>
    <line x1="250" y1="200" x2="273" y2="200" stroke="#2B4013" stroke-width="4" stroke-linecap="round"/>
    <line x1="250" y1="295" x2="273" y2="295" stroke="#2B4013" stroke-width="4" stroke-linecap="round"/>

    <!-- Stick 5 (Golden) -->
    <rect x="275" y="40" width="16" height="330" rx="8" fill="url(#stick2)" stroke="#7F561D" stroke-width="2" />
    <line x1="273" y1="140" x2="293" y2="140" stroke="#5E3B09" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="273" y1="240" x2="293" y2="240" stroke="#5E3B09" stroke-width="3.5" stroke-linecap="round"/>

    <!-- Jute Coir Rope Bundle Bindings -->
    <g stroke="#916B38" stroke-width="12" stroke-linecap="round">
      <line x1="175" y1="150" x2="295" y2="150" />
      <line x1="175" y1="260" x2="295" y2="260" />
    </g>
    <!-- Rope texture details -->
    <g stroke="#D4A373" stroke-width="3" stroke-dasharray="5 3">
      <line x1="175" y1="150" x2="295" y2="150" />
      <line x1="175" y1="260" x2="295" y2="260" />
    </g>
  </g>

  <!-- Decorative Green Bamboo Foliage -->
  <g transform="translate(380, 50)">
    <path d="M0 0 Q40 -20 60 0 Q30 20 0 0 Z" fill="#52B788" />
    <path d="M0 10 Q50 0 70 30 Q30 35 0 10 Z" fill="#2D6A4F" />
    <path d="M-10 20 Q30 20 50 50 Q10 45 -10 20 Z" fill="#74C69D" />
  </g>
</svg>
`);

// 10. Chapati / Roti Bamboo Basket SVG
writeSvg('roti-basket.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgR" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCF9F2" />
      <stop offset="100%" stop-color="#EEE2CF" />
    </linearGradient>
    <filter id="shadowR">
      <feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#3A240E" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="500" height="400" fill="url(#bgR)" />

  <!-- Shadow -->
  <ellipse cx="250" cy="335" rx="160" ry="26" fill="#3D2914" opacity="0.25" filter="blur(7px)" />

  <g filter="url(#shadowR)">
    <!-- Shallow Roti Basket Bowl -->
    <path d="M100 210 C100 320 400 320 400 210 Z" fill="#DEB06B" stroke="#7E4714" stroke-width="3" />

    <!-- Weave texture bands -->
    <g stroke="#97591E" stroke-width="2" opacity="0.7">
      <path d="M110 235 Q250 265 390 235" fill="none" />
      <path d="M130 265 Q250 295 370 265" fill="none" />
      <path d="M165 290 Q250 315 335 290" fill="none" />
      
      <!-- Crossed Splints -->
      <line x1="130" y1="215" x2="200" y2="310" />
      <line x1="190" y1="210" x2="250" y2="320" />
      <line x1="250" y1="210" x2="295" y2="315" />
      <line x1="310" y1="210" x2="350" y2="290" />

      <line x1="370" y1="215" x2="300" y2="310" />
      <line x1="310" y1="210" x2="250" y2="320" />
      <line x1="250" y1="210" x2="205" y2="315" />
      <line x1="190" y1="210" x2="150" y2="290" />
    </g>

    <!-- Warm Cotton Cloth Liner (Traditional cloth keeps rotis soft and absorbs steam) -->
    <path d="M115 210 C120 180 380 180 385 210 C380 250 120 250 115 210 Z" fill="#FFFBF2" stroke="#E6D3B3" stroke-width="2" />
    <path d="M110 205 Q125 220 140 208 Q155 225 170 205 Q250 220 330 205 Q345 225 360 208 Q375 220 390 205" fill="none" stroke="#D85A5A" stroke-width="2.5" />

    <!-- Warm Golden Rotis stacked inside -->
    <ellipse cx="250" cy="205" rx="100" ry="32" fill="#E8C382" stroke="#B88636" stroke-width="1.5" />
    <ellipse cx="250" cy="195" rx="98" ry="30" fill="#F0CD8D" stroke="#B88636" stroke-width="1.5" />
    <circle cx="230" cy="192" r="3" fill="#8C5819" opacity="0.6" />
    <circle cx="270" cy="196" r="4" fill="#8C5819" opacity="0.6" />
    <circle cx="252" cy="190" r="2.5" fill="#8C5819" opacity="0.6" />

    <!-- Basket Top Cane Rim -->
    <ellipse cx="250" cy="210" rx="150" ry="26" fill="none" stroke="#60300A" stroke-width="10" />
    <ellipse cx="250" cy="210" rx="150" ry="26" fill="none" stroke="#FFDE9A" stroke-width="5" stroke-dasharray="14 5" />
  </g>
</svg>
`);

// 11. Large Harvest Basket (Gampa / గంప) SVG
writeSvg('harvest-gampa.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgH" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCF9F2" />
      <stop offset="100%" stop-color="#ECE1CB" />
    </linearGradient>
    <filter id="shadowH">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#3A240E" flood-opacity="0.32"/>
    </filter>
  </defs>

  <rect width="500" height="400" fill="url(#bgH)" />

  <ellipse cx="250" cy="365" rx="170" ry="24" fill="#3D2914" opacity="0.28" filter="blur(7px)" />

  <!-- Authentic Large Rural Bamboo Gampa -->
  <g filter="url(#shadowH)">
    <!-- Hemispherical Deep Body -->
    <path d="M75 170 C70 340 430 340 425 170 Z" fill="#CA964D" stroke="#6E3A0E" stroke-width="3.5" />

    <!-- Heavy Agricultural Cane Weave Lines -->
    <g stroke="#8B4D16" stroke-width="3" opacity="0.75">
      <path d="M85 210 Q250 260 415 210" fill="none" />
      <path d="M102 250 Q250 300 398 250" fill="none" />
      <path d="M130 290 Q250 335 370 290" fill="none" />

      <!-- Radiating Sturdy Bamboo Splints -->
      <path d="M90 180 Q140 280 200 335" fill="none" stroke-width="3.5" />
      <path d="M140 175 Q180 270 230 338" fill="none" stroke-width="3.5" />
      <path d="M200 172 L250 340" fill="none" stroke-width="3.5" />
      <path d="M300 172 L250 340" fill="none" stroke-width="3.5" />
      <path d="M360 175 Q320 270 270 338" fill="none" stroke-width="3.5" />
      <path d="M410 180 Q360 280 300 335" fill="none" stroke-width="3.5" />
    </g>

    <!-- Extremely Thick Double-Rim Edge for Carrying Heavy Loads -->
    <ellipse cx="250" cy="170" rx="175" ry="30" fill="none" stroke="#482205" stroke-width="16" />
    <ellipse cx="250" cy="170" rx="175" ry="30" fill="none" stroke="#ECAE56" stroke-width="10" stroke-dasharray="16 8" />

    <!-- Side Grip Ropes -->
    <path d="M68 170 Q50 195 72 205" fill="none" stroke="#3A1C04" stroke-width="6" stroke-linecap="round" />
    <path d="M432 170 Q450 195 428 205" fill="none" stroke="#3A1C04" stroke-width="6" stroke-linecap="round" />
  </g>
</svg>
`);

// 12. Artisan Portraits (Ramaiah, Lakshmi, Subba Rao, Sarada)
function writeArtisan(filename, name, craft, bgTone, avatarColor) {
  writeSvg(filename, `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="artBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgTone}" />
      <stop offset="100%" stop-color="#E5D3B8" />
    </linearGradient>
    <filter id="artShadow">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#2D1F10" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="400" height="400" fill="url(#artBg)" />

  <!-- Artisan Silhouette & Craft Representation -->
  <g filter="url(#artShadow)">
    <!-- Decorative Bamboo Ring Frame -->
    <circle cx="200" cy="180" r="140" fill="#FFFDF8" stroke="#7A4A1B" stroke-width="8" />
    <circle cx="200" cy="180" r="140" fill="none" stroke="#D4A373" stroke-width="4" stroke-dasharray="14 6" />

    <!-- Avatar Character -->
    <!-- Torso / Traditional Kurta -->
    <path d="M120 320 C120 250 280 250 280 320 Z" fill="${avatarColor}" stroke="#3A240E" stroke-width="3" />
    <!-- Traditional Angavastram / Shawl -->
    <path d="M140 260 Q170 320 180 320 L210 320 Q200 270 170 255 Z" fill="#D85A32" />

    <!-- Head & Face -->
    <ellipse cx="200" cy="180" rx="55" ry="68" fill="#D79E6F" stroke="#4A2508" stroke-width="3" />
    
    <!-- Hair / Head Turban -->
    <path d="M145 160 C145 105 255 105 255 160 C245 135 155 135 145 160 Z" fill="#FFFFFF" stroke="#8C4F1C" stroke-width="3" />
    <path d="M140 145 C150 115 250 115 260 145 Z" fill="#F4A261" opacity="0.7"/>

    <!-- Eyes, Mustache, Traditional Tilak -->
    <ellipse cx="180" cy="175" rx="5" ry="3" fill="#2B1605" />
    <ellipse cx="220" cy="175" rx="5" ry="3" fill="#2B1605" />
    <path d="M198 150 L202 150 L200 162 Z" fill="#D90429" /> <!-- Red Tilak -->
    <!-- Smiling Mustache -->
    <path d="M175 205 Q200 215 225 205 Q210 220 175 205 Z" fill="#3D1E07" />

    <!-- Traditional Woven Bamboo Craft in Hand -->
    <ellipse cx="200" cy="300" rx="60" ry="25" fill="#D4A373" stroke="#60300A" stroke-width="4" />
    <ellipse cx="200" cy="300" rx="60" ry="25" fill="none" stroke="#FFE1A8" stroke-width="2" stroke-dasharray="8 4" />
  </g>

  <!-- Name Plaque -->
  <g transform="translate(50, 335)">
    <rect width="300" height="48" rx="24" fill="#1B4332" />
    <text x="150" y="24" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle">${name}</text>
    <text x="150" y="40" font-family="'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="#95D5B2" text-anchor="middle">${craft}</text>
  </g>
</svg>
`);
}

writeArtisan('artisan-ramaiah.svg', 'Medara Ramaiah', 'Master Weaver • East Godavari (35 yrs exp)', '#F5EBE0', '#2D6A4F');
writeArtisan('artisan-lakshmi.svg', 'P. Lakshmi Devi', 'Winnowing Specialist • Chittoor (28 yrs exp)', '#EDF2F4', '#934B22');
writeArtisan('artisan-subba-rao.svg', 'K. Subba Rao', 'Bamboo Sieve Artisan • Warangal (30 yrs exp)', '#F3E9DC', '#1D3557');
writeArtisan('artisan-sarada.svg', 'Ch. Saradamma', 'Fruit & Utility Baskets • Srikakulam (22 yrs exp)', '#F7EDE2', '#582F0E');

// 13. Hero Banner Background SVG
writeSvg('banner-bg.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 480" width="100%" height="100%" preserveAspectRatio="none">
  <defs>
    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B4332" />
      <stop offset="60%" stop-color="#2D6A4F" />
      <stop offset="100%" stop-color="#40916C" />
    </linearGradient>
    <linearGradient id="warmLight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4A373" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#FFE0B2" stop-opacity="0.05" />
    </linearGradient>
  </defs>

  <rect width="1400" height="480" fill="url(#heroGrad)" />
  <rect width="1400" height="480" fill="url(#warmLight)" />

  <!-- Stylized Bamboo Forest Background Silhouettes -->
  <g opacity="0.18" fill="#D8F3DC">
    <!-- Bamboo Stalks -->
    <rect x="950" y="0" width="24" height="480" rx="8" />
    <rect x="1040" y="0" width="18" height="480" rx="6" />
    <rect x="1120" y="0" width="30" height="480" rx="10" />
    <rect x="1220" y="0" width="22" height="480" rx="7" />
    <rect x="1310" y="0" width="26" height="480" rx="8" />

    <!-- Stalk segments rings -->
    <line x1="940" y1="120" x2="980" y2="120" stroke="#FFFFFF" stroke-width="4" />
    <line x1="940" y1="260" x2="980" y2="260" stroke="#FFFFFF" stroke-width="4" />
    <line x1="940" y1="390" x2="980" y2="390" stroke="#FFFFFF" stroke-width="4" />

    <line x1="1110" y1="140" x2="1160" y2="140" stroke="#FFFFFF" stroke-width="4" />
    <line x1="1110" y1="290" x2="1160" y2="290" stroke="#FFFFFF" stroke-width="4" />
  </g>

  <!-- Bamboo Leaves Silhouettes -->
  <g opacity="0.22" fill="#74C69D">
    <path d="M1040 180 Q1120 140 1160 170 Q1100 200 1040 180 Z" />
    <path d="M1120 140 Q1220 90 1260 130 Q1190 160 1120 140 Z" />
    <path d="M1220 220 Q1310 180 1350 210 Q1280 240 1220 220 Z" />
    <path d="M960 260 Q1040 220 1080 250 Q1020 280 960 260 Z" />
  </g>

  <!-- Organic Wave Divider Bottom -->
  <path d="M0 480 L0 440 Q350 410 700 445 T1400 440 L1400 480 Z" fill="#FDFBF7" />
</svg>
`);

console.log('All image assets created successfully!');

// 14. Additional traditional crafts
writeSvg('coarse-sieve.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgCS" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCF9F2" />
      <stop offset="100%" stop-color="#EEE2CE" />
    </linearGradient>
    <pattern id="hexMesh" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="#F8EED9" />
      <polygon points="8,0 16,4 16,12 8,16 0,12 0,4" fill="none" stroke="#B8803E" stroke-width="1.8" />
    </pattern>
    <filter id="shadowCS">
      <feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#3A240E" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="500" height="400" fill="url(#bgCS)" />
  <ellipse cx="250" cy="340" rx="160" ry="28" fill="#3D2914" opacity="0.25" filter="blur(7px)" />
  <g filter="url(#shadowCS)">
    <path d="M90 200 C90 270 410 270 410 200 L410 230 C410 300 90 300 90 230 Z" fill="#8B4D16" stroke="#4A2508" stroke-width="2" />
    <ellipse cx="250" cy="200" rx="160" ry="65" fill="url(#hexMesh)" stroke="#B37837" stroke-width="3" />
    <path d="M90 180 C90 110 410 110 410 180 L410 200 C410 270 90 270 90 200 Z" fill="#A86326" stroke="#4A2508" stroke-width="2" />
    <ellipse cx="250" cy="180" rx="160" ry="55" fill="none" stroke="#522706" stroke-width="12" />
    <ellipse cx="250" cy="180" rx="160" ry="55" fill="none" stroke="#FFE7B0" stroke-width="6" stroke-dasharray="16 6" />
  </g>
</svg>
`);

writeSvg('bamboo-craft-pot.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgCP" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCF9F2" />
      <stop offset="100%" stop-color="#ECE1CA" />
    </linearGradient>
    <linearGradient id="potWood" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8C5824" />
      <stop offset="50%" stop-color="#D9A566" />
      <stop offset="100%" stop-color="#6E3A0E" />
    </linearGradient>
    <filter id="shadowCP">
      <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#3A240E" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="500" height="400" fill="url(#bgCP)" />
  <ellipse cx="250" cy="355" rx="110" ry="20" fill="#3D2914" opacity="0.25" filter="blur(6px)" />
  <g filter="url(#shadowCP)">
    <!-- Natural bamboo cylinder section cut pot -->
    <path d="M180 120 L190 330 C190 350 310 350 310 330 L320 120 Z" fill="url(#potWood)" stroke="#522706" stroke-width="3" />
    <!-- Natural bamboo node ring -->
    <path d="M185 240 Q250 255 315 240" fill="none" stroke="#482205" stroke-width="8" />
    <path d="M185 240 Q250 255 315 240" fill="none" stroke="#FFDF9B" stroke-width="3" />
    <!-- Hand carved traditional floral etching -->
    <g stroke="#3D1A04" stroke-width="2" fill="none" opacity="0.8">
      <path d="M220 180 Q250 160 280 180 Q250 200 220 180 Z" />
      <circle cx="250" cy="180" r="5" fill="#3D1A04" />
      <path d="M225 280 Q250 265 275 280 Q250 295 225 280 Z" />
    </g>
    <!-- Top Hollow Opening -->
    <ellipse cx="250" cy="120" rx="70" ry="20" fill="#2E1705" stroke="#522706" stroke-width="4" />
    <ellipse cx="250" cy="120" rx="60" ry="16" fill="#1A0D03" />
  </g>
</svg>
`);

console.log('Additional crafts generated!');
