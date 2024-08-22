"use client";

import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import usePrenatalCareRecords from "./prenatal-care/submissions";

const Tab: React.FC = () => {
  const {
    prenatalCareRecordSubmissions,
    selectedPrenatalCareRecordSubmission,
    handlePrenatalCareRecordsDelete,
    handlePrenatalCareRecordsSubmissionSelect,
  } = usePrenatalCareRecords();

  return (
    <div className="flex flex-col">
      <Accordion title="Prenatal Care Records">
        {selectedPrenatalCareRecordSubmission && (
          <div className="grid  gap-4 bento-outer">
             <div className="bento-inner">
              <h2 className="font-bold">Prenatal Care Information</h2>
              <p>
                <strong>Attended Regular Visits:</strong>{" "}
                {selectedPrenatalCareRecordSubmission.attendRegularVisitsWithOBCare
                  ? "Yes"
                  : "No"}
              </p>
              <p>
                <strong>Prenatal Care Start Date:</strong>{" "}
                {new Date(
                  selectedPrenatalCareRecordSubmission.prenatalCareStartDate
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Driving Distance:</strong>{" "}
                {selectedPrenatalCareRecordSubmission.drivingDistanceForPrenatalCare}
              </p>
              <p>
                <strong>Missed Appointments:</strong>{" "}
                {selectedPrenatalCareRecordSubmission.haveMissedAppointments}
              </p>
              <p>
                <strong>Label:</strong>{" "}
                {selectedPrenatalCareRecordSubmission.label}
              </p>
              <p>
                <strong>Staff Notes:</strong>{" "}
                {selectedPrenatalCareRecordSubmission.staffNotes}
              </p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/prenatal-care/prenatal-care/"
          submissions={prenatalCareRecordSubmissions}
          onDelete={handlePrenatalCareRecordsDelete}
          onSubmissionSelect={handlePrenatalCareRecordsSubmissionSelect}
        />
      </Accordion>
    </div>
  );
};

export default Tab;