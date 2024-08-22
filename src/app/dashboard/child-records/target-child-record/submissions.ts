import { useEffect, useState } from "react";
import { deleteTargetChildRecord, readAllTargetChildRecord } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useTargetChildRecord = () => {
    const user = useAppStore((state) => state.user);
    const [perceivedTargetChildRecordSubmissions, setTargetChildRecordSubmissions] = useState<any[]>([]);
    const [selectedTargetChildRecordSubmission, setSelectedTargetChildRecordSubmissions] = useState<any | null>(null);

    useEffect(() => {
        const fetchTargetChildRecord = async () => {
            if (user) {
                const response = await readAllTargetChildRecord(user.id);
                setTargetChildRecordSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedTargetChildRecordSubmissions(response[0]);
                }
            }
        };
        fetchTargetChildRecord();
    }, [user]);

    const handleTargetChildRecordDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteTargetChildRecord(submissionId, user?.id!);
            setTargetChildRecordSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleTargetChildRecordSubmissionSelect = (submission: any) => {
        setSelectedTargetChildRecordSubmissions(submission);
    };

    return {
        perceivedTargetChildRecordSubmissions,
        selectedTargetChildRecordSubmission,
        handleTargetChildRecordDelete,
        handleTargetChildRecordSubmissionSelect,
    };
};

export default useTargetChildRecord;