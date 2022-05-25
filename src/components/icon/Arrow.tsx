import React from 'react';

import color from 'src/styles/themes/color';

type Props = {
  w?: number;
  h?: number;
  fill?: string;
  className?: string;
  onClick?: () => void;
};

const Arrow: React.FC<Props> = ({
  w = 12,
  h = 12,
  fill = color.black,
  className,
  onClick,
}) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M11.6422 4.31563L9.07969 1.06563C9.03296 1.00629 8.97339 0.958321 8.90547 0.925306C8.83755 0.892291 8.76302 0.875092 8.6875 0.875H7.675C7.57031 0.875 7.5125 0.995312 7.57656 1.07812L9.83125 3.9375H0.375C0.30625 3.9375 0.25 3.99375 0.25 4.0625V5C0.25 5.06875 0.30625 5.125 0.375 5.125H11.2484C11.6672 5.125 11.9 4.64375 11.6422 4.31563Z"
        fill={fill}
      />
    </svg>
  );
};

export default Arrow;
