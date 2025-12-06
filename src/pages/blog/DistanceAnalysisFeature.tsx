import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Blog.css";

const DistanceAnalysisFeature = () => {
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
                <span className="article-category">Features</span>
                <span className="article-date">December 2024</span>
                <span className="read-time">6 min read</span>
              </div>
              <h1 className="article-title">
                Introducing Distance Analysis in GeohashViz
              </h1>
              <p className="article-subtitle">
                Discover our new Distance Analysis feature that brings
                real-world distance measurements directly into the map interface
                with interactive filtering.
              </p>
            </div>
            ``
            {/* Article Content */}
            <div className="article-content">
              <p>
                GeohashViz started as a simple way to turn opaque geohash
                strings into something visual. Over time, people didn't just
                want to see geohashes on a map, they wanted to understand how
                those areas relate spatially.
              </p>
              <p>
                How far apart are they? Which ones are closest? Which ones form
                a path? What's noise and what's actually relevant? The new
                Distance Analysis feature answers that by bringing real‑world
                distance directly into the map interface.
              </p>

              <h2>Why This Feature Exists</h2>
              <p>
                If you work with geohashes in code or datasets, you already know
                the problem:
              </p>
              <ul>
                <li>Strings tell you nothing about geography</li>
                <li>Converting to lat‑long is tedious</li>
                <li>
                  Copying values to another site just to measure distance is
                  annoying
                </li>
                <li>
                  When you have many geohashes, everything becomes unreadable
                </li>
              </ul>
              <p>
                Distance Analysis removes all that friction. No exports. No
                conversions. You stay on the map and reason visually.
              </p>

              <h2>How It Works</h2>
              <p>Getting started with Distance Analysis is straightforward:</p>

              <div className="feature-steps">
                <div className="feature-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Paste your geohashes</h4>
                    <p>Enter your geohashes one per line in the input field</p>
                  </div>
                </div>
                <div className="feature-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Click Visualize Geohashes</h4>
                    <p>
                      See your geohashes rendered as bounding boxes on the map
                    </p>
                  </div>
                </div>
                <div className="feature-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Enable Distance Analysis</h4>
                    <p>
                      Open Advanced Options and toggle on Distance Analysis.
                      Lines appear connecting your geohashes with distance
                      labels
                    </p>
                  </div>
                </div>
                <div className="feature-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Explore calculation modes</h4>
                    <p>
                      Use the Calculation Mode dropdown to explore different
                      ways of measuring distances
                    </p>
                  </div>
                </div>
              </div>

              <div className="interactive-example">
                <h3>Feature in Action</h3>
                <p>
                  Below is an example of the feature showing two geohash cells
                  connected with a distance line and a label in the middle:
                </p>
                <img
                  src="/images/distance_calculation_intro.png"
                  alt="Distance Analysis Example"
                  className="distance-analysis-example"
                />
              </div>

              <p>
                The interface also adds a Reference Point dropdown when you
                select "From reference point" mode. This lets you choose which
                geohash acts as the origin for distance calculations.
              </p>

              <h2>Click to Filter and Highlight</h2>
              <p>
                When you're working with more than a couple of geohashes, the
                map can quickly become cluttered. GeohashViz includes two simple
                interactions to help you focus:
              </p>

              <div className="interaction-features">
                <div className="interaction-item">
                  <div className="interaction-icon">🎯</div>
                  <div className="interaction-content">
                    <h4>Click a geohash cell</h4>
                    <p>
                      All unrelated lines fade away, and only the distances
                      involving that hash remain. A banner at the top shows
                      which geohash is highlighted.
                    </p>
                    <img
                      src="/images/distance_calculation_geohash_click.png"
                      alt="Distance Calculation Geohash Click"
                      className="distance-analysis-example"
                    />
                  </div>
                </div>

                <div className="interaction-item">
                  <div className="interaction-icon">🔗</div>
                  <div className="interaction-content">
                    <h4>Click a connection line</h4>
                    <p>
                      Isolate a single pair of geohashes. Only that line stays
                      visible, allowing you to inspect a specific distance
                      without distraction.
                    </p>
                    <img
                      src="/images/distance_calculation_line_click.png"
                      alt="Distance Calculation Line Click"
                      className="distance-analysis-example"
                    />
                  </div>
                </div>
              </div>

              <p>
                These interactions turn a spaghetti of distance arcs into a tool
                you can interrogate with a single click.
              </p>

              <h2>Distance Calculation Modes</h2>
              <p>
                You're not locked into one way of measuring distance. GeohashViz
                gives you four calculation modes depending on what you're trying
                to understand:
              </p>

              <div className="calculation-modes">
                <div className="mode-card">
                  <div className="mode-header">
                    <div className="mode-icon">📍</div>
                    <h4>From Reference Point</h4>
                  </div>
                  <p>
                    Pick one geohash as the anchor and see distances to all
                    others. Useful for hub‑and‑spoke visualizations.
                  </p>
                  <div className="mode-example">
                    <strong>Use case:</strong> Finding all locations within 50km
                    of your main office
                  </div>
                </div>

                <div className="mode-card">
                  <div className="mode-header">
                    <div className="mode-icon">🛤️</div>
                    <h4>Between Consecutive</h4>
                  </div>
                  <p>
                    Treat your list as a route or sequence and calculate
                    distance step‑by‑step.
                  </p>
                  <div className="mode-example">
                    <strong>Use case:</strong> Calculating total distance for a
                    delivery route
                  </div>
                </div>

                <div className="mode-card">
                  <div className="mode-header">
                    <div className="mode-icon">🔍</div>
                    <h4>To Nearest Neighbor</h4>
                  </div>
                  <p>
                    Each geohash connects to the physically closest one – good
                    for clustering or adjacency checks.
                  </p>
                  <div className="mode-example">
                    <strong>Use case:</strong> Finding the closest store to each
                    customer location
                  </div>
                </div>

                <div className="mode-card">
                  <div className="mode-header">
                    <div className="mode-icon">🕸️</div>
                    <h4>All Pairs</h4>
                  </div>
                  <p>
                    Every geohash is connected to every other one – ideal when
                    your set is small and you want a complete picture.
                  </p>
                  <div className="mode-example">
                    <strong>Use case:</strong> Analyzing distances between all
                    office locations
                  </div>
                </div>
              </div>

              <p>
                Each mode updates interactively as you change your inputs or
                switch the selected calculation.
              </p>

              <h2>Try It Yourself</h2>
              <p>
                Ready to explore Distance Analysis? Here are some example
                geohashes to get you started:
              </p>

              <div className="try-examples">
                <div className="example-set">
                  <h4>🏙️ Major Cities</h4>
                  <div className="example-codes">
                    <code>dr5regy</code> <span>New York</span>
                    <br />
                    <code>9q8yyk8</code> <span>San Francisco</span>
                    <br />
                    <code>dp3wm</code> <span>Chicago</span>
                    <br />
                    <code>9vg8</code> <span>Los Angeles</span>
                  </div>
                  <p>
                    Try "From reference point" mode with New York as the
                    reference to see distances to other major cities.
                  </p>
                </div>

                <div className="example-set">
                  <h4>🗺️ London Neighborhoods</h4>
                  <div className="example-codes">
                    <code>gcpvj0u</code> <span>Westminster</span>
                    <br />
                    <code>gcpvn</code> <span>Camden</span>
                    <br />
                    <code>gcpvh</code> <span>Kensington</span>
                    <br />
                    <code>gcpuu</code> <span>Greenwich</span>
                  </div>
                  <p>
                    Use "To nearest neighbor" mode to see which neighborhoods
                    are closest to each other.
                  </p>
                </div>

                <div className="example-set">
                  <h4>🛣️ Route Planning</h4>
                  <div className="example-codes">
                    <code>9q8yy</code> <span>San Francisco</span>
                    <br />
                    <code>9q9p</code> <span>Oakland</span>
                    <br />
                    <code>9q9j</code> <span>San Jose</span>
                    <br />
                    <code>9q60</code> <span>Monterey</span>
                  </div>
                  <p>
                    Try "Between consecutive" mode to calculate the total
                    distance for this California road trip.
                  </p>
                </div>
              </div>

              <h2>What's Next</h2>
              <p>
                Distance is just the beginning. We're constantly improving
                GeohashViz based on user feedback. Planned improvements include:
              </p>

              <div className="roadmap-items">
                <div className="roadmap-item">
                  <div className="roadmap-icon">📊</div>
                  <div className="roadmap-content">
                    <h4>Export Distance Results</h4>
                    <p>
                      Save distance calculations as CSV or JSON for analysis
                    </p>
                  </div>
                </div>
                <div className="roadmap-item">
                  <div className="roadmap-icon">🔥</div>
                  <div className="roadmap-content">
                    <h4>Clustering & Heatmaps</h4>
                    <p>Neighbor clustering and density heatmaps</p>
                  </div>
                </div>
                <div className="roadmap-item">
                  <div className="roadmap-icon">📏</div>
                  <div className="roadmap-content">
                    <h4>Bounding Box Analysis</h4>
                    <p>Show bounding box size per precision level</p>
                  </div>
                </div>
                <div className="roadmap-item">
                  <div className="roadmap-icon">🎨</div>
                  <div className="roadmap-content">
                    <h4>Attribute-Based Coloring</h4>
                    <p>
                      Color geohashes by POI count, categories, or custom data
                    </p>
                  </div>
                </div>
              </div>

              <h2>We Want Your Feedback</h2>
              <p>
                We'd love to hear how you use the distance feature and what
                other analyses would make your work easier. The Distance
                Analysis feature was built based on user requests, and your
                feedback continues to shape our roadmap.
              </p>
              <p>
                Have ideas for new calculation modes? Need specific export
                formats? Want to see other spatial analysis features? Let us
                know through{" "}
                <a
                  href="https://github.com/amarlearning/geohashviz.com/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub issues
                </a>{" "}
                or reach out directly.
              </p>

              <div className="article-cta">
                <h3>Try Distance Analysis Now</h3>
                <p>
                  Experience the new Distance Analysis feature with your own
                  geohashes or try our example datasets.
                </p>
                <Link to="/" className="cta-button">
                  Start Analyzing →
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DistanceAnalysisFeature;
