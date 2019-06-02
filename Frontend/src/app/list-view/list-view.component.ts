import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private noteService: NotesService) {
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
  }

  filterNotes(data: Note[]) {
    this.notStartedNotes = data.filter((note) => note.noteStatus === 'not-started');
    this.startedNotes = data.filter((note) => note.noteStatus === 'started');
    this.completedNotes = data.filter((note) => note.noteStatus === 'completed');
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(
      res => this.filterNotes(res),
      err => { }
    );
  }

}
