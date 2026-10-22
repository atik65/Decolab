import { Locale } from "./content";

const items: Record<Locale, string[]> = {
  en: [
    "Illuminated signage",
    "LED house numbers",
    "3D letters",
    "Banner and Flash Printing",
  ],
  ar: [
    "لافتات مضيئة",
    "أرقام منازل LED",
    "حروف ثلاثية الأبعاد",
    "طباعة البانر والفلاش",
  ],
};

const CRESCENT = "M239 70 A150 150 0 1 0 389 277 A128 128 0 1 1 239 70Z";
const STAR =
  "330.0,220.0 341.2,250.6 373.7,251.8 348.1,271.9 357.0,303.2 330.0,285.0 303.0,303.2 311.9,271.9 286.3,251.8 318.8,250.6";

/**
 * "Hilal" – Decolab's lit crescent lightbox (with its little star) come to
 * life, holding a villa number plate in front of a halo-lit palm sign.
 * Modelled on the real products; pure SVG + CSS animation.
 */
const Mascot = ({ locale }: { locale: Locale }) => (
  <div className="cn-mascot cn-rv">
    <svg
      className="cn-mascot-svg"
      viewBox="0 0 520 420"
      role="img"
      aria-label={
        locale === "ar"
          ? "تميمة ديكولاب: هلال مضيء يحمل لوحة رقم فيلا"
          : "Decolab mascot: an illuminated crescent holding a villa number plate"
      }
    >
      <defs>
        {/* Islamic 8-point star lattice, as laser-cut on the crescent */}
        <pattern
          id="mc-lattice"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <rect width="30" height="30" className="mc-lattice-bg" />
          <g className="mc-lattice-lines">
            <rect x="8" y="8" width="14" height="14" />
            <polygon points="15,5.1 24.9,15 15,24.9 5.1,15" />
            <path d="M15 0v5M15 25v5M0 15h5M25 15h5" />
          </g>
        </pattern>
        <radialGradient id="mc-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#ffb347" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
        <clipPath id="mc-crescent-clip">
          <path d={CRESCENT} />
        </clipPath>
      </defs>

      {/* 3D house-number plate on the villa wall, with its lantern */}
      <g className="mc-house">
        <rect x="392" y="22" width="118" height="150" rx="12" className="mc-wall" />
        <path d="M392 50 h118" className="mc-cornice" />
        <path d="M392 150 h118 M392 160 h118" className="mc-wall-line" />
        <ellipse cx="452" cy="104" rx="56" ry="58" fill="url(#mc-halo)" className="mc-halo" />

        {/* lantern on the cornice */}
        <g className="mc-lantern">
          <path d="M452 4 v5" className="mc-lantern-hook" />
          <path d="M440 18 L452 9 L464 18 Z" className="mc-lantern-metal" />
          <rect x="442" y="18" width="20" height="24" rx="2" className="mc-lantern-glass" />
          <path d="M452 22 v16 M446 30 h12" className="mc-lantern-bars" />
          <rect x="440" y="42" width="24" height="5" rx="1.5" className="mc-lantern-metal" />
        </g>

        {/* the plate: offset back layer gives the 3D depth */}
        <rect x="425" y="66" width="70" height="92" rx="2" className="mc-house-depth" />
        <g className="mc-house-plate">
          <rect x="419" y="60" width="70" height="92" rx="2" className="mc-house-face" />
          <text x="454" y="80" textAnchor="middle" className="mc-house-label">
            HOUSE
          </text>
          <text x="454" y="106" textAnchor="middle" className="mc-house-num">
            297
          </text>
          {/* laser-cut mosaic, lit from behind */}
          <g className="mc-mosaic">
            <polygon points="426,116 434,120 428,128" />
            <polygon points="436,121 447,126 438,132" />
            <polygon points="449,126 460,128 452,134" />
            <polygon points="462,129 476,130 468,136" />
            <polygon points="426,131 436,135 427,143" />
            <polygon points="439,135 452,137 444,144" />
            <polygon points="455,137 468,139 460,145" />
            <polygon points="470,138 482,138 478,145" />
            <polygon points="428,146 444,147 436,149" />
            <polygon points="447,147 466,148 456,149" />
          </g>
        </g>
      </g>

      {/* stepping stones from the garden shot */}
      <ellipse cx="420" cy="396" rx="40" ry="10" className="mc-stone" />
      <ellipse cx="488" cy="384" rx="26" ry="7" className="mc-stone" />

      <ellipse cx="250" cy="384" rx="140" ry="12" className="mc-shadow" />

      {/* the crescent lightbox */}
      <g className="mc-rock">
        <g className="mc-crescent">
          <g clipPath="url(#mc-crescent-clip)">
            <rect x="90" y="60" width="320" height="320" fill="url(#mc-lattice)" />
          </g>
          <path d={CRESCENT} className="mc-frame" />
        </g>

        {/* face on the thick of the moon */}
        <ellipse cx="141" cy="222" rx="30" ry="36" className="mc-face" />
        <g className="mc-eyes">
          <ellipse cx="129" cy="212" rx="5.5" ry="7.5" />
          <ellipse cx="155" cy="212" rx="5.5" ry="7.5" />
        </g>
        <circle cx="121" cy="230" r="5" className="mc-cheek" />
        <circle cx="163" cy="230" r="5" className="mc-cheek" />
        <path d="M131 236 Q142 247 153 236" className="mc-smile" />

        {/* arm + villa number plate */}
        <g className="mc-hold">
          <path d="M118 266 Q 108 274 100 286" className="mc-arm" />
          <g transform="rotate(-6 56 336)">
            <rect x="10" y="284" width="92" height="104" rx="4" className="mc-plate" />
            <text x="56" y="322" textAnchor="middle" className="mc-plate-villa">
              Villa
            </text>
            <text x="56" y="372" textAnchor="middle" className="mc-plate-num">
              73
            </text>
          </g>
          <circle cx="100" cy="286" r="8" className="mc-hand" />
        </g>

        {/* the little star sidekick resting on the lower horn */}
        <g className="mc-star">
          <g className="mc-star-hop">
            <polygon points={STAR} fill="url(#mc-lattice)" className="mc-star-body" />
            <circle cx="322" cy="266" r="3.2" className="mc-star-eye" />
            <circle cx="338" cy="266" r="3.2" className="mc-star-eye" />
          </g>
        </g>
      </g>

      {/* sparkles */}
      <circle cx="70" cy="120" r="4" className="mc-spark" />
      <circle cx="380" cy="200" r="3" className="mc-spark mc-spark-2" />
      <circle cx="200" cy="40" r="3.5" className="mc-spark mc-spark-3" />
    </svg>

    <ul className="cn-mascot-tags">
      {items[locale].map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  </div>
);

export default Mascot;
