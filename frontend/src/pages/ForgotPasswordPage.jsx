import { ArrowLeft, Loader, Mail } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { route } from "../routes";
import { useState } from "react";
import Input from "../components/Input";


const ForgotPasswordPage = () => {

    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotPassword } = useAuthStore();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='inputContainer'
        >
            <div className='p-8'>
                <h2 className='inputContainerTitle'>Forgot Password</h2>

                {
                    !isSubmitted ? (
                        <form onSubmit={handleSubmit}>

                            <p className='text-gray-300 mb-6 text-center'>
                                Enter your email address and we&#39;ll send you a link to reset your password.
                            </p>

                            <Input
                                required
                                icon={Mail}
                                type='email'
                                placeholder='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='actionBtn !mt-0'
                                type='submit'
                            >
                                {
                                    isLoading
                                        ? <Loader className='size-6 animate-spin mx-auto' />
                                        : "Send Reset Link"
                                }
                            </motion.button>

                        </form>
                    ) : (
                        <div className='text-center'>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
                            >
                                <Mail className='h-8 w-8 text-white' />
                            </motion.div>

                            <p className='text-gray-300 mb-6'>
                                If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
                            </p>
                        </div>
                    )
                }
            </div>

            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <Link
                    to={route.login}
                    className='text-sm text-green-400 hover:underline flex items-center'
                >
                    <ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
                </Link>
            </div>

        </motion.div>
    );
};

export default ForgotPasswordPage;
