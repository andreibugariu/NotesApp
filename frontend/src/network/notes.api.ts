import { title } from "process";
import { Note } from "../models/note";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}

export async function fetchNotes(userId : string): Promise<Note[]> {
    const response = await fetchData("/api/notes/userId/" + userId, { method: "GET" });
    return response.json();
}

export async function getId() {
    try {
        const response = await fetchData("/api/users/userId", { method: "GET" });
        const data = await response.json();

        // Check if userId is available in the response
        if (data.userId) {
            // Convert the userId to string and return it
            return String(data.userId);
        } else {
            throw new Error("User ID not found in the response");
        }
    } catch (error) {
        console.error("Error fetching userId:");
        throw error;
    }
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput, userId: string): Promise<Note> {

    const bodyElem = {
        userId: userId,
        title: note.title,
        text: note.text
    }
        const response = await fetchData("/api/notes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyElem),
            });
        return response.json();
   

}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes/" + noteId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/" + noteId, { method: "DELETE" });
}