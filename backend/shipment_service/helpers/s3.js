const S3 = require("aws-sdk/clients/s3");
const sharp = require("sharp");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_ACCESS_SECRET;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
const uploadFile = async function uploadFile(file) {
  if (file.mimetype == "image/png") {
    const image = await sharp(file.path)
      .rotate()
      .jpeg({ quality: 60, force: true })
      .toBuffer();
    const uploadParams = {
      Bucket: bucketName,
      Body: image,
      Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
  } else {
    const image = await sharp(file.path)
      .jpeg({ quality: 60, force: true })
      .toBuffer();
    const uploadParams = {
      Bucket: bucketName,
      Body: image,
      Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
  }
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
