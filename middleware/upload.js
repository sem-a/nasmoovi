const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const s3 = require("../cloud/aws-config");

const uploadVideo = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read",
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `video/${uniqueSuffix}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /\.(mp4|mov|avi|wmv|flv)$/i;
    const allowedMimeTypes = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-ms-wmv",
      "video/x-flv",
    ];

    const isExtensionValid = allowedExtensions.test(
      path.extname(file.originalname).toLowerCase()
    );
    const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);

    if (isExtensionValid && isMimeTypeValid) {
      cb(null, true);
    } else {
      cb(new Error("Только видео форматы разрешены!"), false);
    }
  },
  limits: {
    fileSize: 1 * 1024 * 1024 * 1024,
  },
});

const uploadPhoto = multer({
  storage: multerS3({
    s3: s3,
    bucket: "be239658-sem-a",
    acl: "public-read",
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `portfolio/${uniqueSuffix}-${file.originalname}`);
    },
  }),
});

module.exports = {
  uploadPhoto,
  uploadVideo,
};
