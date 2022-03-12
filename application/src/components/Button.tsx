import Link from "next/link";
import React from "react";

interface IButtonProps {
  title: string | React.ReactNode;
  bg?: string;
  link?: string | undefined;
  className?: string;
  textStyles?: React.CSSProperties | undefined;
  buttonStyles?: React.CSSProperties | undefined;
  containerStyles?: React.CSSProperties | undefined;
  event?: () => any | null;
  disabled?: boolean;
}

const Button = ({
  title,
  bg = "#fff",
  className,
  disabled = false,
  link = undefined,
  buttonStyles,
  textStyles,
  containerStyles,
  event,
  ...otherProps
}: IButtonProps) => {
  const renderButton = () => {
    if (link) {
      return (
        <Link href={link}>
          <a>
            <div style={containerStyles} {...otherProps} className={className}>
              <button
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: bg,
                  gap: 4,
                  ...textStyles,
                  ...buttonStyles,
                }}
              >
                {title}
              </button>
            </div>
          </a>
        </Link>
      );
    } else if (event != null) {
      return (
        <div
          style={containerStyles}
          onClick={() => (disabled ? null : event())}
          {...otherProps}
          className={className}
        >
          <button
            className="d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: bg,
              gap: 4,
              opacity: disabled ? 0.7 : "inherit",
              ...buttonStyles,
              ...textStyles,
            }}
          >
            {title}
          </button>
        </div>
      );
    } else {
      return (
        <div style={containerStyles} {...otherProps} className={className}>
          <button
            className="d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: bg,
              gap: 4,
              ...textStyles,
              ...buttonStyles,
            }}
          >
            {title}
          </button>
        </div>
      );
    }
  };

  return renderButton();
};

export default Button;
