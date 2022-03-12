import React from "react";
import { CircleSpinner } from "react-spinners-kit";

interface ILoadingProps {
  isLoading: boolean;
  properties?: {
    color?: string;
    size?: number;
  };
  styles?: React.CSSProperties | undefined;
}

const Loading = ({
  isLoading,
  styles,
  properties = { size: 22, color: "#000" },
}: ILoadingProps) => {
  return (
    <div style={{ ...styles }}>
      <CircleSpinner
        loading={isLoading}
        size={properties.size}
        color={properties.color}
      />
    </div>
  );
};

export default Loading;
