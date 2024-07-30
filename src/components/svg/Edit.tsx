import React from "react";

const Edit: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { width, height, fill, stroke, ...rest } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      fill="none"
    >
      <path
        d="M13 21H21"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
        stroke={stroke}
      />
      <path
        d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={stroke}
        fill={fill}
      />
      <path
        d="M15.3097 5.30981L18.7274 8.72755"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
        stroke={stroke}
      />
    </svg>
  );
};

export default Edit;
