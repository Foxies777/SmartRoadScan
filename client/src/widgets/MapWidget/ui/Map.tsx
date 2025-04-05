import { useState, useRef, useEffect } from "react";
import { HoleMarker, useLoadPits } from "@features/load-pits";
import {
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
} from "@shared/lib/ymap";
import { Modal, Spin } from "antd";
import { Reports } from "@entities/reports/types/model";
import { RadiusSelector } from "./RadiusSelector";

// Компонент модального окна для отображения информации о яме
const MarkerModal = ({
  pit,
  onClose,
}: {
  pit: Reports | null;
  onClose: () => void;
}) => {
  if (!pit) return null;

  return (
    <Modal
      title={`Яма #${pit._id}`}
      open={!!pit}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      getContainer={() => document.getElementById("map-container")!}
    >
      <img src={pit.imageUrl} alt="Яма" style={{ width: "100%" }} />
      <p>Координаты: {[pit.latitude, pit.longitude].join(", ")}</p>
    </Modal>
  );
};

// Функция для расчета расстояния между двумя точками (формула haversine)
const haversineDistance = (
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number]
) => {
  const R = 6371; 
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Основной компонент карты с маркерами
const MapWithMarkers = () => {
  const [pits, loading] = useLoadPits();
  const [selectedPit, setSelectedPit] = useState<Reports | null>(null);
  const [filterCenter, setFilterCenter] = useState<[number, number] | null>(null);
  const [filterRadius, setFilterRadius] = useState<number>(5);
  const [mapLocation, setMapLocation] = useState({
    center: [52.29723, 54.901171] as [number, number],
    zoom: 10,
  });
  const mapRef = useRef<any>(null);

  // Обработчик изменения радиуса
  const handleRadiusChange = (center: [number, number], radius: number) => {
    setFilterCenter(center);
    setFilterRadius(radius);
  };

  // Обработчик закрытия модального окна
  const handleCloseModal = () => {
    setSelectedPit(null);
  };
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (mapRef.current) {
        const mapInstance = mapRef.current;
  
        const handleBoundsChange = (event: any) => {
          const newLocation = event.get("newCenter");
          const newZoom = event.get("newZoom");
          console.log("New Center:", newLocation);
          console.log("New Zoom:", newZoom);
          alert(`New Zoom: ${newZoom}`);
        };
  
        mapInstance.events.add("boundschange", handleBoundsChange);
  
        // Очистка подписки при размонтировании компонента
        return () => {
          mapInstance.events.remove("boundschange", handleBoundsChange);
        };
      }
    }, 1000); // Задержка 1 секунда
  
    return () => clearTimeout(timeout);
  }, [mapRef.current]);

  // Фильтрация ям по радиусу
  const filteredPits = pits.filter(
    (pit) =>
      !filterCenter ||
      haversineDistance(filterCenter, [pit.latitude, pit.longitude]) <= filterRadius
  );

  if (loading) {
    return <Spin />;
  }

  return (
    <div
      id="map-container"
      style={{ width: "100%", height: "100svh", position: "relative" }}
    >
  <YMap location={mapLocation} ref={mapRef}>
    <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        {/* Отображение отфильтрованных ям */}
        {filteredPits.map((pit) => (
          <HoleMarker
            key={pit._id}
            coordinates={[pit.longitude, pit.latitude]}
            onClick={() => setSelectedPit(pit)}
          />
        ))}

        {/* Компонент для выбора радиуса */}
        <RadiusSelector onChange={handleRadiusChange} zoom={mapLocation.zoom} />
      </YMap>

      {/* Модальное окно с информацией о яме */}
      <MarkerModal pit={selectedPit} onClose={handleCloseModal} />
    </div>
  );
};

export default MapWithMarkers;