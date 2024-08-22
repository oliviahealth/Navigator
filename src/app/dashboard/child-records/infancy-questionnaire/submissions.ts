import { useEffect, useState } from "react";
import { deleteInfancyQuestionnaire, readAllInfancyQuestionnaire } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useInfancyQuestionnaire = () => {
    const user = useAppStore((state) => state.user);
    const [infancyQuestionnaireSubmissions, setInfancyQuestionnairesSubmissions] = useState<any[]>([]);
    const [selectedInfancyQuestionnaireSubmission, setSelectedInfancyQuestionnaireSubmissions] = useState<any | null>(null);

    useEffect(() => {
        const fetchInfancyQuestionnaireSubmissions = async () => {
            if (user) {
                const response = await readAllInfancyQuestionnaire(user.id);
                setInfancyQuestionnairesSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedInfancyQuestionnaireSubmissions(response[0]);
                }
            }
        };
        fetchInfancyQuestionnaireSubmissions();
    }, [user]);

    const handleInfancyQuestionnaireDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteInfancyQuestionnaire(submissionId, user?.id!);
            setInfancyQuestionnairesSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleInfancyQuestionnaireSubmissionSelect = (submission: any) => {
        setSelectedInfancyQuestionnaireSubmissions(submission);
    };

    return {
        infancyQuestionnaireSubmissions,
        selectedInfancyQuestionnaireSubmission,
        handleInfancyQuestionnaireDelete,
        handleInfancyQuestionnaireSubmissionSelect,
    };
};

export default useInfancyQuestionnaire;