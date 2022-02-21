import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as mailGun from 'nodemailer-mailgun-transport';
import * as EmailValidator from 'email-validator';
import { EmailRequestDTO } from './dto/request.dto';

@Injectable()
export class EmailService {
  auth;
  transporter;

  constructor() {
    this.auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };
    this.transporter = nodemailer.createTransport(mailGun(this.auth));
  }

  sendMail({ firstName, lastName, subject, email, message }: EmailRequestDTO) {
    const errors = {
      firstName: '',
      lastName: '',
      subject: '',
      email: '',
      message: '',
    };

    let hasErrors = false;

    if (firstName.length < 2 || !firstName) {
      errors.firstName = 'Firstname is too short or nonexistent';
      hasErrors = true;
    }

    if (lastName.length < 2 || !lastName) {
      errors.lastName = 'Lastname is too short or nonexistent';
      hasErrors = true;
    }

    if (!subject) {
      errors.subject = 'You did not specified a subject';
      hasErrors = true;
    }

    if (!EmailValidator.validate(email)) {
      errors.email = 'Email invalid';
      hasErrors = true;
    }

    if (message.length < 10 || !message) {
      errors.message = 'Message is too short or nonexistent';
      hasErrors = true;
    }

    if (hasErrors) {
      throw new BadRequestException(errors);
    }

    const mailOptions = {
      sender: `${firstName} ${lastName}`,
      from: email,
      to: 'sasa.matei2@gmail.com',
      subject: subject,
      text: message,
    };

    try {
      this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new BadRequestException('Error');
    }

    return { firstName, lastName, email, message, status: 'Success' };
  }
}
