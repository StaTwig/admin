exports.constants = {
	admin: {
		name: "StaTwig Admin",
		email: process.env.EMAIL_SMTP_USERNAME
	},
	confirmEmails: {
		from : process.env.EMAIL_SMTP_USERNAME
	},
	email: {
		from : process.env.EMAIL_SMTP_USERNAME
	}
};