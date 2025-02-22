/**
 * @route POST /api/
 * @desc Главная страница
 * @access Public
 */

const index = (req, res) => {
  res.status(200).json({ message: "Главная страница" });
};

module.exports = {
  index,
};
