import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  baseUri = "http://localhost:8082/api/v1/note";

  constructor(private authservice: AuthenticationService, 
    private httpClient: HttpClient,
    ) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }

  fetchNotesFromServer() {
    return this.httpClient.get<Note[]>(this.baseUri + '/' + localStorage.getItem('userId'), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).subscribe(notes => {
      console.log(notes);
      this.notes = notes;
      this.notesSubject.next(this.notes);
    },
      (err: any) => {
        console.log(err);
        this.notesSubject.error(err);
      });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    note.createdBy = localStorage.getItem('userId');
    console.log(note);
    return this.httpClient.post<Note>(this.baseUri, note, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authservice.getBearerToken()}`,
        'userId': localStorage.getItem('userId')
      })
    }).pipe(tap(addedNote => {
      this.fetchNotesFromServer();
      this.notes.push(note);
      this.notesSubject.next(this.notes);
    }));
  }

  deleteNote(note: Note) {
    return this.httpClient.delete(this.baseUri + '/' + localStorage.getItem('userId') + "/" + note.noteId, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authservice.getBearerToken()}`,
        'userId': localStorage.getItem('userId')
      })
    }).pipe(tap(deletedNote => {
      console.log(deletedNote);
      this.notes.splice(this.notes.indexOf(note), 1);
      this.notesSubject.next(this.notes);
    }));
  }

  editNote(note: Note) {
    console.log(note);
    return this.httpClient.put<any>(this.baseUri + '/' + localStorage.getItem('userId') + '/' + note.noteId, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedNote => {
      console.log(editedNote);
      const oldNote = this.notes.find(rnote => rnote.noteId === note.noteId);
      Object.assign(oldNote, editedNote);
      this.notesSubject.next(this.notes);
    }));
  }

  getNoteById(noteId): Note {
    return this.notes.find(r => r.noteId === +noteId);
  }
}
