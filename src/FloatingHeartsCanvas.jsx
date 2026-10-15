import { useEffect, useRef } from 'react';

export default function FloatingHeartsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Heart drawing helper
    const drawHeart = (ctx, x, y, size, color, alpha = 1, rotation = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = color;

      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
      // top right curve
      ctx.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Particles system
    const floatingHearts = [];
    const colors = ['#f43f5e', '#fb7185', '#ec4899', '#fda4af', '#f472b6', '#fde047'];

    for (let i = 0; i < 35; i++) {
      floatingHearts.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 14 + 8,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    // Sparkles created by cursor or clicks
    const sparkles = [];

    const addSparkle = (x, y, count = 2) => {
      for (let i = 0; i < count; i++) {
        sparkles.push({
          x,
          y,
          size: Math.random() * 10 + 6,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          isHeart: Math.random() > 0.4,
        });
      }
    };

    const handlePointerMove = (e) => {
      const x = e.clientX || (e.touches && e.touches[0]?.clientX);
      const y = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (x !== undefined && y !== undefined && Math.random() > 0.5) {
        addSparkle(x, y, 1);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Event listener for huge love confetti celebration
    const handleLoveBurst = (e) => {
      const originX = e.detail?.x || width / 2;
      const originY = e.detail?.y || height / 2;
      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9 + 3;
        sparkles.push({
          x: originX,
          y: originY,
          size: Math.random() * 18 + 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.012 + 0.008,
          isHeart: true,
        });
      }
    };
    window.addEventListener('love-burst', handleLoveBurst);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update floating hearts
      for (let i = 0; i < floatingHearts.length; i++) {
        const h = floatingHearts[i];
        h.y -= h.speedY;
        h.wobble += 0.03;
        h.x += Math.sin(h.wobble) * 0.6 + h.speedX;
        h.rotation += h.rotSpeed;

        if (h.y < -30) {
          h.y = height + 20;
          h.x = Math.random() * width;
        }
        if (h.x < -30) h.x = width + 20;
        if (h.x > width + 30) h.x = -20;

        drawHeart(ctx, h.x, h.y, h.size, h.color, h.alpha, h.rotation);
      }

      // Render & update interactive sparkles / burst hearts
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08; // gentle gravity
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        if (s.isHeart) {
          drawHeart(ctx, s.x, s.y, s.size, s.color, s.alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, s.alpha);
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('love-burst', handleLoveBurst);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}
