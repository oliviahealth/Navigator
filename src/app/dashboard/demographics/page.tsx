'use client';

import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import useChildDemographicsRecord from "./child-demographics-record/submissions";
import useChildrenNeedsForm from "./children-needs/submissions";
import useCurrentLivingArrangements from "./current-living-arrangement/submissions";
import useParticipantsDemographicsRecord from "./participant-demographics-record/submissions"
import useParticipantRecordForOthersInvolved from "./participant-record-for-others-involved/submissions";
import useReferralsAndServices from "./referrals-and-services/submissions";
import useSupportSystems from "./support-systems/submissions";
import { displayNames, ReferralsAndServicesInputsSchema } from "./referrals-and-services/definitions";
import { ChildrenNeedsFormInputsSchema, OtherChildrenNeeds, IChildrenNeedsFormInputs } from "./children-needs/definitions";
import { z } from "zod";
import { CurrentLivingArrangementInputsSchema } from "./current-living-arrangement/definitions";
import { 
  labelMapping, 
  EthnicityEnum, 
  RaceEnum, 
  PregnancyStatusAtEnrollmentEnum, 
  MaritalStatusEnum, 
  LgbtqiPlusEnum, 
  InsuranceEnum 
} from "./participant-demographics-record/definitions";

type EthnicityType = z.infer<typeof EthnicityEnum>;
type RaceType = z.infer<typeof RaceEnum>;
type PregnancyStatusType = z.infer<typeof PregnancyStatusAtEnrollmentEnum>;
type MaritalStatusType = z.infer<typeof MaritalStatusEnum>;
type LgbtqiPlusType = z.infer<typeof LgbtqiPlusEnum>;
type InsuranceType = z.infer<typeof InsuranceEnum>;

