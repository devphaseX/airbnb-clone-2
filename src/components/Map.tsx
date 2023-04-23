'use client';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

//@ts-ignore
delete L.Icon.Default.prototype.__getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface LocationMapProps {
  center?: number[];
}
const LocationMap: React.FC<LocationMapProps> = ({ center }) => {
  const centerCoord = (center as L.LatLngExpression | undefined) ?? [51, -0.09];

  return (
    <MapContainer
      center={centerCoord}
      zoom={center ? 4 : 2}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {center && <Marker position={centerCoord} />}
    </MapContainer>
  );
};
export { LocationMap };
