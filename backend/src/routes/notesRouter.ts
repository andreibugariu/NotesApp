import * as NoteController from "../controllers/notesController"
import express from "express";

const router = express.Router();

router.get("/userId/:userId", NoteController.getNotes)
router.post("/", NoteController.createNote)
router.get("/:id", NoteController.getNote)
router.delete("/:id", NoteController.deleteNote)
router.patch("/:id", NoteController.updateNote)






export default router;