const Tab: React.FC = () => {
  const {
    childDemographicsRecordSubmissions,
    selectedChildDemographicRecordSubmission,
    handleChildDemographicsRecordDelete,
    handleChildDemographicsRecordSubmissionSelect
  } = useChildDemographicsRecord();

  const {
    childrenNeedsFormSubmissions,
    selectedChildrenNeedsForm,
    handleChildNeedsFormDelete,
    handleChildNeedsRecordSubmissionSelect
  } = useChildrenNeedsForm();

  const {
    currentLivingArrangementSubmissions,
    selectedCurrentLivingArrangementSubmission,
    handleCurrentLivingArrangementSubmissionSelect,
    handleCurrentLivingArrangementSubmissionsDelete
  } = useCurrentLivingArrangements();

  const {
    participantDemographicsRecordSubmission,
    selectedParticipantDemographicsRecord,
    handleParticipantDemographicsRecordDelete,
    handleParticipantDemographicsSubmissionSelect
  } = useParticipantsDemographicsRecord();

  const {
    participantRecordForOthersInvolvedSubmissions,
    selectedParticipantRecordForOthersInvolved,
    handleParticipantRecordForOthersInvolvedDelete,
    handleParticipantRecordForOthersInvolvedSelect
  } = useParticipantRecordForOthersInvolved();

  const {
    referralsAndServicesSubmissions,
    selectedReferralsAndServicesSubmission,
    handleReferralsAndServicesDelete,
    handleReferralsAndServicesSubmissionSelect
  } = useReferralsAndServices();

  const {
    supportSystemSubmissions,
    selectedSupportSystemSubmission,
    handleSupportSystemsDelete,
    handleSupportSystemSubmissionSelect
  } = useSupportSystems();

  interface ReferralServiceItem {
    serviceStatus: string;
    organization: string;
    organizationContactInformation: string;
  }

  return (
    <div className="flex flex-col">
      <Accordion title="Child Demographics Record">
        {selectedChildDemographicRecordSubmission &&   (
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="border p-2 rounded-md flex-1 min-w-[200px]">
              <p><strong>Child's Name:</strong> {selectedChildDemographicRecordSubmission.childName}</p>
              <p><strong>Date of Birth:</strong> {new Date(selectedChildDemographicRecordSubmission.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Sex:</strong> {selectedChildDemographicRecordSubmission.sex}</p>
              <p><strong>Child Living With:</strong> {selectedChildDemographicRecordSubmission.childLivingWith.join(", ")}</p>
              {selectedChildDemographicRecordSubmission.childLivingWithOther && <p><strong>Other Living Arrangement:</strong> {selectedChildDemographicRecordSubmission.childLivingWithOther}</p>}
              <p><strong>Parent 1 Name:</strong> {selectedChildDemographicRecordSubmission.parentOneName}</p>
              <p><strong>Parent 1 Involved:</strong> {selectedChildDemographicRecordSubmission.parentOneInvolvedInLife}</p>
              <p><strong>Parent 2 Name:</strong> {selectedChildDemographicRecordSubmission.parentTwoName}</p>
              <p><strong>Parent 2 Involved:</strong> {selectedChildDemographicRecordSubmission.parentTwoInvolvedInLife}</p>
              <p><strong>Insurance Plan:</strong> {selectedChildDemographicRecordSubmission.insurancePlan}</p>
              <p><strong>Effective Date:</strong> {new Date(selectedChildDemographicRecordSubmission.effectiveDate).toLocaleDateString()}</p>
              <p><strong>Subscriber ID:</strong> {selectedChildDemographicRecordSubmission.subscriberId}</p>
              <p><strong>Group ID:</strong> {selectedChildDemographicRecordSubmission.groupId}</p>
              <p><strong>Primary Care Provider:</strong> {selectedChildDemographicRecordSubmission.primaryCareProvider}</p>
              <p><strong>Provider Phone:</strong> {selectedChildDemographicRecordSubmission.primaryCareProviderPhone}</p>
              <p><strong>Birth Weight:</strong> {selectedChildDemographicRecordSubmission.birthWeight}</p>
              <p><strong>Gestational Age at Birth:</strong> {selectedChildDemographicRecordSubmission.gestationalAgeAtBirth}</p>
              <p><strong>NICU Stay:</strong> {selectedChildDemographicRecordSubmission.nicuStay}</p>
              {selectedChildDemographicRecordSubmission.nicuStayLength && <p><strong>NICU Stay Length:</strong> {selectedChildDemographicRecordSubmission.nicuStayLength}</p>}
              <p><strong>Prenatal Drug Exposure:</strong> {selectedChildDemographicRecordSubmission.prenatalDrugExposure}</p>
              {selectedChildDemographicRecordSubmission.prenatalDrug && <p><strong>Prenatal Drug:</strong> {selectedChildDemographicRecordSubmission.prenatalDrug}</p>}
              <p><strong>Medical Complications at Birth:</strong> {selectedChildDemographicRecordSubmission.medicalComplicationsAtBirth}</p>
              <p><strong>Ongoing Medical Issues:</strong> {selectedChildDemographicRecordSubmission.ongoingMedicalIssues}</p>
              <p><strong>Ongoing Medications:</strong> {selectedChildDemographicRecordSubmission.ongoingMedications}</p>
              <p><strong>Health Concerns:</strong> {selectedChildDemographicRecordSubmission.healthConcerns}</p>
              <p><strong>Difficulties/Services Received:</strong> {selectedChildDemographicRecordSubmission.difficultiesServicesReceived}</p>
              <p><strong>Lactation Consultant:</strong> {selectedChildDemographicRecordSubmission.lactationConsultant}</p>
              <p><strong>Legal System Involvement:</strong> {selectedChildDemographicRecordSubmission.legalSystemInvolvement}</p>
              <p><strong>Child Protective Service:</strong> {selectedChildDemographicRecordSubmission.childProtectiveService}</p>
              {selectedChildDemographicRecordSubmission.caseworker && <p><strong>Caseworker:</strong> {selectedChildDemographicRecordSubmission.caseworker}</p>}
              {selectedChildDemographicRecordSubmission.caseworkerPhoneNumber && <p><strong>Caseworker Phone:</strong> {selectedChildDemographicRecordSubmission.caseworkerPhoneNumber}</p>}
              {selectedChildDemographicRecordSubmission.importantInformation && <p><strong>Important Information:</strong> {selectedChildDemographicRecordSubmission.importantInformation}</p>}
            </div>
        </div>
  )}
  <Submission
    link="/dashboard/demographics/child-demographics-record/"
    submissions={childDemographicsRecordSubmissions}
    onDelete={handleChildDemographicsRecordDelete}
    onSubmissionSelect={handleChildDemographicsRecordSubmissionSelect}
  />
</Accordion>

<Accordion title="Children Needs Form">
  {selectedChildrenNeedsForm && (
    <div className="flex flex-wrap gap-4 mt-2">
      {Object.entries(selectedChildrenNeedsForm).map(([key, value]) => {
        if (key in ChildrenNeedsFormInputsSchema.shape && key !== 'other' && key !== 'notes') {
          return (
            <div key={key} className="border p-2 rounded-md flex-1 min-w-[200px]">
              <h3 className="font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <p><strong>Status:</strong> {value as string}</p>
              <p><strong>Notes:</strong> {selectedChildrenNeedsForm[`${key}Notes` as keyof IChildrenNeedsFormInputs] || 'N/A'}</p>
            </div>
          );
        }
        return null;
      })}
      
      {selectedChildrenNeedsForm.other && selectedChildrenNeedsForm.other.length > 0 && (
        <div className="border p-2 rounded-md flex-1 min-w-[200px]">
          <h3 className="font-bold">Other Needs</h3>
          {selectedChildrenNeedsForm.other.map((item: z.infer<typeof OtherChildrenNeeds>, index: number) => (
            <div key={index} className="mt-2">
              <p><strong>Need:</strong> {item.need}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <p><strong>Notes:</strong> {item.notes || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
      
      {selectedChildrenNeedsForm.notes && (
        <div className="border p-2 rounded-md flex-1 min-w-[200px]">
          <h3 className="font-bold">Additional Notes</h3>
          <p>{selectedChildrenNeedsForm.notes}</p>
        </div>
      )}
    </div>
  )}
  <Submission
    link="/dashboard/demographics/children-needs/"
    submissions={childrenNeedsFormSubmissions}
    onDelete={handleChildNeedsFormDelete}
    onSubmissionSelect={handleChildNeedsRecordSubmissionSelect}
  />
</Accordion>

<Accordion title="Current Living Arrangement">
  {selectedCurrentLivingArrangementSubmission && (
    <div className="flex flex-wrap gap-4 mt-2">
        <div className="border p-2 rounded-md flex-1 min-w-[200px]">
          <h3 className="font-bold">People Living with Patient</h3>
            <div className="mt-2">
              <p><strong>Name:</strong> {selectedCurrentLivingArrangementSubmission.name}</p>
              <p><strong>Date of Birth:</strong> {new Date(selectedCurrentLivingArrangementSubmission.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Relation:</strong> {selectedCurrentLivingArrangementSubmission.relation}</p>
            </div>
        </div>

        <div className="border p-2 rounded-md flex-1 min-w-[200px]">
          <h3 className="font-bold">Children Not Living with Patient</h3>
            <div className="mt-2">
              <p><strong>Name:</strong> {selectedCurrentLivingArrangementSubmission.name}</p>
              <p><strong>Date of Birth:</strong> {new Date(selectedCurrentLivingArrangementSubmission.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Caregiver:</strong> {selectedCurrentLivingArrangementSubmission.caregiver}</p>
              <p><strong>Caregiver Contact:</strong> {selectedCurrentLivingArrangementSubmission.caregiverContact}</p>
            </div>
        </div>

      {selectedCurrentLivingArrangementSubmission.notes && (
        <div className="border p-2 rounded-md flex-1 min-w-[200px]">
          <h3 className="font-bold">Additional Notes</h3>
          <p>{selectedCurrentLivingArrangementSubmission.notes}</p>
        </div>
      )}
    </div>
  )}
  <Submission
    link="/dashboard/demographics/current-living-arrangement/"
    submissions={currentLivingArrangementSubmissions}
    onDelete={handleCurrentLivingArrangementSubmissionsDelete}
    onSubmissionSelect={handleCurrentLivingArrangementSubmissionSelect}
  />
</Accordion>

<Accordion title="Participant Demographics Record">
  {selectedParticipantDemographicsRecord && (
    <div className="flex flex-wrap gap-4 mt-2">
      <div className="border p-2 rounded-md flex-1 min-w-[200px]">
        <h3 className="font-bold">Basic Information</h3>
        <p><strong>Program Start Date:</strong> {new Date(selectedParticipantDemographicsRecord.programStartDate).toLocaleDateString()}</p>
        <p><strong>Case ID:</strong> {selectedParticipantDemographicsRecord.caseId}</p>
        <p><strong>Home Visitor Assigned:</strong> {selectedParticipantDemographicsRecord.homeVisitorAssigned}</p>
        <p><strong>Participant Name:</strong> {selectedParticipantDemographicsRecord.participantName}</p>
        <p><strong>Date of Birth:</strong> {new Date(selectedParticipantDemographicsRecord.participantDateOfBirth).toLocaleDateString()}</p>
        <p><strong>Address:</strong> {selectedParticipantDemographicsRecord.participantAddress}</p>
        <p><strong>Zip Code:</strong> {selectedParticipantDemographicsRecord.participantZipCode}</p>
        <p><strong>Phone Number:</strong> {selectedParticipantDemographicsRecord.participantPhoneNumber}</p>
      </div>

      <div className="border p-2 rounded-md flex-1 min-w-[200px]">
        <h3 className="font-bold">Demographic Information</h3>
        <p><strong>Gender:</strong> {selectedParticipantDemographicsRecord.gender}</p>
        <p><strong>Ethnicity:</strong> {labelMapping.ethnicity[selectedParticipantDemographicsRecord.ethnicity as EthnicityType]}</p>
        <p><strong>Race:</strong> {labelMapping.race[selectedParticipantDemographicsRecord.race as RaceType]}</p>
        <p><strong>Primary Language:</strong> {selectedParticipantDemographicsRecord.primaryLanguage}</p>
        <p><strong>Pregnancy Status at Enrollment:</strong> {labelMapping.pregnancyStatusAtEnrollment[selectedParticipantDemographicsRecord.pregnancyStatusAtEnrollment as PregnancyStatusType]}</p>
        <p><strong>Marital Status:</strong> {labelMapping.maritalStatus[selectedParticipantDemographicsRecord.maritalStatus as MaritalStatusType]}</p>
        <p><strong>LGBTQI+:</strong> {labelMapping.lgbtqiPlus[selectedParticipantDemographicsRecord.lgbtqiPlus as LgbtqiPlusType]}</p>
        <p><strong>Insurance:</strong> {labelMapping.insurance[selectedParticipantDemographicsRecord.insurance as InsuranceType]}</p>
      </div>

      <div className="border p-2 rounded-md flex-1 min-w-[200px]">
        <h3 className="font-bold">Priority Population Characteristics</h3>
        <p><strong>Child Abuse:</strong> {selectedParticipantDemographicsRecord.childAbuse}</p>
        <p><strong>Substance Abuse:</strong> {selectedParticipantDemographicsRecord.substanceAbuse}</p>
        <p><strong>Tobacco Use:</strong> {selectedParticipantDemographicsRecord.tobaccoUse}</p>
        <p><strong>Low Student Achievement:</strong> {selectedParticipantDemographicsRecord.lowStudentAchievement}</p>
        <p><strong>Developmental Delay:</strong> {selectedParticipantDemographicsRecord.developmentalDelay}</p>
        <p><strong>US Armed Forces:</strong> {selectedParticipantDemographicsRecord.USArmedForces}</p>
        <p><strong>Reenrollment with Gap:</strong> {selectedParticipantDemographicsRecord.reenrollmentWithGap}</p>
        <p><strong>Transfer from Another Site:</strong> {selectedParticipantDemographicsRecord.transferFromAnotherSite}</p>
      </div>
    </div>
  )}
  <Submission
    link="/dashboard/demographics/participant-demographics-record/"
    submissions={participantDemographicsRecordSubmission}
    onDelete={handleParticipantDemographicsRecordDelete}
    onSubmissionSelect={handleParticipantDemographicsSubmissionSelect}
  />
</Accordion>

  <Accordion title="Participant Record For Others Involved">
   {selectedParticipantRecordForOthersInvolved && (
    <div>
      {Array.isArray(selectedParticipantRecordForOthersInvolved.participantRecordForOthersInvolvedEntries) && selectedParticipantRecordForOthersInvolved.participantRecordForOthersInvolvedEntries.length > 0 ? (
        <div className="flex flex-wrap gap-4 mt-2">
          {selectedParticipantRecordForOthersInvolved.participantRecordForOthersInvolvedEntries.map((entry: any, index: number) => (
            <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
            <p><strong>Name:</strong> {entry.name}</p>
            <p><strong>Date of Birth:</strong> {new Date(entry.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Current Living Arrangement:</strong> {entry.currentLivingArrangement}</p>
            <p><strong>Street Address:</strong> {entry.streetAddress}</p>
            <p><strong>City:</strong> {entry.city}</p>
            <p><strong>State:</strong> {entry.state}</p>
            <p><strong>Zip Code:</strong> {entry.zipCode}</p>
            <p><strong>County:</strong> {entry.county}</p>
            <p><strong>Primary Phone Number:</strong> {entry.primaryPhoneNumber}</p>
            <p><strong>Emergency Contact:</strong> {entry.emergencyContact}</p>
            <p><strong>Emergency Contact Phone:</strong> {entry.emergencyContactPhone}</p>
            <p><strong>Emergency Contact Relationship:</strong> {entry.emergencyContactRelationship}</p>
            <p><strong>Marital Status:</strong> {entry.maritalStatus}</p>
            <p><strong>Insurance Plan:</strong> {entry.insurancePlan}</p>
            <p><strong>Effective Date:</strong> {new Date(entry.effectiveDate).toLocaleDateString()}</p>
            <p><strong>Subscriber ID:</strong> {entry.subscriberId}</p>
            <p><strong>Group ID:</strong> {entry.groupId}</p>
            <p><strong>Gestational Age:</strong> {entry.gestationalAge}</p>
            <p><strong>Due Date:</strong> {new Date(entry.dueDate).toLocaleDateString()}</p>
            <p><strong>Delivery Date:</strong> {new Date(entry.deliveryDate).toLocaleDateString()}</p>
            <p><strong>Planned Mode of Delivery:</strong> {entry.plannedModeDelivery}</p>
            <p><strong>Actual Mode of Delivery:</strong> {entry.actualModeDelivery}</p>
            <p><strong>Attended Postpartum Visit:</strong> {entry.attendedPostpartumVisit}</p>
            {entry.postpartumVisitLocation && <p><strong>Postpartum Visit Location:</strong> {entry.postpartumVisitLocation}</p>}
            {entry.postpartumVisitDate && <p><strong>Postpartum Visit Date:</strong> {new Date(entry.postpartumVisitDate).toLocaleDateString()}</p>}
            <p><strong>Total Number of Pregnancies:</strong> {entry.totalNumPregnancies}</p>
            <p><strong>Number of Live Births:</strong> {entry.numLiveBirths}</p>
            <p><strong>Number of Children With Mother:</strong> {entry.numChildrenWithMother}</p>
            {entry.priorComplications && <p><strong>Prior Complications:</strong> {entry.priorComplications}</p>}
            <p><strong>Ongoing Medical Problems:</strong> {entry.ongoingMedicalProblems}</p>
          </div>
          ))}
        </div>
      ) : (
        <p>No Participant Record For Others Involved</p>
      )}
    </div>
  )}
  <Submission
    link="/dashboard/demographics/participant-record-for-others-involved/"
    submissions={participantRecordForOthersInvolvedSubmissions}
    onDelete={handleParticipantRecordForOthersInvolvedDelete}
    onSubmissionSelect={handleParticipantRecordForOthersInvolvedSelect}
  />
</Accordion>

<Accordion title="Referrals And Services">
  {selectedReferralsAndServicesSubmission && (
    <div className="flex flex-wrap gap-4 mt-2">
      {Object.entries(selectedReferralsAndServicesSubmission).map(([key, value]) => {
        if (key in ReferralsAndServicesInputsSchema.shape && typeof value === 'object' && value !== null) {
          if ('serviceStatus' in value) {
            const item = value as ReferralServiceItem;
            return (
              <div key={key} className="border p-2 rounded-md flex-1 min-w-[200px]">
                <h3 className="font-bold">{displayNames[key] || key}</h3>
                <p><strong>Service Status:</strong> {item.serviceStatus as string}</p>
                <p><strong>Organization:</strong> {item.organization}</p>
                <p><strong>Contact Info:</strong> {item.organizationContactInformation}</p>
              </div>
            );
          } else if (Array.isArray(value)) {
            return (
              <div key={key} className="border p-2 rounded-md flex-1 min-w-[200px]">
                <h3 className="font-bold">{displayNames[key.replace('Other', '')] || key}</h3>
                {value.map((item, index) => (
                  <div key={index} className="mt-2">
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Service Status:</strong> {item.serviceStatus}</p>
                    <p><strong>Organization:</strong> {item.organization}</p>
                    <p><strong>Contact Info:</strong> {item.organizationContactInformation}</p>
                  </div>
                ))}
              </div>
            );
          }
        } else if (key === 'additionalNotes') {
          return (
            <div key={key} className="border p-2 rounded-md flex-1 min-w-[200px]">
              <h3 className="font-bold">{displayNames[key] || 'Additional Notes'}</h3>
              <p>{value as string}</p>
            </div> 
          );
        }
        return null;
      })}
    </div>
  )}
  <Submission
    link="/dashboard/demographics/referrals-and-services/"
    submissions={referralsAndServicesSubmissions}
    onDelete={handleReferralsAndServicesDelete}
    onSubmissionSelect={handleReferralsAndServicesSubmissionSelect}
  />
</Accordion>

      <Accordion title="Support Systems">
        {selectedSupportSystemSubmission && (
           <div className="flex flex-wrap gap-4 mt-2">
               <div className="border p-2 rounded-md flex-1 min-w-[200px]">
                 <p><strong>Current Support System:</strong> {selectedSupportSystemSubmission.currentSupportSystem}</p>
                 <p><strong>Strengths:</strong> {selectedSupportSystemSubmission.strengths}</p>
                 <p><strong>Areas For Improvement:</strong> {selectedSupportSystemSubmission.areasForImprovement}</p>
                 <p><strong>Goals:</strong> {selectedSupportSystemSubmission.goals}</p>
               </div>
           </div>
        )}
        <Submission
          link="/dashboard/demographics/support-systems/"
          submissions={supportSystemSubmissions}
          onDelete={handleSupportSystemsDelete}
          onSubmissionSelect={handleSupportSystemSubmissionSelect}
        />
      </Accordion>
    </div>
  );
};

export default Tab;
