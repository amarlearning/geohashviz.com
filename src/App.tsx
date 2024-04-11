import "./App.css";
import "leaflet/dist/leaflet.css";
import LeafletContainer from "./LeafletContainer/LeafletContainer";
import Geohash from "./LeafletContainer/model/Geohash";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import createGeohashObjects from "./Algorithms/BoundingBox";

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
  const defaultGeohashStr = "st\ngb";
  const [value, setValue] = useState(defaultGeohashStr);
  const [geohashes, setGeohashes] = useState(
    handleSubmit(defaultGeohashStr) as Geohash[]
  );

  return (
    <div>
      <div
        className="container text-center"
        style={{
          width: "10em",
          zIndex: 100000,
          position: "fixed",
          marginTop: "15em",
          marginLeft: "3em",
        }}
      >
        <div className="row">
          <div className="col">
            <textarea
              rows={10}
              className="form-control"
              aria-label="With textarea"
              onChange={(e) => setValue(e.target.value)}
              style={{ borderRadius: "1", opacity: 0.9 }}
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
                borderRadius: "1",
                width: "100%",
              }}
              type="button"
              className="btn btn-primary pointer"
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

export default App;
