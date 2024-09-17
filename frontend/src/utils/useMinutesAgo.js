import { useEffect, useState } from 'react';

const useMinutesAgo = (user) => {

    const [minutesAgo, setMinutesAgo] = useState(0);

    useEffect(() => {

        // Ensure it's a Date object
        const lastLoginTime = new Date(user.lastLogin);


        // Function to calculate and update time
        const updateMinutesAgo = () => {

            const currentTime = Date.now(); // Current time in milliseconds

            // Calculate the difference in milliseconds
            const timeDifference = currentTime - lastLoginTime.getTime();

            // Convert milliseconds to minutes
            const minutes = Math.max(Math.floor(timeDifference / (1000 * 60)), 0); // Ensure no negative minutes

            setMinutesAgo(minutes);
        };

        // Initial calculation
        updateMinutesAgo();

        // Set up interval to update every 60 seconds
        const interval = setInterval(updateMinutesAgo, 60 * 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(interval);

    }, [user.lastLogin]);


    return minutesAgo;
}

export default useMinutesAgo