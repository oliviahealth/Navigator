import { useEffect, useState } from "react";
import { deleteIPVForm, readAllIPVForms } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useIPVForms = () => {
    const user = useAppStore((state) => state.user);
    const [IPVFormSubmissions, setIPVFormSubmissions] = useState<any[]>([]);
    const [selectedIPVFormSubmission, setSelectedIPVFormSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchIPVFormSubmissions = async () => {
            if (user) {
                const response = await readAllIPVForms(user.id);
                setIPVFormSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedIPVFormSubmission(response[0]);
                }
            }
        };
        fetchIPVFormSubmissions();
    }, [user]);

    const handleIPVFormDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteIPVForm(submissionId, user?.id!);
            setIPVFormSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleIPVFormSubmissionSelect = (submission: any) => {
        setSelectedIPVFormSubmission(submission);
    };

    return {
        IPVFormSubmissions,
        selectedIPVFormSubmission,
        handleIPVFormDelete,
        handleIPVFormSubmissionSelect,
    };
};

export default useIPVForms;