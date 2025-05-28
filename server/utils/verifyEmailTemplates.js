const verifyEmailTamplate = ({name, url})=>{
    return `
    <div style="font-family: Arial, sans-serif; font-size: 16px;">
        <h1 style="color: #333;">Welcome to yourStore</h1>
        <p style="color: #333;">Hi ${name},</p>
        <p style="color: #333;">We are excited to have you on board. First, you need to verify your email address. Just press the button below.</p>
        <a href="${url}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Verify Email</a>
        <p style="color: #333;">If the button doesn't work for any reason, you can also click on the link below:</p>
        <p style="color: #333;">${url}</p>
        <p style="color: #333;">If you have any questions, feel free to replay to this email.</p>
        <p style="color: #333;">Cheers,</p>
        <p style="color: #333;">yourStore Team</p>
    </div>
    `
}

module.exports= verifyEmailTamplate;