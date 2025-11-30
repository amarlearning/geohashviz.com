import { Container, Row, Col, Card } from "react-bootstrap";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section with Gradient Background */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={10}>
              <h1 className="hero-title">About GeohashViz</h1>
              <p className="hero-subtitle">
                Making location data visual, intuitive, and fun to explore
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="main-content">
        {/* Mission & What We Offer Combined */}
        <section className="content-section">
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <div className="content-block">
                <div className="section-badge">Our Mission</div>
                <h2 className="section-heading">Demystifying Geohashes</h2>
                <p className="section-text">
                  We started GeohashViz to demystify geohashes. These compact
                  codes are incredibly useful for working with geographic data,
                  but they're hard to picture in your head. Our goal is to
                  bridge that gap and make location data visual, intuitive, and
                  fun to explore.
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="feature-showcase">
                <div className="showcase-item">
                  <div className="showcase-icon">🗺️</div>
                  <div>
                    <h4>Interactive Visualization</h4>
                    <p>
                      Paste multiple geohash strings and see their bounding
                      boxes on an interactive map with automatic zoom-to-fit
                    </p>
                  </div>
                </div>
                <div className="showcase-item">
                  <div className="showcase-icon">📏</div>
                  <div>
                    <h4>Distance Analysis</h4>
                    <p>
                      Draw arcs between points and measure distances in
                      different ways — reference point, consecutive, nearest
                      neighbors
                    </p>
                  </div>
                </div>
                <div className="showcase-item">
                  <div className="showcase-icon">⚡</div>
                  <div>
                    <h4>Responsive Performance</h4>
                    <p>
                      Interface stays responsive even with large datasets,
                      automatically zooming to fit everything you've added
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* How It Works - Compact Grid */}
        <section className="content-section">
          <div className="section-header">
            <div className="section-badge">How It Works</div>
            <h2 className="section-heading">Built for Performance</h2>
            <p className="section-description">
              The webapp runs on a lightweight stack with optimizations that
              keep everything feeling snappy and responsive.
            </p>
          </div>
          <Row className="g-4">
            <Col md={4}>
              <Card className="tech-card">
                <Card.Body>
                  <div className="tech-number">01</div>
                  <h5>Lightweight Stack</h5>
                  <p>
                    React and TypeScript frontend with Leaflet providing mapping
                    capabilities
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="tech-card">
                <Card.Body>
                  <div className="tech-number">02</div>
                  <h5>Smart Optimization</h5>
                  <p>
                    Memoization ensures repeated calculations are quick with
                    ongoing performance improvements
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="tech-card">
                <Card.Body>
                  <div className="tech-number">03</div>
                  <h5>Full Configurability</h5>
                  <p>
                    Distance units, calculation modes, and visual indicators are
                    all configurable
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Community & Open Source */}
        <section className="content-section">
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">🔓</div>
                  <div className="stat-label">Open Source</div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">🤝</div>
                  <div className="stat-label">Community Driven</div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">🚀</div>
                  <div className="stat-label">Actively Maintained</div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">💡</div>
                  <div className="stat-label">User Feedback</div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="content-block">
                <div className="section-badge">Community</div>
                <h2 className="section-heading">Open Source & Collaborative</h2>
                <p className="section-text">
                  GeohashViz is open source and welcomes contributions. We
                  maintain the codebase on GitHub, and feedback from users has
                  driven many of the features you see today. Whether you're
                  filing a bug report, suggesting an enhancement, or submitting
                  a pull request, you're helping us build a better tool for
                  everyone.
                </p>
                <a
                  href="https://github.com/amarlearning/geohashviz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Contribute on GitHub
                </a>
              </div>
            </Col>
          </Row>
        </section>
      </Container>

      {/* Final CTA */}
      <section className="final-cta">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="cta-title">Join the Community</h2>
              <p className="cta-text">
                We're excited to see how developers, researchers, and hobbyists
                use GeohashViz in their projects. Together we can make
                geospatial analysis simpler and more accessible.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
