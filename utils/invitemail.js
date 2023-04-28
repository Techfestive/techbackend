const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { OAuth2Client } = require("google-auth-library");
const User = require('../model/user');
const client = new OAuth2Client(process.env.CLIENT_ID);

const invitemail = async (email, token) => {
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
        const url = ` https://conveya.io/signIn/${token}`
        const mailConfigurations = {
            from: process.env.SMPT_MAIL,
            to: email,
            subject: "Invitation For Membarship",
            // html: `<p>Invitation for membarship click <b>${email}</b> ${token}</p>`
            // html: `Invitation for membarship click <b><a href="https://conveya.io/signIn" ></b> ${token}`
            html: `Invitation for membarship click <a  href=${url}> ${url}</a> `
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

module.exports = invitemail