import { useEffect, useState } from "react";
import { deletePerceivedStressScale, readAllPercievedStressScale } from "./actions";
import useAppStore from "@/lib/useAppStore";

const usePercievedStressScale = () => {
    const user = useAppStore(state => state.user);
    const [percievedStressScaleSubmissions, setPercievedStressScaleSubmissions] = useState<any []>([]);
    const [selectedPercievedStressScale, setSelectedPercievedStressScale] = useState<any | null>(null);

    useEffect(() => {
        const fetchChildNeedsFormSubmission = async () => {
            if (user) {
                const response = await readAllPercievedStressScale(user.id);

                console.log(response);

                setPercievedStressScaleSubmissions(response || null);
                if (response && response.length > 0) {
                    setSelectedPercievedStressScale(response[0]);
                }
            }
        };
        fetchChildNeedsFormSubmission()
    }, [user]);

    const handlePercievedStressScaleDelete = async (sumbissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deletePerceivedStressScale(sumbissionId, user?.id!);
            setPercievedStressScaleSubmissions(prevSubmissions =>
                prevSubmissions.filter(submission => submission.id !== submission)
            );
            window.alert('Submission deleted!');
        }
    };

    const handlePercievedStressScaleSubmissionSelect = (submission: any) => {
        setSelectedPercievedStressScale(submission);
    };

    return {
        percievedStressScaleSubmissions,
        selectedPercievedStressScale,
        handlePercievedStressScaleDelete,
        handlePercievedStressScaleSubmissionSelect
    };
};

export default usePercievedStressScale;