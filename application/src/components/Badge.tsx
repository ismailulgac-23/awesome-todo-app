import React from "react";
import { TODO_TYPES } from "../constants/data";
import { Colors } from "../constants/theme";

const Badge = ({ type }: { type: string }) => {
  const renderBadge = () => {
    switch (type) {
      case TODO_TYPES.REGULAR:
        return (
          <div
            style={{
              backgroundColor: Colors.Warning,
              padding: "10px 20px",
              textAlign: "center",
              borderRadius: 300,
            }}
          >
            <span className="text-center" style={{ color: "#F2994A", fontSize: 15 }}>{type}</span>
          </div>
        );
      case TODO_TYPES.TRIVIAL:
        return (
          <div
            style={{
              backgroundColor: Colors.Skyblue,
              padding: "10px 20px",
              textAlign: "center",
              borderRadius: 300,
            }}
          >
            <span className="text-center" style={{ fontSize: 15, color: "#fff" }}>{type}</span>
          </div>
        );
      case TODO_TYPES.URGENT:
        return (
          <div
            style={{
              backgroundColor: Colors.Danger,
              padding: "10px 20px",
              textAlign: "center",
              borderRadius: 300,
            }}
          >
            <span className="text-center" style={{ fontSize: 15, color: "#fff" }}>{type}</span>
          </div>
        );
    }
  };

  return renderBadge() || <></>;
};

export default Badge;
