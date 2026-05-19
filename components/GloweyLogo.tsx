import Image from 'next/image';

export function GloweyLogo() {
  return (
    <span className="flex items-center gap-2 font-bold text-lg">
      <Image
        src="/logo.png"
        alt="Glowey"
        width={24}
        height={24}
        priority
        style={{ width: 24, height: 24, objectFit: 'contain' }}
      />
      <span style={{ color: '#00D4FF' }}>Glowey</span>
      <span className="text-xs font-medium opacity-60 ml-0.5">Docs</span>
    </span>
  );
}
