import createHttpError from 'http-errors';
import NoteModel from '../models/note'
import UserModel from '../models/user'
import {RequestHandler} from "express"
import mongoose from 'mongoose';

interface noteParams {
    id: string
}

interface NoteBody {
    userId?: string,
    title?: string,
    text?: string
}


export const getNotes: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const notes = await NoteModel.find({
            userId: userId
        }).exec(); 
        res.status(200).json(notes)
    } catch (error) {
        next(error);
    }
}


export const createNote: RequestHandler<unknown, unknown, NoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const userId = req.body.userId;
    try {
        if (!title) {
            throw createHttpError(400, "Note must have a title")
        }
        ///Verify if that user exist in database
        const user = await UserModel.findById(userId);
        if (!user) {
            throw (Error("can't create new note, invalid userId"))
        }
        const result = await NoteModel.create({
            userId,
            title,
            text
        })
        if (result) {
            res.status(200).json(result)
        } else {
            throw(Error("can't create new user"))
        }
    } catch (error) {
        next(error);
    }
}


export const getNote: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid note id")
        }
        const note = await NoteModel.findById(id).exec();
        if (!note) {
            throw createHttpError(404, "Not not found")
        }
        res.status(200).json(note)
    } catch (error) {
        next(error);
    }
}


export const deleteNote: RequestHandler<noteParams, unknown, unknown, unknown> = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid note id")
        }
        const del = await NoteModel.deleteOne({ _id: id })
        if (del) {
            res.status(200).json({message: "Deleted Note "+id})
        } else {
            throw(Error("Can't delete"))
        }
    } catch (error) {
        next(error);
    }
}




export const updateNote: RequestHandler<noteParams, unknown, NoteBody, unknown> = async (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const text = req.body.text;
    
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid note id")
        }

        if (!title) {
            throw createHttpError(400, "Note must have a title")
        }
        const note = await NoteModel.findByIdAndUpdate(id, {
            title,
            text
        }).exec()
        if (note) {
            res.status(200).json(note)
        } else {
            throw(Error("Can't update note"+id))
        }
    } catch (error) {
        next(error)
    }
}