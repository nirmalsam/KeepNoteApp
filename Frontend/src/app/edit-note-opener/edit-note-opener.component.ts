import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { MatDialog } from '@angular/material';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {

    let noteId = -1;
    if (this.activatedRoute.params !== undefined) {
      this.activatedRoute.params.subscribe(params => {
        noteId = params.noteId;
        this.dialog.open(EditNoteViewComponent, {
          data: {
            note: noteId
          }
        });
      });
    } else {
      this.dialog.open(EditNoteViewComponent, {
        data: {
          note: noteId
        }
      });
    }
  }

  ngOnInit() {
  }

}
