import styles from "../styles/Note.module.css"
import React, { useState } from 'react'
import { Note as NoteModel } from '../models/note'
import { Button, Card } from 'react-bootstrap'
import { formateDate } from '../utils/formatDate'
import DeleteNote from "./DeleteNote"
import styleUtils from '../styles/utils.module.css'


interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void, //hoisting
    onDeleteNoteClicked: (note: NoteModel) => void,
    className?: string
}


const Note = ({ note, onNoteClicked, onDeleteNoteClicked, className }: NoteProps) => {

    const [showNote, setShowNote] = useState(false)


    const {
        _id,
        title,
        text,
        createdAt,
        updatedAt
    } = note

    let date_note: string;
    if (updatedAt > createdAt) {
        date_note = "Updated at " + formateDate(updatedAt);
    } else {
        date_note = "Created at " + formateDate(createdAt);
    }

    return (
        <>
            <Card
                className={`${styles.noteCard} ${className}`}
                onClick={() => onNoteClicked(note)}
            >
                <Card.Body className={styles.cardBody}>
                    <Card.Title>
                        {title}
                    </Card.Title>
                    <Card.Text className={styles.noteText}>
                        {text}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className={`text-muted ${styleUtils.flexCenter}`}>
                    {date_note}
                    {/* <DeleteNote  note_id={_id} /> */}
                    <Button className="ms-auto"
                        variant="danger"
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();//investigate this
                        }}
                    >Delete</Button>
                </Card.Footer>
            </Card>
        </>
    )
}

export default Note