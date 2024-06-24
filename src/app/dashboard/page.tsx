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
            className="w-8 hidden md:block"
            src="./images/meatballs.svg"
          ></img>
          <img className="h-8 md:hidden block" src="./images/kebab.svg"></img>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto">
        <Accordion title="Tab One" isLoading={false} >
            one content
        </Accordion>
        <Accordion title="Tab Two" isLoading={false} >
        <Accordion title="Nested 1" isLoading={false} >
            nested content 1
        </Accordion>
        <Accordion title="Nested 2" isLoading={false} >
            nested content 2
        </Accordion>
        </Accordion>
      </div>
    </div>
  );
};

export default Dashboard;
