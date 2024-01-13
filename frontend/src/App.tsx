import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from './styles/NotesPage.module.css'
import * as NotesApi from "./network/notes.api"
import AddNoteDialog from './components/AddNoteDialog';

function App() {

  ///Create a button counter

  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

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

  return (
    <Container >
      <Button onClick={()=>setShowAddNoteDialog(true)}>
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {
          notes.map((note) => (
            <Col key={note._id} >
              <Note note={note} className={styles.note} />
            </Col>
          ))
        }
      </Row>
      {
        showAddNoteDialog && 
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteCreate={()=>{}}
        />
      }
    </Container>
  );
}

export default App;