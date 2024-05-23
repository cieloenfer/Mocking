const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        // Configurar el servicio de envío de correos
        this.transporter = nodemailer.createTransport({
            // Configuración del servicio de correo (por ejemplo, Gmail)
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendEmail(to, subject, text, html) {
        try {
            // Configurar el correo electrónico
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                text,
                html
            };

            // Enviar el correo electrónico
            await this.transporter.sendMail(mailOptions);

            console.log('Correo electrónico enviado con éxito');
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
        }
    }
}

module.exports = EmailService;
