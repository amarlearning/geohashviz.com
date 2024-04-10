import "./App.css";
import "leaflet/dist/leaflet.css";
import LeafletContainer from "./LeafletContainer/LeafletContainer";
import Geohash from "./LeafletContainer/model/Geohash";
import getBoundingBox from "./Algorithms/BoundingBox";

function App() {
  const geohashes = ["gb", "st", "yw", "fu"];
  const data = createGeohashObjects(geohashes);

  return <LeafletContainer geohashes={data}></LeafletContainer>;
}

function createGeohashObjects(geohashes: string[]): Geohash[] {
  return geohashes.map((geohash) => {
    const boundingBox = getBoundingBox(geohash);
    const geohashObj: Geohash = {
      boundingBox: [
        [boundingBox.sw.lat, boundingBox.sw.lon],
        [boundingBox.ne.lat, boundingBox.ne.lon],
      ],
      geohash,
    };
    return geohashObj;
  });
}

export default App;
