import jwt from "jsonwebtoken";

// admin middleware

const authAdmin = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Login again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Login again",
      });
    }
    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export default authAdmin;
