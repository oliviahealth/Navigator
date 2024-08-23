"use client";
import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import useEncounterForm from "./encounter-form/submissions";
import useNutritionHistoryAndAssessment from "./nutrition-history-and-assessment/submissions";
import useParentalMedicalHistory from "./parental-medical-history/submissions";

const Tab: React.FC = () => {
  const {
    encounterFormSubmissions,
    selectedEncounterFormSubmission,
    handleEncounterFormDelete,
    handleEncounterFormSubmissionSelect,
  } = useEncounterForm();
  
  const {
    parentalMedicalHistorySubmissions,
    selectedParentalMedicalHistorySubmission,
    handleParentalMedicalHistoryDelete,
    handleParentalMedicalHistorySubmissionSelect,
  } = useParentalMedicalHistory();
  
  return (
    <div className="flex flex-col">
     <Accordion title="Encounter Form">
    {selectedEncounterFormSubmission && (
      <div className="grid grid-cols-2 gap-4">
        <div className="bento-inner">
          <h2 className="font-bold">General Information</h2>
          <p><strong>Participant Name:</strong> {selectedEncounterFormSubmission.participantName}</p>
          <p><strong>Case ID:</strong> {selectedEncounterFormSubmission.caseId}</p>
          <p><strong>Month/Year:</strong> {selectedEncounterFormSubmission.monthYear}</p>
          <p><strong>Label:</strong> {selectedEncounterFormSubmission.label}</p>
          <p><strong>Staff Notes:</strong> {selectedEncounterFormSubmission.staffNotes}</p>
        </div>
        {selectedEncounterFormSubmission.encounterEntries.map((entry: any, entryIndex: number) => (
          <div key={entryIndex} className="bento-inner">
            <h2 className="font-bold">Encounter Entry {entryIndex + 1}</h2>
            <p><strong>Date of Visit:</strong> {new Date(entry.dateOfVisit).toLocaleDateString()}</p>
            <p><strong>Staff:</strong> {entry.staff}</p>
            <p><strong>Health Insurance:</strong> {entry.healthInsurance || 'N/A'}</p>
            <p><strong>Parent Concerns:</strong> {entry.parentConcerns || 'N/A'}</p>
            <p><strong>Care Visits Attended:</strong> {entry.careVisits || 'N/A'}</p>
            <p><strong>Well-child Visits:</strong> {entry.wellchildVisits || 'N/A'}</p>
            <p><strong>Well-child Visits Completed:</strong> {entry.wellchildVisitsCompleted || 'N/A'}</p>
            {Array.isArray(entry.careVisitsDatesAndReasonsList) && entry.careVisitsDatesAndReasonsList.length > 0 && (
              <div>
                <h3 className="font-bold">Care Visits Dates and Reasons</h3>
                {entry.careVisitsDatesAndReasonsList.map((visit: any, visitIndex: number) => (
                  <div key={visitIndex}>
                    <p><strong>Visit Date:</strong> {new Date(visit.visitDate).toLocaleDateString()}</p>
                    <p><strong>Reason:</strong> {visit.reason || 'N/A'}</p>
                    {visit.otherReason && <p><strong>Other Reason:</strong> {visit.otherReason}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
    <Submission
      link="/dashboard/medical-and-nutrition-history/encounter-form/"
      submissions={encounterFormSubmissions}
      onDelete={handleEncounterFormDelete}
      onSubmissionSelect={handleEncounterFormSubmissionSelect}
    />
  </Accordion>
  
      <Accordion title="Parental Medical History">
  {selectedParentalMedicalHistorySubmission && (
    <div className="grid grid-cols-2 gap-4">
      <div className="bento-inner">
        <h2 className="font-bold">General Information</h2>
        <p><strong>Participant Name:</strong> {selectedParentalMedicalHistorySubmission.participantName}</p>
        <p><strong>Case ID:</strong> {selectedParentalMedicalHistorySubmission.caseId}</p>
        <p><strong>Gestational Age:</strong> {selectedParentalMedicalHistorySubmission.gestationalAge}</p>
        <p><strong>Due Date:</strong> {new Date(selectedParentalMedicalHistorySubmission.dueDate).toLocaleDateString()}</p>
        <p><strong>Delivery Date:</strong> {new Date(selectedParentalMedicalHistorySubmission.deliveryDate).toLocaleDateString()}</p>
        <p><strong>Planned Mode of Delivery:</strong> {selectedParentalMedicalHistorySubmission.plannedModeDelivery}</p>
        <p><strong>Actual Mode of Delivery:</strong> {selectedParentalMedicalHistorySubmission.actualModeDelivery}</p>
        <p><strong>Attended Postpartum Visit:</strong> {selectedParentalMedicalHistorySubmission.attendedPostpartumVisit}</p>
      </div>
      <div className="bento-inner">
        <h2 className="font-bold">Postpartum Information</h2>
        <p><strong>Postpartum Visit Location:</strong> {selectedParentalMedicalHistorySubmission.postpartumVisitLocation || 'N/A'}</p>
        <p><strong>Postpartum Visit Date:</strong> {selectedParentalMedicalHistorySubmission.postpartumVisitDate ? new Date(selectedParentalMedicalHistorySubmission.postpartumVisitDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Total Number of Pregnancies:</strong> {selectedParentalMedicalHistorySubmission.totalNumPregnancies}</p>
        <p><strong>Number of Children with Mother:</strong> {selectedParentalMedicalHistorySubmission.numChildrenWithMother}</p>
        <p><strong>Prior Pregnancy Dates:</strong> {selectedParentalMedicalHistorySubmission.priorPregnancyDates}</p>
        <p><strong>Prior Pregnancy Outcomes:</strong> {selectedParentalMedicalHistorySubmission.priorPregnancyOutcomes}</p>
      </div>
      <div className="bento-inner">
        <h2 className="font-bold">Pregnancy Details</h2>
        <p><strong>Gravida:</strong> {selectedParentalMedicalHistorySubmission.gravida}</p>
        <p><strong>Term:</strong> {selectedParentalMedicalHistorySubmission.term}</p>
        <p><strong>Preterm:</strong> {selectedParentalMedicalHistorySubmission.preterm}</p>
        <p><strong>Abortions:</strong> {selectedParentalMedicalHistorySubmission.abortions}</p>
        <p><strong>Living:</strong> {selectedParentalMedicalHistorySubmission.living}</p>
        <p><strong>Prior Complications:</strong> {selectedParentalMedicalHistorySubmission.priorComplications || 'N/A'}</p>
      </div>
      <div className="bento-inner">
        <h2 className="font-bold">Medical Information</h2>
        <p><strong>Ongoing Medical Problems:</strong> {selectedParentalMedicalHistorySubmission.ongoingMedicalProblems}</p>
        <p><strong>Label:</strong> {selectedParentalMedicalHistorySubmission.label}</p>
        <p><strong>Staff Notes:</strong> {selectedParentalMedicalHistorySubmission.staffNotes}</p>
      </div>
    </div>
  )}
  <Submission
    link="/dashboard/medical-and-nutrition-history/parental-medical-history/"
    submissions={parentalMedicalHistorySubmissions}
    onDelete={handleParentalMedicalHistoryDelete}
    onSubmissionSelect={handleParentalMedicalHistorySubmissionSelect}
  />
</Accordion>
    </div>
  );
};

export default Tab;