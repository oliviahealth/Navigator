import { useEffect, useState } from "react";
import { deleteParticipantRecordForOthersInvolved, readAllParticipantRecordForOthersInvolved } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useParticipantRecordForOthersInvolved = () => {
    const user = useAppStore(state => state.user);
    const [participantRecordForOthersInvolvedSubmissions, setParticipantRecordForOthersInvolvedSumbission] = useState<any[]>([]);
    const [selectedParticipantRecordForOthersInvolved, setSelectedParticipantRecordForOthersInvolved] = useState<any | null>(null);

    useEffect(() => {
        const fetchParticipantRecordForOthersInvolved = async () => {
            if (user) {
                const response = await readAllParticipantRecordForOthersInvolved(user.id);
                setParticipantRecordForOthersInvolvedSumbission(response || []);
                if (response && response.length > 0) {
                    setSelectedParticipantRecordForOthersInvolved(response[0]);
                }
            }
        };
        fetchParticipantRecordForOthersInvolved();
    }, [user]);

    const handleParticipantRecordForOthersInvolvedDelete = async (submissionId: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteParticipantRecordForOthersInvolved(submissionId, user?.id!);
            setParticipantRecordForOthersInvolvedSumbission(prevSubmissions => 
                prevSubmissions.filter(submssion => submssion.id !== submissionId)
            );
            window.alert('Submission Deleted!');
        }
    };

    const handleParticipantRecordForOthersInvolvedSelect = (submission: any) => {
        setSelectedParticipantRecordForOthersInvolved(submission);
    };

    return {
        participantRecordForOthersInvolvedSubmissions,
        selectedParticipantRecordForOthersInvolved,
        handleParticipantRecordForOthersInvolvedDelete,
        handleParticipantRecordForOthersInvolvedSelect
    };
};

export default useParticipantRecordForOthersInvolved;