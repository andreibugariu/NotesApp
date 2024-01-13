import React from 'react'
import { Modal, ModalBody, Form, Button } from 'react-bootstrap'
import { Note } from '../models/note'
import { NoteInput } from '../network/notes.api'
import { useForm } from 'react-hook-form'
import * as NoteApi from '../network/notes.api'


interface AddNoteDialogProps{
    onDismiss: () => void,
    onNoteCreate: (note: Note) => void
}

const AddNoteDialog = ({ onDismiss, onNoteCreate }: AddNoteDialogProps) => {
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>();
    
    async function onSubmit(input: NoteInput) {
         try {
             const noteResponse = await NoteApi.createNotes(input);
             onNoteCreate(noteResponse);
         } catch (error) {
             console.log(error);
             alert(error);
         }
    }

  return (
      <Modal show onHide={()=>onDismiss()}>
          <Modal.Header closeButton>
              <Modal.Title>
                  Add Note
              </Modal.Title>
          </Modal.Header>
          <ModalBody>
              <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" >
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Enter title"
                          isInvalid={!!errors.title}
                          {...register("title", {required: "Required"})}
                      />
                      <Form.Control.Feedback type="invalid">
                          {errors.title?.message}
                      </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" >
                      <Form.Label>Text</Form.Label>
                      <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter text"
                          {...register("text")}
                      />
                  </Form.Group>
              </Form>
              <Modal.Footer>
                  <Button
                      type="submit"
                      form="addNoteForm"
                      disabled={isSubmitting}
                    >
                      Create note
                  </Button>
              </Modal.Footer>
             
          </ModalBody>
    </Modal>
  )
}

export default AddNoteDialog