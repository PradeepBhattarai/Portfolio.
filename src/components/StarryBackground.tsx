/**
 * Minimalist monochrome backdrop — a subtle dot grid.
 * No animations, no colors. Just texture.
 */
export const StarryBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.35] dark:opacity-[0.18]"
      style={{
        backgroundImage:
          'radial-gradient(circle, hsl(var(--foreground) / 0.5) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage:
          'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }}
    />
  );
};
