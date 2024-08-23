import { useEffect, useState } from "react";
import { deleteSubstanceUseHistory, readAllSubstanceUseHistory } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useSubstanceUseHistory = () => {
    const user = useAppStore((state) => state.user);
    const [SubstanceUseHistorySubmissions, setSubstanceUseHistorySubmissions] = useState<any[]>([]);
    const [selectedSubstanceUseHistorySubmission, setSelectedSubstanceUseHistorySubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchSubstanceUseHistorySubmissions = async () => {
            if (user) {
                const response = await readAllSubstanceUseHistory(user.id);
                setSubstanceUseHistorySubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedSubstanceUseHistorySubmission(response[0]);
                }
            }
        };
        fetchSubstanceUseHistorySubmissions();
    }, [user]);

    const handleSubstanceUseHistoryDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteSubstanceUseHistory(submissionId, user?.id!);
            setSubstanceUseHistorySubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleSubstanceUseHistorySubmissionSelect = (submission: any) => {
        setSelectedSubstanceUseHistorySubmission(submission);
    };

    return {
        SubstanceUseHistorySubmissions,
        selectedSubstanceUseHistorySubmission,
        handleSubstanceUseHistoryDelete,
        handleSubstanceUseHistorySubmissionSelect,
    };
};

export default useSubstanceUseHistory;