"use client";

import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import useCurrentMedicationLists from "./current-medication-list/submissions";

const Tab: React.FC = () => {
  const {
    currentMedicationListSubmissions,
    selectedCurrentMedicationListSubmission,
    handleCurrentMedicationListDelete,
    handleCurrentMedicationListSubmissionSelect,
  } = useCurrentMedicationLists();

  return (
    <div className="flex flex-col">
      <Accordion title="Current Medication List">
        {selectedCurrentMedicationListSubmission && (
          <div>
            {Array.isArray(selectedCurrentMedicationListSubmission.currentMedicationList) && selectedCurrentMedicationListSubmission.currentMedicationList.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedCurrentMedicationListSubmission.currentMedicationList.map((entry: any, index: number) => (
                  <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                    <p><strong>Medication:</strong> {entry.name}</p>
                    <p><strong>Dose:</strong> {entry.dose}</p>
                    <p><strong>Location:</strong> {entry.prescriber}</p>
                    <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No current medication lists available.</p>
            )}
          </div>
        )}
        <Submission
          link="/dashboard/medications/current-medication-list/"
          submissions={currentMedicationListSubmissions}
          onDelete={handleCurrentMedicationListDelete}
          onSubmissionSelect={handleCurrentMedicationListSubmissionSelect}
        />
      </Accordion>
    </div>
  );
};

export default Tab;