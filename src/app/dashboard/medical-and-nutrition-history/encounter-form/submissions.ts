import { useEffect, useState } from "react";
import { deleteEncounterForm, readAllEncounterForm } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useEncounterForm = () => {
    const user = useAppStore((state) => state.user);
    const [encounterFormSubmissions, setEncounterFormSubmissions] = useState<any[]>([]);
    const [selectedEncounterFormSubmission, setSelectedEncounterFormSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchEncounterForm = async () => {
            if (user) {
                const response = await readAllEncounterForm(user.id);
                setEncounterFormSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedEncounterFormSubmission(response[0]);
                }
            }
        };
        fetchEncounterForm();
    }, [user]);

    const handleEncounterFormDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteEncounterForm(submissionId, user?.id!);
            setEncounterFormSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleEncounterFormSubmissionSelect = (submission: any) => {
        setSelectedEncounterFormSubmission(submission);
    };

    return {
        encounterFormSubmissions,
        selectedEncounterFormSubmission,
        handleEncounterFormDelete,
        handleEncounterFormSubmissionSelect,
    };
};

export default useEncounterForm;