// Dr. B. R. Ambedkar National Institute of Technology Jalandhar - Vector Logo Generator
function getNitjLogoSvg(size = 180) {
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="nitj-emblem-svg">
    <defs>
      <!-- Circular text paths -->
      <!-- Top Arc for Institute Name -->
      <path id="topTextPath" d="M 68 200 A 132 132 0 1 1 332 200" fill="none" />
      <!-- Bottom Arc for City Name -->
      <path id="bottomTextPath" d="M 320 200 A 120 120 0 0 1 80 200" fill="none" />
      
      <!-- Radial gradient for center sunburst -->
      <radialGradient id="sunburstGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ff9900" />
        <stop offset="70%" stop-color="#ff7700" />
        <stop offset="100%" stop-color="#cc5500" />
      </radialGradient>
      
      <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#f0f0f0"/>
      </linearGradient>
    </defs>

    <!-- Outer Gear / Cog Wheel (16 cogs) -->
    <g fill="#1a1a1a" stroke="#1a1a1a" stroke-width="1.5">
      <!-- 16 Cogs generated systematically -->
      ${Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return `<rect x="187" y="16" width="26" height="24" rx="2" transform="rotate(${angle} 200 200)" />`;
      }).join('\n')}
      <!-- Outer Ring circle -->
      <circle cx="200" cy="200" r="168" fill="#ffffff" stroke="#1a1a1a" stroke-width="4" />
      <!-- Secondary Inner Ring -->
      <circle cx="200" cy="200" r="142" fill="#ffffff" stroke="#1a1a1a" stroke-width="3" />
      <!-- Center Circle Boundary -->
      <circle cx="200" cy="200" r="95" fill="#ffffff" stroke="#1a1a1a" stroke-width="3" />
    </g>

    <!-- Top Circular Text: DR. B. R. AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY -->
    <text font-family="'Times New Roman', Georgia, serif" font-size="12.5" font-weight="bold" fill="#111111" letter-spacing="1.2px">
      <textPath href="#topTextPath" startOffset="50%" text-anchor="middle">
        • DR. B. R. AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY •
      </textPath>
    </text>

    <!-- Bottom Circular Text: JALANDHAR -->
    <text font-family="'Times New Roman', Georgia, serif" font-size="13.5" font-weight="bold" fill="#111111" letter-spacing="3.5px">
      <textPath href="#bottomTextPath" startOffset="50%" text-anchor="middle">
        • JALANDHAR •
      </textPath>
    </text>

    <!-- Inner Core: Sunburst Rays & Atom / Flame -->
    <g id="centerSymbol">
      <!-- Sunburst background rays -->
      <g stroke="#e67e22" stroke-width="2.5" opacity="0.95">
        ${Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          return `<line x1="200" y1="200" x2="200" y2="114" transform="rotate(${angle} 200 200)" />`;
        }).join('\n')}
      </g>
      
      <!-- Inner radiant circle -->
      <circle cx="200" cy="200" r="44" fill="#ffeedd" stroke="#d35400" stroke-width="2" />

      <!-- Atomic Orbitals (Ellipses) -->
      <g fill="none" stroke="#2c3e50" stroke-width="2.8">
        <!-- Horizontal Orbit -->
        <ellipse cx="200" cy="200" rx="42" ry="14" />
        <!-- Diagonal Orbit 1 (60 deg) -->
        <ellipse cx="200" cy="200" rx="42" ry="14" transform="rotate(60 200 200)" />
        <!-- Diagonal Orbit 2 (120 deg) -->
        <ellipse cx="200" cy="200" rx="42" ry="14" transform="rotate(120 200 200)" />
      </g>

      <!-- Center Flame / Torch Element -->
      <g fill="#d35400" stroke="#962d00" stroke-width="1">
        <!-- Torch Flame -->
        <path d="M 200 178 C 193 186 190 193 194 201 C 196 205 200 209 200 209 C 200 209 204 205 206 201 C 210 193 207 186 200 178 Z" fill="#e74c3c" />
        <path d="M 200 185 C 196 190 195 195 197 199 C 198 201 200 204 200 204 C 200 204 202 201 203 199 C 205 195 204 190 200 185 Z" fill="#f39c12" />
        <!-- Central Nucleus Dot -->
        <circle cx="200" cy="200" r="4.5" fill="#2c3e50" />
      </g>
    </g>

    <!-- Bottom Ribbon / Banner: सरस्वती नमस्तुभ्यं -->
    <g id="mottoRibbon">
      <!-- Ribbon shape background -->
      <path d="M 125 358 C 160 375 240 375 275 358 L 290 380 C 245 396 155 396 110 380 Z" fill="#ffffff" stroke="#111111" stroke-width="2.5" />
      <path d="M 110 380 L 98 368 L 125 358 Z" fill="#dddddd" stroke="#111111" stroke-width="2" />
      <path d="M 290 380 L 302 368 L 275 358 Z" fill="#dddddd" stroke="#111111" stroke-width="2" />
      
      <!-- Motto Path for Text -->
      <path id="ribbonTextPath" d="M 120 377 C 160 389 240 389 280 377" fill="none" />
      <text font-family="'Noto Sans Devanagari', 'Mangal', 'Times New Roman', serif" font-size="14" font-weight="bold" fill="#111111" letter-spacing="1px">
        <textPath href="#ribbonTextPath" startOffset="50%" text-anchor="middle">
          सरस्वती नमस्तुभ्यं
        </textPath>
      </text>
    </g>
  </svg>
  `;
}

if (typeof window !== 'undefined') {
  window.getNitjLogoSvg = getNitjLogoSvg;
}
