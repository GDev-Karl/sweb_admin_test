// react plugin for creating vector maps
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

// Liste des markers d'origine
const markersData = [
  { latLng: [37.2580397, -104.657039], name: "United States" },
  { latLng: [20.7504374, 73.7276105], name: "India" },
  { latLng: [51.509865, -0.118092], name: "United Kingdom" },
  { latLng: [59.3293, 18.0686], name: "Sweden" },
];

// Fonction pour filtrer et valider les markers
const getValidMarkers = (markers: typeof markersData) => {
  return markers
    .filter(
      (m) =>
        Array.isArray(m.latLng) &&
        m.latLng.length === 2 &&
        Number.isFinite(m.latLng[0]) &&
        Number.isFinite(m.latLng[1]) &&
        m.latLng[0] >= -90 &&
        m.latLng[0] <= 90 &&
        m.latLng[1] >= -180 &&
        m.latLng[1] <= 180
    )
    .map((m) => ({
      ...m,
      style: {
        fill: "#465FFF",
        borderWidth: 1,
        borderColor: "white",
      },
    }));
};

const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  const validMarkers = getValidMarkers(markersData);

  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={{
        initial: {
          fill: "#465FFF",
          r: 4, // rayon des markers
        } as any, // bypass strict typing
      }}
      markersSelectable={true}
      markers={validMarkers}
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default CountryMap;
