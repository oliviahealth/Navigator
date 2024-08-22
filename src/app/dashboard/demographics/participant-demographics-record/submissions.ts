import { useEffect, useState } from "react";
import { deleteParticipantDemographicsRecord, readAllParticipantDemographicsRecord } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useParticipantsDemographicsRecord = () => {
    const user = useAppStore(state => state.user);
    const [participantDemographicsRecordSubmission, setParticipantsDemographicsRecordSubmission] = useState<any[]>([]);
    const [selectedParticipantDemographicsRecord, setSelectedParticipantsDemographicsRecord] = useState<any | null>(null);

    useEffect(() => {
        const fetchParticipantsDemographicsRecordSubmission = async () => {
            if (user) {
                const response = await readAllParticipantDemographicsRecord(user.id);
                setParticipantsDemographicsRecordSubmission(response || []);
                if (response && response.length > 0) {
                    setSelectedParticipantsDemographicsRecord(response[0]);
                }
            }
        };
        fetchParticipantsDemographicsRecordSubmission();
    }, [user]);

    const handleParticipantDemographicsRecordDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteParticipantDemographicsRecord(submissionId, user?.id!);
            setParticipantsDemographicsRecordSubmission(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleParticipantDemographicsSubmissionSelect = (submission: any) => {
        setSelectedParticipantsDemographicsRecord(submission);
    };

    return {
        participantDemographicsRecordSubmission,
        selectedParticipantDemographicsRecord,
        handleParticipantDemographicsRecordDelete,
        handleParticipantDemographicsSubmissionSelect
    };
};

export default useParticipantsDemographicsRecord;