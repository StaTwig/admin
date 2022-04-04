const S3 = require("aws-sdk/clients/s3");
const sharp = require("sharp");
const { getImageURL, setImageURL } = require("../middlewares/rbac_middleware");
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
exports.uploadFile = async (file) => {
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

// downloads a file from s3
exports.getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
};

function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString("base64");
  return base64;
}

async function getFileBinary(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).promise();
}

exports.getFile = async (fileKey) => {
  const data = await getFileBinary(fileKey);
  return encode(data.Body);
};

exports.getSignedUrl = async (fileKey) => {
  const cachedURL = await getImageURL(fileKey);
  if (cachedURL) {
    return cachedURL;
  } else {
    const downloadParams = {
      Bucket: bucketName,
      Key: fileKey,
      Expires: expiryLimit,
    };
    const signedUrl = await s3.getSignedUrlPromise("getObject", downloadParams);
    await setImageURL(fileKey, signedUrl);
    return signedUrl;
  }
};
