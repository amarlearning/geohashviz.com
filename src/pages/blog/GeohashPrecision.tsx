import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Blog.css";

const GeohashPrecision = () => {
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
                <span className="article-category">Guide</span>
                <span className="article-date">December 2024</span>
                <span className="read-time">7 min read</span>
              </div>
              <h1 className="article-title">
                Comparing Geohash Precision: A Complete Guide
              </h1>
              <p className="article-subtitle">
                Explore different geohash lengths and their precision levels.
                Learn how to choose the right precision for your specific use
                case.
              </p>
            </div>

            {/* Article Content */}
            <div className="article-content">
              <h2>Understanding Geohash Precision</h2>
              <p>
                One of the most powerful features of geohashes is their variable
                precision. By simply adding or removing characters, you can zoom
                in or out on any location. But how do you choose the right
                precision for your application? The answer depends on your
                specific use case, performance requirements, and the level of
                accuracy you need.
              </p>

              <h2>Precision Levels Breakdown</h2>
              <p>
                Each character in a geohash represents approximately 5 bits of
                precision, cutting the bounding box size roughly in half. Here's
                how different lengths translate to real-world areas:
              </p>

              <div className="precision-table">
                <div className="precision-row header">
                  <div className="precision-length">Length</div>
                  <div className="precision-size">Approximate Size</div>
                  <div className="precision-example">Example Use Case</div>
                </div>
                <div className="precision-row">
                  <div className="precision-length">
                    <code>1</code>
                  </div>
                  <div className="precision-size">5,000 km × 5,000 km</div>
                  <div className="precision-example">Continental regions</div>
                </div>
                <div className="precision-row">
                  <div className="precision-length">
                    <code>2</code>
                  </div>
                  <div className="precision-size">1,250 km × 625 km</div>
                  <div className="precision-example">Large countries</div>
                </div>
                <div className="precision-row">
                  <div className="precision-length">
                    <code>3</code>
                  </div>
                  <div className="precision-size">156 km × 156 km</div>
                  <div className="precision-example">States/provinces</div>
                </div>
                <div className="precision-row">
                  <div className="precision-length">
                    <code>4</code>
                  </div>
                  <div className="precision-size">39 km × 20 km</div>
                  <div className="precision-example">Large cities</div>
                </div>
                <div className="precision-row">
                  <div className="precision-length">
                    <code>5</code>
                  </div>
                  <div className="precision-size">4.9 km × 4.9 km</div>
                  <div className="precision-example">City districts</div>
                </div>
                <div className="precision-row">
                  <div className="precision-length">
                    <code>6</code>
                  </div>
                  <div className="precision-size">1.2 km × 0.6 km</div>
                  <div className="precision-example">Neighborhoods</div>
                </div>
                <div className="precision-row">
                  <div className="precision-length">
                    <code>7</code>
                  </div>
                  <div className="precision-size">153 m × 153 m</div>
                  <div className="precision-example">City blocks</div>
                </div>
                <div className="precision-row">
                  <div className="precision-length">
                    <code>8</code>
                  </div>
                  <div className="precision-size">38 m × 19 m</div>
                  <div className="precision-example">Buildings</div>
                </div>
                <div className="precision-row">
                  <div className="precision-length">
                    <code>9</code>
                  </div>
                  <div className="precision-size">4.8 m × 4.8 m</div>
                  <div className="precision-example">Rooms/parking spots</div>
                </div>
              </div>

              <h2>Real-World Examples</h2>
              <p>
                Let's explore how different precision levels look in practice
                using New York City as our example:
              </p>

              <div className="examples-grid">
                <div className="example-card">
                  <h4>🌍 Continental Level</h4>
                  <div className="geohash-example">
                    <span className="geohash-code">d</span>
                  </div>
                  <p>Covers most of North America</p>
                  <div className="precision-breakdown">
                    Perfect for: Global analytics, continent-wide services
                  </div>
                </div>
                <div className="example-card">
                  <h4>🏙️ City Level</h4>
                  <div className="geohash-example">
                    <span className="geohash-code">dr5r</span>
                  </div>
                  <p>Covers Manhattan and surrounding areas</p>
                  <div className="precision-breakdown">
                    Perfect for: City-wide services, weather zones
                  </div>
                </div>
                <div className="example-card">
                  <h4>🏘️ Neighborhood Level</h4>
                  <div className="geohash-example">
                    <span className="geohash-code">dr5regy</span>
                  </div>
                  <p>Times Square area (few city blocks)</p>
                  <div className="precision-breakdown">
                    Perfect for: Local delivery, ride-sharing zones
                  </div>
                </div>
                <div className="example-card">
                  <h4>🏢 Building Level</h4>
                  <div className="geohash-example">
                    <span className="geohash-code">dr5regy62</span>
                  </div>
                  <p>Specific building in Times Square</p>
                  <div className="precision-breakdown">
                    Perfect for: Asset tracking, indoor navigation
                  </div>
                </div>
              </div>

              <h2>Choosing the Right Precision</h2>

              <h3>For Database Indexing</h3>
              <p>
                When using geohashes for spatial indexing, shorter is often
                better. Use <strong>4-6 characters</strong> for most
                applications. This provides good spatial grouping without
                creating too many unique values. For example, Uber uses 6
                characters to group nearby drivers and riders efficiently.
              </p>

              <h3>For Proximity Searches</h3>
              <p>
                The precision should match your search radius. If you're looking
                for restaurants within 1km, use <strong>6-7 characters</strong>.
                For broader searches (within 10km),{" "}
                <strong>4-5 characters</strong> work better. Remember: you can
                always expand your search by truncating the geohash.
              </p>

              <h3>For Real-Time Applications</h3>
              <p>
                Balance precision with performance. Ride-sharing apps typically
                use <strong>6-7 characters</strong> for driver locations —
                precise enough for accurate matching but not so precise that it
                creates excessive database load. Food delivery might use{" "}
                <strong>7-8 characters</strong> for more granular routing.
              </p>

              <h3>For Analytics and Reporting</h3>
              <p>
                Use shorter geohashes for aggregation.{" "}
                <strong>3-5 characters</strong> work well for city-level
                analytics, while <strong>5-6 characters</strong> are perfect for
                neighborhood-level insights. This reduces data volume while
                maintaining meaningful geographic groupings.
              </p>

              <h2>Performance Considerations</h2>

              <h3>Storage Efficiency</h3>
              <p>
                Longer geohashes mean more unique values in your database.
                Consider the trade-off: a 9-character geohash creates billions
                of possible values, while a 6-character geohash creates only
                about 1 billion. For most applications, 6-7 characters provide
                the sweet spot between precision and efficiency.
              </p>

              <h3>Query Performance</h3>
              <p>
                Shorter geohashes enable faster prefix searches. If you need to
                find all points within a region, searching for geohashes
                starting with <strong>"dr5r"</strong> is much faster than
                calculating distances to every point in your database.
              </p>

              <h2>Common Precision Patterns</h2>

              <div className="pattern-examples">
                <div className="pattern-item">
                  <h4>🚗 Ride-Sharing Pattern</h4>
                  <p>
                    <strong>Driver locations:</strong> 6-7 characters
                    <br />
                    <strong>Pickup zones:</strong> 5-6 characters
                    <br />
                    <strong>Surge pricing:</strong> 4-5 characters
                  </p>
                </div>
                <div className="pattern-item">
                  <h4>🍕 Food Delivery Pattern</h4>
                  <p>
                    <strong>Restaurant locations:</strong> 7-8 characters
                    <br />
                    <strong>Delivery zones:</strong> 6-7 characters
                    <br />
                    <strong>Service areas:</strong> 4-5 characters
                  </p>
                </div>
                <div className="pattern-item">
                  <h4>🎮 Gaming Pattern</h4>
                  <p>
                    <strong>Spawn points:</strong> 8-9 characters
                    <br />
                    <strong>Play areas:</strong> 6-7 characters
                    <br />
                    <strong>Regions:</strong> 3-4 characters
                  </p>
                </div>
                <div className="pattern-item">
                  <h4>📊 Analytics Pattern</h4>
                  <p>
                    <strong>City reports:</strong> 4-5 characters
                    <br />
                    <strong>Neighborhood insights:</strong> 5-6 characters
                    <br />
                    <strong>Detailed tracking:</strong> 7-8 characters
                  </p>
                </div>
              </div>

              <h2>Testing Different Precisions</h2>
              <p>
                The best way to understand geohash precision is to see it in
                action. Try these examples in <Link to="/">GeohashViz</Link> to
                see how different lengths affect the bounding box size:
              </p>

              <div className="interactive-example">
                <h3>Experiment with these examples:</h3>
                <div className="try-examples">
                  <div className="try-example">
                    <code>dr5</code>{" "}
                    <span>New York region (very large area)</span>
                  </div>
                  <div className="try-example">
                    <code>dr5r</code> <span>Manhattan area (city level)</span>
                  </div>
                  <div className="try-example">
                    <code>dr5re</code>{" "}
                    <span>Midtown Manhattan (district level)</span>
                  </div>
                  <div className="try-example">
                    <code>dr5reg</code>{" "}
                    <span>Times Square area (neighborhood)</span>
                  </div>
                  <div className="try-example">
                    <code>dr5regy</code>{" "}
                    <span>Times Square blocks (street level)</span>
                  </div>
                  <div className="try-example">
                    <code>dr5regy6</code>{" "}
                    <span>Specific Times Square location</span>
                  </div>
                </div>
                <p>
                  Copy and paste these into GeohashViz to see how each
                  additional character narrows the focus area.
                </p>
              </div>

              <h2>Best Practices</h2>
              <ul>
                <li>
                  <strong>Start with 6 characters</strong> for most
                  applications, then adjust based on your needs
                </li>
                <li>
                  <strong>Use consistent precision</strong> within the same
                  feature to avoid confusion
                </li>
                <li>
                  <strong>Consider your data volume</strong> — more precision
                  means more unique values
                </li>
                <li>
                  <strong>Test with real data</strong> to find the optimal
                  balance for your use case
                </li>
                <li>
                  <strong>Plan for expansion</strong> — you can always truncate
                  geohashes, but extending them requires recalculation
                </li>
              </ul>

              <div className="article-cta">
                <h3>Explore Precision Levels</h3>
                <p>
                  See how different geohash precisions work with your data using
                  our interactive visualization tool.
                </p>
                <Link to="/" className="cta-button">
                  Try Different Precisions →
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GeohashPrecision;
