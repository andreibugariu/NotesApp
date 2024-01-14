import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note, Note as NoteModel } from './models/note';
import styles from './styles/NotesPage.module.css'
import styleUtils from './styles/utils.module.css'
import NoteComponent from './components/Note';
import * as NotesApi from "./network/notes.api"
import AddNoteDialog from './components/AddNoteDialog';

function App() {

  ///Create a button counte

  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);

      } catch (error) {
        console.log(error)
        alert(error)
      }

    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existing => existing._id !== note._id));
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
  return (
    <Container >
      <Button
        className={`mb-4 ${styleUtils.blockCenter}`}
        onClick={() => setShowAddNoteDialog(true)}>
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {
          notes.map((note) => (
            <Col key={note._id} >
              <NoteComponent note={note}
                onNoteClicked={setNoteToEdit}
                className={styles.note}
                onDeleteNoteClicked={deleteNote}
              />
            </Col>
          ))
        }
      </Row>
      {
        showAddNoteDialog &&
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteCreate={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddNoteDialog(false)
          }}
        />
      }
      {
        noteToEdit &&
        <AddNoteDialog noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteCreate={(updatedNote) => {
            setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
            setNoteToEdit(null)
          }} />
      }
    </Container>
  );
}

export default App;
