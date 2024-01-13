import styles from "../styles/Note.module.css"
import React from 'react'
import { Note as NoteModel} from '../models/note'
import { Card } from 'react-bootstrap'
import { formateDate } from '../utils/formatDate'

interface NoteProps{
    note: NoteModel,
    className? : string
}

const Note = ({ note, className }: NoteProps) => {

    const {
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
        <Card className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text className={styles.noteText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {date_note}
            </Card.Footer>
      </Card>
  )
}

export default Note