import { useEffect, useState } from "react";
import { deleteChildrenNeedsForm, readAllChildrenNeedsForm } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useChildrenNeedsForm = () => {
    const user = useAppStore(state => state.user);
    const [childrenNeedsFormSubmissions, setChildrenNeedsFormSubmission] = useState<any []>([]);
    const [selectedChildrenNeedsForm, setSelectedChildrenNeedsForm] = useState<any | null>(null);

    useEffect(() => {
        const fetchChildNeedsFormSubmission = async () => {
            if (user) {
                const response = await readAllChildrenNeedsForm(user.id);

                console.log(response);

                setChildrenNeedsFormSubmission(response || null);
                if (response && response.length > 0) {
                    setSelectedChildrenNeedsForm(response[0]);
                }
            }
        };
        fetchChildNeedsFormSubmission()
    }, [user]);

    const handleChildNeedsFormDelete = async (sumbissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteChildrenNeedsForm(sumbissionId, user?.id!);
            setChildrenNeedsFormSubmission(prevSubmissions =>
                prevSubmissions.filter(submission => submission.id !== submission)
            );
            window.alert('Submission deleted!');
        }
    };

    const handleChildNeedsRecordSubmissionSelect = (submission: any) => {
        setSelectedChildrenNeedsForm(submission);
    };

    return {
        childrenNeedsFormSubmissions,
        selectedChildrenNeedsForm,
        handleChildNeedsFormDelete,
        handleChildNeedsRecordSubmissionSelect
    };
};

export default useChildrenNeedsForm;