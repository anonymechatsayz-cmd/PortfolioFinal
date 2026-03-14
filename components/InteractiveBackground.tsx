import React, { useEffect, useRef, useState } from 'react';

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            animate();
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0 }
    );
    
    observer.observe(canvas);

    const colors = [
      'rgba(26, 29, 41, 0.4)',   // Anthracite
      'rgba(30, 58, 76, 0.3)',   // Petrol
      'rgba(212, 165, 116, 0.4)', // Sand
    ];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      depth: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.depth = Math.random(); // 0 to 1, used for parallax and size
        
        // Closer particles are larger and faster
        this.size = (Math.random() * 2 + 0.5) * (this.depth + 0.5); 
        this.vx = (Math.random() - 0.5) * 0.1 * (this.depth + 0.5);
        this.vy = (Math.random() - 0.5) * 0.1 * (this.depth + 0.5);
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Mouse interaction (Parallax / Gentle push)
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distSq = dx * dx + dy * dy;
        const maxDist = 250;
        const maxDistSq = 62500; // 250 * 250

        if (distSq < maxDistSq) {
          const distance = Math.sqrt(distSq);
          const force = (maxDist - distance) / maxDist;
          // Gentle drift away
          this.x -= (dx / distance) * force * 0.5 * this.depth;
          this.y -= (dy / distance) * force * 0.5 * this.depth;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Removed shadowBlur as it is a massive CPU/GPU bottleneck in Canvas 2D
      }
    }

    const init = () => {
      particles = [];
      // Respect reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Higher density for the pixel dust effect, but optimized for mobile
      const particleCount = window.innerWidth < 768 ? 30 : 150;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      // Cancel any existing frame before requesting a new one to prevent multiple loops
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(animate);
    };

    let canvasRect = canvas.getBoundingClientRect();

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        canvasRect = canvas.getBoundingClientRect();
      }
      init();
    };

    const handleScroll = () => {
      canvasRect = canvas.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX - canvasRect.left,
        y: e.clientY - canvasRect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    resize();
    // animate() is started by the IntersectionObserver when the canvas is visible
    // Do not call it here to avoid double loops

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  if (isMobile) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-cream via-sand/10 to-cream animate-fluid" />
    );
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
