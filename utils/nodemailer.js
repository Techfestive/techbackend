const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const sendEmail = async (email, note) => {

    try {
        const transporter = nodemailer.createTransport(smtpTransport({

            host: "stmp.gmail.com",
            port: 587,
            service: "gmail",
            requireTLS: true,
            auth: {
                type: "OAuth2",
                user: "bhavaniyash92@gmail.com",
                pass: 'risuscgncoswsyxn',
                clientId: '663078296270-c951pipsm1o2c44v7pn9rda4bfuip9e4.apps.googleusercontent.com',
                clientSecret: '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',
                refreshToken: '1//04HfZ6bK4YFYVCgYIARAAGAQSNwF-L9IryEVLNvgisz1N2IWR1I_GmV1qct60tnhbeljUkqOMqm92a4GyaiA1M1jSu6RYMRCGMNg',
            },
        }));

        const mailConfigurations = {
            from: process.env.SMPT_MAIL,
            to: email,
            subject: "Question For TechFestive",
            html: `<h3>This is Your question successfully added <h1><b>${note}</b></h1> For TechFestive</h3>`
        };

        transporter.sendMail(mailConfigurations, (error, info) => {
            if (error) throw Error(error);
            console.log("Email Sent Successfully");
            console.log(info);

        });
    } catch (error) {
        console.log(error);
    }

}

module.exports = sendEmail