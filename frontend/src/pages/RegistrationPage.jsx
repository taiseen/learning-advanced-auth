import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import Input from "../components/Input";

import { Loader, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import { route } from "../routes";
import { useState } from "react";


const RegistrationPage = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { registration, error, isLoading } = useAuthStore();


    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await registration(email, password, name);
            navigate(route.emailVerification);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <motion.div
            className='inputContainer'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='p-8'>
                <h2 className='inputContainerTitle'>Create Account</h2>

                <form onSubmit={handleSignUp}>
                    <Input
                        required
                        icon={User}
                        type='text'
                        value={name}
                        placeholder='Full Name'
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        required
                        autoComplete='on'
                        icon={Mail}
                        type='email'
                        value={email}
                        placeholder='Email Address'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        required
                        icon={Lock}
                        type='password'
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    {
                        error &&
                        <p className='text-center text-red-500 font-semibold pb-3'>
                            {error}
                        </p>
                    }


                    <PasswordStrengthMeter password={password} />


                    <motion.button
                        className='actionBtn'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }} // click effect
                        disabled={isLoading}
                        type='submit'
                    >
                        {
                            isLoading
                                ? <Loader className='animate-spin mx-auto' size={24} />
                                : "Register"
                        }
                    </motion.button>
                </form>
            </div>


            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    Already have an account?{" "}

                    <Link
                        to={route.login}
                        className='text-green-400 hover:underline'
                    >
                        Login
                    </Link>
                </p>
            </div>

        </motion.div>
    );
};

export default RegistrationPage;
