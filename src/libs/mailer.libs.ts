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

  static sendForgotPasswordAccount(messageTo: string) {
    const mailOptions = {
      from: 'raflymasloman12@gmail.com',
      to: messageTo,
      subject: 'Forgot Password',
    };

    this.createTransporterGmail().sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
}

export default MailerLibs;
