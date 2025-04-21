import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    let token;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Login again 1",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!token_decode) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Login again 2",
      });
    }
    req.decoded = token_decode;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authDoctor;
