"use client"

import React from "react";
import { useRouter, usePathname } from 'next/navigation';

const LeftSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    { label: "Logs and Consent Forms", path: "/dashboard/logs-and-forms" },
    { label: "Demographics", path: "/dashboard/demographics" },
    { label: "Medical and Nutrition History", path: "/dashboard/medical-and-nutrition-history" },
    { label: "Medications", path: "/dashboard/medications" },
    { label: "Substance Use Assessments", path: "/dashboard/substance-use-assessments" },
    { label: "Interpersonal Relations Assessments", path: "/dashboard/interpersonal-relations-assessments" },
    { label: "Physical Assessments", path: "/dashboard/physical-assessments" },
    { label: "Mental Health Assessments", path: "/dashboard/mental-health-assessments" },
    { label: "Home Safety Assessments", path: "/dashboard/home-safety-assessments" },
    { label: "Prenatal Care", path: "/dashboard/prenatal-care" },
    { label: "Child Records", path: "/dashboard/child-records" },
  ];


  return (
    <div className="w-full h-full my-5 px-5">
      {tabs.map(({ label, path }) => (
        <button
          key={label}
          className={`group w-full mb-3 p-2 gap-1 rounded-md flex items-center font-medium duration-300 transition-colors ${
            pathname === path ? "bg-maroon text-white" : "hover:bg-maroon/90 hover:text-white"
          }`}
          onClick={() => router.push(path)}
        >
          <img className={`w-4 h-4 duration-300 transition-all group-hover:invert ${pathname === path ? "invert" : ""}`} src="/images/placeholder.svg"></img>
          <div className="flex-grow text-left truncate">{label}</div>
        </button>
      ))}
    </div>
  );
};

export default LeftSidebar;
