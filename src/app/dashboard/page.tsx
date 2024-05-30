import React from "react";
import Link from "next/link";
import Accordion from "@/components/dashboard/Accordion";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full md:px-[15vw] px-5 overflow-hidden">
      <div className="flex flex-row mx-5 my-5 justify-between items-center md:items-baseline">
        <div className="flex text-3xl md:text-4xl font-semibold">
          Hello [name]!
        </div>
        <div className="flex">
          <img
            className="w-6 hidden md:block"
            src="./images/meatballs.svg"
          ></img>
          <img className="h-6 md:hidden block" src="./images/kebab.svg"></img>
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto">
        <Accordion title="Form" isLoading={false} >
            <Accordion title="Nested form" isLoading={false}>CONTENT</Accordion>
        </Accordion>
      </div>
    </div>
  );
};

export default Dashboard;
