import { useEffect, useState } from "react";
import { deleteCommunicationLog, readAllCommunicationLogs } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useCommunicationLogs = () => {
    const user = useAppStore((state) => state.user);
    const [communicationLogSubmissions, setCommunicationLogSubmissions] = useState<any[]>([]);
    const [selectedCommunicationLogSubmission, setSelectedCommunicationLogSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchCommunicationLogSubmissions = async () => {
            if (user) {
                const response = await readAllCommunicationLogs(user.id);
                setCommunicationLogSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedCommunicationLogSubmission(response[0]);
                }
            }
        };
        fetchCommunicationLogSubmissions();
    }, [user]);

    const handleCommunicationLogDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteCommunicationLog(submissionId, user?.id!);
            setCommunicationLogSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };


    const handleCommunicationLogSubmissionSelect = (submission: any) => {
        setSelectedCommunicationLogSubmission(submission);
    };

    return {
        communicationLogSubmissions,
        selectedCommunicationLogSubmission,
        handleCommunicationLogDelete,
        handleCommunicationLogSubmissionSelect,
    };
};

export default useCommunicationLogs;
