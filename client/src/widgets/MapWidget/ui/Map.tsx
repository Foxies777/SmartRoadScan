import { useState, useRef, useEffect } from "react";
import { HoleMarker, useLoadPits } from "@features/load-pits";
import {
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
} from "@shared/lib/ymap";
import { Button, Modal, Select, Spin } from "antd";
import { Reports } from "@entities/reports/types/model";
import { RadiusSelector } from "./RadiusSelector";
import { useUnit } from "effector-react";
import { StatusDropdown } from "@features/updateReportStatus/ui/StatusDropdown";
import { $user } from "@entities/user/model";
import RectangleSelector from "./RectangleSelector";
import '../styles/style.css'

const MarkerModal = ({ pit, onClose }: { pit: Reports | null; onClose: () => void; }) => {
  const user = useUnit($user);
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
      {pit.area ? <p>Площадь ямы: {pit.area} см²</p> : null}
      <p>Статус {pit.status}</p>
      {user?.role === "ADMIN" ? (
        <StatusDropdown reportId={pit._id} currentStatus={pit.status} onStatusChange={onClose} />
      ) : null}
    </Modal>
  );
};

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

const MapWithMarkers = () => {
  const [pits, loading] = useLoadPits();
  const [selectedPit, setSelectedPit] = useState<Reports | null>(null);
  const [filterCenter, setFilterCenter] = useState<[number, number] | null>(null);
  const [filterRadius, setFilterRadius] = useState<number>(5);
  const [selectedAreaPits, setSelectedAreaPits] = useState<Reports[]>([]);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("PENDING");
  const [selectMode, setSelectMode] = useState(false);
  const [visualRect, setVisualRect] = useState<null | { x: number; y: number; width: number; height: number }>(null);
  const [mapLocation, setMapLocation] = useState({
    center: [52.29723, 54.901171] as [number, number],
    zoom: 10,
  });
  const mapRef = useRef<any>(null);

  const handleRadiusChange = (center: [number, number], radius: number) => {
    setFilterCenter(center);
    setFilterRadius(radius);
  };

  const handleCloseModal = () => {
    setSelectedPit(null);
  };

  const handleRectangleSelect = (bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number }) => {
    const filtered = pits.filter(pit =>
      pit.latitude >= bounds.minLat &&
      pit.latitude <= bounds.maxLat &&
      pit.longitude >= bounds.minLon &&
      pit.longitude <= bounds.maxLon
    );
    setSelectedAreaPits(filtered);
    setStatusModalOpen(true);
    setSelectMode(false);
    setVisualRect(null);
  };

  const applyStatusToArea = () => {
    selectedAreaPits.forEach(pit => {
      console.log(`Updating pit ${pit._id} to status ${newStatus}`);
    });
    setStatusModalOpen(false);
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
        };
        mapInstance.events.add("boundschange", handleBoundsChange);
        return () => {
          mapInstance.events.remove("boundschange", handleBoundsChange);
        };
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [mapRef.current]);

  const filteredPits = pits.filter(
    (pit) =>
      !filterCenter ||
      haversineDistance(filterCenter, [pit.latitude, pit.longitude]) <= filterRadius
  );

  if (loading) {
    return <Spin />;
  }

  return (
    <div id="map-container" style={{ width: "100%", height: "100svh", position: "relative" }}>
      <Button
        type={selectMode ? "primary" : "default"}
        onClick={() => setSelectMode(!selectMode)}
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}
      >
        {selectMode ? "Выберите область" : "Режим выделения"}
      </Button>

      <YMap location={mapLocation} ref={mapRef}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        {filteredPits.map((pit) => (
          <HoleMarker
            key={pit._id}
            coordinates={[pit.longitude, pit.latitude]}
            status={pit.status}
            onClick={() => setSelectedPit(pit)}
          />
        ))}

        <RadiusSelector onChange={handleRadiusChange} zoom={mapLocation.zoom} />
      </YMap>

      <MarkerModal pit={selectedPit} onClose={handleCloseModal} />

      {selectMode && (
        <RectangleSelector
          onSelect={handleRectangleSelect}
          onDraw={(rect) => setVisualRect(rect)}
        />
      )}

      {visualRect && (
        <div
          style={{
            position: 'absolute',
            top: visualRect.y,
            left: visualRect.x,
            width: visualRect.width,
            height: visualRect.height,
            border: '2px dashed red',
            backgroundColor: 'rgba(255,0,0,0.1)',
            pointerEvents: 'none',
            zIndex: 999,
          }}
        />
      )}

      <Modal
        open={statusModalOpen}
        title={`Изменить статус ${selectedAreaPits.length} ям`}
        onCancel={() => setStatusModalOpen(false)}
        onOk={applyStatusToArea}
      >
        <Select
          value={newStatus}
          onChange={setNewStatus}
          style={{ width: '100%' }}
          options={[
            { label: 'Ожидание', value: 'PENDING' },
            { label: 'В работе', value: 'IN_PROGRESS' },
            { label: 'Выполнено', value: 'COMPLETED' },
            { label: 'Отклонено', value: 'REJECTED' },
          ]}
        />
        <Button type="primary" onClick={applyStatusToArea} style={{ marginTop: '1rem' }}>
          Применить
        </Button>
      </Modal>
    </div>
  );
};

export default MapWithMarkers;
