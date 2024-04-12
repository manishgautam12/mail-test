import { pool } from "../db/dbConnection.js";
import nodemailer from 'nodemailer';
import { emailTemplates } from '../emailTemplates/template.js'; // Assuming you have stored emailTemplates in a separate file
import fs from 'fs';

export const sendMail = async (req, res) => {
    pool.query(`SELECT * FROM user INNER JOIN email_templates ON user.template_id = email_templates.id WHERE user.status = 0`, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).send('Error fetching data from database');
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No users found with status true' });
        }

        const user = results[0]; // Assuming only one user is retrieved from the query

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: user.email,
                pass: user.appPassword
            }
        });

        // Find the appropriate email template
        const templateName = "Booking cancellation"; // Change to the desired template name
        const emailTemplate = emailTemplates.find(template => template.name === templateName);

        // Check if the template is found
        if (!emailTemplate) {
            return res.status(500).json({ error: 'Email template not found' });
        }

        const personalizedEmail = emailTemplate.html.replace('[Recipient Name]', 'John Doe'); // Replace with actual recipient name

        const mailOptions = {
            from: user.email,
            to: "mentalengineer01@gmail.com",
            subject: emailTemplate.subject,
            html: personalizedEmail
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to send email' });
            }
            return res.status(200).json({ message: 'Email sent successfully' });
        });
    });
};
