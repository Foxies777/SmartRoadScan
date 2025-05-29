import { useState, useEffect } from "react";
import { YMapMarker } from "@shared/lib/ymap";
import { YMapCircle } from "@shared/lib/YMapCircle";
import { Slider } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

interface RadiusSelectorProps {
  onChange: (center: [number, number], radius: number) => void;
  zoom: number; // Добавляем зум как пропс
}

export const RadiusSelector = ({ onChange, zoom }: RadiusSelectorProps) => {
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [radius, setRadius] = useState(5);

  useEffect(() => {
    if (center) {
      onChange(center, radius);
    }
  }, [center, radius, onChange]);

  const handleClick = () => {
    setCenter([54.901171, 52.29723]);
  };

  const handleDragEnd = (event: any) => {
    setCenter([event[1], event[0]]);
  };
  
  // Вычисляем размер маркера на основе зума
  
  
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "#fff",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          cursor: "pointer",
          zIndex: 100,
        }}
        onClick={handleClick}
      >
        <EnvironmentOutlined />
      </div>

      {center && (
        <>
          <YMapMarker coordinates={[center[1], center[0]]} draggable onDragEnd={handleDragEnd}>
            <div
              style={{
                background: "white",
                padding: `${8}px`, // Динамический размер
                borderRadius: "50%",
                transition: "padding 0.2s", // Плавное изменение размера
              }}
            >
              <EnvironmentOutlined />
            </div>
          </YMapMarker>

          <YMapCircle
            coordinates={[center[1], center[0]]}
            radius={radius * 1000}
            options={{ strokeWidth: 2 }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#fff",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          >
            <p>Радиус: {radius} км</p>
            <Slider min={1} max={20} value={radius} onChange={setRadius} />
          </div>
        </>
      )}
    </>
  );
};