///Wrapper for fetch to handle the error

import { Note } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage)
    }
}

export async function fetchNotes(): Promise<Note[]>{
    const response = await fetchData("/api/notes", {
        method: "GET"
    })
    return await response.json();
}


export interface NoteInput{
    title: string,
    text?: string
}

///to create a new notes
export async function createNotes(note: NoteInput): Promise<Note>{
    const response = await fetchData("/api/notes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        }
    );
        
    return response.json();
}