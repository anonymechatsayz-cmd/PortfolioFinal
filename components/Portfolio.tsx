import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue, useInView, AnimatePresence, useSpring, useMotionValue, animate, useMotionValueEvent, PanInfo } from 'framer-motion';
import { ArrowUpRight, X, ArrowRight, Layers, Smartphone, Globe, Star } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FluidButton } from './FluidButton';
import { useNavigate, Link } from 'react-router-dom';
import { projects, Project } from '../data/projects';
import { OptimizedImage } from './OptimizedImage';

// --- COMPONENTS ---

const AnimatedFog = ({ activeColor }: { activeColor: string }) => {
  const fogRef = useRef<THREE.Fog>(null);
  const targetColor = useMemo(() => new THREE.Color(activeColor), [activeColor]);

  useFrame((state, delta) => {
    if (fogRef.current) {
      fogRef.current.color.lerp(targetColor, delta * 2);
    }
  });

  return <fog ref={fogRef} attach="fog" args={[activeColor, 10, 35]} />;
};

const ParticlesWave = ({ activeTextColor, dragX }: { activeTextColor: string, dragX?: MotionValue<number> }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const targetColor = useMemo(() => new THREE.Color(activeTextColor), [activeTextColor]);

  // Create a denser grid of points for a more fluid, fabric-like feel
  const { positions, initialPositions, gridSize } = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const size = isMobile ? 25 : 35; // Reduced for better performance
    const spacing = isMobile ? 1.8 : 1.4;
    const count = size * size;
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    let i = 0;
    for (let x = -size/2; x < size/2; x++) {
      for (let z = -size/2; z < size/2; z++) {
        const px = x * spacing;
        const pz = z * spacing;
        pos[i] = px;
        pos[i + 1] = 0; // y
        pos[i + 2] = pz;

        initPos[i] = px;
        initPos[i + 1] = 0;
        initPos[i + 2] = pz;
        i += 3;
      }
    }
    return { positions: pos, initialPositions: initPos, gridSize: size };
  }, []);

  // For smooth mouse tracking
  const mousePos = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Smooth mouse interpolation
    mousePos.current.x += (state.pointer.x - mousePos.current.x) * 0.05;
    mousePos.current.y += (state.pointer.y - mousePos.current.y) * 0.05;

    // Map mouse to 3D space (approximate projection to the grid plane)
    const mx = mousePos.current.x * 25;
    const mz = -mousePos.current.y * 25 - 10; 

    // Get drag velocity for synergy effect
    const velocity = dragX ? dragX.getVelocity() : 0;
    const safeVelocity = isNaN(velocity) ? 0 : velocity;
    
    // Smooth out the intensity to avoid sudden jumps
    const targetIntensity = Math.min(Math.abs(safeVelocity) / 1500, 1);
    // We store the smoothed intensity in a ref to lerp it
    if (!pointsRef.current.userData.dragIntensity) pointsRef.current.userData.dragIntensity = 0;
    pointsRef.current.userData.dragIntensity += (targetIntensity - pointsRef.current.userData.dragIntensity) * 0.1;
    const dragIntensity = pointsRef.current.userData.dragIntensity;

    let i = 0;
    for (let x = -gridSize/2; x < gridSize/2; x++) {
      for (let z = -gridSize/2; z < gridSize/2; z++) {
        const px = initialPositions[i];
        const pz = initialPositions[i + 2];

        // 1. Organic flowing waves (multi-layered sine waves for complexity)
        // Only change amplitude to prevent phase jumping (which causes the glitch)
        const ampMult = 1 + dragIntensity * 2.5;

        let y = (Math.sin(px * 0.1 + time * 0.3) * 1.2 
              + Math.cos(pz * 0.15 + time * 0.2) * 1.2
              + Math.sin((px + pz) * 0.05 + time * 0.1) * 1.5) * ampMult;

        // 2. Mouse interaction (creates a ripple/repulsion effect)
        const dx = px - mx;
        const dz = pz - mz;
        const distSq = dx * dx + dz * dz;
        const maxDistSq = 64; // 8 * 8
        
        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const maxDist = 8;
          // Create a gentle dip or rise around the mouse
          const influence = Math.pow(1 - dist / maxDist, 2); // Smoother falloff
          y += influence * 3 * Math.sin(time * 3 - dist * 2); // Ripple effect
        }

        positions[i + 1] = y;
        i += 3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Smoothly interpolate color
    if (pointsRef.current.material) {
      (pointsRef.current.material as THREE.PointsMaterial).color.lerp(targetColor, delta * 2);
    }
    
    // Very slow, majestic rotation
    pointsRef.current.rotation.y = Math.sin(time * 0.03) * 0.05;
    pointsRef.current.rotation.z = Math.cos(time * 0.02) * 0.02;
  });

  return (
    <points ref={pointsRef} position={[0, -5, -15]} rotation={[Math.PI / 8, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={activeTextColor}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const WebGLBackground = ({ activeColor, activeTextColor, dragX }: { activeColor: string, activeTextColor: string, dragX?: MotionValue<number> }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <AnimatedFog activeColor={activeColor} />
        <ParticlesWave activeTextColor={activeTextColor} dragX={dragX} />
      </Canvas>
      {/* Subtle Grain/Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />
    </div>
  );
};

const MagneticButton = ({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const Cursor = ({ cursorState, mouseX, mouseY }: { cursorState: string, mouseX: any, mouseY: any }) => {
  const isVisible = cursorState !== 'default';
  
  // Hide custom cursor on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;
  
  return (
    <motion.div 
      className="fixed pointer-events-none z-[150] flex items-center justify-center top-0 left-0"
      variants={{
        initial: { scale: 0, opacity: 0 },
        visible: { scale: 1, opacity: 1 }
      }}
      animate={isVisible ? "visible" : "initial"}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ 
        x: mouseX, 
        y: mouseY,
      }}
    >
      <motion.div 
        className="w-24 h-24 -ml-12 -mt-12 rounded-full flex items-center justify-center font-bold text-[10px] tracking-widest uppercase shadow-2xl"
        animate={{
          scale: cursorState === 'view' ? 1 : 0.85,
          backgroundColor: cursorState === 'view' ? '#C9A56B' : '#ffffff',
          color: cursorState === 'view' ? '#ffffff' : '#000000',
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {cursorState === 'view' && 'VOIR'}
        {cursorState === 'drag' && 'GLISSER'}
        {cursorState === 'prev' && <ArrowRight className="w-6 h-6 rotate-180" />}
        {cursorState === 'next' && <ArrowRight className="w-6 h-6" />}
      </motion.div>
    </motion.div>
  );
};

const CarouselCard = ({ 
  project, 
  index, 
  animatedDragX,
  DRAG_FACTOR,
  centerCard,
  onClick,
  setCursorState,
  isDragging,
  isPointerDown,
  totalCards,
  isSectionInView,
}: { 
  project: Project, 
  index: number, 
  animatedDragX: MotionValue<number>,
  DRAG_FACTOR: number,
  centerCard: (idx: number) => void,
  onClick: () => void,
  setCursorState: (state: string) => void,
  isDragging: boolean,
  isPointerDown: boolean,
  totalCards: number,
  isSectionInView: boolean,
}) => {
  const offset = useTransform(animatedDragX, (x) => {
    const factor = DRAG_FACTOR || 1; // Prevent division by zero
    return index + x / factor;
  });
  
  const cardRef = useRef<HTMLDivElement>(null);
  const lastMouseY = useRef<number | null>(null);
  const isHovered = useRef(false);

  // --- ENTRY ANIMATION ---
  const entryProgress = useSpring(0, {
    stiffness: 45,
    damping: 14,
    mass: 0.8,
  });

  useEffect(() => {
    if (isSectionInView) {
      const timeout = setTimeout(() => {
        entryProgress.set(1);
      }, index * 120);
      return () => clearTimeout(timeout);
    }
  }, [isSectionInView, index, entryProgress]);

  const RADIUS = DRAG_FACTOR * 1.2;
  const ANGLE = 360 / totalCards;

  const theta = useTransform(offset, (v) => (v || 0) * ANGLE);
  
  // Circular 3D Carousel Effect + Entry Animation
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const z = useMotionValue(0);
  const x = useMotionValue(0);
  const scale = useMotionValue(0.3);
  const opacity = useMotionValue(0);
  const zIndex = useMotionValue(0);
  const blur = useMotionValue("blur(20px)");

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  const updateTransforms = (t: number, e: number) => {
    // rotateY: Use sine to prevent cards from becoming completely edge-on (90deg)
    // This keeps the beautiful 3D arch but fixes the "straight/invisible" bug on the sides.
    const maxRotateY = 55; 
    const calculatedRotateY = Math.sin(t * Math.PI / 180) * maxRotateY;
    rotateY.set(-calculatedRotateY * e);

    // z
    const targetZ = RADIUS * Math.cos(t * Math.PI / 180) - RADIUS;
    const startZ = 400;
    z.set(startZ + (targetZ - startZ) * e);

    // x
    const targetX = RADIUS * Math.sin(t * Math.PI / 180);
    x.set(targetX * e);

    // rotateX (combines entry flip and 3D tilt)
    const entryRotateX = 180 * (1 - e); // Starts at 180, goes to 0
    const tiltRotateX = Math.sin(t * Math.PI / 180) * 10 * e; // Tilt based on position
    rotateX.set(entryRotateX + tiltRotateX);

    // scale
    const cos = Math.cos(t * Math.PI / 180);
    const targetScale = 0.6 + (cos + 1) * 0.2;
    const startScale = 0.3;
    scale.set(startScale + (targetScale - startScale) * e);

    // opacity
    const targetOpacity = Math.min(1, Math.max(0, 0.3 + (cos + 1) * 0.35));
    opacity.set(targetOpacity * e);

    // zIndex
    const targetZIndex = Math.round(cos * 100);
    const startZIndex = 100 - index;
    zIndex.set(Math.round(startZIndex + (targetZIndex - startZIndex) * e));

    // blur - disabled on mobile for performance
    if (!isMobile) {
      const targetBlur = Math.max(0, (1 - cos) * 5);
      const startBlur = 20;
      const currentBlur = Math.max(0, startBlur + (targetBlur - startBlur) * e);
      blur.set(`blur(${currentBlur}px)`);
    } else {
      blur.set("blur(0px)");
    }
  };

  useMotionValueEvent(theta, "change", (t) => {
    updateTransforms(t, entryProgress.get());
  });

  useMotionValueEvent(entryProgress, "change", (e) => {
    updateTransforms(theta.get(), e);
  });
  
  const rotateZ = useTransform(entryProgress, (e) => {
    const start = (index % 2 === 0 ? -360 : 360) + (index * 15); // Spin
    const target = 0;
    return start + (target - start) * e;
  });

  const y = useTransform(entryProgress, (e) => {
    const start = 1200; // Start offscreen bottom
    const target = 0;
    const arc = Math.sin(e * Math.PI) * -400; // Parabolic arc up
    return start + (target - start) * e + arc;
  });

  // Internal Parallax for text and tags
  const textX = useTransform(theta, (t) => Math.sin(t * Math.PI / 180) * 30);
  const tagsX = useTransform(theta, (t) => Math.sin(t * Math.PI / 180) * 50);

  // Inner Parallax for the image
  const imageX = useTransform(offset, [-1, 0, 1], [-60, 0, 60]);

  // Glare effect based on rotation
  const glareOpacity = useTransform(theta, [-45, 0, 45], [0, 0.4, 0]);
  const glareX = useTransform(theta, [-45, 45], ['100%', '-100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorState('view');
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    
    // Direct navigation on any card click
    onClick();
  };

  return (
    <motion.div 
      ref={cardRef}
      style={{
        rotateY,
        rotateX,
        rotateZ,
        y,
        z,
        x,
        scale,
        opacity,
        zIndex,
        filter: blur,
        backgroundColor: project.color,
        borderRadius: 32,
        position: 'absolute',
        transformStyle: 'preserve-3d',
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        isHovered.current = true;
        setCursorState('view');
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        lastMouseY.current = null;
        setCursorState('view');
      }}
      className="w-[85vw] md:w-[50vw] lg:w-[40vw] h-[60vh] min-h-[400px] md:h-[75vh] md:min-h-[600px] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col cursor-none select-none group"
    >
      {/* Glare Effect - Disabled on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            opacity: glareOpacity,
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.4) 45%, transparent 50%)',
            x: glareX,
          }}
        />
      )}

      {/* Grain Texture Overlay - Disabled on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none z-20 rounded-[2rem]" />
      )}

      {/* Image Section */}
      <div className="w-full h-[55%] relative pointer-events-none overflow-hidden" style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>
        <motion.div 
          style={{ width: '100%', height: '100%' }}
          layoutId={`project-image-${project.id}`}
        >
          <OptimizedImage 
            src={project.image} 
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
        {/* Subtle gradient overlay to blend image with content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 z-10" />
        
        {/* Results Overlay */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex flex-col gap-1.5 md:gap-2 items-end">
          {project.results.slice(0, 2).map((result, idx) => (
            <div key={idx} className="bg-white/95 text-[#1A1D29] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1.5 md:gap-2 shadow-lg">
              <span className="font-black text-xs md:text-sm">{result.value}</span>
              <span className="text-[8px] md:text-[10px] font-semibold uppercase tracking-wider opacity-70">{result.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section - Refined Typography */}
      <div className="w-full h-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between relative z-10 bg-inherit pointer-events-none">
        <motion.div style={{ x: textX }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] opacity-50" style={{ color: project.textColor }}>
              0{index + 1}
            </span>
            <div className="h-[1px] w-8 bg-current opacity-20" style={{ color: project.textColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-80" style={{ color: project.textColor }}>
              {project.category}
            </span>
          </div>
          
          <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.85] transition-colors duration-300" style={{ color: project.textColor }}>
            {project.title}
          </h3>
        </motion.div>

        <div className="flex items-center justify-between mt-6">
          <motion.div style={{ x: tagsX }} className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] font-semibold opacity-60 border border-current/20 px-3 py-1.5 rounded-full" style={{ color: project.textColor }}>
                {tag}
              </span>
            ))}
          </motion.div>
          
          <div 
            className="w-14 h-14 rounded-full bg-[#1A1D29] text-white flex items-center justify-center shadow-xl transition-transform duration-500 hover:scale-110 pointer-events-auto cursor-pointer relative overflow-hidden group/btn"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setCursorState('default');
            }}
            onMouseMove={(e) => {
              e.stopPropagation();
              setCursorState('default');
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (isDragging) return;
              onClick();
            }}
          >
            <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
              <ArrowUpRight className="w-6 h-6 absolute transition-transform duration-300 group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8" />
              <ArrowUpRight className="w-6 h-6 absolute -translate-x-8 translate-y-8 transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---

export const Portfolio = () => {
  const navigate = useNavigate();
  const [cursorState, setCursorState] = useState('default');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isDragging, setIsDragging] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, {
    once: true,
    margin: "0px"
  });
  const isCanvasInView = useInView(sectionRef, { margin: "200px 0px" });

  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  const DRAG_FACTOR = windowWidth < 768 ? windowWidth * 0.75 : (windowWidth < 1024 ? windowWidth * 0.5 : windowWidth * 0.35);

  // Initialize at index 0 (Foggia Ristorante)
  const dragX = useMotionValue(0);
  // Use a refined spring for the aesthetic zoom effect
  const animatedDragX = useSpring(dragX, { stiffness: 200, damping: 25, mass: 1 });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = animatedDragX.on("change", (latest) => {
      let idx = Math.round(-latest / DRAG_FACTOR);
      if (isNaN(idx)) idx = 0;
      const wrappedIdx = ((idx % projects.length) + projects.length) % projects.length;
      setActiveIndex(wrappedIdx || 0);
    });
    return () => unsubscribe();
  }, [animatedDragX, DRAG_FACTOR]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isCanvasInView) return; // Only track mouse when section is visible
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      // Recenter on resize to prevent drifting
      const newDragFactor = newWidth < 768 ? newWidth * 0.75 : (newWidth < 1024 ? newWidth * 0.5 : newWidth * 0.35);
      const currentIdx = Math.round(-dragX.get() / DRAG_FACTOR);
      dragX.set(-currentIdx * newDragFactor);
    };
    const handlePointerUp = () => setIsPointerDown(false);
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [mouseX, mouseY, dragX, DRAG_FACTOR, isCanvasInView]);

  const handlePanStart = () => {
    setIsDragging(true);
    setCursorState('drag');
  };

  const handlePan = (e: any, info: PanInfo) => {
    dragX.set(dragX.get() + info.delta.x);
  };

  const handlePanEnd = (e: any, info: PanInfo) => {
    // Increased timeout to prevent accidental clicks after a fast swipe
    setTimeout(() => setIsDragging(false), 150);
    setIsPointerDown(false);
    setCursorState('view');
    
    const currentX = dragX.get();
    const velocity = info.velocity.x;
    
    // Predict landing position based on velocity for natural momentum
    const predictedX = currentX + velocity * 0.15;
    
    let targetIndex = Math.round(-predictedX / DRAG_FACTOR);
    
    // Directly set the target value. The animatedDragX spring will smoothly transition to it.
    dragX.set(-targetIndex * DRAG_FACTOR);
  };

  const centerCard = (idx: number) => {
    dragX.set(-idx * DRAG_FACTOR);
  };

  const next = React.useCallback(() => {
    const currentX = dragX.get();
    let targetIndex = Math.round(-currentX / DRAG_FACTOR) + 1;
    centerCard(targetIndex);
  }, [dragX, DRAG_FACTOR]);

  const prev = React.useCallback(() => {
    const currentX = dragX.get();
    let targetIndex = Math.round(-currentX / DRAG_FACTOR) - 1;
    centerCard(targetIndex);
  }, [dragX, DRAG_FACTOR]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const handleWheel = (e: React.WheelEvent) => {
    // Only capture horizontal scrolling to prevent trapping the user vertically
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      dragX.set(dragX.get() - e.deltaX * 1.5);
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="relative overflow-hidden transition-colors duration-700 ease-in-out" 
      id="portfolio"
      style={{ backgroundColor: projects[activeIndex]?.color || '#ffffff' }}
    >
      {/* Subtle overlay to soften the background color */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none z-0" />
      
      {isCanvasInView && (
        <WebGLBackground activeColor={projects[activeIndex]?.color || '#ffffff'} activeTextColor={projects[activeIndex]?.textColor || '#000000'} dragX={animatedDragX} />
      )}

      <Cursor cursorState={cursorState} mouseX={mouseX} mouseY={mouseY} />
      
      {/* Header */}
      <div className="container max-w-[1400px] mx-auto px-6 pt-24 md:pt-32 pb-8 md:pb-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 border-b border-[#1A1D29]/10 pb-8 md:pb-12 relative">
          
          {/* Doodles & Stickers */}
          <motion.div 
            initial={{ opacity: 0, rotate: 10, scale: 0 }}
            whileInView={{ opacity: 1, rotate: 5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-10 left-1/4 bg-white text-anthracite font-bold py-1 px-3 rounded-full shadow-lg border border-anthracite/20 z-20 transform rotate-6 hidden md:block"
          >
            <span className="flex items-center gap-1 text-xs"><Star className="w-3 h-3 text-amber-400" /> 100% Unique</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#1A1D29] font-mono text-sm tracking-[0.2em] uppercase mb-4 md:mb-6 block font-bold">
              Projets Sélectionnés
            </span>
            <h2 className="text-[15vw] md:text-[8vw] leading-[0.85] md:leading-[0.8] font-black text-[#1A1D29] tracking-tighter">
              IMPACT<br/>DIGITAL
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start md:items-end gap-6 md:gap-8 w-full md:w-auto"
          >
            <p className="text-[#1A1D29] text-lg md:text-xl font-medium max-w-md leading-relaxed text-left md:text-right opacity-80">
              Une sélection de projets où design, performance et business ne font qu'un.
            </p>
            {/* Progress Indicator and Drag Hint */}
            <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
              <div className="flex items-center gap-4 font-mono text-sm font-bold opacity-60 w-full md:w-auto justify-between md:justify-end">
                <span>0{activeIndex + 1}</span>
                <div className="w-full md:w-16 h-[2px] bg-[#1A1D29]/20 relative overflow-hidden rounded-full flex-grow md:flex-grow-0">
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-full bg-[#1A1D29] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: (activeIndex + 1) / projects.length }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span>0{projects.length}</span>
              </div>
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-[#1A1D29]/50 font-bold flex items-center gap-2">
                <ArrowRight className="w-3 h-3" /> Drag to explore
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3D Carousel */}
      <div className="pb-24 pt-8 md:pb-32 md:pt-16 w-full relative z-10 overflow-hidden" onWheel={handleWheel}>
        <motion.div 
          onPointerDown={() => setIsPointerDown(true)}
          onPointerUp={() => setIsPointerDown(false)}
          onPointerCancel={() => setIsPointerDown(false)}
          onPointerLeave={() => setIsPointerDown(false)}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          onMouseEnter={() => setCursorState('view')}
          onMouseLeave={() => setCursorState('default')}
          className="relative w-full h-[60vh] min-h-[400px] md:h-[75vh] md:min-h-[600px] flex items-center justify-center cursor-none"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d', touchAction: 'pan-y' }}
        >
          {projects.map((project, index) => (
            <CarouselCard 
              key={project.id} 
              index={index} 
              animatedDragX={animatedDragX}
              DRAG_FACTOR={DRAG_FACTOR}
              centerCard={centerCard}
              project={project} 
              onClick={() => {
                navigate(`/projet/${project.id}`);
                setCursorState('default');
              }}
              setCursorState={setCursorState}
              isDragging={isDragging}
              isPointerDown={isPointerDown}
              totalCards={projects.length}
              isSectionInView={isSectionInView}
            />
          ))}
        </motion.div>
        
        {/* Drag Indicator Text */}
        <div className="flex items-center justify-center mt-8 md:mt-12 opacity-50 relative z-10 pointer-events-none">
           <div className="flex items-center gap-4 text-[#1A1D29] font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 rotate-180" />
              <span>Glisser pour explorer</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
           </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6 md:mt-8 relative z-10">
          <MagneticButton 
            onClick={prev}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#1A1D29] flex items-center justify-center transition-colors duration-300 hover:bg-[#1A1D29] hover:text-white"
          >
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 rotate-180" />
          </MagneticButton>
          <MagneticButton 
            onClick={next}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#1A1D29] flex items-center justify-center transition-colors duration-300 hover:bg-[#1A1D29] hover:text-white"
          >
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </MagneticButton>
        </div>

        {/* View All Projects CTA */}
        <div className="flex justify-center mt-12 md:mt-16 relative z-10">
          <Link to="/portfolio" className="group flex items-center gap-3 px-8 py-4 bg-[#1A1D29] text-white rounded-full font-bold text-lg hover:bg-sand hover:text-[#1A1D29] transition-colors duration-300 shadow-xl">
            Voir tous les projets <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Final CTA */}
      <div className="h-[50vh] md:h-[60vh] flex items-center justify-center bg-[#1A1D29] text-white rounded-t-[2rem] md:rounded-t-[3rem] relative z-20 overflow-hidden">
        
        <div className="text-center px-6 relative z-10 flex flex-col items-center">
          {/* Doodles & Stickers */}
          <motion.div 
            initial={{ opacity: 0, rotate: -15, scale: 0 }}
            whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-10 left-0 md:-left-10 bg-sand text-anthracite font-bold py-1.5 px-3 rounded-xl shadow-lg border-2 border-anthracite z-20 transform -rotate-12 hidden md:block"
          >
            <span className="flex items-center gap-1 text-sm"><Globe className="w-4 h-4" /> En ligne</span>
          </motion.div>

          <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 md:mb-16 tracking-tight text-white">
            Prêt à marquer les{' '}
            <span className="relative inline-block">
              <span className="text-sand relative z-10">esprits ?</span>
              {/* Organic Hand-drawn SVG Underline */}
              <svg 
                className="absolute -bottom-3 md:-bottom-4 left-0 w-full h-4 md:h-6 text-sand" 
                viewBox="0 0 100 20" 
                preserveAspectRatio="none"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M 3 15 C 20 8 60 5 97 12" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M 15 18 C 40 12 70 10 90 15" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  opacity="0.6"
                />
              </svg>
            </span>
          </h3>

          <FluidButton 
            href="#contact" 
            className="px-10 py-5 md:px-12 md:py-6 text-[#1A1D29] text-xl md:text-2xl font-bold" 
            bgClass="bg-white group-hover:bg-sand transition-colors duration-500"
          >
            Démarrer la discussion <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block ml-2" />
          </FluidButton>
        </div>
      </div>

    </motion.section>
  );
};
