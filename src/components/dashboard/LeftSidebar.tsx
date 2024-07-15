import React from "react";

interface LeftSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["tab 1", "tab 2", "tab 3"];

  return (
    <div className="w-full h-full my-5 px-5">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`w-full mb-4 py-1 rounded-md flex items-center ${
            activeTab === tab ? "bg-red-800 text-white" : "hover:bg-red-800 hover:text-white"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          <img className="w-4 h-4" src="./images/kebab.svg"></img>
          <div className="flex-grow text-left">{tab}</div>
        </button>
      ))}
    </div>
  );
};

export default LeftSidebar;
