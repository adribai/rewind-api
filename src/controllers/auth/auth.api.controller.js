import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../../repositories/user.repository.js";
import { HttpError } from "../../utils/HttpError.js";
import { env } from "../../config/env.js";


const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true, 
  sameSite: "strict",
  secure: env.NODE_ENV === "production"
};
const TOKEN_DURATION_MS = 24 * 60 * 60 * 1000;



const register = async (req, res) => {
  const { username, email, password, passwordRepeat } = req.body;

  if (typeof password !== "string" || password.length < 8) {
    throw new HttpError(400, "La contraseña debe tener al menos 8 caracteres");
  }
  if (password !== passwordRepeat) {
    throw new HttpError(400, "Las contraseñas no coinciden");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.create({ userName:username, userEmail:email, userPassword: hashedPassword, userRole: "user" });
  res.status(201).json({ data: user });
};



const login = async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    throw new HttpError(400, "El email y la contraseña son obligatorios");
  }

  const user = await userRepository.getByEmail(email);
  
  if (!user || !(await bcrypt.compare(password, user.userPassword))) {
    throw new HttpError(401, "Credenciales incorrectas");
  }

  const payload = {
    _id: user._id.toString(),
    userRole: user.role,
    userName: user.userName,
  };
  const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "24h" });

  res.cookie("token", token, { ...TOKEN_COOKIE_OPTIONS, maxAge: TOKEN_DURATION_MS });
  res.json({ data: { token, user } });
};


const logout = (req, res) => {
  res.clearCookie("token", TOKEN_COOKIE_OPTIONS);
  res.json({ message: "Sesión cerrada" });
};


const me = async (req, res) => {
  const user = await getUserById(req.user._id);
  if (!user) {
    throw new HttpError(404, "El usuario ya no existe");
  }
  res.json({ data: user });
};

export default { register, login, logout, me };
