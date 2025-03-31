import "./App.css";
import "leaflet/dist/leaflet.css";
import LeafletContainer from "./GeohashMap/GeohashMap";
import Geohash from "./GeohashMap/model/Geohash";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createGeohashObjects } from "./Algorithms/geohash";
import GeohashBulkInputForm from "./GeohashInput/GeohashInput";
import InfoButton from "./InfoButton/InfoButton";

function handleSubmit(value: string): Geohash[] {
  var g: string[] = [];
  value.split("\n").forEach((geohash) => {
    if (geohash.length > 0 && geohash.length <= 12) {
      g.push(geohash);
    }
  });
  return createGeohashObjects(g);
}

function App() {
  const defaultGeohashStr = "gct\ngcp";
  const [geohashes, setGeohashes] = useState(
    handleSubmit(defaultGeohashStr) as Geohash[]
  );

  return (
    <div className="app-container">
      <InfoButton />
      <GeohashBulkInputForm
        onSubmit={(value) => {
          setGeohashes(handleSubmit(value));
        }}
        defaultGeohashStr={defaultGeohashStr}
      />
      <LeafletContainer geohashes={geohashes}></LeafletContainer>
    </div>
  );
}

export default App;
