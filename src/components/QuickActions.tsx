import React from "react";
import "./QuickActions.css";

interface QuickActionsProps {
  onClear: () => void;
  onSample: () => void;
  onExport?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onClear,
  onSample,
  onExport,
}) => {
  return (
    <div className="quick-actions">
      <button
        className="quick-action-btn sample-btn"
        onClick={onSample}
        title="Load sample geohashes"
      >
        📍 Sample
      </button>

      <button
        className="quick-action-btn clear-btn"
        onClick={onClear}
        title="Clear all geohashes"
      >
        🗑️ Clear
      </button>

      {onExport && (
        <button
          className="quick-action-btn export-btn"
          onClick={onExport}
          title="Export geohashes"
        >
          📤 Export
        </button>
      )}
    </div>
  );
};

export default QuickActions;
