import React from 'react';
import './StatusBar.css';

interface StatusBarProps {
  geohashes: any[];
  isLoading?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ geohashes, isLoading = false }) => {
  const totalCount = geohashes.length;

  // Check for duplicates
  const uniqueGeohashes = new Set(geohashes.map(g => g.geohash));
  const duplicateCount = totalCount - uniqueGeohashes.size;

  // Check for invalid/malformed geohashes
  const validGeohashes = geohashes.filter(g => {
    if (!g.geohash || g.geohash.length === 0) return false;

    // Check length (geohashes are typically 1-12 characters)
    if (g.geohash.length > 12) return false;

    // Check for valid base32 characters only (no 'a', 'i', 'l', 'o')
    if (!/^[0-9bcdefghjkmnpqrstuvwxyz]+$/i.test(g.geohash)) return false;

    return true;
  });
  const invalidCount = totalCount - validGeohashes.length;

  return (
    <div className="status-bar">
      <div className="status-item">
        <span className="status-label">Total:</span>
        <span className="status-value">{totalCount}</span>
      </div>

      {duplicateCount > 0 && (
        <div className="status-item">
          <span className="status-label">Duplicates:</span>
          <span className="status-value" style={{ color: '#f59e0b' }}>{duplicateCount}</span>
        </div>
      )}

      {invalidCount > 0 && (
        <div className="status-item">
          <span className="status-label">Invalid:</span>
          <span className="status-value" style={{ color: '#ef4444' }}>{invalidCount}</span>
        </div>
      )}

      {duplicateCount === 0 && invalidCount === 0 && (
        <div className="status-item">
          <span className="status-label">Status:</span>
          <span className="status-value" style={{ color: '#10b981' }}>✓ Clean</span>
        </div>
      )}

      {isLoading && (
        <div className="status-item">
          <div className="loading-spinner"></div>
          <span className="status-label">Processing...</span>
        </div>
      )}

      <div className="status-item">
        <span className="status-label">Keyboard:</span>
        <kbd className="keyboard-shortcut">Shift + F</kbd>
      </div>
    </div>
  );
};

export default StatusBar;