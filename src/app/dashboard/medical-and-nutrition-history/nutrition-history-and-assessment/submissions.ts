import { useEffect, useState } from "react";
import { deleteNutritionHistoryAndAssessment, readAllNutritionHistoryAssessment } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useNutritionHistoryAndAssessment = () => {
    const user = useAppStore((state) => state.user);
    const [nutritionHistoryAndAssessmentSubmissions, setNutritionHistoryAndAssessmentSubmissions] = useState<any[]>([]);
    const [selectedNutritionHistoryAndAssessmentSubmission, setSelectedNutritionHistoryAndAssessmentSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchNutritionHistoryAndAssessment = async () => {
            if (user) {
                const response = await readAllNutritionHistoryAssessment(user.id);
                setNutritionHistoryAndAssessmentSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedNutritionHistoryAndAssessmentSubmission(response[0]);
                }
            }
        };
        fetchNutritionHistoryAndAssessment();
    }, [user]);

    const handleNutritionHistoryAndAssessmentDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteNutritionHistoryAndAssessment(submissionId, user?.id!);
            setNutritionHistoryAndAssessmentSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleNutritionHistoryAndAssessmentSubmissionSelect = (submission: any) => {
        setSelectedNutritionHistoryAndAssessmentSubmission(submission);
    };

    return {
        nutritionHistoryAndAssessmentSubmissions,
        selectedNutritionHistoryAndAssessmentSubmission,
        handleNutritionHistoryAndAssessmentDelete,
        handleNutritionHistoryAndAssessmentSubmissionSelect
    };
};

export default useNutritionHistoryAndAssessment;