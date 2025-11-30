import React, { useEffect } from "react";
import "./AdvancedOptions.css";

/**
 * Props for the AdvancedOptions component
 */
interface AdvancedOptionsProps {
  /** Whether the advanced options panel is expanded */
  expanded: boolean;
  /** Callback when the toggle button is clicked */
  onToggle: () => void;
  /** Child components to render inside the panel */
  children: React.ReactNode;
}

/** localStorage key for persisting expanded state */
const STORAGE_KEY = "geohashviz_advanced_options_expanded";

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  expanded,
  onToggle,
  children,
}) => {
  // Persist expanded state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expanded));
  }, [expanded]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="advanced-options">
      <button
        className="advanced-options-toggle"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={expanded}
        aria-label="Toggle advanced options"
        type="button"
      >
        <span className="advanced-options-label">Advanced Options</span>
        <svg
          className={`chevron-icon ${expanded ? "expanded" : ""}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {expanded && <div className="advanced-options-content">{children}</div>}
    </div>
  );
};

export default AdvancedOptions;
