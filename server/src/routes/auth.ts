import express from "express";
import { login, logout, register } from "../controller/auth";

const authRoute = express.Router();


authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/login', logout)


export default authRoute;