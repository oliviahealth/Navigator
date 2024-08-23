import { useEffect, useState } from "react";
import { deleteFoodSecurityRecord, readAllFoodRecurityRecord } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useFoodSecurity = () => {
    const user = useAppStore(state => state.user);
    const [foodSecuritySubmissions, setFoodSecuritySubmissions] = useState<any[]>([]);
    const [selectedFoodSecuritySubmissions, setSelectedFoodSecuritySubmissions] = useState<any | null>(null);

    useEffect(() => {
        const fetchFoodSecuritySubmissions = async () => {
            if (user) {
                const response = await readAllFoodRecurityRecord(user.id);
                setFoodSecuritySubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedFoodSecuritySubmissions(response[0]);
                }
            }
        };
        fetchFoodSecuritySubmissions();
    }, [user]);

    const hanldeFoodSecurityDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteFoodSecurityRecord(submissionId, user?.id!);
            setFoodSecuritySubmissions(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleFoodSecuritySubmissionSelect = (submission: any) => {
        setSelectedFoodSecuritySubmissions(submission);
    };

    return {
        foodSecuritySubmissions,
        selectedFoodSecuritySubmissions,
        hanldeFoodSecurityDelete,
        handleFoodSecuritySubmissionSelect
    };
};

export default useFoodSecurity;