import { Category } from "./category";
import { Reminder } from "./reminder";

export class Note {
  noteId: Number;
	noteTitle: string;
	noteContent: string;
	noteStatus: string;
	createdAt: Date;
	category: Category;
	reminder:  Reminder[];
	createdBy: string;

  constructor() {
    this.noteTitle = '';
    this.noteContent = '';
    this.noteStatus = 'not-started';
    this.createdBy = '';
    this.category = new Category();
    this.reminder = [];
  }
}
