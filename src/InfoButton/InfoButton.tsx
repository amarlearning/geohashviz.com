import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InfoButton.css';

const InfoIcon = () => (
    <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3em',
        height: '3em',
    }}>
        <svg width="4em" height="2em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
    </div>
);


const InfoButton = () => {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);
    const handleClose = () => setShow(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.info-popup') && !target.closest('.info-button')) {
                handleClose();
            }
        };

        if (show) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [show]);

    return (
        <div className="info-button-container">
            <Button onClick={handleToggle} className="info-button">
                <InfoIcon />
            </Button>

            {show && (
                <div className="info-popup">
                    <div className="info-popup-content">
                        <h3>GeohashViz.com</h3>
                        <p>A modern web application for visualizing multiple geohashes on an interactive map. Perfect for developers working with location-based data and geohashing algorithms.</p>
                        <h4>Features</h4>
                        <ul>
                            <li>🗺️ Interactive map visualization</li>
                            <li>📦 Bulk geohash processing</li>
                            <li>🚀 Fast rendering with memoization</li>
                            <li>📱 Responsive design</li>
                            <li>🎯 Precise bounding box calculations</li>
                            <li>⚡ Real-time visualization</li>
                        </ul>
                        <div className="github-link-container">
                            <a href="https://github.com/amarlearning/geohashviz.com" target="_blank" rel="noopener noreferrer" className="github-star">
                                Love the application? Give it a ⭐️ on GitHub!
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoButton;