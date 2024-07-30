import React, { useState, ComponentType } from "react";

interface WithSvgStylesProps {
  width?: string;
  height?: string;
  fill?: string;
  bgColor?: string;
  hoverFillColor?: string;
  hoverStrokeColor?: string;
  hoverBgColor?: string;
  title?: string;
}

const withSvgStyles = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P & WithSvgStylesProps> => {
  return ({
    width = "24px",
    height = "24px",
    fill = "#000",
    bgColor = "transparent",
    hoverFillColor,
    hoverStrokeColor,
    hoverBgColor,
    title,
    ...props
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <div
        style={{
          width,
          height,
          backgroundColor: isHovered ? hoverBgColor : bgColor,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="svgContainer"
        title={title}
      >
        <WrappedComponent
          {...(props as P)}
          width={width}
          height={height}
          fill={isHovered && hoverFillColor ? hoverFillColor : fill}
          style={{
            transform: isHovered ? `scale(1.3)` : "scale(1)",
          }}
          className="svgElement"
        />
      </div>
    );
  };
};

export default withSvgStyles;
