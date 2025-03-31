// FormComponent.tsx
import React, { useState } from "react";
import "./GeohashInput.css";

interface FormComponentProps {
  onSubmit: (value: string) => void;
  defaultGeohashStr: string;
}

const GeohashBulkInputForm: React.FC<FormComponentProps> = ({
  onSubmit,
  defaultGeohashStr,
}) => {
  const [value, setValue] = useState(defaultGeohashStr);

  return (
    <div className="container text-center geohash-form-container">
      <div className="row">
        <div className="col">
          <textarea
            rows={10}
            className="form-control geohash-textarea"
            aria-label="With textarea"
            onChange={(e) => setValue(e.target.value)}
            defaultValue={defaultGeohashStr}
          ></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-primary pointer geohash-submit-button"
            onClick={() => onSubmit(value)}
          >
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeohashBulkInputForm;
