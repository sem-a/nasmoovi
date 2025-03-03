const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/video/
 * @desc Получить видео
 * @access Public
 */

const getAll = async (req, res) => {
  try {
    const video = await prisma.video.findMany();

    return res.status(200).json({
      success: true,
      message: "Данные успешно получены!",
      video,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Возникла неизвестная ошибка на сервере!",
      err: err.message,
    });
  }
};

/**
 * @route POST /api/video/add
 * @desc Добавить видео
 * @access Protected
 */

const add = async (req, res) => {
  const filePath = req.file.location;

  if (!filePath) {
    return res.status(400).json({
      success: false,
      message: "Проверьте тело запроса!",
    });
  }

  try {
    const video = await prisma.video.create({
      data: {
        video: filePath,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Данные успешно получены!",
      video,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Возникла неизвестная ошибка на сервере!",
      err: err.message,
    });
  }
};

/**
 * @route DELETE /api/video/del/:id
 * @desc Удалить видео
 * @access Protected
 */

const del = async (req, res) => {
  const id = req.params.id;
  try {
    const video = await prisma.video.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Видео успешно удалено!",
      video,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Возникла неизвестная ошибка на сервере!",
      err: err.message,
    });
  }
};

module.exports = {
  getAll,
  add,
  del,
};
