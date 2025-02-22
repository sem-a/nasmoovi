const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/user/login
 * @desc Авторизация пользователя
 * @access Public
 */

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все обязательные поля!",
    });
  }

  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect) {
      return res.status(200).json({
        success: true,
        message: "Пользователь успешно авторизован!",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Неверный логин или пароль!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Возникла непредвиденная ошибка на сервере",
      err,
    });
  }
};

/**
 * @route POST /api/user/reg
 * @desc Регистрация пользователя
 * @access Public
 */

const reg = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все обязательные поля!",
    });
  }

  try {
    const isExist = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (isExist) {
      return res.status(409).json({
        success: false,
        message: "Пользователь с таким Email уже зарегистрирован",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      return res.status(201).json({
        success: true,
        message: "Пользователь успешно авторизован!",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Не удалось создать пользователя!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Возникла непредвиденная ошибка на сервере!",
      err,
    });
  }
};

/**
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Protected
 */

const current = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Пользователь успешно получен!",
    user: req.user,
  });
};

module.exports = {
  login,
  reg,
  current,
};
