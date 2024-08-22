import { useEffect, useState } from "react";
import { deletePerceivedMaternalPlanningSelfEfficacyTool, readAllPerceivedMaternalPlanningSelfEfficacyTool } from "./actions";
import useAppStore from "@/lib/useAppStore";

const usePerceivedMaternalPlanningSelfEfficacyTool = () => {
    const user = useAppStore((state) => state.user);
    const [perceivedMaternalPlanningSelfEfficacyToolSubmissions, setPerceivedMaternalPlannningSelfEfficacyToolSubmissions] = useState<any[]>([]);
    const [selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission, setSelectedPerceivedMaternalPlanningSelfEfficacyToolSubmissions] = useState<any | null>(null);

    useEffect(() => {
        const fetchPerceievedMaternalPlanningSelfEfficacyTool = async () => {
            if (user) {
                const response = await readAllPerceivedMaternalPlanningSelfEfficacyTool(user.id);
                setPerceivedMaternalPlannningSelfEfficacyToolSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedPerceivedMaternalPlanningSelfEfficacyToolSubmissions(response[0]);
                }
            }
        };
        fetchPerceievedMaternalPlanningSelfEfficacyTool();
    }, [user]);

    const handlePerceievedMaternalPlanningSelfEfficacyToolDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deletePerceivedMaternalPlanningSelfEfficacyTool(submissionId, user?.id!);
            setPerceivedMaternalPlannningSelfEfficacyToolSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handlePerceievedMaternalPlanningSelfEfficacyToolSubmissionSelect = (submission: any) => {
        setSelectedPerceivedMaternalPlanningSelfEfficacyToolSubmissions(submission);
    };

    return {
        perceivedMaternalPlanningSelfEfficacyToolSubmissions,
        selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission,
        handlePerceievedMaternalPlanningSelfEfficacyToolDelete,
        handlePerceievedMaternalPlanningSelfEfficacyToolSubmissionSelect,
    };
};

export default usePerceivedMaternalPlanningSelfEfficacyTool;