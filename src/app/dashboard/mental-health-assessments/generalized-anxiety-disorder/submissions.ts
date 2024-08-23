import { useEffect, useState } from "react";
import { deleteGeneralizedAnxietyDisorder, readAllGeneralizedAnxietyDisorder } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useGeneralizedAnxietyDisorder = () => {
    const user = useAppStore(state => state.user);
    const [generalizedAnxietyDisorderSubmission, setGeneralizedAnxietyDisorderSubmission] = useState<any[]>([]);
    const [selectedGeneralizedAnxietyDisorderSubmission, setSelectedGeneralizedAnxietyDisorderSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchGeneralizedAnxietyDisorderSubmissions = async () => {
            if (user) {
                const response = await readAllGeneralizedAnxietyDisorder(user.id);
                setGeneralizedAnxietyDisorderSubmission(response || []);
                if (response && response.length > 0) {
                    setSelectedGeneralizedAnxietyDisorderSubmission(response[0]);
                }
            }
        };
        fetchGeneralizedAnxietyDisorderSubmissions();
    }, [user]);

    const handleGeneralizedAnxietyDisorderDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteGeneralizedAnxietyDisorder(submissionId, user?.id!);
            setGeneralizedAnxietyDisorderSubmission(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleGeneralizedAnxietyDisorderSelect = (submission: any) => {
        setSelectedGeneralizedAnxietyDisorderSubmission(submission);
    };

    return {
        generalizedAnxietyDisorderSubmission,
        selectedGeneralizedAnxietyDisorderSubmission,
        handleGeneralizedAnxietyDisorderDelete,
        handleGeneralizedAnxietyDisorderSelect
    };
};

export default useGeneralizedAnxietyDisorder;