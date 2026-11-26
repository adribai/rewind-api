import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { HttpError } from "../utils/HttpError.js";


const getToken = (req) => {
  const authorization = req.headers.authorization;
  if (authorization?.startsWith("Bearer ")) {
    return authorization.split(" ")[1];
  }
  return req.cookies?.token;
};


const isAuthenticated = (req, res, next) => {
  const token = getToken(req);
  if (!token) {
    return next(new HttpError(401, "No hay token de autenticación"));
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = {
      _id: payload._id,
      role: payload.userRole,
      username: payload.userName,
    };
    next();
  } catch {
    next(new HttpError(401, "Token no válido o caducado"));
  }
};


const isAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new HttpError(401, "No hay token de autenticación"));
  }
  if (req.user.role !== "admin") {
    return next(new HttpError(403, "No tienes permiso"));
  }
  next();
};

export { isAuthenticated, isAdmin };
