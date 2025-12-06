import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Blog.css";

const BlogList = () => {
  const blogPosts = [
    {
      slug: "geohash-101",
      title: "Geohash 101: Understanding Location Encoding",
      excerpt:
        "Learn the fundamentals of geohashing, how it works, and why it's essential for modern location-based applications.",
      readTime: "8 min read",
      date: "December 2024",
      category: "Fundamentals",
    },
    {
      slug: "geohash-precision-guide",
      title: "Comparing Geohash Precision: A Complete Guide",
      excerpt:
        "Explore different geohash lengths and their precision levels. Learn how to choose the right precision for your specific use case.",
      readTime: "7 min read",
      date: "December 2024",
      category: "Guide",
    },
    {
      slug: "distance-analysis-feature",
      title: "Introducing Distance Analysis in GeohashViz",
      excerpt:
        "Discover our new Distance Analysis feature that brings real-world distance measurements directly into the map interface with interactive filtering.",
      readTime: "6 min read",
      date: "December 2024",
      category: "Features",
    },
    {
      slug: "optimizing-geo-queries",
      title: "Optimizing Geo Queries with Geohashes",
      excerpt:
        "Learn how geohashes accelerate spatial queries in databases like Firestore and Elasticsearch with practical examples and code.",
      readTime: "8 min read",
      date: "December 2024",
      category: "Performance",
    },
    {
      slug: "building-geohashviz",
      title: "Behind the Scenes: Building GeohashViz",
      excerpt:
        "Insights into our tech stack, design decisions, and the engineering challenges of building a real-time geohash visualization platform.",
      readTime: "9 min read",
      date: "December 2024",
      category: "Engineering",
    },
    {
      slug: "real-world-geohash-use-cases",
      title: "Real-World Geohash Use Cases",
      excerpt:
        "Explore practical applications of geohashes in ride-sharing, delivery services, gaming, and more.",
      readTime: "6 min read",
      date: "December 2024",
      category: "Applications",
    },
  ];

  // Separate feature posts from other posts
  const featurePosts = blogPosts.filter((post) => post.category === "Features");
  const otherPosts = blogPosts.filter((post) => post.category !== "Features");

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="blog-hero-title">Knowledge Base</h1>
              <p className="blog-hero-subtitle">
                Learn everything about geohashes, location encoding, and spatial
                data visualization
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Feature Posts Section */}
      {featurePosts.length > 0 && (
        <Container className="blog-content">
          <Row className="mb-5">
            <Col>
              <div className="section-header">
                <h2 className="section-title">Latest Features</h2>
                <p className="section-subtitle">
                  Discover new capabilities and enhancements in GeohashViz
                </p>
              </div>
            </Col>
          </Row>
          <Row className="g-4 mb-5">
            {featurePosts.map((post) => (
              <Col md={6} key={post.slug}>
                <Card className="blog-card h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="blog-meta">
                      <span className="blog-category">{post.category}</span>
                      <span className="blog-date">{post.date}</span>
                    </div>
                    <Card.Title className="blog-title">
                      <Link to={`/blogs/${post.slug}`} className="blog-link">
                        {post.title}
                      </Link>
                    </Card.Title>
                    <Card.Text className="blog-excerpt">
                      {post.excerpt}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="blog-footer">
                        <span className="read-time">{post.readTime}</span>
                        <Link
                          to={`/blogs/${post.slug}`}
                          className="read-more-btn"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* Other Blog Posts */}
      <Container className="blog-content">
        <Row className="mb-4">
          <Col>
            <div className="section-header">
              <h2 className="section-title">Knowledge Base</h2>
              <p className="section-subtitle">
                Learn about geohashes, spatial data, and location-based
                technologies
              </p>
            </div>
          </Col>
        </Row>
        <Row className="g-4">
          {otherPosts.map((post) => (
            <Col md={6} key={post.slug}>
              <Card className="blog-card h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="blog-meta">
                    <span className="blog-category">{post.category}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <Card.Title className="blog-title">
                    <Link to={`/blogs/${post.slug}`} className="blog-link">
                      {post.title}
                    </Link>
                  </Card.Title>
                  <Card.Text className="blog-excerpt">{post.excerpt}</Card.Text>
                  <div className="mt-auto">
                    <div className="blog-footer">
                      <span className="read-time">{post.readTime}</span>
                      <Link
                        to={`/blogs/${post.slug}`}
                        className="read-more-btn"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BlogList;
