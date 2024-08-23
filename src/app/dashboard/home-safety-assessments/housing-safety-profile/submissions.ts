import { useEffect, useState } from "react";
import { deleteHouseholdHousingSafetyProfile, readAllHouseholdHousingSafetyProfile } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useHouseholdHousingSafetyProfile = () => {
    const user = useAppStore(state => state.user);
    const [householdHousingSafetyProfileSubmissions, setHouseholdHousingSafetyProfileSubmissions] = useState<any[]>([]);
    const [selectedHouseholdHousingSafetyProfileSubmissions, setSelectedHouseholdHousingSafetyProfileSubmissions] = useState<any | null>(null);

    useEffect(() => {
        const fetchHouseholdHousingSafetyProfileSubmissions = async () => {
            if (user) {
                const response = await readAllHouseholdHousingSafetyProfile(user.id);
                setHouseholdHousingSafetyProfileSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedHouseholdHousingSafetyProfileSubmissions(response[0]);
                }
            }
        };
        fetchHouseholdHousingSafetyProfileSubmissions();
    }, [user]);

    const handleHouseholdHousingSafetyProfileDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteHouseholdHousingSafetyProfile(submissionId, user?.id!);
            setHouseholdHousingSafetyProfileSubmissions(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleHouseholdHousingSafetyProfileSelect = (submission: any) => {
        setSelectedHouseholdHousingSafetyProfileSubmissions(submission);
    };

    return {
        householdHousingSafetyProfileSubmissions,
        selectedHouseholdHousingSafetyProfileSubmissions,
        handleHouseholdHousingSafetyProfileDelete,
        handleHouseholdHousingSafetyProfileSelect
    };
};

export default useHouseholdHousingSafetyProfile;