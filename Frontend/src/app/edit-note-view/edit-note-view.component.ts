import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service';
import { Category } from '../category';
import { Reminder } from '../reminder';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit, OnDestroy {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  categories: Category[] = [];
  reminders: Reminder[] = [];
  constructor(private matDialogRef: MatDialogRef<EditNoteViewComponent>,
    private routerService: RouterService, 
    private noteService: NotesService,
    private catService: CategoryService, 
    private reminderService: ReminderService,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.note = new Note();
  }

  ngOnInit() {
    this.getAllCategories();
    this.getAllReminders();
    console.log("NoteId  " + this.data.note);
    const note = this.noteService.getNoteById(this.data.note);
    console.log(note);
    if (note === undefined) {
    } else {
      this.note = note;
    }
  }

  ngOnDestroy() {
    this.routerService.routeBack();
  }

  onSave() {
    if (this.note.noteTitle.trim() === '' || this.note.noteContent.trim() === '') {
      this.errMessage = 'Title or Text should not be empty';
      return;
    }
    this.noteService.editNote(this.note).subscribe((res) => {
      alert(res.message);
      this.matDialogRef.close();
    }, (err: any) => {
      this.errMessage = err.message;
    });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete the note ' + this.note.noteTitle)) {
      this.noteService.deleteNote(this.note).subscribe((res: any) => {
        alert(res.message);
        this.matDialogRef.close();
      }, (err: any) => {
        this.errMessage = err.message;
      });
    }
  }

  getAllCategories() {
    this.catService.getAllCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => {
      }
    );
  }

  getAllReminders() {
    this.reminderService.getAllReminders().subscribe(
      res => {
        this.reminders = res;
      },
      err => {
      }
    );
  }
}
