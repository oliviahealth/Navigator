import { useEffect, useState } from "react";
import { deletedukeUniversityReligionIndex, readAllDukeUniversityReligionIndex } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useDukeUniversityReligionIndex = () => {
    const user = useAppStore(state => state.user);
    const [dukeUniversityReligionIndexSubmissions, setDukeUniversityReligionIndexSubmission] = useState<any[]>([]);
    const [selectedDukeUniversityReligionIndexSubmission, setSelectedDukeUniversityReligionIndexSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchDukeUniversityReligionIndexSubmission = async () => {
            if (user) {
                const response = await readAllDukeUniversityReligionIndex(user.id);
                setDukeUniversityReligionIndexSubmission(response || []);
                if (response && response.length > 0) {
                    setSelectedDukeUniversityReligionIndexSubmission(response[0]);
                }
            }
        };
        fetchDukeUniversityReligionIndexSubmission();
    }, [user]);

    const handleDukeUniversityReligionIndexDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deletedukeUniversityReligionIndex(submissionId, user?.id!);
            setDukeUniversityReligionIndexSubmission(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleDukeUniversityReligionIndexSubmissionSelect = (submission: any) => {
        setSelectedDukeUniversityReligionIndexSubmission(submission);
    };

    return {
        dukeUniversityReligionIndexSubmissions,
        selectedDukeUniversityReligionIndexSubmission,
        handleDukeUniversityReligionIndexDelete,
        handleDukeUniversityReligionIndexSubmissionSelect
    };
};

export default useDukeUniversityReligionIndex;