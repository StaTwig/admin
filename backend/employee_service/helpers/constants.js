exports.constants = {
  admin: {
    name: `${process.env.EMAIL_ADMIN_NAME}`,
    email: `${process.env.EMAIL_SMTP_USERNAME}`,
  },
  confirmEmails: {
    from: `${process.env.EMAIL_SMTP_USERNAME}`,
    subject: 'Account Verification - One Time Password for your Login on BrewCollect'
  },
  appovalEmail: {
    from: `${process.env.EMAIL_SMTP_USERNAME}`,
    subject: 'Account Approved - Login into BrewCollect'
  },
  rejectEmail: {
    from: `${process.env.EMAIL_SMTP_USERNAME}`,
    subject: 'Account Rejected - Contact Admin'
  },
  addUser: {
    from: `${process.env.EMAIL_SMTP_USERNAME}`,
    subject: 'You are requested to Join BrewCollect - Login with this email'
  },
};
