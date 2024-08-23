import { useEffect, useState } from "react";
import { deleteEdinburgPostnatalDepressionScale, readAllEdinburgPostnatalDepressionScale } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useEdinburgPostnatalDepressionScale = () => {
    const user = useAppStore(state => state.user);
    const [edinburgPostnatalDepressionScaleSubmission, setEdinburgPostnatalDepressionScaleSubmission] = useState<any[]>([]);
    const [selectedEdinburgPostnatalDepressionScaleSubmission, setSelectedEdinburgPostnatalDepressionScaleSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchEdinburgPostnatalDepressionScaleSubmission = async () => {
            if (user) {
                const response = await readAllEdinburgPostnatalDepressionScale(user.id);
                setEdinburgPostnatalDepressionScaleSubmission(response || []);
                if (response && response.length > 0) {
                    setSelectedEdinburgPostnatalDepressionScaleSubmission(response[0]);
                }
            }
        };
        fetchEdinburgPostnatalDepressionScaleSubmission();
    }, [user]);

    const handleEdinburgPostnatalDepressionScaleDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteEdinburgPostnatalDepressionScale(submissionId, user?.id!);
            setEdinburgPostnatalDepressionScaleSubmission(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleEdinburgPostnatalDepressionScaleSelect = (submission: any) => {
        setSelectedEdinburgPostnatalDepressionScaleSubmission(submission);
    };

    return {
        edinburgPostnatalDepressionScaleSubmission,
        selectedEdinburgPostnatalDepressionScaleSubmission,
        handleEdinburgPostnatalDepressionScaleDelete,
        handleEdinburgPostnatalDepressionScaleSelect
    };
};

export default useEdinburgPostnatalDepressionScale;