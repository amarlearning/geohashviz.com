import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Blog.css";

const Geohash101 = () => {
  return (
    <div className="blog-page">
      <Container className="blog-article">
        <Row className="justify-content-center">
          <Col lg={8}>
            {/* Article Header */}
            <div className="article-header">
              <Link to="/blogs" className="back-link">
                ← Back to Blog
              </Link>
              <div className="article-meta">
                <span className="article-category">Fundamentals</span>
                <span className="article-date">December 2024</span>
                <span className="read-time">8 min read</span>
              </div>
              <h1 className="article-title">
                Geohash 101: A Friendly Introduction to Spatial Encoding
              </h1>
              <p className="article-subtitle">
                If you work with maps or location data, you've probably heard of
                latitude and longitude. But there's a more elegant way to handle
                spatial data.
              </p>
            </div>

            {/* Article Content */}
            <div className="article-content">
              <h2>What is a geohash?</h2>
              <p>
                If you work with maps or location data, you've probably heard of
                latitude and longitude. They work, but they can be unwieldy for
                indexing and comparing millions of points. A geohash compresses
                those two numbers into a short alphanumeric string. It divides
                the world into a grid of boxes and assigns a unique code to each
                box; longer codes zoom into smaller boxes. This clever system
                was invented in 2008 by Gustavo Niemeyer and offers the neat
                property that the more characters two geohashes share, the
                closer together they are.
              </p>

              <h2>How does it work?</h2>
              <p>
                At a high level, a geohash repeatedly halves the ranges of
                latitude and longitude. Each character of the resulting string
                encodes five bits that indicate which half of the current range
                the point falls into. By alternating between longitude and
                latitude bits, a single code captures both dimensions. The
                process continues until the desired precision is reached; each
                extra character cuts the bounding box size roughly in half.
              </p>
              <p>
                For example, the geohash <strong>gcp</strong> covers an area of
                several hundred kilometres around southern England,{" "}
                <strong>gcpv</strong> refines it to about a 20 km square, and{" "}
                <strong>gcpvj</strong> pinpoints a box only a few hundred metres
                across.
              </p>

              <h2>Real-world examples</h2>
              <p>
                Let's look at some actual locations to see how geohashes work in
                practice:
              </p>
              <div className="examples-grid">
                <div className="example-card">
                  <h4>🗽 New York City</h4>
                  <div className="geohash-example">
                    <span className="geohash-code">dr5regy</span>
                  </div>
                  <p>Times Square area, Manhattan</p>
                  <div className="precision-breakdown">
                    <span className="precision-level">dr5</span> → New York
                    region
                    <br />
                    <span className="precision-level">dr5re</span> → Manhattan
                    <br />
                    <span className="precision-level">dr5regy</span> → Times
                    Square block
                  </div>
                </div>
                <div className="example-card">
                  <h4>🌉 San Francisco</h4>
                  <div className="geohash-example">
                    <span className="geohash-code">9q8yyk8</span>
                  </div>
                  <p>Golden Gate Bridge area</p>
                  <div className="precision-breakdown">
                    <span className="precision-level">9q8</span> → Bay Area
                    <br />
                    <span className="precision-level">9q8yy</span> → San
                    Francisco
                    <br />
                    <span className="precision-level">9q8yyk8</span> → Golden
                    Gate Bridge
                  </div>
                </div>
                <div className="example-card">
                  <h4>🏛️ London</h4>
                  <div className="geohash-example">
                    <span className="geohash-code">gcpvj0u</span>
                  </div>
                  <p>Big Ben, Westminster</p>
                  <div className="precision-breakdown">
                    <span className="precision-level">gcp</span> → Southern
                    England
                    <br />
                    <span className="precision-level">gcpvj</span> → Central
                    London
                    <br />
                    <span className="precision-level">gcpvj0u</span> →
                    Westminster area
                  </div>
                </div>
              </div>

              <h2>Visualising geohash precision</h2>
              <p>
                To make this idea concrete, here's how bounding boxes work for
                three geohashes of increasing precision. Notice how each
                successive code narrows the area:
              </p>
              <div className="precision-example">
                <div className="precision-item">
                  <strong>gcp</strong> → Several hundred kilometres (like
                  covering all of southern England)
                </div>
                <div className="precision-item">
                  <strong>gcpv</strong> → About 20 km square (roughly the size
                  of Greater London)
                </div>
                <div className="precision-item">
                  <strong>gcpvj</strong> → A few hundred metres (a city block or
                  small neighborhood)
                </div>
              </div>

              <div className="interactive-example">
                <h3>Try it yourself!</h3>
                <p>
                  Want to see these examples in action? Copy any of these
                  geohashes and paste them into our{" "}
                  <Link to="/">GeohashViz tool</Link>:
                </p>
                <div className="try-examples">
                  <div className="try-example">
                    <code>dr5regy</code> <span>New York Times Square</span>
                  </div>
                  <div className="try-example">
                    <code>9q8yyk8</code> <span>San Francisco Golden Gate</span>
                  </div>
                  <div className="try-example">
                    <code>gcpvj0u</code> <span>London Big Ben</span>
                  </div>
                </div>
              </div>
              <p>
                Each box has its own code, and as you add characters, the box
                shrinks to a smaller region. In practice, you choose the
                precision based on how accurate you need your location to be:
                storing billions of points in a database? Use shorter geohashes
                to group nearby points into the same cell and index them
                efficiently. Plotting delivery routes down to street level? Use
                longer geohashes for more granular positioning.
              </p>

              <h2>Why geohashes matter</h2>
              <p>
                Geohashes shine in distributed databases and search systems
                because they convert two floating‑point numbers into a single
                string that sorts lexicographically. This makes it easy to do
                prefix searches: any two points with the same prefix share the
                same region. It's a powerful feature when you need to query "all
                points within this neighbourhood" without scanning an entire
                table.
              </p>
              <p>
                Understanding the basics of geohashes will make spatial data
                tools much more approachable and help you build more efficient
                location-based applications.
              </p>

              <h2>Common use cases</h2>
              <p>Here are a few places where geohashes are handy:</p>
              <div className="use-case-grid">
                <div className="use-case-item">
                  <h4>� ️ Spatial indexing in databases</h4>
                  <p>
                    Databases such as Firebase Firestore and Elasticsearch use
                    geohashes to speed up geoqueries. Instead of comparing
                    floating‑point coordinates, they compare prefixes of
                    strings.
                  </p>
                </div>
                <div className="use-case-item">
                  <h4>📍 Geofencing and proximity alerts</h4>
                  <p>
                    Apps that notify you when you enter or leave a location can
                    rely on geohashes to quickly determine whether a device has
                    crossed into a different cell.
                  </p>
                </div>
                <div className="use-case-item">
                  <h4>🔥 Clustering and heat‑mapping</h4>
                  <p>
                    When visualising millions of points, geohashes let you group
                    nearby points into a single cell and colour it based on
                    density.
                  </p>
                </div>
                <div className="use-case-item">
                  <h4>🗺️ Tile generation for maps</h4>
                  <p>
                    Many mapping systems tile the world into squares. Geohash
                    ranges align neatly with these tiles, making it easier to
                    cache and serve map data.
                  </p>
                </div>
              </div>

              <h2>Practical example: Building a store locator</h2>
              <p>
                Let's say you're building a store locator for a coffee chain.
                Here's how geohashes make it simple:
              </p>
              <div className="practical-example">
                <div className="step-example">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Store locations as geohashes</h4>
                    <p>
                      Instead of storing lat/lng pairs, convert each store to a
                      geohash:
                    </p>
                    <div className="code-example">
                      <div className="store-item">
                        <strong>Starbucks Times Square:</strong>{" "}
                        <code>dr5regy</code>
                      </div>
                      <div className="store-item">
                        <strong>Starbucks Union Square:</strong>{" "}
                        <code>dr5ru7k</code>
                      </div>
                      <div className="store-item">
                        <strong>Starbucks Central Park:</strong>{" "}
                        <code>dr5ru2h</code>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step-example">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>User searches for nearby stores</h4>
                    <p>
                      When a user at Times Square searches, convert their
                      location to <code>dr5regy</code> and find all stores with
                      the same prefix.
                    </p>
                  </div>
                </div>
                <div className="step-example">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Expand search if needed</h4>
                    <p>
                      No stores with <code>dr5regy</code>? Try{" "}
                      <code>dr5reg</code>, then <code>dr5re</code>, then{" "}
                      <code>dr5r</code> until you find nearby options.
                    </p>
                  </div>
                </div>
              </div>

              <h2>Try it yourself with GeohashViz</h2>
              <p>
                Working with geohashes becomes even more intuitive when you can
                see them on a map. That's why we built{" "}
                <Link to="/">GeohashViz</Link>, a web app that visualises
                multiple geohashes at once. Paste in a list of codes and it
                draws each bounding box on an interactive map, zooming
                automatically to fit your data.
              </p>
              <p>
                Want to understand how far apart two cells are? Turn on the
                Distance Analysis feature and watch arcs appear between them,
                complete with measurements. You can choose between kilometres
                and miles and explore four calculation modes, from consecutive
                distances to all‑pairs comparisons.
              </p>

              <div className="quick-start">
                <h3>Quick start guide</h3>
                <ol>
                  <li>
                    Copy this sample data:{" "}
                    <code>dr5regy dr5ru7k dr5ru2h 9q8yyk8 gcpvj0u</code>
                  </li>
                  <li>
                    Go to <Link to="/">GeohashViz</Link> and paste it in the
                    input box
                  </li>
                  <li>
                    Click "Visualize" and watch the map show bounding boxes for
                    each location
                  </li>
                  <li>
                    Try enabling "Distance Analysis" to see connections between
                    points
                  </li>
                </ol>
              </div>

              <p>
                Whether you're just learning about geospatial encoding or you
                build location‑based services every day, geohashes are a tool
                worth knowing. With a few lines of code or the right
                visualisation tool, they turn complex spatial queries into
                simple string operations. Dive in, experiment, and see how these
                compact strings can make your location data easier to manage.
              </p>

              <div className="article-cta">
                <h3>Visualize Your Geohashes</h3>
                <p>
                  See how geohashes work with your real-world data using our
                  interactive visualization tool.
                </p>
                <Link to="/" className="cta-button">
                  Try GeohashViz →
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Geohash101;
