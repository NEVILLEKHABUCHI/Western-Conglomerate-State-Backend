const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config({path:'./.env'});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { fullName, phoneNumber, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.APP_PASSWORD
        },
    });

    const mailOptions = {
        from: 'THE WESTERN CONGLOMERATE STATE',
        to: process.env.USER_EMAIL,
        subject: 'NEW MESSAGE FROM THE WESTERN CONGLOMERATE STATE CONTACT FORM',
        text: `
                Full Name: ${fullName}
                Phone Number: ${phoneNumber}
                Email: ${email}
                Message: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            return res.status(500).send(error.toString());
            console.error
        }
        res.send('Email sent successfully!');
    });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
})