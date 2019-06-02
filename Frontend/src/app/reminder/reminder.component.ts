import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder';
import { MatTableDataSource } from '@angular/material';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  reminder: Reminder;
  reminders: Reminder[] = [];

  displayedColumns: string[] = ['name', 'description', 'type', 'date', 'update', 'delete'];
  dataSource = new MatTableDataSource<Reminder>();

  constructor(private reminderService: ReminderService) { 
    this.reminderService.fetchRemindersFromServer();
  }

  ngOnInit() {
    this.reminder = new Reminder();
    this.getAllReminders();
  }

  onSaveUpdate() {
    if(this.reminder.reminderName.trim() === '') {
      alert('Reminder name should not be empty');
      return;
    }
    if(this.reminder.reminderDescription.trim() === '') {
      alert('Reminder description should not be empty');
      return;
    }
    if(this.reminder.reminderType.trim() === '') {
      alert('Reminder type should not be empty');
      return;
    }
    if(this.reminder.reminderId == null) {
      this.saveReminder();
    } else {
      this.updateReminder();
    }
    
  }

  onUpdate(reminder: Reminder) {
    this.reminder = reminder;
  }

  saveReminder() {
    this.reminder.reminderCreationDate = new Date();
    this.reminderService.saveReminder(this.reminder).subscribe((res:any) => {
      console.log(res);
      alert(res.message);
      this.reminder = new Reminder();
    }, err => {
      console.log(err);
      alert(err.error);
    });
  }

  updateReminder() {
    this.reminder.reminderCreationDate = new Date();
    this.reminderService.updateReminder(this.reminder).subscribe((res:any) => {
      console.log(res);
      alert(res.message);
      this.reminder = new Reminder();
    }, err => {
      console.log(err);
      alert(err.error);
    });
  }

  deleteReminder(reminder: Reminder) {
    console.log(reminder)
    if(!confirm('Do you want to delete the reminder ' + reminder.reminderName + ' ?')) {
      return;
    }
    this.reminderService.deleteReminder(reminder).subscribe(res => {
      console.log(res);
      alert(res.message);
    }, err => {
      console.log(err);
    });
  }

  getAllReminders() {
    this.reminderService.getAllReminders().subscribe(
      res => {
        this.reminders = res;
        this.dataSource.data = res;
        // console.log("subscribe" , this.dataSource);
      },
      err => {
        // console.log("err" + err);
       }
    );
  }

}
