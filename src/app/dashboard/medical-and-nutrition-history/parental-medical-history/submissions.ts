import { useEffect, useState } from "react";
import { deleteParentalMedicalHistory, readAllParentalMedicalHistory } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useParentalMedicalHistory = () => {
    const user = useAppStore((state) => state.user);
    const [parentalMedicalHistorySubmissions, setParentalMedicalHistorySubmissions] = useState<any[]>([]);
    const [selectedParentalMedicalHistorySubmission, setSelectedParentalMedicalHistorySubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchParentalMedicalHistory = async () => {
            if (user) {
                const response = await readAllParentalMedicalHistory(user.id);
                setParentalMedicalHistorySubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedParentalMedicalHistorySubmission(response[0]);
                }
            }
        };
        fetchParentalMedicalHistory();
    }, [user]);

    const handleParentalMedicalHistoryDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteParentalMedicalHistory(submissionId, user?.id!);
            setParentalMedicalHistorySubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleParentalMedicalHistorySubmissionSelect = (submission: any) => {
        setSelectedParentalMedicalHistorySubmission(submission);
    };

    return {
        parentalMedicalHistorySubmissions,
        selectedParentalMedicalHistorySubmission,
        handleParentalMedicalHistoryDelete,
        handleParentalMedicalHistorySubmissionSelect,
    };
};

export default useParentalMedicalHistory;