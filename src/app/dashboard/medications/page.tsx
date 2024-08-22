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
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              {Array.isArray(selectedCurrentMedicationListSubmission.currentMedicationList) && selectedCurrentMedicationListSubmission.currentMedicationList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {selectedCurrentMedicationListSubmission.currentMedicationList.map((entry: any, index: number) => (
                    <div key={index} className="bento-inner">
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
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex-1 bento-inner">
                <h2 className="font-bold">Additional Notes</h2>
                <p>{selectedCurrentMedicationListSubmission.notes}</p>
              </div>
              <div className="flex-1 bento-inner">
                <h2 className="font-bold">Staff Notes</h2>
                <p>{selectedCurrentMedicationListSubmission.staffNotes}</p>
              </div>
            </div>
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