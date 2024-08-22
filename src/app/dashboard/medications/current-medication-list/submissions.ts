import { useEffect, useState } from "react";
import { deleteCurrentMedicationListRecord, readAllCurrentMedicationListRecords } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useCurrentMedicationLists = () => {
    const user = useAppStore((state) => state.user);
    const [currentMedicationListSubmissions, setCurrentMedicationListSubmissions] = useState<any[]>([]);
    const [selectedCurrentMedicationListSubmission, setSelectedCurrentMedicationListSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchCurrentMedicationListSubmissions = async () => {
            if (user) {
                const response = await readAllCurrentMedicationListRecords(user.id);
                setCurrentMedicationListSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedCurrentMedicationListSubmission(response[0]);
                }
            }
        };
        fetchCurrentMedicationListSubmissions();
    }, [user]);

    const handleCurrentMedicationListDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteCurrentMedicationListRecord(submissionId, user?.id!);
            setCurrentMedicationListSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleCurrentMedicationListSubmissionSelect = (submission: any) => {
        setSelectedCurrentMedicationListSubmission(submission);
    };

    return {
        currentMedicationListSubmissions,
        selectedCurrentMedicationListSubmission,
        handleCurrentMedicationListDelete,
        handleCurrentMedicationListSubmissionSelect,
    };
};

export default useCurrentMedicationLists;