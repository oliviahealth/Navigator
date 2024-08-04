"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface SubmissionProps {
  link: string;
  submissions: any[];
  onDelete: (submissionId: any) => Promise<void>;
  onSubmissionSelect: (submission: any) => void;
}

const Submission: React.FC<SubmissionProps> = ({ link, submissions = [], onDelete, onSubmissionSelect }) => {

  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    if (submissions.length > 0) {
      setSelectedSubmissionId(submissions[0].id);
      onSubmissionSelect(submissions[0]);
    }
  }, [submissions]);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const submissionId = event.target.value;
    setSelectedSubmissionId(submissionId)
    const selected = submissions.find((submission) => submission.id === submissionId);
    onSubmissionSelect(selected);
  };

  const handleDelete = () => {
    if (selectedSubmissionId) {
      onDelete(selectedSubmissionId);
    } else {
      console.log(selectedSubmissionId)
    }
  };

  return (
    <div className="flex flex-row relative mt-2 mb-1 space-x-4 items-center">
      {submissions.length > 0 ? (
        <>
          <select
            className="border-2 border-neutral-300 hover:border-neutral-400 pl-4 pr-12 py-2 rounded-full"
            onChange={handleSelectionChange}
          >
            <option value="" disabled>Select a submission</option>
            {submissions.map((submission) => (
              <option key={submission.id} value={submission.id}>
                {submission.id}
              </option>
            ))}
          </select>
          <Link
            className="group flex flex-row font-semibold items-center text-sm gap-[2px]"
            href={`${link}edit/${submissions.find((sub) => sub.id === (document.querySelector("select") as HTMLSelectElement)?.value)?.id || ''}`}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.3335 2.66675H2.66683C2.31321 2.66675 1.97407 2.80722 1.72402 3.05727C1.47397 3.30732 1.3335 3.64646 1.3335 4.00008V13.3334C1.3335 13.687 1.47397 14.0262 1.72402 14.2762C1.97407 14.5263 2.31321 14.6667 2.66683 14.6667H12.0002C12.3538 14.6667 12.6929 14.5263 12.943 14.2762C13.193 14.0262 13.3335 13.687 13.3335 13.3334V8.66675"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.3335 1.66665C12.5987 1.40144 12.9584 1.25244 13.3335 1.25244C13.7086 1.25244 14.0683 1.40144 14.3335 1.66665C14.5987 1.93187 14.7477 2.29158 14.7477 2.66665C14.7477 3.04173 14.5987 3.40144 14.3335 3.66665L8.00016 9.99999L5.3335 10.6667L6.00016 7.99999L12.3335 1.66665Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-black -mb-[2px] border-b-2 border-transparent group-hover:border-black transition duration-100 ease-in">
              Edit
            </div>
          </Link>
          <button
            className="group flex flex-row font-semibold items-center text-sm gap-[2px]"
            onClick={handleDelete}
          // disabled={!selectedSubmissionId}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4H3.33333H14"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.3335 3.99992V2.66659C5.3335 2.31296 5.47397 1.97382 5.72402 1.72378C5.97407 1.47373 6.31321 1.33325 6.66683 1.33325H9.3335C9.68712 1.33325 10.0263 1.47373 10.2763 1.72378C10.5264 1.97382 10.6668 2.31296 10.6668 2.66659V3.99992M12.6668 3.99992V13.3333C12.6668 13.6869 12.5264 14.026 12.2763 14.2761C12.0263 14.5261 11.6871 14.6666 11.3335 14.6666H4.66683C4.31321 14.6666 3.97407 14.5261 3.72402 14.2761C3.47397 14.026 3.3335 13.6869 3.3335 13.3333V3.99992H12.6668Z"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.3335 7.33325V11.3333"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.6665 7.33325V11.3333"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-red-500 -mb-[2px] border-b-2 border-transparent group-hover:border-red-500 transition duration-100 ease-in">
              Delete
            </div>
          </button>
        </>
      ) : (
        <p>No submissions available.</p>
      )}
      <Link href={`${link}new`} className="group flex flex-row font-semibold items-center text-sm text-maroon gap-[2px]">
        New
      </Link>
    </div >
  );
};

export default Submission;