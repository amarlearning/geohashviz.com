// FormComponent.tsx
import React, { useState } from "react";

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
    <div
      className="container text-center"
      style={{
        width: "10em",
        zIndex: 100000,
        position: "fixed",
        marginTop: "15em",
        marginLeft: "3em",
      }}
    >
      <div className="row">
        <div className="col">
          <textarea
            rows={10}
            className="form-control"
            aria-label="With textarea"
            onChange={(e) => setValue(e.target.value)}
            style={{ borderRadius: "1", opacity: 0.9 }}
            defaultValue={defaultGeohashStr}
          ></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            style={{
              marginTop: "1em",
              marginLeft: 0,
              borderRadius: "1",
              width: "100%",
            }}
            type="button"
            className="btn btn-primary pointer"
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
