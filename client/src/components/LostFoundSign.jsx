export default function LostFoundSign({ className = "" }) {
  const dark = "#1f2937";
  const yellow = "#FACC15";

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Lost and found sign">
      <rect x="10" y="10" width="380" height="380" rx="28" fill={yellow} />
      <rect x="24" y="24" width="352" height="352" rx="20" fill="none" stroke={dark} strokeWidth="6" />

      <rect x="130" y="110" width="150" height="120" rx="16" fill={dark} />
      <rect x="180" y="94" width="50" height="22" rx="8" fill="none" stroke={dark} strokeWidth="6" />
      <line x1="160" y1="110" x2="160" y2="230" stroke={yellow} strokeWidth="4" />
      <line x1="250" y1="110" x2="250" y2="230" stroke={yellow} strokeWidth="4" />
      <text x="205" y="196" textAnchor="middle" fontSize="76" fontWeight="800" fill={yellow} fontFamily="Poppins, sans-serif">?</text>

      <g transform="rotate(-12 95 195)">
        <rect x="60" y="130" width="70" height="130" rx="12" fill={yellow} stroke={dark} strokeWidth="6" />
        <circle cx="95" cy="145" r="3.5" fill={dark} />
      </g>

      <g transform="rotate(8 300 190)">
        <g transform="rotate(-14 300 148)">
          <rect x="265" y="122" width="72" height="42" rx="5" fill={yellow} stroke={dark} strokeWidth="4" />
          <circle cx="301" cy="143" r="9" fill="none" stroke={dark} strokeWidth="3" />
        </g>
        <rect x="250" y="150" width="100" height="80" rx="12" fill={dark} />
        <rect x="328" y="174" width="30" height="28" rx="7" fill={dark} />
        <circle cx="344" cy="188" r="5" fill={yellow} />
      </g>

      <circle cx="215" cy="238" r="34" fill={yellow} fillOpacity="0.35" stroke={dark} strokeWidth="8" />
      <line x1="190" y1="264" x2="150" y2="306" stroke={dark} strokeWidth="14" strokeLinecap="round" />

      <line x1="50" y1="324" x2="350" y2="324" stroke={dark} strokeWidth="4" strokeLinecap="round" />
      <text x="200" y="360" textAnchor="middle" fontSize="34" fontWeight="800" fill={dark} fontFamily="Poppins, sans-serif">LOST &amp; FOUND</text>
    </svg>
  );
}