const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const forgetEmail = async (email) => {

    try {
        const transporter = nodemailer.createTransport(smtpTransport({

            host: "stmp.gmail.com",
            port: 587,
            service: "gmail",
            requireTLS: true,
            auth: {
                type: "OAuth2",
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD,
                clientId: process.env.MAILCLIENT_ID,
                clientSecret: process.env.MAILCLIENT_SECRET,
                refreshToken: process.env.MAILREFRESH_TOKEN,
            },
        }));
        const url = `http://conveya.io/forgotPassword`

        const mailConfigurations = {
            from: process.env.SMPT_MAIL,
            to: email,
            subject: "For forget password",
            // html: `please click the link <a href="http://conveya.io/forgotPassword" > and reset Your password`
            html: `please click the link <a  href=${url}> ${url}</a> and reset Your password`
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

module.exports = forgetEmail