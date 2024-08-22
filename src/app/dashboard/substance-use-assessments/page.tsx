"use client";

import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import { communicationLoglabelMapping } from "../logs-and-forms/communication-log/definitions";
// import useCommunicationLogs from "./communication-log/submissions";
// import useAppointmentLogs from "./appointment-log/submissions";
// import useEnrollmentForms from "./enrollment-form/submissions";
// import useMediaAppearanceReleases from "./media-appearance-form/submissions";
import useSmokingTobaccoPregnancyRecords from "./smoking-tobacco-pregnancy/submissions";
import { SmokingTobaccoPregnancyLabelMapping, SmokingStatusEnum } from "./smoking-tobacco-pregnancy/definitions";
import useSubstanceUseHistory from "./substance-use-history/submissions";

const Tab: React.FC = () => {
  const {
    SmokingTobaccoPregnancyRecordSubmissions,
    selectedSmokingTobaccoPregnancyRecordSubmission,
    handleSmokingTobaccoPregnancyRecordDelete,
    handleSmokingTobaccoPregnancyRecordSubmissionSelect,
  } = useSmokingTobaccoPregnancyRecords();

  const {
    SubstanceUseHistorySubmissions,
    selectedSubstanceUseHistorySubmission,
    handleSubstanceUseHistorySubmissionSelect,
    handleSubstanceUseHistoryDelete,
  } = useSubstanceUseHistory();

  return (
    <div className="flex flex-col">
      <Accordion title="Smoking / Tobacco Use before, during Pregnancy and at 1, 3, 6, 9, & 12 Months Postpartum">
        {selectedSmokingTobaccoPregnancyRecordSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Personal Information</h2>
              <p><strong>Smoking status: </strong> {SmokingTobaccoPregnancyLabelMapping.smokingStatus[selectedSmokingTobaccoPregnancyRecordSubmission.smokingStatus]}</p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/substance-use-assessments/smoking-tobacco-pregnancy/"
          submissions={SmokingTobaccoPregnancyRecordSubmissions}
          onDelete={handleSmokingTobaccoPregnancyRecordDelete}
          onSubmissionSelect={handleSmokingTobaccoPregnancyRecordSubmissionSelect}
        />
      </Accordion>

      <Accordion title="Substance Use History">
        {selectedSubstanceUseHistorySubmission && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {/* Alcohol */}
              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Alcohol</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.alcohol_ever_used}</p>
                <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.alcohol_used_during_pregnancy}</p>
                <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.alcohol_date_last_used).toLocaleString()}</p>
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.alcohol_notes || "N/A"}</p>
              </div>

              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Benzodiazepines</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.benzodiazepines_ever_used}</p>
                <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.benzodiazepines_used_during_pregnancy}</p>
                <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.benzodiazepines_date_last_used).toLocaleString()}</p>
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.benzodiazepines_notes || "N/A"}</p>
              </div>

              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Cocaine</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.cocaine_ever_used}</p>
                <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.cocaine_used_during_pregnancy}</p>
                <p><strong>Last Used: </strong> {selectedSubstanceUseHistorySubmission.cocaine_ever_used === "Yes" ? new Date(selectedSubstanceUseHistorySubmission.cocaine_date_last_used).toLocaleString() : "N/A"}</p>
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.cocaine_notes || "N/A"}</p>
              </div>

              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Heroin</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.heroin_ever_used}</p>
                <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.heroin_used_during_pregnancy || "N/A"}</p>
                <p><strong>Last Used: </strong> {selectedSubstanceUseHistorySubmission.heroin_ever_used === "Yes" ? new Date(selectedSubstanceUseHistorySubmission.heroin_date_last_used).toLocaleString() : "N/A"}</p>
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.heroin_notes || "N/A"}</p>
              </div>

              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Kush</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.kush_ever_used}</p>
                <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.kush_used_during_pregnancy}</p>
                <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.kush_date_last_used).toLocaleString()}</p>
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.kush_notes || "N/A"}</p>
              </div>

              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Marijuana</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.marijuana_ever_used}</p>
                <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.marijuana_used_during_pregnancy}</p>
                <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.marijuana_date_last_used).toLocaleString()}</p>
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.marijuana_notes || "N/A"}</p>
              </div>

              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Methamphetamine</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.methamphetamine_ever_used}</p>
                <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.methamphetamine_used_during_pregnancy}</p>
                <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.methamphetamine_date_last_used).toLocaleString()}</p>
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.methamphetamine_notes || "N/A"}</p>
              </div>

              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Prescription Drugs</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.prescription_drugs_ever_used}</p>
                <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.prescription_drugs_used_during_pregnancy}</p>
                <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.prescription_drugs_date_last_used).toLocaleString()}</p>
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.prescription_drugs_notes || "N/A"}</p>
              </div>

              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Tobacco</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.tobacco_ever_used}</p>
                <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.tobacco_used_during_pregnancy}</p>
                <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.tobacco_date_last_used).toLocaleString()}</p>
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.tobacco_notes || "N/A"}</p>
              </div>
            </div>

            {Array.isArray(selectedSubstanceUseHistorySubmission.other_drugs) && selectedSubstanceUseHistorySubmission.other_drugs.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedSubstanceUseHistorySubmission.other_drugs.map((entry: any, index: number) => (
                  <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                    <p><strong>Additional Drug Used:</strong> {entry.drug_used}</p>
                    <p><strong>Used During Pregnancy:</strong> {entry.used_during_pregnancy}</p>
                    <p><strong>Last Used:</strong> {new Date(entry.date_last_used).toLocaleString()}</p>
                    <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Medication Assisted Treatment</h2>
                <p><strong>MAT Engaged:</strong> {selectedSubstanceUseHistorySubmission.mat_engaged}</p>
                <p><strong>Date of Last Use: </strong> {selectedSubstanceUseHistorySubmission.mat_engaged !== "Never" ? new Date(selectedSubstanceUseHistorySubmission.date_used_mat).toLocaleString() : "N/A"}</p>
                <p><strong>Clinic Name: </strong> {selectedSubstanceUseHistorySubmission.mat_clinic_name || "N/A"}</p>
                <p><strong>Clinic Phone: </strong> {selectedSubstanceUseHistorySubmission.mat_clinic_phone || "N/A"}</p>
              </div>

              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Addiction Medicine Services</h2>
                <p><strong>Ever Used:</strong> {selectedSubstanceUseHistorySubmission.used_addiction_medicine_services}</p>
                <p><strong>Date of Last Appointment: </strong> {selectedSubstanceUseHistorySubmission.used_addiction_medicine_services !== "Never" ? new Date(selectedSubstanceUseHistorySubmission.date_used_medicine_service).toLocaleString() : "N/A"}</p>
                <p><strong>Clinic Name: </strong> {selectedSubstanceUseHistorySubmission.addiction_medicine_clinic || "N/A"}</p>
                <p><strong>Clinic Phone: </strong> {selectedSubstanceUseHistorySubmission.addiction_medicine_clinic_phone || "N/A"}</p>
              </div>
            </div>

            {Array.isArray(selectedSubstanceUseHistorySubmission.medications) && selectedSubstanceUseHistorySubmission.medications.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedSubstanceUseHistorySubmission.medications.map((entry: any, index: number) => (
                  <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                    <p><strong>Medication:</strong> {entry.medication}</p>
                    <p><strong>Dose:</strong> {entry.dose}</p>
                    <p><strong>Date:</strong> {new Date(entry.date).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}

            <div>
              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Additional Notes</h2>
                <p>{selectedSubstanceUseHistorySubmission.notes}</p>
              </div>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/substance-use-assessments/substance-use-history/"
          submissions={SubstanceUseHistorySubmissions}
          onDelete={handleSubstanceUseHistoryDelete}
          onSubmissionSelect={handleSubstanceUseHistorySubmissionSelect}
        />
      </Accordion>
    </div>
  );
};

export default Tab;