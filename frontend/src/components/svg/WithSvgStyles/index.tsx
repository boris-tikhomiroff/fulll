import { useState, ComponentType } from "react";
import "./WithSvgStyles.css";

interface WithSvgStylesProps {
  width: string;
  height: string;
  fill: string;
  bgColor: string;
  hoverFillColor?: string;
  hoverStrokeColor?: string;
  hoverBgColor?: string;
  title?: string;
  role?: string;
}

/**
 * Higher-Order Component (HOC) to add styles and behaviors to SVG components.
 *
 * @param {ComponentType<P>} WrappedComponent - The SVG component to be styled.
 * @returns {React.FC<P & WithSvgStylesProps>} - A new component with additional styles and behaviors.
 */
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
    role,
    ...props
  }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
      <div
        style={{
          width,
          height,
          backgroundColor: isHovered ? hoverBgColor : bgColor,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="svg-container"
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
          className="svg-container__element"
        />
      </div>
    );
  };
};

export default withSvgStyles;
