import nodemailer from 'nodemailer';

class MailerLibs {
  static createTransporterGmail() {
    const userData = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_TRANSPORTER_USER_EMAIL,
        pass: process.env.EMAIL_TRANSPORTER_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(userData);

    return transporter;
  }
}

export default MailerLibs;
