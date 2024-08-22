import { useEffect, useState } from "react";
import { deleteSupportSystems, readAllSupportSystems } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useSupportSystems = () => {
    const user = useAppStore(state => state.user);
    const [supportSystemSubmissions, setSupportSystemSubmissions] = useState<any[]>([]);
    const [selectedSupportSystemSubmission, setSelectedSupportSystemSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchSupportSystemSubmissions = async () => {
            if (user) {
                const response = await readAllSupportSystems(user.id);
                setSupportSystemSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedSupportSystemSubmission(response[0]);
                }
            }
        };
        fetchSupportSystemSubmissions();
    }, [user]);

    const handleSupportSystemsDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteSupportSystems(submissionId, user?.id!);
            setSupportSystemSubmissions(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleSupportSystemSubmissionSelect = (submission: any) => {
        setSelectedSupportSystemSubmission(submission);
    };

    return {
        supportSystemSubmissions,
        selectedSupportSystemSubmission,
        handleSupportSystemsDelete,
        handleSupportSystemSubmissionSelect
    };
};

export default useSupportSystems;