const EMAIL_SMTP_FROM = process.env.EMAIL_SMTP_FROM || "dev@statwig.com"

exports.constants = {
	admin: {
		name: "TheLedger by StaTwig",
		email: EMAIL_SMTP_FROM
	},
	confirmEmails: {
		from : EMAIL_SMTP_FROM
	},
	email: {
		from : EMAIL_SMTP_FROM
	}
};