import { useEffect, useState } from "react";
import { deleteChildDemographicsRecord, readAllChildDemographicsRecord } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useChildDemographicsRecord = () => {
    const user = useAppStore(state => state.user);
    const [childDemographicsRecordSubmissions, setChildDemographicsRecordSubmissions] = useState<any[]>([]);
    const [selectedChildDemographicRecordSubmission, setSelectedChildDemographicRecordSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchChildDemographicsRecordSubmission = async () => {
            if (user) {
                const response = await readAllChildDemographicsRecord(user.id);
                setChildDemographicsRecordSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedChildDemographicRecordSubmission(response[0]);
                }
            }
        };
        fetchChildDemographicsRecordSubmission();
    }, [user]);

    const handleChildDemographicsRecordDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteChildDemographicsRecord(submissionId, user?.id!);
            setChildDemographicsRecordSubmissions(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleChildDemographicsRecordSubmissionSelect = (submission: any) => {
        setSelectedChildDemographicRecordSubmission(submission);
    };

    return {
        childDemographicsRecordSubmissions,
        selectedChildDemographicRecordSubmission,
        handleChildDemographicsRecordDelete,
        handleChildDemographicsRecordSubmissionSelect
    };
};

export default useChildDemographicsRecord;