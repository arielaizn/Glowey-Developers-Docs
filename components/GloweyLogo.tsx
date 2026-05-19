export function GloweyLogo() {
  return (
    <span className="flex items-center gap-1.5 font-bold text-lg">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z"
          fill="#FF6B35"
        />
      </svg>
      <span style={{ color: '#FF6B35' }}>Glowey</span>
      <span className="text-xs font-medium opacity-60 ml-0.5">Docs</span>
    </span>
  );
}
