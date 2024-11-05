export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const options = {
        // Set maxAge to the number of milliseconds until the cookie expires
        maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000, // Convert days to milliseconds
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
};
