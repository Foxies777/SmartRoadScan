import { YMapFeature } from "./ymap";


interface YMapCircleProps {
  coordinates: [number, number]; 
  radius: number;
  options?: {
    strokeColor?: string;
    strokeWidth?: number;
  };
}

const generateCirclePolygon = (center: [number, number], radius: number, segments = 64) => {
  const points: [number, number][] = [];
  const earthRadius = 6378137;

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * 2 * Math.PI;
    const dx = radius * Math.cos(angle);
    const dy = radius * Math.sin(angle);
    const lat = center[1] + (dy / earthRadius) * (180 / Math.PI);
    const lon = center[0] + (dx / (earthRadius * Math.cos((center[1] * Math.PI) / 180))) * (180 / Math.PI);
    points.push([lon, lat]);
  }
  points.push(points[0]); 
  return [points];
};

export const YMapCircle = ({ coordinates, radius, options }: YMapCircleProps) => {
  const polygon = generateCirclePolygon(coordinates, radius);

  return (
    <YMapFeature
      geometry={{
        type: "Polygon", 
        coordinates: polygon,
      }}
      style={{
        fill: "rgba(255, 0, 0, 0.3)", 
        stroke: [
          {
            color: options?.strokeColor || "red", 
            width: options?.strokeWidth || 2,
          },
        ],
      }}
    />
  );
};
