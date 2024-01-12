import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notesRouter";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
const app = express();

app.use(morgan("dev"));

app.use(express.json());


app.use('/api/notes', notesRouter);

app.use((req, res, next) => {
    next(createHttpError(404,"Endpoint not found"))
});

//Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "Unknown error message"
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ message: errorMessage })
})


export default app;
