"use client"

import { createContext, useContext } from 'react';

type AccordionContextType = {
  registerAccordionChange: (height: number) => void;
};

const AccordionContext = createContext<AccordionContextType>({
  registerAccordionChange: () => {}
});

export const useAccordion = () => useContext(AccordionContext);

export default AccordionContext;
