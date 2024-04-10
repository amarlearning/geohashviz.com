import "./App.css";
import "leaflet/dist/leaflet.css";
import LeafletContainer from "./LeafletContainer/LeafletContainer";
import Geohash from "./LeafletContainer/model/Geohash";
import getBoundingBox from "./Algorithms/BoundingBox";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const defaultGeohashStr = "st\ngb";
  const [value, setValue] = useState(defaultGeohashStr);
  const [geohashes, setGeohashes] = useState([] as Geohash[]);

  return (
    <div>
      <div
        className="container text-center"
        style={{
          width: "15em",
          zIndex: 100000,
          position: "fixed",
          marginTop: "15em",
          marginLeft: "3em",
        }}
      >
        <div className="row">
          <div className="col">
            <textarea
              rows={15}
              cols={12}
              className="form-control"
              aria-label="With textarea"
              onChange={(e) => setValue(e.target.value)}
              style={{ borderRadius: "0" }}
              defaultValue={defaultGeohashStr}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              style={{
                marginTop: "1em",
                marginLeft: 0,
                borderRadius: "0",
                width: "100%",
              }}
              type="button"
              className="btn btn-primary"
              onClick={() => setGeohashes(handleSubmit(value))}
            >
              Visualize
            </button>
          </div>
        </div>
      </div>
      <LeafletContainer geohashes={geohashes}></LeafletContainer>
    </div>
  );
}

function handleSubmit(value: string): Geohash[] {
  var g: string[] = [];
  value.split("\n").forEach((geohash) => {
    if (geohash.length > 0 && geohash.length <= 12) {
      g.push(geohash);
    }
  });
  return createGeohashObjects(g);
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
