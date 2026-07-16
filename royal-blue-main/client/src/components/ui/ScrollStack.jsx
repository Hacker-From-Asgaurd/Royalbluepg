import { useEffect, useRef, useCallback } from 'react';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-auto min-h-[160px] md:h-64 my-4 md:my-8 p-5 md:p-10 rounded-2xl md:rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top ${itemClassName}`.trim()}
    style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const cardOffsetsRef = useRef([]);
  const endOffsetRef = useRef(0);
  const rafRef = useRef(null);
  const stackCompletedRef = useRef(false);

  const parsePercentage = (value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  };

  const cachePositions = useCallback(() => {
    const cards = useWindowScroll
      ? Array.from(document.querySelectorAll('.scroll-stack-card'))
      : Array.from(scrollerRef.current?.querySelectorAll('.scroll-stack-card') || []);

    cardsRef.current = cards;
    cardOffsetsRef.current = cards.map(card => card.getBoundingClientRect().top + window.scrollY);

    const endEl = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');
    endOffsetRef.current = endEl ? endEl.getBoundingClientRect().top + window.scrollY : 0;
  }, [useWindowScroll]);

  const update = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endOffsetRef.current;

    cards.forEach((card, i) => {
      const cardTop = cardOffsetsRef.current[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;

      // Scale
      let scaleProgress = 0;
      if (scrollTop > triggerStart && scrollTop < triggerEnd) {
        scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      } else if (scrollTop >= triggerEnd) {
        scaleProgress = 1;
      }
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Blur
      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        cards.forEach((_, j) => {
          const jTriggerStart = cardOffsetsRef.current[j] - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        });
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      // Translate
      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      card.style.filter = blur > 0 ? `blur(${blur}px)` : '';

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [stackPosition, scaleEndPosition, itemStackDistance, baseScale, itemScale, rotationAmount, blurAmount, onStackComplete]);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    // Wait for layout to settle before caching positions
    const timeout = setTimeout(() => {
      cachePositions();
      update();
    }, 100);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', cachePositions, { passive: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', cachePositions);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cachePositions, update, onScroll]);

  // Apply initial styles to cards
  useEffect(() => {
    const timeout = setTimeout(() => {
      const cards = document.querySelectorAll('.scroll-stack-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
        card.style.transformOrigin = 'top center';
      });
    }, 50);
    return () => clearTimeout(timeout);
  }, [itemDistance]);

  return (
    <div ref={scrollerRef} className={`relative w-full ${className}`.trim()}>
      <div className="scroll-stack-inner pt-[10vh] md:pt-[15vh] px-3 sm:px-6 md:px-12 lg:px-20 pb-[8rem] md:pb-[15rem]">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
