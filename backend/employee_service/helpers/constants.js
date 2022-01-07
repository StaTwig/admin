exports.constants = {
  admin: {
    name: `${process.env.EMAIL_ADMIN_NAME}`,
    email: `${process.env.EMAIL_SMTP_USERNAME}`,
  },
  confirmEmails: {
    from: `${process.env.EMAIL_SMTP_USERNAME}`,
    subject: "Account Verification - One Time Password for your Login",
  },
};
