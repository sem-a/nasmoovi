const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/portfolio/
 * @desc Получить портфолио
 * @access Public
 */
const all = async (req, res) => {
  try {
    const portfolio = await prisma.portfolio.findMany();
    return res.status(200).json({
      success: true,
      message: "Данные успешно получены!",
      portfolio,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Возникла неизвестная ошибка на сервере!",
      err: err.message
    });
  }
};

/**
 * @route GET /api/portfolio/:wedding
 * @desc Получить портфолио по айди свадьбы
 * @access Public
 */

const getForWeddingId = async (req, res) => {
  const weddingId = req.params.wedding;

  try {
    const portfolio = await prisma.portfolio.findMany({
      where: {
        weddingId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Данные успешно получены!",
      portfolio,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Возникла неизвестная ошибка на сервере!",
    });
  }
};

/**
 * @route GET /api/portfolio/preview/:wedding
 * @desc Получить портфолио по айди свадьбы
 * @access Public
 */

const getPreview = async (req, res) => {
  const weddingId = req.params.wedding;

  try {
    const portfolio = await prisma.portfolio.findMany({
      where: {
        weddingId,
        preview: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Данные успешно получены!",
      portfolio,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Возникла неизвестная ошибка на сервере!",
    });
  }
};

/**
 * @route POST /api/portfolio/add/:wedding
 * @desc Добавить портфолио к свадьбе
 * @access Protected
 */

const add = async (req, res) => {
  const weddingId = req.params.wedding;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Необходимо загрузить файлы!",
    });
  }

  try {
    const portfolioEntries = [];

    for (const file of files) {
      const fileUrl = file.location;

      const newEntry = await prisma.portfolio.create({
        data: {
          image: fileUrl,
          weddingId,
          preview: false,
        },
      });
      portfolioEntries.push(newEntry);
    }

    return res.status(200).json({
      success: true,
      message: "Портфолио успешно добавлено!",
      portfolio: portfolioEntries,
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
 * @route DELETE /api/portfolio/del/:id
 * @desc Удалить фото по айди
 * @access Protected
 */

const delForId = async (req, res) => {
  const id = req.params.id;
  try {
    const portfolio = await prisma.portfolio.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Фотография успешно удалена!",
      portfolio,
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
 * @route PUT /api/portfolio/preview/update
 * @desc Выбрать фотографию для превью
 * @access Protected
 */

const updatePreview = async (req, res) => {
  const weddingId = req.params.wedding;
  const { selectedId } = req.body;

  if (selectedId.length !== 3) {
    return res.status(400).json({
      success: false,
      message: "Изображений должно быть ровно три!",
    });
  }

  try {
    await prisma.portfolio.updateMany({
      where: {
        weddingId,
      },
      data: {
        preview: false,
      },
    });

    const preview = await prisma.portfolio.updateMany({
      where: {
        id: { in: selectedId },
      },
      data: {
        preview: true,
      },
    });

    return res.status(204).json({
      success: true,
      message: "Превью добавлено!",
      preview,
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
  all,
  getForWeddingId,
  getPreview,
  add,
  delForId,
  updatePreview,
};
