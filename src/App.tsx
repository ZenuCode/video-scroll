import { useCallback, useMemo, useRef } from 'react'
import './App.css'
import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({ 
    target : ref,
    offset: ['0vh 70vh', 'end start']
  });

  const images = useMemo(() => {
    return Array.from({ length: 103 }, (_, i) => {
      const img = new Image();
      img.src = `/Images/${i + 1}.webp`;
      return img;
    });
  }, [])

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 103]);
  const render = useCallback((index: number) => {
    if (images[index - 1]) {
      ref.current?.getContext('2d')?.drawImage(images[index - 1], 0, 0);
    }
  }, [])

  useMotionValueEvent(currentIndex, 'change', (latest) => {
    render(Number(latest.toFixed()));
  })

  return (
    <div className="container">
      <div className="spacer" />
      <canvas width={1000} height={1000} ref={ref}></canvas>
    </div>
  )
}

export default App
