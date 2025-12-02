import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Blog.css";

const OptimizingGeoQueries = () => {
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
                <span className="article-category">Performance</span>
                <span className="article-date">December 2024</span>
                <span className="read-time">8 min read</span>
              </div>
              <h1 className="article-title">
                Optimizing Geo Queries with Geohashes
              </h1>
              <p className="article-subtitle">
                Learn how geohashes accelerate spatial queries in databases like
                Firestore and Elasticsearch with practical examples and code.
              </p>
            </div>

            {/* Article Content */}
            <div className="article-content">
              <h2>Why Spatial Queries Can Be Slow</h2>
              <p>
                Traditional geo queries involve comparing every latitude and
                longitude in a table to a search point to see whether it falls
                within a given distance. When your dataset grows to millions of
                records, this approach becomes painfully slow. Indexes on
                floating‑point fields help, but they're still two separate
                dimensions. That's where geohashes shine.
              </p>
              <p>
                A geohash encodes two coordinates into a single string. Because
                two points in the same region share a common prefix, you can
                perform efficient prefix searches to find nearby points.
                Databases such as Firebase Firestore and Elasticsearch take
                advantage of this property to accelerate geoqueries.
              </p>

              <h2>Firestore Example</h2>
              <p>
                Firestore doesn't natively support geo queries, but you can
                store a geohash alongside each document and then query by
                prefix. Here's a simplified example using a client library:
              </p>

              <div className="code-snippet">
                <h4>Python Example with Firestore</h4>
                <pre>
                  <code>{`from geopy.geocoders import Nominatim
import geohash2
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firestore
cred = credentials.Certificate('service_account.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Encode a location and save it
lat, lon = 51.5074, -0.1278  # London
code = geohash2.encode(lat, lon, precision=8)
db.collection('places').add({
    'name': 'London',
    'lat': lat,
    'lon': lon,
    'geohash': code
})

# Query for places near a point by geohash prefix
search_code = geohash2.encode(51.5, -0.1, precision=5)
query = db.collection('places').where('geohash', '>=', search_code)

# The end prefix increments the last character to get the upper bound
end_prefix = search_code[:-1] + chr(ord(search_code[-1]) + 1)
query = query.where('geohash', '<', end_prefix)

results = [doc.to_dict() for doc in query.stream()]
print(results)`}</code>
                </pre>
                <p>
                  The key step is using a geohash prefix as the range in your
                  query. All documents whose geohash begins with that prefix lie
                  in the same bounding box, so Firestore can use the index to
                  find them quickly.
                </p>
              </div>

              <h2>Elasticsearch Example</h2>
              <p>
                Elasticsearch supports geohashes natively. You can index a
                geo_point field and then use a geohash prefix to narrow down
                your search area. Here's a snippet of a query that finds points
                within a particular geohash:
              </p>

              <div className="code-snippet">
                <h4>Elasticsearch Query</h4>
                <pre>
                  <code>{`{
  "query": {
    "bool": {
      "filter": {
        "geo_bounding_box": {
          "location.geohash": "gcpv"
        }
      }
    }
  }
}`}</code>
                </pre>
                <p>
                  The geo_bounding_box query interprets the geohash prefix and
                  returns all documents whose location field falls within the
                  corresponding bounding box. You can adjust the precision to
                  trade between query performance and spatial accuracy.
                </p>
              </div>

              <h2>How Geohashes Accelerate Queries</h2>
              <p>
                The workflow of using geohashes for geo queries follows a simple
                pattern:
              </p>

              <div className="workflow-steps">
                <div className="workflow-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Convert coordinates to geohash</h4>
                    <p>
                      Convert the search point to a geohash. Adjust the
                      precision (number of characters) based on how wide you
                      want your search area to be.
                    </p>
                    <div className="step-example">
                      <strong>Example:</strong> London (51.5074, -0.1278) →{" "}
                      <code>gcpvj0u</code>
                    </div>
                  </div>
                </div>

                <div className="workflow-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Query by prefix</h4>
                    <p>
                      Use the geohash prefix as the lower and upper bounds in
                      your query. A shorter prefix covers a larger area; a
                      longer prefix narrows the search.
                    </p>
                    <div className="step-example">
                      <strong>Search area:</strong> <code>gcpv</code> (covers
                      central London area)
                    </div>
                  </div>
                </div>

                <div className="workflow-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Retrieve results</h4>
                    <p>
                      The database returns only documents whose geohash fields
                      fall within that prefix range.
                    </p>
                    <div className="step-example">
                      <strong>Results:</strong> All locations with geohashes
                      starting with <code>gcpv</code>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                This approach replaces complex <code>distance &lt; r</code>{" "}
                calculations with a simple string comparison. You can refine the
                results further in your application by computing the actual
                distance between the returned points and the original location.
              </p>

              <h2>Performance Comparison</h2>
              <p>
                Here's how geohash queries compare to traditional distance-based
                queries:
              </p>

              <div className="performance-comparison">
                <div className="comparison-item">
                  <h4>Traditional Distance Query</h4>
                  <div className="comparison-stats">
                    <div className="stat-bad">
                      <span className="stat-number">~2000ms</span>
                      <span className="stat-label">
                        Query time (1M records)
                      </span>
                    </div>
                    <div className="stat-bad">
                      <span className="stat-number">Full scan</span>
                      <span className="stat-label">Database operation</span>
                    </div>
                  </div>
                  <p>
                    Calculates distance to every record, even those thousands of
                    kilometers away.
                  </p>
                </div>

                <div className="comparison-item">
                  <h4>Geohash Prefix Query</h4>
                  <div className="comparison-stats">
                    <div className="stat-good">
                      <span className="stat-number">~50ms</span>
                      <span className="stat-label">
                        Query time (1M records)
                      </span>
                    </div>
                    <div className="stat-good">
                      <span className="stat-number">Index scan</span>
                      <span className="stat-label">Database operation</span>
                    </div>
                  </div>
                  <p>
                    Uses string prefix matching to eliminate irrelevant records
                    before distance calculations.
                  </p>
                </div>
              </div>

              <h2>Choosing the Right Precision</h2>
              <p>
                The precision level you choose affects both query performance
                and result accuracy:
              </p>

              <div className="precision-guide">
                <div className="precision-item">
                  <div className="precision-level">
                    <code>4-5 characters</code>
                  </div>
                  <div className="precision-details">
                    <strong>City-level searches</strong>
                    <br />
                    Good for: Finding restaurants in a city, weather by region
                    <br />
                    Area: ~20-40 km²
                  </div>
                </div>
                <div className="precision-item">
                  <div className="precision-level">
                    <code>6-7 characters</code>
                  </div>
                  <div className="precision-details">
                    <strong>Neighborhood searches</strong>
                    <br />
                    Good for: Local delivery, ride-sharing zones
                    <br />
                    Area: ~1-5 km²
                  </div>
                </div>
                <div className="precision-item">
                  <div className="precision-level">
                    <code>8-9 characters</code>
                  </div>
                  <div className="precision-details">
                    <strong>Street-level precision</strong>
                    <br />
                    Good for: Asset tracking, precise location services
                    <br />
                    Area: ~40-600 m²
                  </div>
                </div>
              </div>

              <h2>Advanced Optimization Techniques</h2>

              <h3>Multi-Level Indexing</h3>
              <p>
                Store multiple geohash precisions for the same location to
                enable efficient queries at different zoom levels:
              </p>

              <div className="code-snippet">
                <h4>Multi-Precision Storage</h4>
                <pre>
                  <code>{`{
  "name": "Central Park",
  "location": {
    "lat": 40.7829,
    "lng": -73.9654,
    "geohash_4": "dr5r",
    "geohash_6": "dr5ru2",
    "geohash_8": "dr5ru2h8"
  }
}`}</code>
                </pre>
                <p>
                  Query the appropriate precision level based on your search
                  radius requirements.
                </p>
              </div>

              <h3>Neighbor Cell Expansion</h3>
              <p>
                For searches near geohash boundaries, include neighboring cells
                to avoid missing nearby results:
              </p>

              <div className="code-snippet">
                <h4>Including Neighbor Cells</h4>
                <pre>
                  <code>{`# Get neighboring geohashes for comprehensive search
center_geohash = "dr5ru2"
neighbors = geohash2.neighbors(center_geohash)

# Query all cells: center + 8 neighbors
all_prefixes = [center_geohash] + neighbors
query_conditions = [
    db.collection('places').where('geohash', '>=', prefix)
    for prefix in all_prefixes
]`}</code>
                </pre>
                <p>
                  This ensures you don't miss locations that are physically
                  close but fall in adjacent geohash cells.
                </p>
              </div>

              <h2>Visualizing Geohash Queries with GeohashViz</h2>
              <p>
                <Link to="/">GeohashViz</Link> makes it easy to see how geohash
                prefixes correspond to map regions. Paste a list of geohashes
                into the tool and it draws each bounding box on an interactive
                map. The Distance Analysis feature can show you how far apart
                those regions are, with options to calculate distances from a
                reference point, between consecutive geohashes, to the nearest
                neighbor, or all pairs.
              </p>

              <div className="interactive-example">
                <h3>Try these query examples:</h3>
                <div className="try-examples">
                  <div className="try-example">
                    <code>gcp gcpv gcpvj</code>{" "}
                    <span>London at different precision levels</span>
                  </div>
                  <div className="try-example">
                    <code>dr5r dr5re dr5reg</code>{" "}
                    <span>New York City zoom progression</span>
                  </div>
                  <div className="try-example">
                    <code>9q8 9q9 9qb</code>{" "}
                    <span>San Francisco Bay Area regions</span>
                  </div>
                </div>
                <p>
                  Enter these codes and watch how each box zooms into a smaller
                  area. If you toggle on distance analysis from a reference
                  point, the app draws arcs and labels showing the distances
                  between cells. This visual feedback helps you choose the right
                  precision when constructing your geohash queries.
                </p>
              </div>

              <h2>Real-World Implementation Tips</h2>

              <h3>Database Schema Design</h3>
              <ul>
                <li>
                  <strong>Index geohash fields:</strong> Create database indexes
                  on your geohash columns for fast prefix searches
                </li>
                <li>
                  <strong>Store original coordinates:</strong> Keep lat/lng for
                  precise distance calculations after filtering
                </li>
                <li>
                  <strong>Use appropriate precision:</strong> Don't over-index
                  with unnecessary precision levels
                </li>
              </ul>

              <h3>Query Optimization</h3>
              <ul>
                <li>
                  <strong>Start broad, then narrow:</strong> Begin with shorter
                  geohashes, then refine with distance calculations
                </li>
                <li>
                  <strong>Cache common queries:</strong> Popular search areas
                  can be pre-computed and cached
                </li>
                <li>
                  <strong>Batch operations:</strong> Group multiple location
                  updates by geohash prefix for efficient writes
                </li>
              </ul>

              <h2>Putting It All Together</h2>
              <p>
                Optimizing geo queries isn't about reinventing the wheel; it's
                about using the right tools. Geohashes compress geographic
                coordinates into strings that sort well and lend themselves to
                prefix searches. When combined with modern databases like
                Firestore or Elasticsearch, they dramatically reduce query
                latency.
              </p>
              <p>
                Visual tools like <Link to="/">GeohashViz</Link> reinforce this
                intuition by showing how precision levels impact the search area
                and how distances between regions vary. Whether you're building
                a location‑based app or analyzing spatial data at scale,
                leveraging geohashes and visualizing them will pay dividends in
                performance and understanding.
              </p>
              <p>
                Experiment with different precisions, explore distance analysis,
                and let those compact strings speed up your geo queries.
              </p>

              <div className="article-cta">
                <h3>Visualize Your Query Areas</h3>
                <p>
                  See how different geohash precisions affect your search areas
                  and optimize your queries with visual feedback.
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

export default OptimizingGeoQueries;
