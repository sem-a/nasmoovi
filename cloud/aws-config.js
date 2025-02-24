const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "ru-1",
  endpoint: "https://s3.timeweb.cloud",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

module.exports = s3;
