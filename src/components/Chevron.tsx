import React from 'react';

type ChevronProps = {
  direction: 'left' | 'right' | 'up' | 'down';
  className?: string;
};

const Chevron: React.FC<ChevronProps> = ({ direction, className }) => {
  const rotationMap: { [key in ChevronProps['direction']]: string } = {
    up: '270deg',
    right: '0deg',
    down: '90deg',
    left: '180deg',
  };

  const rotation = rotationMap[direction];

  const style = {
    transform: `rotate(${rotation})`,
    transition: 'transform 0.2s ease-in-out',
  };

  return (
    <svg
      width="15"
      height="26"
      viewBox="0 0 15 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      <path
        d="M2 24L13 13L2 2"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Chevron;
