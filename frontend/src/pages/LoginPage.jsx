import { Mail, Lock, Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { route } from "../routes";
import Input from "../components/Input";


const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading, error, resetError } = useAuthStore();


    const handleLogin = async (e) => {
        e.preventDefault();

        await login(email, password);
    };

    useEffect(() => {
        return () => resetError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            className='inputContainer'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='p-8'>
                <h2 className='inputContainerTitle'>Welcome Back</h2>

                <form onSubmit={handleLogin}>
                    <Input
                        required
                        icon={Mail}
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        required
                        icon={Lock}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <div className='flex items-center justify-center'>
                        <Link
                            to={route.forgotPassword}
                            className='text-sm text-green-400 hover:underline'
                        >
                            Forgot password?
                        </Link>
                    </div>


                    {
                        error &&
                        <p className='text-center text-red-500 font-semibold my-2'>
                            {error}
                        </p>
                    }


                    <motion.button
                        className='actionBtn'
                        type='submit'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                    >
                        {
                            isLoading
                                ? <Loader className='w-6 h-6 animate-spin mx-auto' />
                                : "Login"
                        }
                    </motion.button>
                </form>
            </div>


            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    Don&#39;t have an account?{" "}

                    <Link
                        to={route.register}
                        className='text-green-400 hover:underline'
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default LoginPage;
