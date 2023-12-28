import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer"

class MailService {
    private  transporter: nodemailer.Transporter

    constructor(transporter: Mail<any>) {
        this.transporter = transporter
    }

    async createConnection() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'raflymasloman12@gmail.com',
                pass: 'raflymasloman12'
            }
        })
    }
}