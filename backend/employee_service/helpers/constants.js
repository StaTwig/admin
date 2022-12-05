exports.constants = {
  admin: {
    name: `${process.env.EMAIL_ADMIN_NAME}`,
    email: `${process.env.EMAIL_SMTP_USERNAME}`,
  },
  confirmEmails: {
    from: `${process.env.EMAIL_SMTP_USERNAME}`,
    subject: "Account Verification - One Time Password for your Login",
  },
  appovalEmail: {
    from: `${process.env.EMAIL_SMTP_USERNAME}`,
    subject: 'Account Approved - Login into VaccineLedger'
  },
  rejectEmail: {
    from: `${process.env.EMAIL_SMTP_USERNAME}`,
    subject: 'Account Rejected - Contact Admin'
  },
  addUser: {
    from: `${process.env.EMAIL_SMTP_USERNAME}`,
    subject: 'You are requested to Join Vaccine Ledger - Login with this email'
  },
};
