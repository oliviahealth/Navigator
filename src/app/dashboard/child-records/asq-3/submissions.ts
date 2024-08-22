import { useEffect, useState } from "react";
import { deleteASQ3, readAllASQ3 } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useASQ3 = () => {
    const user = useAppStore((state) => state.user);
    const [aSQ3Submissions, setASQ3Submissions] = useState<any[]>([]);
    const [selectedASQ3Submission, setSelectedASQ3Submission] = useState<any | null>(null);

    useEffect(() => {
        const fetchASQ3 = async () => {
            if (user) {
                const response = await readAllASQ3(user.id);
                setASQ3Submissions(response || []);
                if (response && response.length > 0) {
                    setSelectedASQ3Submission(response[0]);
                }
            }
        };
        fetchASQ3();
    }, [user]);

    const handleASQ3Delete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteASQ3(submissionId, user?.id!);
            setASQ3Submissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleASQ3SubmissionSelect = (submission: any) => {
        setSelectedASQ3Submission(submission);
    };

    return {
        aSQ3Submissions,
        selectedASQ3Submission,
        handleASQ3Delete,
        handleASQ3SubmissionSelect,
    };
};

export default useASQ3;