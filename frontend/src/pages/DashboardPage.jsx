import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import useMinutesAgo from "../utils/useMinutesAgo";
import dateFormat from "../utils/dateFormat";


const DashboardPage = () => {

    const { user, logout } = useAuthStore();

    const minutesAgo = useMinutesAgo(user);

    const handleLogout = () => logout();


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className='dashboardContainer'
        >
            <h2 className='inputContainerTitle'>Dashboard</h2>

            <div className='space-y-6'>
                <motion.div
                    className='dashboardElement'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className='text-xl font-semibold text-green-400 mb-3'>
                        Profile Information
                    </h3>

                    <p className='text-gray-300'>Name: {user?.name}</p>
                    <p className='text-gray-300'>Email: {user?.email}</p>
                </motion.div>

                <motion.div
                    className='dashboardElement'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className='text-xl font-semibold text-green-400 mb-3'>
                        Account Activity
                    </h3>

                    <p className='text-gray-300'>
                        <span className='font-bold'>Joined: </span>
                        {
                            new Date(user.createdAt).toLocaleDateString("en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )
                        }
                    </p>

                    <p className='text-gray-300'>
                        <span className='font-bold'>Last Login: </span>

                        {dateFormat(user.lastLogin)} - {minutesAgo} minute{minutesAgo === 1 ? '' : 's'} ago
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='mt-6'
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className='logoutBtn'
                >
                    Logout
                </motion.button>
            </motion.div>

        </motion.div>
    );
};

export default DashboardPage;
