const nodemailer = require("nodemailer");

module.exports = async(email, currentUrl) => {
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.ADMIN_USER,
                pass: process.env.ADMIN_PASS
            }
        });

        transporter.verify((error, success) => {
            if (error){
                console.log("not working");
                console.log(error);
            } else {
                console.log("Ready for messages");
                console.log(success);
            }
        });


        await transporter.sendMail({
            from: process.env.ADMIN_USER,
            to: email,
            subject: "Reset your password of Micro-Credential-Learning!",
            html: `<p>Reset your password from the following link.</p>
                   <p> This link will <b>expires in 1 hours</b>.</p>
                   <p>Press <a href= ${currentUrl} >here</a> to proceed. </p>`
        });

        console.log("Email sent Successfully");
    } catch(error) {
        console.log("Email not sent");
        console.log(error);
    }
}
