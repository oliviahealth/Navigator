import { useEffect, useState } from "react";
import { deleteEnrollmentForm, readAllEnrollmentForms } from "./actions";
import useAppStore from "@/lib/useAppStore";
import { IEnrollmentFormResponse } from "./definitions";

const useEnrollmentForms = () => {
    const user = useAppStore((state) => state.user);
    const [enrollmentFormSubmissions, setEnrollmentFormSubmissions] = useState<IEnrollmentFormResponse[]>();
    const [selectedEnrollmentFormSubmission, setSelectedEnrollmentFormSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchEnrollmentFormSubmissions = async () => {
            if (user) {
                const response = await readAllEnrollmentForms(user.id);
                setEnrollmentFormSubmissions(response);
                if (response && response.length > 0) {
                    setSelectedEnrollmentFormSubmission(response[0]);
                }
            }
        };
        fetchEnrollmentFormSubmissions();
    }, [user]);

    const handleEnrollmentFormDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteEnrollmentForm(submissionId, user?.id!);
            setEnrollmentFormSubmissions((prevSubmissions) =>
                prevSubmissions!.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleEnrollmentFormSubmissionSelect = (submission: any) => {
        setSelectedEnrollmentFormSubmission(submission);
    };

    return {
        enrollmentFormSubmissions,
        selectedEnrollmentFormSubmission,
        handleEnrollmentFormDelete,
        handleEnrollmentFormSubmissionSelect,
    };
};

export default useEnrollmentForms;