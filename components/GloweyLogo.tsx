export function GloweyLogo() {
  return (
    <span className="flex items-center gap-1.5 font-bold text-lg">
      <svg
        width="22"
        height="22"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="glowey-logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#0099BB" />
          </linearGradient>
        </defs>
        {/* Stylised "spark" — matches the Glowey identity */}
        <path
          d="M16 3 L19.5 12.5 L29 16 L19.5 19.5 L16 29 L12.5 19.5 L3 16 L12.5 12.5 Z"
          fill="url(#glowey-logo-grad)"
        />
      </svg>
      <span style={{ color: '#00D4FF' }}>Glowey</span>
      <span className="text-xs font-medium opacity-60 ml-0.5">Docs</span>
    </span>
  );
}
