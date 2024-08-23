import { useEffect, useState } from "react";
import { deleteSmokingTobaccoPregnancyRecord, readAllSmokingTobaccoPregnancyRecords } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useSmokingTobaccoPregnancyRecords = () => {
    const user = useAppStore((state) => state.user);
    const [SmokingTobaccoPregnancyRecordSubmissions, setSmokingTobaccoPregnancyRecordSubmissions] = useState<any[]>([]);
    const [selectedSmokingTobaccoPregnancyRecordSubmission, setSelectedSmokingTobaccoPregnancyRecordSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchSmokingTobaccoPregnancyRecordSubmissions = async () => {
            if (user) {
                const response = await readAllSmokingTobaccoPregnancyRecords(user.id);
                setSmokingTobaccoPregnancyRecordSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedSmokingTobaccoPregnancyRecordSubmission(response[0]);
                }
            }
        };
        fetchSmokingTobaccoPregnancyRecordSubmissions();
    }, [user]);

    const handleSmokingTobaccoPregnancyRecordDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteSmokingTobaccoPregnancyRecord(submissionId, user?.id!);
            setSmokingTobaccoPregnancyRecordSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleSmokingTobaccoPregnancyRecordSubmissionSelect = (submission: any) => {
        setSelectedSmokingTobaccoPregnancyRecordSubmission(submission);
    };

    return {
        SmokingTobaccoPregnancyRecordSubmissions,
        selectedSmokingTobaccoPregnancyRecordSubmission,
        handleSmokingTobaccoPregnancyRecordDelete,
        handleSmokingTobaccoPregnancyRecordSubmissionSelect,
    };
};

export default useSmokingTobaccoPregnancyRecords;