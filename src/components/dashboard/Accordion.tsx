"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Chevron from './Chevron';
import AccordionContext, { useAccordion } from './AccordionContext';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isLoading,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');
  const { registerAccordionChange } = useAccordion();

  const updateParent = useCallback(() => {
    if (contentRef.current) {
      registerAccordionChange(contentRef.current.scrollHeight);
      setMaxHeight(`${contentRef.current.scrollHeight}px`);  // Ensures the parent adjusts to the new height
    }
  }, [registerAccordionChange]);

  useEffect(() => {
    if (isOpen) {
      setMaxHeight(`${contentRef.current?.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen, children]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (isOpen) {
        updateParent();
      }
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [isOpen, updateParent]);

  return (
    <AccordionContext.Provider value={{ registerAccordionChange: updateParent }}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          onClick && onClick();
          if (!isOpen) updateParent();  // Ensures to update on open
        }}
        className={`w-full h-fit py-3 px-6 rounded-2xl bg-neutral-100 flex justify-between items-center text-lg border-2 transition duration-100 ease-in ${isOpen ? 'border-[#5D1B2A]' : 'border-transparent '}`}
      >
        {title}
        <Chevron
          className="stroke-black h-4"
          direction={`${isOpen ? 'up' : 'down'}`}
        />
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight: maxHeight}}
        className="transition-max-height duration-300 ease-in-out overflow-hidden"
      >
        {isLoading ? <div>Loading...</div> : children}
      </div>
    </AccordionContext.Provider>
  );
};

export default Accordion;
