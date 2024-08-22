import { useEffect, useState } from "react";
import { deleteCurrentLivingArrangements, readAllCurrentLivingArrangement } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useCurrentLivingArrangements = () => {
    const user = useAppStore(state => state.user);
    const [currentLivingArrangementSubmissions, setCurrentLivingArrangementSubmissions] = useState<any[]>([]);
    const [selectedCurrentLivingArrangementSubmission, setSelectedCurrentLivingArrangementSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchCurrentLivingArrangementSubmission = async () => {
            if (user) {
                const response = await readAllCurrentLivingArrangement(user.id);
                setCurrentLivingArrangementSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedCurrentLivingArrangementSubmission(response[0]);
                }
            }
        };
        fetchCurrentLivingArrangementSubmission();
    }, [user]);

    const handleCurrentLivingArrangementSubmissionsDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteCurrentLivingArrangements(submissionId, user?.id!);
            setCurrentLivingArrangementSubmissions(prevSubmission =>
                prevSubmission.filter(submission => submission.id !== submissionId)
            );
            window.alert('Submission deleted!');
        }
    };

    const handleCurrentLivingArrangementSubmissionSelect = (submission: any) => {
        setCurrentLivingArrangementSubmissions(submission);
    };

    return {
        currentLivingArrangementSubmissions,
        selectedCurrentLivingArrangementSubmission,
        handleCurrentLivingArrangementSubmissionSelect,
        handleCurrentLivingArrangementSubmissionsDelete
    };
};

export default useCurrentLivingArrangements;