import { useEffect, useState } from "react";
import { deleteBriefChildWellnessUpdate, readAllBriefChildWellnessUpdate } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useBriefChildWellnessUpdate = () => {
    const user = useAppStore((state) => state.user);
    const [briefChildWellnessUpdateSubmissions, setBriefChildWellnessSubmissions] = useState<any[]>([]);
    const [selectedBriefChildWellnessUpdateSubmission, setSelectedBriefChildWellnessUpdateSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchBriefChildWellnessUpdate = async () => {
            if (user) {
                const response = await readAllBriefChildWellnessUpdate(user.id);
                setBriefChildWellnessSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedBriefChildWellnessUpdateSubmission(response[0]);
                }
            }
        };
        fetchBriefChildWellnessUpdate();
    }, [user]);

    const handleBriefChildWellnessUpdateDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteBriefChildWellnessUpdate(submissionId, user?.id!);
            setBriefChildWellnessSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleBriefChildWellnessUpdateSubmissionSelect = (submission: any) => {
        setSelectedBriefChildWellnessUpdateSubmission(submission);
    };

    return {
        briefChildWellnessUpdateSubmissions,
        selectedBriefChildWellnessUpdateSubmission,
        handleBriefChildWellnessUpdateDelete,
        handleBriefChildWellnessUpdateSubmissionSelect,
    };
};

export default useBriefChildWellnessUpdate;