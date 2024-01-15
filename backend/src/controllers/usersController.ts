import { RequestHandler } from 'express';
import userModel from '../models/user'
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt'



interface SignUpBody {
    username?: string,
    email?: string,
    passwordRaw?: string
}


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.session.userId;
    try {
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        }

        const user = await userModel.findById(authenticatedUser).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {

    const { username, email, passwordRaw } = req.body;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters are missing")
        }
        //username and email must by unique
        const dublicate_username = await userModel.findOne({
            username: username
        }).exec();

        if (dublicate_username) {
            throw createHttpError(400, "Dublicated username");
        }

        const dublicate_email = await userModel.findOne({
            email: email
        }).exec();

        if (dublicate_email) {
            throw createHttpError(400, "Dublicated email");
        }

        const hashedPassword = await bcrypt.hash(passwordRaw, 10);

        const new_user = await userModel.create({
            username,
            email,
            password: hashedPassword

        })

        req.session.userId= new_user._id;

        res.status(200).json(new_user)
    } catch (error) {
        next(error);
    }
}

interface LoginBody{
    username ?: string,
    password?: string
}


export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await userModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};