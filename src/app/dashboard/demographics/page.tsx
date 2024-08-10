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

  return (
    <div className="flex flex-col">
      <Accordion title="Child Demographics Record">
      {selectedChildDemographicRecordSubmission && (
        <div>
          {Array.isArray(selectedChildDemographicRecordSubmission.appointmentEntries) && selectedChildDemographicRecordSubmission.appointmentEntries.length > 0 ? (
            <div className="flex flex-wrap gap-4 mt-2">
              {selectedChildDemographicRecordSubmission.appointmentEntries.map((entry: any, index: number) => (
                <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                  <p><strong>Date/Time:</strong> {new Date(entry.dateTime).toLocaleString()}</p>
                  <p><strong>Who:</strong> {entry.who}</p>
                  <p><strong>Location:</strong> {entry.location}</p>
                  <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No Child Demographics Record entries available.</p>
          )}
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
        {selectedChildDemographicRecordSubmission && (
          <div>
            {Array.isArray(selectedChildrenNeedsForm.communicationEntries) && selectedChildrenNeedsForm.communicationEntries.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedChildrenNeedsForm.communicationEntries.map((entry: any, index: number) => (
                  <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                    <p><strong>Date/Time:</strong> {new Date(entry.dateTime).toLocaleString()}</p>
                    <p><strong>Who:</strong> {entry.who}</p>
                    <p><strong>Location:</strong> {entry.location}</p>
                    <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Children Needs entries available.</p>
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
          <div>
            {Array.isArray(selectedCurrentLivingArrangementSubmission.communicationEntries) && selectedCurrentLivingArrangementSubmission.communicationEntries.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedCurrentLivingArrangementSubmission.communicationEntries.map((entry: any, index: number) => (
                  <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                    <p><strong>Date/Time:</strong> {new Date(entry.dateTime).toLocaleString()}</p>
                    <p><strong>Who:</strong> {entry.who}</p>
                    <p><strong>Location:</strong> {entry.location}</p>
                    <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Current Living Arrangement entries available.</p>
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
          <div>
            {Array.isArray(selectedParticipantDemographicsRecord.communicationEntries) && selectedParticipantDemographicsRecord.communicationEntries.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedParticipantDemographicsRecord.communicationEntries.map((entry: any, index: number) => (
                  <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                    <p><strong>Date/Time:</strong> {new Date(entry.dateTime).toLocaleString()}</p>
                    <p><strong>Who:</strong> {entry.who}</p>
                    <p><strong>Location:</strong> {entry.location}</p>
                    <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Participant Demographics Record Found</p>
            )}
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
            {Array.isArray(selectedParticipantRecordForOthersInvolved.communicationEntries) && selectedParticipantRecordForOthersInvolved.communicationEntries.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedParticipantRecordForOthersInvolved.communicationEntries.map((entry: any, index: number) => (
                  <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                    <p><strong>Date/Time:</strong> {new Date(entry.dateTime).toLocaleString()}</p>
                    <p><strong>Who:</strong> {entry.who}</p>
                    <p><strong>Location:</strong> {entry.location}</p>
                    <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
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
          <div>
            {Array.isArray(selectedReferralsAndServicesSubmission.communicationEntries) && selectedReferralsAndServicesSubmission.communicationEntries.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedReferralsAndServicesSubmission.communicationEntries.map((entry: any, index: number) => (
                  <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                    <p><strong>Date/Time:</strong> {new Date(entry.dateTime).toLocaleString()}</p>
                    <p><strong>Who:</strong> {entry.who}</p>
                    <p><strong>Location:</strong> {entry.location}</p>
                    <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Referrals And Services Found</p>
            )}
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
          <div>
            {Array.isArray(selectedSupportSystemSubmission.communicationEntries) && selectedSupportSystemSubmission.communicationEntries.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedSupportSystemSubmission.communicationEntries.map((entry: any, index: number) => (
                  <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                    <p><strong>Date/Time:</strong> {new Date(entry.dateTime).toLocaleString()}</p>
                    <p><strong>Who:</strong> {entry.who}</p>
                    <p><strong>Location:</strong> {entry.location}</p>
                    <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Support Systems Found</p>
            )}
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
