const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../cloud/aws-config");
const { prisma } = require("../prisma/prisma-client");

const deletePhoto = async (req, res, next) => {
  const id = req.params.id;

  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Фотография не найдена!",
      });
    }

    const indexOf = portfolio.image.indexOf("portfolio");
    const filePath = portfolio.image.slice(indexOf);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filePath,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Возникла ошибка при удалении фотографии!",
      err: err.message,
    });
  }
};

const deletePhotoForWedding = async (req, res, next) => {
  const weddingId = req.params.id;

  try {
    const portfolios = await prisma.portfolio.findMany({
      where: {
        weddingId,
      },
    });

    if (!portfolios || portfolios.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Фотографии не найдена!",
      });
    }

    const deletePromises = portfolios.map(async (portfolio) => {
      const indexOf = portfolio.image.indexOf("portfolio");
      const filePath = portfolio.image.slice(indexOf);

      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filePath,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    });

    await Promise.all(deletePromises);

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Возникла ошибка при удалении фотографии!",
      err: err.message,
    });
  }
};

module.exports = {
  deletePhoto,
  deletePhotoForWedding,
};
