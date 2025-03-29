import { YMapMarker } from "@shared/lib/ymap";

interface HoleMarkerProps {
  coordinates: [number, number];
  onClick: () => void;
}

const HoleMarker = ({ coordinates, onClick }: HoleMarkerProps) => {
  return (
    <YMapMarker coordinates={coordinates} onClick={onClick}>
      <div
        style={{ background: "red", padding: "5px", borderRadius: "50%" }}
      ></div>
    </YMapMarker>
  );
};

export default HoleMarker;
