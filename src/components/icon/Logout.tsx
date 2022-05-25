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
  w = 17,
  h = 16,
  fill = color.white,
  className,
  onClick,
}) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M14.8574 11.9294H13.602C13.5163 11.9294 13.436 11.9669 13.3824 12.033C13.2574 12.1848 13.1235 12.3312 12.9824 12.4705C12.4054 13.0481 11.722 13.5083 10.9699 13.8259C10.1907 14.155 9.35324 14.3238 8.5074 14.3223C7.65204 14.3223 6.82347 14.1544 6.0449 13.8259C5.29281 13.5083 4.60938 13.0481 4.0324 12.4705C3.45439 11.8949 2.9935 11.2127 2.67526 10.4616C2.3449 9.68301 2.17883 8.85622 2.17883 8.00086C2.17883 7.14551 2.34669 6.31872 2.67526 5.54015C2.99311 4.78836 3.45026 4.11158 4.0324 3.53122C4.61454 2.95086 5.29133 2.49372 6.0449 2.17586C6.82347 1.84729 7.65204 1.67944 8.5074 1.67944C9.36276 1.67944 10.1913 1.84551 10.9699 2.17586C11.7235 2.49372 12.4003 2.95086 12.9824 3.53122C13.1235 3.67229 13.2556 3.81872 13.3824 3.96872C13.436 4.03479 13.5181 4.07229 13.602 4.07229H14.8574C14.9699 4.07229 15.0395 3.94729 14.977 3.85265C13.6074 1.72408 11.211 0.31515 8.48776 0.322293C4.20919 0.333007 0.778829 3.80622 0.821686 8.07944C0.864543 12.2848 4.28954 15.6794 8.5074 15.6794C11.2235 15.6794 13.6092 14.2723 14.977 12.1491C15.0378 12.0544 14.9699 11.9294 14.8574 11.9294ZM16.4449 7.88836L13.911 5.88836C13.8163 5.81336 13.6788 5.88122 13.6788 6.00086V7.35801H8.07169C7.99312 7.35801 7.92883 7.42229 7.92883 7.50086V8.50086C7.92883 8.57944 7.99312 8.64372 8.07169 8.64372H13.6788V10.0009C13.6788 10.1205 13.8181 10.1884 13.911 10.1134L16.4449 8.11336C16.462 8.1 16.4758 8.08293 16.4853 8.06344C16.4948 8.04394 16.4997 8.02255 16.4997 8.00086C16.4997 7.97918 16.4948 7.95778 16.4853 7.93829C16.4758 7.9188 16.462 7.90173 16.4449 7.88836Z"
        fill={fill}
      />
    </svg>
  );
};

export default Arrow;
