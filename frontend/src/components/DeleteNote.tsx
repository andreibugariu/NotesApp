import React from 'react'
import Button from 'react-bootstrap/Button';
import * as NoteApi from '../network/notes.api'

interface DeleteNoteProps {
    note_id: string;
}

const DeleteNote = (props: DeleteNoteProps) => {

    const handleDelete = async () => {
        try {
            const result = await NoteApi.deleteNote(props.note_id);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

  return (
      <Button className="ms-auto" variant="danger" onClick={handleDelete}>Delete</Button>
  )
}

export default DeleteNote