const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accesstoken;

        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized, token not found"
            });
        }

      
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = { id: decoded.id, name: decoded.username };

        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Invalid or expired token"
        });
    }
};

module.exports = auth;