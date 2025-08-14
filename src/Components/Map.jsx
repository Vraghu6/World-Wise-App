import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useGeolocation } from "../Hooks/useGeolocation";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
import Button from "./Button";
import { useUrlPositions } from "../Hooks/useUrlPositions";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPositions();
  // console.log(mapLat, mapLng);

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  // console.log(mapPosition);
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={3}
        style={{ height: "100%", width: "100%" }}
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cities.map((cities) => {
          if (!cities?.position?.lat || !cities?.position?.lng) return null;
          <Marker
            position={[cities.position.lat, cities.position.lng]}
            key={cities.id}
          >
            <Popup>
              <span>{cities.emoji}</span>
              <span>{cities.cityName}</span>
            </Popup>
          </Marker>;
        })}
        <Changecenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function Changecenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
// onClick={() => navigate("form")
