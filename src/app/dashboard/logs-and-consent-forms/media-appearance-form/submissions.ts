import { useEffect, useState } from "react";
import { deleteMediaAppearanceForm, readAllMediaAppearanceForms } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useMediaAppearanceReleases = () => {
    const user = useAppStore((state) => state.user);
    const [mediaAppearanceReleaseSubmissions, setMediaAppearanceReleaseSubmissions] = useState<any[]>([]);
    const [selectedMediaAppearanceReleaseSubmission, setSelectedMediaAppearanceReleaseSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchMediaAppearanceReleaseSubmissions = async () => {
            if (user) {
                const response = await readAllMediaAppearanceForms(user.id);
                setMediaAppearanceReleaseSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedMediaAppearanceReleaseSubmission(response[0]);
                }
            }
        };
        fetchMediaAppearanceReleaseSubmissions();
    }, [user]);

    const handleMediaAppearanceReleaseDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteMediaAppearanceForm(submissionId, user?.id!);
            setMediaAppearanceReleaseSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleMediaAppearanceReleaseSubmissionSelect = (submission: any) => {
        setSelectedMediaAppearanceReleaseSubmission(submission);
    };

    return {
        mediaAppearanceReleaseSubmissions,
        selectedMediaAppearanceReleaseSubmission,
        handleMediaAppearanceReleaseDelete,
        handleMediaAppearanceReleaseSubmissionSelect,
    };
};

export default useMediaAppearanceReleases;