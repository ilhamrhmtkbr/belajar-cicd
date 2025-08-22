import {useState} from "react";
import {memberApi} from "../services/api.js";

const usePublic = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState(null);

    const handleClose = () => {
        setSuccess('');
        setErrors(null);
    }

    const handleResumeDownload = async (resumeId) => {
        setLoading(true);

        handleClose();

        try {
            const resume = resumeId.replace(".pdf", "");

            const res = await memberApi.get(`/public/instructor/resume/download?id=${resume}`);

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `resume-${resumeId}.pdf`); // Nama file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setSuccess('Successfully Download');
        } catch ({response}) {
            setErrors(response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading, success, errors, handleClose,
        handleResumeDownload
    }
}

export default usePublic;