import { useEffect, useState } from "react";
import { deleteSocialSupportForm, readAllSocialSupportForms } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useSocialSupportForms = () => {
    const user = useAppStore((state) => state.user);
    const [SocialSupportFormSubmissions, setSocialSupportFormSubmissions] = useState<any[]>([]);
    const [selectedSocialSupportFormSubmission, setSelectedSocialSupportFormSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchSocialSupportFormSubmissions = async () => {
            if (user) {
                const response = await readAllSocialSupportForms(user.id);
                setSocialSupportFormSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedSocialSupportFormSubmission(response[0]);
                }
            }
        };
        fetchSocialSupportFormSubmissions();
    }, [user]);

    const handleSocialSupportFormDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteSocialSupportForm(submissionId, user?.id!);
            setSocialSupportFormSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleSocialSupportFormSubmissionSelect = (submission: any) => {
        setSelectedSocialSupportFormSubmission(submission);
    };

    return {
        SocialSupportFormSubmissions,
        selectedSocialSupportFormSubmission,
        handleSocialSupportFormDelete,
        handleSocialSupportFormSubmissionSelect,
    };
};

export default useSocialSupportForms;