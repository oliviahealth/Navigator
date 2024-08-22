"use client";

import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import { communicationLoglabelMapping } from "../logs-and-consent-forms/communication-log/definitions";
import useCommunicationLogs from "./communication-log/submissions";
import useAppointmentLogs from "./appointment-log/submissions";
import useEnrollmentForms from "./enrollment-form/submissions";
import useMediaAppearanceReleases from "./media-appearance-form/submissions";

const Tab: React.FC = () => {
  const {
    appointmentLogSubmissions,
    selectedAppointmentLogSubmission,
    handleAppointmentLogDelete,
    handleAppointmentLogSubmissionSelect,
  } = useAppointmentLogs();

  const {
    communicationLogSubmissions,
    selectedCommunicationLogSubmission,
    handleCommunicationLogDelete,
    handleCommunicationLogSubmissionSelect,
  } = useCommunicationLogs();

  const {
    enrollmentFormSubmissions,
    selectedEnrollmentFormSubmission,
    handleEnrollmentFormDelete,
    handleEnrollmentFormSubmissionSelect
  } = useEnrollmentForms();

  const {
    mediaAppearanceReleaseSubmissions,
    selectedMediaAppearanceReleaseSubmission,
    handleMediaAppearanceReleaseDelete,
    handleMediaAppearanceReleaseSubmissionSelect
  } = useMediaAppearanceReleases();

  return (
    <div className="flex flex-col">
      <Accordion title="Appointment Log">
        {selectedAppointmentLogSubmission && (
          <div>
            {Array.isArray(selectedAppointmentLogSubmission.appointmentEntries) && selectedAppointmentLogSubmission.appointmentEntries.length > 0 ? (
              <div className="bento-outer">
                {selectedAppointmentLogSubmission.appointmentEntries.map((entry: any, index: number) => (
                  <div key={index} className="bento-inner">
                    <p><strong>Date/Time:</strong> {new Date(entry.dateTime).toLocaleString()}</p>
                    <p><strong>Who:</strong> {entry.who}</p>
                    <p><strong>Location:</strong> {entry.location}</p>
                    <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No appointment entries available.</p>
            )}
          </div>
        )}
        <Submission
          link="/dashboard/logs-and-consent-forms/appointment-log/"
          submissions={appointmentLogSubmissions}
          onDelete={handleAppointmentLogDelete}
          onSubmissionSelect={handleAppointmentLogSubmissionSelect}
        />
      </Accordion>

      <Accordion title="Communication Log">
        {selectedCommunicationLogSubmission && (
          <div>
            {Array.isArray(selectedCommunicationLogSubmission.communicationEntries) && selectedCommunicationLogSubmission.communicationEntries.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedCommunicationLogSubmission.communicationEntries.map((entry: any, index: number) => (
                  <div key={index} className="border p-2 rounded-md flex-1 min-w-[200px]">
                    <p><strong>Date/Time:</strong> {new Date(entry.dateTime).toLocaleString()}</p>
                    <p><strong>Method:</strong> {communicationLoglabelMapping[entry.method]}</p>
                    <p><strong>Organization/Person:</strong> {entry.organizationPerson}</p>
                    <p><strong>Purpose:</strong> {entry.purpose || 'N/A'}</p>
                    <p><strong>Notes:</strong> {entry.notes || 'N/A'}</p>
                    <p><strong>Follow Up Needed:</strong> {entry.followUpNeeded || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Communication entries available.</p>
            )}
          </div>
        )}
        <Submission
          link="/dashboard/logs-and-consent-forms/communication-log/"
          submissions={communicationLogSubmissions}
          onDelete={handleCommunicationLogDelete}
          onSubmissionSelect={handleCommunicationLogSubmissionSelect}
        />
      </Accordion>

      <Accordion title="Enrollment Form">
        {selectedEnrollmentFormSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Personal Information</h2>
              <p><strong>First Name:</strong> {selectedEnrollmentFormSubmission.firstName}</p>
              <p><strong>Last Name:</strong> {selectedEnrollmentFormSubmission.lastName}</p>
              <p><strong>Date of Birth:</strong> {new Date(selectedEnrollmentFormSubmission.dateOfBirth).toLocaleString()}</p>
              <p><strong>Address:</strong> {selectedEnrollmentFormSubmission.address}</p>
              <p><strong>City:</strong> {selectedEnrollmentFormSubmission.city}</p>
              <p><strong>State:</strong> {selectedEnrollmentFormSubmission.state}</p>
              <p><strong>Zip:</strong> {selectedEnrollmentFormSubmission.zip}</p>
              <p><strong>Home Phone:</strong> {selectedEnrollmentFormSubmission.homePhone}</p>
              <p><strong>Cell Phone:</strong> {selectedEnrollmentFormSubmission.cellPhone}</p>
              <p><strong>Email:</strong> {selectedEnrollmentFormSubmission.email}</p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Client Information</h2>
              <p><strong>Client Name:</strong> {selectedEnrollmentFormSubmission.clientName}</p>
              <p><strong>Client Date:</strong> {new Date(selectedEnrollmentFormSubmission.clientDate).toLocaleString()}</p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Guardian Information</h2>
              <p><strong>Guardian Name:</strong> {selectedEnrollmentFormSubmission.guardianName ? selectedEnrollmentFormSubmission.guardianName : "N/A"}</p>
              <p><strong>Guardian Date:</strong> {selectedEnrollmentFormSubmission.guardianName ? new Date(selectedEnrollmentFormSubmission.guardianDate).toLocaleString() : "N/A"}</p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">GC-MOMS Information</h2>
              <p><strong>GC-MOMS Name:</strong> {selectedEnrollmentFormSubmission.gcMomsName}</p>
              <p><strong>GC-MOMS Date:</strong> {new Date(selectedEnrollmentFormSubmission.gcMomsDate).toLocaleString()}</p>
            </div>
            <div className="border p-4 rounded-md col-span-2">
              <h2 className="font-bold">Emergency Contacts</h2>
              <div className="grid grid-cols-2 gap-4">
                {selectedEnrollmentFormSubmission.emergencyContacts.map((contact: any, index: number) => (
                  <div key={index} className="border-t mt-2 pt-2">
                    <p><strong>Name:</strong> {contact.name}</p>
                    <p><strong>Relationship:</strong> {contact.relationship}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/logs-and-consent-forms/enrollment-form/"
          submissions={enrollmentFormSubmissions!}
          onDelete={handleEnrollmentFormDelete}
          onSubmissionSelect={handleEnrollmentFormSubmissionSelect}
        />
      </Accordion>

      <Accordion title="Media Appearance Release">
        {selectedMediaAppearanceReleaseSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Participant Information</h2>
              <p><strong>Participant Name:</strong> {selectedMediaAppearanceReleaseSubmission.participantName}</p>
              <p><strong>Address:</strong> {selectedMediaAppearanceReleaseSubmission.address}</p>
              <p><strong>Participant Date:</strong> {new Date(selectedMediaAppearanceReleaseSubmission.participantDate).toLocaleString()}</p>
            </div>
            {selectedMediaAppearanceReleaseSubmission.guardianName && (
              <div className="border p-4 rounded-md">
                <h2 className="font-bold">Guardian Information</h2>
                <p><strong>Guardian Name:</strong> {selectedMediaAppearanceReleaseSubmission.guardianName}</p>
                <p><strong>Guardian Date:</strong> {new Date(selectedMediaAppearanceReleaseSubmission.participantDate).toLocaleString()}</p>
              </div>
            )}
          </div>
        )}
        <Submission
          link="/dashboard/logs-and-consent-forms/media-appearance-form/"
          submissions={mediaAppearanceReleaseSubmissions}
          onDelete={handleMediaAppearanceReleaseDelete}
          onSubmissionSelect={handleMediaAppearanceReleaseSubmissionSelect}
        />
      </Accordion>
    </div>
  );
};

export default Tab;