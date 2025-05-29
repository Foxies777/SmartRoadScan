import { YMapMarker } from "@shared/lib/ymap";

interface HoleMarkerProps {
  coordinates: [number, number];
  status: string;
  onClick: () => void;
}

const statusColors: Record<HoleMarkerProps["status"], string> = {
  PENDING: "grey",
  IN_PROGRESS: "orange",
  COMPLETED: "green",
  REJECTED: "red",
};

const HoleMarker = ({ coordinates, status, onClick }: HoleMarkerProps) => {
  return (
    <YMapMarker coordinates={coordinates} onClick={onClick}>
      <div
        style={{
          background: statusColors[status],
          padding: "5px",
          borderRadius: "50%",
        }}
      ></div>
    </YMapMarker>
  );
};

export default HoleMarker;
