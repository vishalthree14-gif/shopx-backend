// controllers/authController.js
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');

exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Refresh token missing" });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);

    // Check if token exists in DB
    const dbToken = await RefreshToken.findOne({ where: { token, userId: payload.id } });
    if (!dbToken) return res.status(403).json({ message: "Invalid refresh token" });

    // Generate new access token
    const accessToken = jwt.sign({ id: payload.id }, process.env.ACCESS_SECRET, { expiresIn: '1h' });

    res.json({ access_token: accessToken });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

