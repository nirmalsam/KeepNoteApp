import { Component, OnInit, Input } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Note } from '../note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {

  @Input() note: Note;
  constructor(private routerService: RouterService) {}

  ngOnInit() { }

  openEditView() {
    this.routerService.routeToEditNoteView(this.note.noteId);
  }

}
