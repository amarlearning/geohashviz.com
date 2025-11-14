# GeohashViz.com

A modern web application for visualizing multiple geohashes on an interactive map. Perfect for developers working with location-based data and geohashing algorithms.

## Features

- 🗺️ Interactive map visualization
- 📦 Bulk geohash processing
- 🚀 Fast rendering with memoization
- 📱 Responsive design
- 🎯 Precise bounding box calculations
- ⚡ Real-time visualization
- 📏 **Distance Analysis** - Calculate and visualize distances between geohashes with multiple modes

## Demo

Visit [GeohashViz.com](https://geohashviz.com) to try it out!

## Installation

```bash
# Clone the repository
git clone https://github.com/amarlearning/geohashviz.com.git

# Navigate to project directory
cd geohashviz.com

# Install dependencies
npm install

# Start development server
npm start
```

## Usage Guide

### Basic Usage

1. Visit GeohashViz.com in your browser
2. Enter geohashes in the input field (one per line or comma-separated)
3. Click "Visualize" to see them on the map
4. The map will automatically zoom to fit all geohashes

### Distance Analysis (Advanced Feature)

The Distance Analysis feature allows you to calculate and visualize distances between geohashes using various calculation modes.

**To enable Distance Analysis:**

1. Expand the "Advanced Options" panel below the zoom controls
2. Toggle "Distance Analysis" to ON (requires at least 2 valid geohashes)
3. Configure your preferred settings:

**Calculation Modes:**

- **From reference point** - Calculate distances from a selected reference geohash to all others
- **Between consecutive** - Calculate distances between consecutive geohashes in input order
- **To nearest neighbor** - Find and display the distance to the closest geohash for each point
- **All pairs** - Calculate distances between all possible pairs (limited to 20 geohashes)

**Display Options:**

- **Units** - Choose between kilometers or miles

**Visual Indicators:**

- Reference geohashes are highlighted in green with a thicker border and marked with ⭐
- Distance lines are drawn as smooth curved arcs in orange, connecting related geohashes
- Distance values are displayed directly on the arc lines for easy reading

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Map**: Leaflet.js
- **Styling**: CSS Modules
- **Package Manager**: npm

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Bug Reports

Found a bug? Have a suggestion? Feel free to:

- [Open an issue](https://github.com/amarlearning/geohashviz.com/issues)
- [Tweet me](https://twitter.com/iamarpandey)

## License

Built with ♥ by Amar Prakash Pandey([@amarlearning](http://github.com/amarlearning)) under [MIT License](http://amarlearning.mit-license.org/)

You can find a copy of the License at http://amarlearning.mit-license.org/