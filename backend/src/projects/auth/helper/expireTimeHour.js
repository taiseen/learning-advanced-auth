const expireTimeHour = hour => Date.now() + hour * 60 * 60 * 1000;

export default expireTimeHour;