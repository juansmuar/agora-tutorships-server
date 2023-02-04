const jwt = require('jsonwebtoken');

const getUserData = async (req, res) => {
  try {
    const { token } = req.query;
    const data = jwt.verify(token, 'secret key');
    res.json(data);
  } catch (error) {
    res.send(500);
  }
};

module.exports = { getUserData };
