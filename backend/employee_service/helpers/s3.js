const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_ACCESS_SECRET;
const expiryLimit = process.env.AWS_EXPIRY_LIMIT || 7200;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// uploads a file to s3
const uploadFile = async function uploadFile(file) {
	const fileStream = fs.createReadStream(file.path);
	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};
	return s3.upload(uploadParams).promise();
};
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
	const downloadParams = {
		Key: fileKey,
		Bucket: bucketName,
	};

	return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;

exports.getSignedUrl = async (fileKey) => {
	const downloadParams = {
		Bucket: bucketName,
		Key: fileKey,
		Expires: expiryLimit,
	};
	const signedUrl = await s3.getSignedUrlPromise("getObject", downloadParams);
	return signedUrl;
};
