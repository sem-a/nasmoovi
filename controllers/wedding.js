const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/wedding
 * @desc Получить все свадьбы
 * @access Public
 */

const all = async (req, res) => {
  try {
    const wedding = await prisma.wedding.findMany();
    return res.status(200).json({
      success: true,
      message: "Свадьбы успешно получены!",
      wedding,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Произошла непредвиденная ошибка на сервере!",
      err,
    });
  }
};

/**
 * @route GET /api/wedding/:id
 * @desc Получить одну свадьбу
 * @access Public
 */

const one = async (req, res) => {
  try {
    const id = req.params.id;

    const wedding = await prisma.wedding.findFirst({
      where: {
        id,
      },
    });
    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Страница не найдена!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Данные успешно получены!",
      wedding,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Произошла непредвиденная ошибка на сервере!",
      err,
    });
  }
};

/**
 * @route POST /api/wedding/add
 * @desc Добавить свадьбу
 * @access Protected
 */

const add = async (req, res) => {
  const { name } = req.body;

  console.log(name)

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все обязательные поля!",
    });
  }

  try {
    const isExist = await prisma.wedding.findFirst({
      where: {
        name,
      },
    });

    if (isExist) {
      return res.status(409).json({
        success: false,
        message: "Свадьба с таким названием уже существует!",
      });
    }

    const wedding = await prisma.wedding.create({
      data: {
        name,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Свадьба успешно добавлена!",
      wedding,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Произошла непредвиденная ошибка на сервере!",
      err: err.message,
    });
  }
};

/**
 * @route POST /api/wedding/edit/:id
 * @desc Добавить свадьбу
 * @access Protected
 */

const edit = async (req, res) => {
  const { name } = req.body;
  const id = req.params.id;

  try {
    const isExist = await prisma.wedding.findFirst({
      where: {
        name,
      },
    });

    if (isExist) {
      return res.status(409).json({
        success: false,
        message: "Свадьба с таким названием уже существует!",
      });
    }

    const wedding = await prisma.wedding.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return res.status(204).json({
      success: true,
      message: "Свадьба успешно обновленна!",
      wedding,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Произошла непредвиденная ошибка на сервере!",
      err,
    });
  }
};

/**
 * @route DELETE /api/wedding/del/:id
 * @desc Удалить свадьбу
 * @access Protected
 */

const del = async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.portfolio.deleteMany({
      where: {
        weddingId: id,
      },
    });

    await prisma.wedding.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({
      success: true,
      message: "Свадьба успешно удалена!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Произошла непредвиденная ошибка на сервере!",
      err,
    });
  }
};

module.exports = {
  all,
  one,
  add,
  edit,
  del,
};
