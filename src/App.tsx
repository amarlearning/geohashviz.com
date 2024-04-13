import "./App.css";
import "leaflet/dist/leaflet.css";
import LeafletContainer from "./LeafletContainer/LeafletContainer";
import Geohash from "./LeafletContainer/model/Geohash";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import createGeohashObjects from "./Algorithms/BoundingBox";
import GeohashBulkInputForm from "./GeohashBulkInputForm/GeohashBulkInputForm";

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
  const defaultGeohashStr = "tt\ntg";
  const [geohashes, setGeohashes] = useState(
    handleSubmit(defaultGeohashStr) as Geohash[]
  );

  return (
    <div>
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
