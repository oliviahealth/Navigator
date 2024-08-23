import { useEffect, useState } from "react";
import { deleteIPVDisclosureScreeningTool, readAllIPVDisclosureScreeningTools } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useIPVDisclosureScreeningTools = () => {
    const user = useAppStore((state) => state.user);
    const [IPVDisclosureScreeningToolSubmissions, setIPVDisclosureScreeningToolSubmissions] = useState<any[]>([]);
    const [selectedIPVDisclosureScreeningToolSubmission, setSelectedIPVDisclosureScreeningToolSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchIPVDisclosureScreeningToolSubmissions = async () => {
            if (user) {
                const response = await readAllIPVDisclosureScreeningTools(user.id);
                setIPVDisclosureScreeningToolSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedIPVDisclosureScreeningToolSubmission(response[0]);
                }
            }
        };
        fetchIPVDisclosureScreeningToolSubmissions();
    }, [user]);

    const handleIPVDisclosureScreeningToolDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteIPVDisclosureScreeningTool(submissionId, user?.id!);
            setIPVDisclosureScreeningToolSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleIPVDisclosureScreeningToolSubmissionSelect = (submission: any) => {
        setSelectedIPVDisclosureScreeningToolSubmission(submission);
    };

    return {
        IPVDisclosureScreeningToolSubmissions,
        selectedIPVDisclosureScreeningToolSubmission,
        handleIPVDisclosureScreeningToolDelete,
        handleIPVDisclosureScreeningToolSubmissionSelect,
    };
};

export default useIPVDisclosureScreeningTools;