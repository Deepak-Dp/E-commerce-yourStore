const forgotPassword = (name, otp)=>{
    return `
    
    <div style="font-family: Arial, sans-serif; font-size: 16px;">
        <h1 style="color: blue;">Forgot Password</h1>
        <p style="color: #333;">Hi ${name},</p>
        <p style="color: #333;">We received a request to reset your password. Enter the following OTP to reset your password.</p>
        <h2 style="color: red;">${otp}</h2>
        <p style="color: #333;">If you didn't request a password reset, you can safely ignore this email.</p>
        <p style="color: #333;">If you have any questions, feel free to replay to this email.</p>
        <p style="color: #333;">Cheers,</p>
        <p style="color: #333;">yourStore Team</p>
    </div>
    `
}

module.exports = forgotPassword;