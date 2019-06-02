import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';
import { ReminderService } from '../services/reminder.service';
import { Reminder } from '../reminder';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  public note: Note;
  public errMessage;

  categories: Category[] = [];
  reminders: Reminder[] = [];
  constructor(private noteService: NotesService, 
    private catService: CategoryService, 
    private reminderService: ReminderService) {
    this.note = new Note();
  }

  ngOnInit() {
    this.catService.fetchCategoriesFromServer();
    this.reminderService.fetchRemindersFromServer();
    this.getAllCategories();
    this.getAllReminders();
  }

  addNote() {
    this.errMessage = '';
    if (this.note.noteTitle !== '' && this.note.noteContent !== '') {
      this.noteService.addNote(this.note).subscribe(
        (data : any) => {
          alert(data.message);
         },
        err => {
          this.errMessage = err.message;
        }
      );
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
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
