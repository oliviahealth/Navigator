import { useEffect, useState } from "react";
import { deleteHousingSecurityHomeVisit, readAllHousingSecurityHomeVisit } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useHousingSecurityHomeVisitForm = () => {
    const user = useAppStore(state => state.user);
    const [housingSecurityHomeVisitFormSubmissions, setHousingSecurityHomeVisitFormSubmissions] = useState<any[]>([]);
    const [selectedHousingSecurityHomeVisitForm, setSelectedHousingSecurityHomeVisitForm] = useState<any | null>(null);

    useEffect(() => {
        const fetchHousingSecurityHomeVisitFormSubmissions = async () => {
            if (user) {
                const response = await readAllHousingSecurityHomeVisit(user.id);
                setHousingSecurityHomeVisitFormSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedHousingSecurityHomeVisitForm(response[0]);
                }
            }
        };
        fetchHousingSecurityHomeVisitFormSubmissions();
    }, [user]);

    const handleHousingSecurityHomeVisitFormDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteHousingSecurityHomeVisit(submissionId, user?.id!);
            setHousingSecurityHomeVisitFormSubmissions(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleHousingSecurityHomeVisitFormSubmissionSelect = (submission: any) => {
        setSelectedHousingSecurityHomeVisitForm(submission);
    };

    return {
        housingSecurityHomeVisitFormSubmissions,
        selectedHousingSecurityHomeVisitForm,
        handleHousingSecurityHomeVisitFormDelete,
        handleHousingSecurityHomeVisitFormSubmissionSelect
    };
};

export default useHousingSecurityHomeVisitForm;