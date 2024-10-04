import React, { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polygon, useMap } from "react-leaflet";
import L from "leaflet"; // To handle bounds, LatLng, etc.
import "leaflet/dist/leaflet.css";
import Loading from "@/app/loading";

type LatLngLiteral = { lat: number; lng: number };

type MapProps = {
    polygonString: string;
};

const FitBounds = ({ coordinates }: { coordinates: LatLngLiteral[] }) => {
    const map = useMap();

    useEffect(() => {
        if (coordinates.length > 1) {
            const bounds = L.latLngBounds(coordinates.map(coord => [coord.lat, coord.lng]));
            map.fitBounds(bounds);
        }
    }, [coordinates, map]);

    return null;
};

function LeafletMapView(props: MapProps) {
    const [isClient, setIsClient] = useState(false); // State to check if we're on the client-side
    const [zoomNum, setZoomNum] = useState(18);

    useEffect(() => {
        setIsClient(true); // Mark that we are now on the client
    }, []);

    const coordinates = useMemo(() => {
        return props.polygonString.match(/\d+\.\d+\s\d+\.\d+/g);
    }, [props.polygonString]);

    const center = useMemo<LatLngLiteral>(() => {
        if (coordinates !== null) {
            const resultCor = coordinates.map((coordinate) => {
                const [lng, lat] = coordinate.split(" ").map(Number);
                return { lat, lng };
            });
            return {
                lat: resultCor[0].lat,
                lng: resultCor[0].lng,
            };
        }
        return { lat: 0, lng: 0 }; // Default coordinates if no data
    }, [coordinates]);

    const path = useMemo(() => {
        if (coordinates !== null) {
            return coordinates.map((coordinate) => {
                const [lng, lat] = coordinate.split(" ").map(Number);
                return { lat, lng };
            });
        }
        return [];
    }, [coordinates]);

    const containerStyle = {
        width: "100%",
        height: "400px",
    };

    if (!isClient || !coordinates) return <Loading />; // Render loading until the client-side is ready

    return (
        <div>
            <MapContainer
                center={center}
                zoom={zoomNum}
                style={containerStyle}
                scrollWheelZoom={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {path.length > 1 ? (
                    <Polygon positions={path.map(coord => [coord.lat, coord.lng])} />
                ) : (
                    path.length === 1 && <Marker position={[path[0].lat, path[0].lng]} />
                )}

                {path.length > 1 && <FitBounds coordinates={path} />}
            </MapContainer>
        </div>
    );
}

export default LeafletMapView;
