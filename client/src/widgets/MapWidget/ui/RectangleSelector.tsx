// RectangleSelector.tsx
import { useEffect, useRef, useState } from 'react';

interface RectangleSelectorProps {
  onSelect: (bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number }) => void;
  onDraw: (rect: { x: number; y: number; width: number; height: number } | null) => void;
}

const RectangleSelector = ({ onSelect, onDraw }: RectangleSelectorProps) => {
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mapContainerRef.current || document.getElementById('map-container');
    if (!container) return;

    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = '1000';
    overlay.style.cursor = 'crosshair';

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStartPoint({ x, y });
      onDraw({ x, y, width: 0, height: 0 });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!startPoint) return;
      e.preventDefault();
      e.stopPropagation();
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = Math.abs(x - startPoint.x);
      const height = Math.abs(y - startPoint.y);
      const drawX = Math.min(x, startPoint.x);
      const drawY = Math.min(y, startPoint.y);
      onDraw({ x: drawX, y: drawY, width, height });
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!startPoint) return;
      e.preventDefault();
      e.stopPropagation();
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const leftPercent = Math.min(startPoint.x, x) / rect.width;
      const rightPercent = Math.max(startPoint.x, x) / rect.width;
      const topPercent = Math.min(startPoint.y, y) / rect.height;
      const bottomPercent = Math.max(startPoint.y, y) / rect.height;

      onSelect({ minLat: topPercent, maxLat: bottomPercent, minLon: leftPercent, maxLon: rightPercent });
      onDraw(null);
      setStartPoint(null);

      container.removeChild(overlay);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStartPoint(null);
        onDraw(null);
        container.removeChild(overlay);
      }
    };

    overlay.addEventListener('mousedown', handleMouseDown);
    overlay.addEventListener('mousemove', handleMouseMove);
    overlay.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);

    container.appendChild(overlay);

    return () => {
      overlay.removeEventListener('mousedown', handleMouseDown);
      overlay.removeEventListener('mousemove', handleMouseMove);
      overlay.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
      if (container.contains(overlay)) {
        container.removeChild(overlay);
      }
    };
  }, [startPoint, onSelect, onDraw]);

  return null;
};

export default RectangleSelector;
