import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="flex min-h-12 bg-[#5D1B2A] text-white text-[.75rem] md:text-sm items-center">
      <div className="flex mx-auto">
        <a href="https://oliviahealth.org/" target="_blank">
          © 2024 OliviaHealth
        </a>
      </div>
    </div>
  );
};

export default Footer;