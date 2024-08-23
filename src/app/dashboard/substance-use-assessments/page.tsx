"use client";

import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import useSmokingTobaccoPregnancyRecords from "./smoking-tobacco-pregnancy/submissions";
import { SmokingTobaccoPregnancyLabelMapping } from "./smoking-tobacco-pregnancy/definitions";
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
          <div className="flex grid-cols-2 gap-4">
            <div className="bento-inner">
              <h2 className="font-bold text-lg">Smoking Status</h2>
              <p> {SmokingTobaccoPregnancyLabelMapping.smokingStatus[selectedSmokingTobaccoPregnancyRecordSubmission.smokingStatus]}</p>
            </div>
            <div className="bento-inner">
              <h2 className="font-bold text-lg">Staff Notes</h2>
              <p> {selectedSmokingTobaccoPregnancyRecordSubmission.staffNotes}</p>
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
              <div className="bento-inner">
                <h2 className="font-bold text-lg">Alcohol</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.alcohol_ever_used}</p>
                {selectedSubstanceUseHistorySubmission.alcohol_ever_used === "Yes" && (
                  <>
                    <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.alcohol_used_during_pregnancy}</p>
                    <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.alcohol_date_last_used).toLocaleDateString()}</p>
                  </>
                )}
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.alcohol_notes || "N/A"}</p>
              </div>

              <div className="bento-inner">
                <h2 className="font-bold text-lg">Benzodiazepines</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.benzodiazepines_ever_used}</p>
                {selectedSubstanceUseHistorySubmission.benzodiazepines_ever_used === "Yes" && (
                  <>
                    <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.benzodiazepines_used_during_pregnancy}</p>
                    <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.benzodiazepines_date_last_used).toLocaleDateString()}</p>
                  </>
                )}
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.benzodiazepines_notes || "N/A"}</p>
              </div>

              <div className="bento-inner">
                <h2 className="font-bold text-lg">Cocaine</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.cocaine_ever_used}</p>
                {selectedSubstanceUseHistorySubmission.cocaine_ever_used === "Yes" && (
                  <>
                    <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.cocaine_used_during_pregnancy}</p>
                    <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.cocaine_date_last_used).toLocaleDateString()}</p>
                  </>
                )}
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.cocaine_notes || "N/A"}</p>
              </div>

              <div className="bento-inner">
                <h2 className="font-bold text-lg">Heroin</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.heroin_ever_used}</p>
                {selectedSubstanceUseHistorySubmission.heroin_ever_used === "Yes" && (
                  <>
                    <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.heroin_used_during_pregnancy}</p>
                    <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.heroin_date_last_used).toLocaleDateString()}</p>
                  </>
                )}
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.heroin_notes || "N/A"}</p>
              </div>

              <div className="bento-inner">
                <h2 className="font-bold text-lg">Kush</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.kush_ever_used}</p>
                {selectedSubstanceUseHistorySubmission.kush_ever_used === "Yes" && (
                  <>
                    <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.kush_used_during_pregnancy}</p>
                    <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.kush_date_last_used).toLocaleDateString()}</p>
                  </>
                )}
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.kush_notes || "N/A"}</p>
              </div>

              <div className="bento-inner">
                <h2 className="font-bold text-lg">Marijuana</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.marijuana_ever_used}</p>
                {selectedSubstanceUseHistorySubmission.marijuana_ever_used === "Yes" && (
                  <>
                    <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.marijuana_used_during_pregnancy}</p>
                    <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.marijuana_date_last_used).toLocaleDateString()}</p>
                  </>
                )}
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.marijuana_notes || "N/A"}</p>
              </div>

              <div className="bento-inner">
                <h2 className="font-bold text-lg">Methamphetamine</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.methamphetamine_ever_used}</p>
                {selectedSubstanceUseHistorySubmission.methamphetamine_ever_used === "Yes" && (
                  <>
                    <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.methamphetamine_used_during_pregnancy}</p>
                    <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.methamphetamine_date_last_used).toLocaleDateString()}</p>
                  </>
                )}
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.methamphetamine_notes || "N/A"}</p>
              </div>

              <div className="bento-inner">
                <h2 className="font-bold text-lg">Prescription Drugs</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.prescription_drugs_ever_used}</p>
                {selectedSubstanceUseHistorySubmission.prescription_drugs_ever_used === "Yes" && (
                  <>
                    <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.prescription_drugs_used_during_pregnancy}</p>
                    <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.prescription_drugs_date_last_used).toLocaleDateString()}</p>
                  </>
                )}
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.prescription_drugs_notes || "N/A"}</p>
              </div>

              <div className="bento-inner">
                <h2 className="font-bold text-lg">Tobacco</h2>
                <p><strong>Ever Used: </strong> {selectedSubstanceUseHistorySubmission.tobacco_ever_used}</p>
                {selectedSubstanceUseHistorySubmission.tobacco_ever_used === "Yes" && (
                  <>
                    <p><strong>Used During Pregnancy: </strong> {selectedSubstanceUseHistorySubmission.tobacco_used_during_pregnancy}</p>
                    <p><strong>Last Used: </strong> {new Date(selectedSubstanceUseHistorySubmission.tobacco_date_last_used).toLocaleDateString()}</p>
                  </>
                )}
                <p><strong>Notes: </strong> {selectedSubstanceUseHistorySubmission.tobacco_notes || "N/A"}</p>
              </div>
            </div>

            {selectedSubstanceUseHistorySubmission.other_drugs.length > 0 && (
              <div className="bento-inner">
                <h2 className="font-bold text-lg">Additional Drugs</h2>
                <div className="flex grid-cols gap-4">
                  {selectedSubstanceUseHistorySubmission.other_drugs.map((entry: any, index: number) => (
                    <div key={index} className="bento-inner">
                      <p><strong>Additional Drug Used:</strong> {entry.drug_used}</p>
                      <p><strong>Used During Pregnancy:</strong> {entry.used_during_pregnancy}</p>
                      <p><strong>Last Used:</strong> {new Date(entry.date_last_used).toLocaleDateString()}</p>
                      <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bento-inner">
                <h2 className="font-bold text-lg">Medication Assisted Treatment</h2>
                <p><strong>MAT Engaged:</strong> {selectedSubstanceUseHistorySubmission.mat_engaged}</p>
                {selectedSubstanceUseHistorySubmission.mat_engaged === "Yes" && (
                  <>
                    <p><strong>Date of Last Use: </strong> {selectedSubstanceUseHistorySubmission.mat_engaged !== "Never" ? new Date(selectedSubstanceUseHistorySubmission.date_used_mat).toLocaleDateString() : "N/A"}</p>
                    <p><strong>Clinic Name: </strong> {selectedSubstanceUseHistorySubmission.mat_clinic_name || "N/A"}</p>
                    <p><strong>Clinic Phone: </strong> {selectedSubstanceUseHistorySubmission.mat_clinic_phone || "N/A"}</p>
                  </>
                )}
              </div>

              <div className="bento-inner">
                <h2 className="font-bold text-lg">Addiction Medicine Services</h2>
                <p><strong>Ever Used:</strong> {selectedSubstanceUseHistorySubmission.used_addiction_medicine_services}</p>
                {selectedSubstanceUseHistorySubmission.mat_engaged === "Yes" && (
                  <>
                    <p><strong>Date of Last Appointment: </strong> {selectedSubstanceUseHistorySubmission.used_addiction_medicine_services !== "Never" ? new Date(selectedSubstanceUseHistorySubmission.date_used_medicine_service).toLocaleDateString() : "N/A"}</p>
                    <p><strong>Clinic Name: </strong> {selectedSubstanceUseHistorySubmission.addiction_medicine_clinic || "N/A"}</p>
                    <p><strong>Clinic Phone: </strong> {selectedSubstanceUseHistorySubmission.addiction_medicine_clinic_phone || "N/A"}</p>
                  </>
                )}
              </div>
            </div>

            {selectedSubstanceUseHistorySubmission.medications.length > 0 && (
              <div className="bento-inner">
                <h2 className="font-bold text-lg">Medications</h2>
                <div className="flex grid-cols gap-4">
                  {selectedSubstanceUseHistorySubmission.medications.map((entry: any, index: number) => (
                    <div key={index} className="bento-inner">
                      <p><strong>Medication:</strong> {entry.medication}</p>
                      <p><strong>Dose:</strong> {entry.dose}</p>
                      <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex grid-cols gap-4">
              <div className="bento-inner">
                <h2 className="font-bold text-lg">Additional Notes</h2>
                <p>{selectedSubstanceUseHistorySubmission.notes || "N/A"}</p>
              </div>

              <div className="bento-inner">
                <h2 className="font-bold text-lg">Staff Notes</h2>
                <p>{selectedSubstanceUseHistorySubmission.staffNotes || "N/A"}</p>
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