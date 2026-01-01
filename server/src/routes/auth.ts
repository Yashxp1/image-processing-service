import express from "express";
import { isLoggedIn, login, logout, register } from "../controller/auth";

const authRoute = express.Router();


authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/logout', logout)

authRoute.get('/check-auth', isLoggedIn)


export default authRoute;