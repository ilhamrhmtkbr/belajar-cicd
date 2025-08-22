import {useState} from "react";
import {login, loginWithGoogle, me, register} from "../services/authService";
import {getPayloadGoogle} from "../utils/Helper.js";

const useAuth = () => {
    const [errorsFromBackend, setErrorsFromBackend] = useState({});
    const [loading, setLoading] = useState(false);

    const handleLogin = async (formData, onSuccess) => {
        setErrorsFromBackend({});
        setLoading(true);
        try {
            const res = await login(formData);
            if (res.success) {
                const res1 = await me();
                if (res1.success) {
                    onSuccess();
                }
            }
        } catch ({response}) {
            if (response?.data?.errors) {
                setErrorsFromBackend(response?.data?.errors);
            } else {
                setErrorsFromBackend(response?.data)
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLoginWithGoogle = async (data, onSuccess) => {
        setErrorsFromBackend({});
        setLoading(true);

        try {
            const cred = getPayloadGoogle(data);
            const formData = {
                email: cred.email,
                full_name: cred.name,
                password: cred.sub
            }
            await loginWithGoogle(formData);
            onSuccess();
        } catch ({response}) {
            setErrorsFromBackend(response)
        } finally {
            setLoading(false);
        }

    }

    const handleRegister = async (formData, onSuccess) => {
        setErrorsFromBackend({});
        setLoading(true);
        try {
            await register(formData);
            onSuccess();
        } catch ({response}) {
            if (response?.data?.errors) {
                setErrorsFromBackend(response?.data?.errors);
            } else {
                setErrorsFromBackend({message: response?.data?.message})
            }
        } finally {
            setLoading(false);
        }
    };

    return {handleLogin, handleLoginWithGoogle, handleRegister, errorsFromBackend, setErrorsFromBackend, loading};
};

export default useAuth;
