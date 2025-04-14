import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
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
    if (!token_decode) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Login again",
      });
    }
    req.decoded = token_decode;

    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
