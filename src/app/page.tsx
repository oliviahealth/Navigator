import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div
      className="flex flex-grow w-full h-full overflow-hidden bg-cover justify-center items-center"
      role="img"
      aria-label="A background image of a mother and her baby"
      style={{ backgroundImage: 'url("/images/background.png")' }}
    >
      <img
        className="w-[50rem]"
        src="/images/oliviahealth.svg"
        alt="Olivia Health logo"
        style={{ filter: 'brightness(0) invert(1)' }}
      ></img>
    </div>
  )
}

export default LandingPage;