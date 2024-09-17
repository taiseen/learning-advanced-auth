import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { route } from "../routes";
import toast from "react-hot-toast";


const EmailVerificationPage = () => {

    const navigate = useNavigate();

    const inputRefs = useRef([]);

    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const { error, isLoading, emailVerification } = useAuthStore();


    const handleChange = (index, value) => {
        const newCode = [...code];

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };


    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const verificationCode = code.join("");

        try {

            if (!error) toast.success("Email verified successfully", { duration: 5000 });

            await emailVerification(verificationCode);

            navigate(route.login);

        } catch (error) {
            console.log(error);
        }
    };


    // Auto submit when all fields are filled
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);


    return (
        <div className='inputContainer'>

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='codeInputContainer'
            >
                <h2 className='inputContainerTitle'>Verify Your Email</h2>

                <p className='text-center text-gray-300 mb-6'>
                    Enter the 6-digit code sent to your email address.
                </p>


                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex justify-between'>
                        {
                            code.map((digit, index) => (
                                <input
                                    required
                                    key={index}
                                    type='text'
                                    maxLength='6'
                                    value={digit}
                                    className='codeInputBox'
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                />
                            ))
                        }
                    </div>


                    {
                        error &&
                        <p className='text-center text-red-500 font-semibold mt-2'>
                            {error}
                        </p>
                    }


                    <motion.button
                        type='submit'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='codeVerificationBtn'
                        disabled={isLoading || code.some((digit) => !digit)}
                    >
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </motion.button>

                </form>
            </motion.div>

        </div>
    );
};

export default EmailVerificationPage;