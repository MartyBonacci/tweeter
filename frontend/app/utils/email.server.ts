
import nodemailer from 'nodemailer';

let testAccount: any = null;

export async function getEmailTransport() {
  if (!testAccount) {
    testAccount = await nodemailer.createTestAccount();
  }
  
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export async function sendVerificationEmail(to: string, activationToken: string) {
  const transporter = await getEmailTransport();
  const verificationLink = `${process.env.APP_URL || 'http://localhost:5000'}/verify?token=${activationToken}`;
  
  const info = await transporter.sendMail({
    from: '"Tweeter" <noreply@tweeter.com>',
    to,
    subject: 'Verify your Tweeter account',
    html: `
      <h1>Welcome to Tweeter!</h1>
      <p>Please click the link below to verify your account:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info;
}
