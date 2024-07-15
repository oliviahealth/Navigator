"use client"

import React, { useState } from "react";
import Link from "next/link";
import Accordion from "@/components/dashboard/Accordion";
import LeftSidebar from "@/components/dashboard/LeftSidebar";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tab 1");

  const renderContent = () => {
    switch (activeTab) {
      case "tab 1":
        return "Content for tab 1";
      case "tab 2":
        return "Content for tab 2";
      case "tab 3":
        return "Content for tab 3";
      default:
        return "Default content";
    }
  };

  return (
    <div className="flex flex-row w-full h-full">
      <div className="bg-neutral-100 w-1/3">
        <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab}></LeftSidebar>
      </div>
      <div className="flex flex-col w-full h-full px-20">
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
          <Accordion title={activeTab} isLoading={false}>
            {renderContent()}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
