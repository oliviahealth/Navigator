import { useEffect, useState } from "react";
import { deleteReferralsAndServices, readAllReferralsAndServices } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useReferralsAndServices = () => {
    const user = useAppStore(state => state.user);
    const [referralsAndServicesSubmissions, setReferralsAndServicesSubmissions] = useState<any[]>([]);
    const [selectedReferralsAndServicesSubmission, setSelectedReferralsAndServicesSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchReferralsAndServicesSubmission = async () => {
            if (user) {
                const response = await readAllReferralsAndServices(user.id);
                setReferralsAndServicesSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedReferralsAndServicesSubmission(response[0]);
                }
            }
        };
        fetchReferralsAndServicesSubmission();
    }, [user]);

    const handleReferralsAndServicesDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteReferralsAndServices(submissionId, user?.id!);
            setReferralsAndServicesSubmissions(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleReferralsAndServicesSubmissionSelect = (submission: any) => {
        setSelectedReferralsAndServicesSubmission(submission);
    };

    return {
        referralsAndServicesSubmissions,
        selectedReferralsAndServicesSubmission,
        handleReferralsAndServicesDelete,
        handleReferralsAndServicesSubmissionSelect
    };
};

export default useReferralsAndServices;