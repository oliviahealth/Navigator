'use client';

import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import useFoodSecurity from "./food-security/submissions";
import useHouseholdHousingSafetyProfile from "./housing-safety-profile/submissions";
import useHousingSecurityHomeVisitForm from "./housing-security-home-visit-form/submissions";

type ERVisit = {
  visitDate: Date | string | null | undefined;
  visitReason: "Injury" | "Other" | null | undefined;
};

type WellChildVisit = {
  childName: string;
  wellChildVisitsCompleted?: WellChildVisitsEnum[] | undefined;
};

type WellChildVisitsEnum =
  | "Newborn" | "3-7 days old" | "2-4 weeks old" | "2-3 months old"
  | "4-5 months old" | "6-7 months old" | "9-10 months old" | "12-13 months old"
  | "15-16 months old" | "18-19 months old" | "2-2.5 years old" | "3-3.5 years old"
  | "4-4.5 years old";

const Tab: React.FC = () => {
  const {
    foodSecuritySubmissions,
    selectedFoodSecuritySubmissions,
    hanldeFoodSecurityDelete,
    handleFoodSecuritySubmissionSelect
  } = useFoodSecurity();

  const {
    householdHousingSafetyProfileSubmissions,
    selectedHouseholdHousingSafetyProfileSubmissions,
    handleHouseholdHousingSafetyProfileDelete,
    handleHouseholdHousingSafetyProfileSelect
  } = useHouseholdHousingSafetyProfile();

  const {
    housingSecurityHomeVisitFormSubmissions,
    selectedHousingSecurityHomeVisitForm,
    handleHousingSecurityHomeVisitFormDelete,
    handleHousingSecurityHomeVisitFormSubmissionSelect
  } = useHousingSecurityHomeVisitForm();

  return (
    <div className="flex flex-col">
      <Accordion title="Housing Security Home Visit">
        <div className="grid grid-cols-2 gap-4">
          <div className="bento-inner">
            {selectedHousingSecurityHomeVisitForm && (
            <div>
              <p><strong>Participant Name:</strong> {selectedHousingSecurityHomeVisitForm.participantName}</p>
              <p><strong>Date of Visit:</strong> {selectedHousingSecurityHomeVisitForm.dateOfVisit instanceof Date ? selectedHousingSecurityHomeVisitForm.dateOfVisit.toLocaleDateString() : selectedHousingSecurityHomeVisitForm.dateOfVisit}</p>
              <p><strong>Case ID:</strong> {selectedHousingSecurityHomeVisitForm.caseId}</p>
              <p><strong>Staff Name:</strong> {selectedHousingSecurityHomeVisitForm.staffName}</p>
              <p><strong>Health Insurance:</strong> {selectedHousingSecurityHomeVisitForm.healthInsurance}</p>
              <p><strong>Concerns:</strong> {selectedHousingSecurityHomeVisitForm.concerns}</p>
              <p><strong>ER Visit:</strong> {selectedHousingSecurityHomeVisitForm.erVisit}</p>
          
              {selectedHousingSecurityHomeVisitForm.erVisitSpecific && selectedHousingSecurityHomeVisitForm.erVisitSpecific.length > 0 && (
                <div>
                  <p><strong>ER Visit Details:</strong></p>
                  {selectedHousingSecurityHomeVisitForm.erVisitSpecific.map((visit: ERVisit, index: number) => (
                  <div key={index}>
                      <p>Visit Date: {new Date(String(visit.visitDate)).toLocaleDateString()}</p>
                      <p>Visit Reason: {visit.visitReason}</p>
                  </div>
                ))}
              </div>
            )}

          <p><strong>Well Child Visits:</strong> {selectedHousingSecurityHomeVisitForm.wellChildVisits}</p>
          
          {selectedHousingSecurityHomeVisitForm.wellChildVisitsSpecific && selectedHousingSecurityHomeVisitForm.wellChildVisitsSpecific.length > 0 && (
            <div>
              <p><strong>Well Child Visits Details:</strong></p>
              {selectedHousingSecurityHomeVisitForm.wellChildVisitsSpecific.map((child: WellChildVisit, index: number) => (
                <div key={index}>
                  <p>Child Name: {child.childName}</p>
                  <p>Completed Visits: {child.wellChildVisitsCompleted?.join(', ')}</p>
                </div>
              ))}
            </div>
          )}

          <p><strong>Other Insurance:</strong> {selectedHousingSecurityHomeVisitForm.otherInsurance}</p>
          <p><strong>Middle/High School/GED:</strong> {selectedHousingSecurityHomeVisitForm.middleHighSchoolGED}</p>
          <p><strong>Tobacco Cessation Services:</strong> {selectedHousingSecurityHomeVisitForm.tobaccoCessationServices}</p>
          <p><strong>Want Pregnant:</strong> {selectedHousingSecurityHomeVisitForm.wantPregnant}</p>
          <p><strong>Other Income Undetermined Reason:</strong> {selectedHousingSecurityHomeVisitForm.otherIncomeUndeterminedReason}</p>
          
          <p><strong>Staff Notes:</strong> {selectedHousingSecurityHomeVisitForm.staffNotes}</p>
        </div>
      )}
    </div>
  </div>
  <Submission
    link="/dashboard/home-safety-assessments/housing-security-home-visit-form/"
    submissions={housingSecurityHomeVisitFormSubmissions}
    onDelete={handleHousingSecurityHomeVisitFormDelete}
    onSubmissionSelect={handleHousingSecurityHomeVisitFormSubmissionSelect}
  />
</Accordion>

      <Accordion title="Household Housing Safety Profile">
        {selectedHouseholdHousingSafetyProfileSubmissions && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-inner">
              <p><strong>Participant Name:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.participantName}</p>
              <p><strong>Case ID:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.caseId}</p>
              <p><strong>Date Completed:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.dateCompleted instanceof Date ? selectedHouseholdHousingSafetyProfileSubmissions.dateCompleted.toLocaleDateString() : selectedHouseholdHousingSafetyProfileSubmissions.dateCompleted}</p>
              <p><strong>Staff Name:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.staffName}</p>
              <p><strong>Timeframe:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.timeframe.join(", ")}</p>
              <p><strong>Insurance Type:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.insuranceType}</p>
              {selectedHouseholdHousingSafetyProfileSubmissions.otherInsurance && <p><strong>Other Insurance:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.otherInsurance}</p>}
              <p><strong>High School Diploma:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.highSchoolDiploma}</p>
              {selectedHouseholdHousingSafetyProfileSubmissions.highestEducation && <p><strong>Highest Education:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.highestEducation}</p>}
              <p><strong>Currently Enrolled:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.currentlyEnrolled}</p>
              {selectedHouseholdHousingSafetyProfileSubmissions.middleHighSchoolGED !== null && <p><strong>Middle/High School/GED:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.middleHighSchoolGED ? "Yes" : "No"}</p>}
              <p><strong>Employment Status:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.employmentStatus}</p>
              <p><strong>Uses Tobacco:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.usesTobacco}</p>
              {selectedHouseholdHousingSafetyProfileSubmissions.tobaccoCessationServices && <p><strong>Tobacco Cessation Services:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.tobaccoCessationServices}</p>}
              {selectedHouseholdHousingSafetyProfileSubmissions.currentlyPregnant && <p><strong>Currently Pregnant:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.currentlyPregnant}</p>}
              {selectedHouseholdHousingSafetyProfileSubmissions.wantPregnant && <p><strong>Want Pregnant:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.wantPregnant}</p>}
              {selectedHouseholdHousingSafetyProfileSubmissions.yearlyHouseholdIncome !== null && <p><strong>Yearly Household Income:</strong> ${selectedHouseholdHousingSafetyProfileSubmissions.yearlyHouseholdIncome}</p>}
              {selectedHouseholdHousingSafetyProfileSubmissions.incomeUndeterminedReason && <p><strong>Income Undetermined Reason:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.incomeUndeterminedReason}</p>}
              {selectedHouseholdHousingSafetyProfileSubmissions.otherIncomeUndeterminedReason && <p><strong>Other Income Undetermined Reason:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.otherIncomeUndeterminedReason}</p>}
              <p><strong>Number of Dependents:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.dependentsCount}</p>
              <p><strong>Housing Status:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.housingStatus}</p>
              <p><strong>Label:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.label}</p>
              <p><strong>Staff Notes:</strong> {selectedHouseholdHousingSafetyProfileSubmissions.staffNotes}</p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/home-safety-assessments/housing-safety-profile/"
          submissions={householdHousingSafetyProfileSubmissions}
          onDelete={handleHouseholdHousingSafetyProfileDelete}
          onSubmissionSelect={handleHouseholdHousingSafetyProfileSelect}
        />
      </Accordion>

      <Accordion title="Food Security">
        {selectedFoodSecuritySubmissions && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-inner">
              <p><strong>Worry Household without Food:</strong> {selectedFoodSecuritySubmissions.worryHouseholdWithoutFood}</p>
              <p><strong>How Often Worry:</strong> {selectedFoodSecuritySubmissions.howOftenWorryHouseholdWithoutFood || 'N/A'}</p>
              <p><strong>Family Did Not Eat Preferred Food (Resources):</strong> {selectedFoodSecuritySubmissions.pastFourWeeksFamilyDidNotEatPreferredFoodResources}</p>
              <p><strong>How Often (Resources):</strong> {selectedFoodSecuritySubmissions.howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResources || 'N/A'}</p>
              <p><strong>Family Did Not Eat Preferred Food (Variety):</strong> {selectedFoodSecuritySubmissions.pastFourWeeksFamilyDidNotEatPreferredFoodVariety}</p>
              <p><strong>How Often (Variety):</strong> {selectedFoodSecuritySubmissions.howOftenPastFourWeeksFamilyDidNotEatPreferredFoodVariety || 'N/A'}</p>
              <p><strong>Family Did Not Eat Preferred Food (Resources to Obtain):</strong> {selectedFoodSecuritySubmissions.pastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood}</p>
              <p><strong>How Often (Resources to Obtain):</strong> {selectedFoodSecuritySubmissions.howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood || 'N/A'}</p>
              <p><strong>Label:</strong> {selectedFoodSecuritySubmissions.label}</p>
              <p><strong>Staff Notes:</strong> {selectedFoodSecuritySubmissions.staffNotes}</p>
            </div>
          </div>
        )}
        <Submission
        link="/dashboard/home-safety-assessments/food-security/"
        submissions={foodSecuritySubmissions}
        onDelete={hanldeFoodSecurityDelete}
        onSubmissionSelect={handleFoodSecuritySubmissionSelect} />
      </Accordion>
    </div>
  );
};

export default Tab;
