import { useEffect, useState } from "react";
import { deletePrenatalCareRecord, readAllPrenatalCareRecords } from "./actions";
import useAppStore from "@/lib/useAppStore";

const usePrenatalCareRecords = () => {
    const user = useAppStore((state) => state.user);
    const [prenatalCareRecordSubmissions, setPrenatalCareRecordSubmissions] = useState<any[]>([]);
    const [selectedPrenatalCareRecordSubmission, setSelectedPrenatalCareSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchPrenatalCareRecords = async () => {
            if (user) {
                const response = await readAllPrenatalCareRecords(user.id);
                setPrenatalCareRecordSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedPrenatalCareSubmission(response[0]);
                }
            }
        };
        fetchPrenatalCareRecords();
    }, [user]);

    const handlePrenatalCareRecordsDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deletePrenatalCareRecord(submissionId, user?.id!);
            setPrenatalCareRecordSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handlePrenatalCareRecordsSubmissionSelect = (submission: any) => {
        setSelectedPrenatalCareSubmission(submission);
    };

    return {
        prenatalCareRecordSubmissions,
        selectedPrenatalCareRecordSubmission,
        handlePrenatalCareRecordsDelete,
        handlePrenatalCareRecordsSubmissionSelect,
    };
};

export default usePrenatalCareRecords;