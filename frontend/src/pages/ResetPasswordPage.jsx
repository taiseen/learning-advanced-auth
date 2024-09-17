import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { route } from "../routes";
import { useState } from "react";
import Input from "../components/Input";
import toast from "react-hot-toast";


const ResetPasswordPage = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { resetPassword, error, isLoading, message } = useAuthStore();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match... 🚫");
            return;
        }

        try {
            await resetPassword(token, password);

            toast.success("Password reset successfully, redirecting to login page...");

            setTimeout(() => { navigate(route.login) }, 5000);

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error resetting password");
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='inputContainer'
        >
            <div className='p-8'>

                <h2 className='inputContainerTitle'>Reset Password</h2>

                {error && <p className='text-center text-red-500 text-sm mb-4'>{error}</p>}
                {message && <p className='text-center text-green-500 text-sm mb-4'>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <Input
                    
                        required
                        icon={Lock}
                        type='password'
                        placeholder='New Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Input
                        required
                        icon={Lock}
                        type='password'
                        placeholder='Confirm New Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='actionBtn'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? "Resetting..." : "Set New Password"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default ResetPasswordPage;
