import { useEffect, useState } from "react";
import { deleteDeliveryHistoryInformationForm, readAllDeliveryHistoryInformationForm } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useDeliveryHistoryInformation = () => {
    const user = useAppStore((state) => state.user);
    const [deliveryHistoryInformationSubmissions, setDeliveryHistoryInformationSubmissions] = useState<any[]>([]);
    const [selectedDeliveryHistoryInformationSubmission, setSelectedDeliveryHistoryInformationSubmissions] = useState<any | null>(null);

    useEffect(() => {
        const fetchDeliveryHistoryInformationSubmissions = async () => {
            if (user) {
                const response = await readAllDeliveryHistoryInformationForm(user.id);
                setDeliveryHistoryInformationSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedDeliveryHistoryInformationSubmissions(response[0]);
                }
            }
        };
        fetchDeliveryHistoryInformationSubmissions();
    }, [user]);

    const handleDeliveryHistoryInformationDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteDeliveryHistoryInformationForm(submissionId, user?.id!);
            setDeliveryHistoryInformationSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleDeliveryHistoryInformationSubmissionSelect = (submission: any) => {
        setSelectedDeliveryHistoryInformationSubmissions(submission);
    };

    return {
        deliveryHistoryInformationSubmissions,
        selectedDeliveryHistoryInformationSubmission,
        handleDeliveryHistoryInformationDelete,
        handleDeliveryHistoryInformationSubmissionSelect,
    };
};

export default useDeliveryHistoryInformation;