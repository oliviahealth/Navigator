import { useEffect, useState } from "react";
import { deleteAppointmentLog, readAllAppointmentLogs } from "./actions";
import useAppStore from "@/lib/useAppStore";

const useAppointmentLogs = () => {
    const user = useAppStore((state) => state.user);
    const [appointmentLogSubmissions, setAppointmentLogSubmissions] = useState<any[]>([]);
    const [selectedAppointmentLogSubmission, setSelectedAppointmentLogSubmission] = useState<any | null>(null);

    useEffect(() => {
        const fetchAppointmentLogSubmissions = async () => {
            if (user) {
                const response = await readAllAppointmentLogs(user.id);
                setAppointmentLogSubmissions(response || []);
                if (response && response.length > 0) {
                    setSelectedAppointmentLogSubmission(response[0]);
                }
            }
        };
        fetchAppointmentLogSubmissions();
    }, [user]);

    const handleAppointmentLogDelete = async (submissionId: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            await deleteAppointmentLog(submissionId, user?.id!);
            setAppointmentLogSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => submission.id !== submissionId)
            );
            window.alert("Submission deleted!");
        }
    };

    const handleAppointmentLogSubmissionSelect = (submission: any) => {
        setSelectedAppointmentLogSubmission(submission);
    };

    return {
        appointmentLogSubmissions,
        selectedAppointmentLogSubmission,
        handleAppointmentLogDelete,
        handleAppointmentLogSubmissionSelect,
    };
};

export default useAppointmentLogs;