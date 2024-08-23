import { useEffect, useState } from "react";
import { deleteMentalHealthHistory, readAllMentalHealthHistory } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useMentalHealthHistory = () => {
    const user = useAppStore(state => state.user);
    const [mentalHealthHistorySubmissions, setMentalHealthHistorySubmissions] = useState<any []>([]);
    const [selectedMentalHealthHistorySubmissions, setSelectedMentalHealthHistorySubmissions] = useState<any | null>(null);

    useEffect(() => {
        const fetchMentalHealthHistorySubmissions = async () => {
            if (user) {
                const response = await readAllMentalHealthHistory(user.id);

                console.log(response);

                setMentalHealthHistorySubmissions(response || null);
                if (response && response.length > 0) {
                    setSelectedMentalHealthHistorySubmissions(response[0]);
                }
            }
        };
        fetchMentalHealthHistorySubmissions()
    }, [user]);

    const handleMentalHealthHistorySubmissionDelete = async (sumbissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteMentalHealthHistory(sumbissionId, user?.id!);
            setMentalHealthHistorySubmissions(prevSubmissions =>
                prevSubmissions.filter(submission => submission.id !== submission)
            );
            window.alert('Submission deleted!');
        }
    };

    const handleMentalHealthHistorySubmissionSelect = (submission: any) => {
        setSelectedMentalHealthHistorySubmissions(submission);
    };

    return {
        mentalHealthHistorySubmissions,
        selectedMentalHealthHistorySubmissions,
        handleMentalHealthHistorySubmissionDelete,
        handleMentalHealthHistorySubmissionSelect
    };
};

export default useMentalHealthHistory;