import { Injectable } from '@angular/core';
import { Reminder } from '../reminder';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { tap } from 'rxjs/operators';

@Injectable()
export class ReminderService {

  reminders: Array<Reminder>;
  reminderSubject: BehaviorSubject<Array<Reminder>>;

  baseUri = "http://localhost:8081/api/v1/reminder";

  constructor(private httpClient: HttpClient, private authservice: AuthenticationService) {
    this.reminders = [];
    this.reminderSubject = new BehaviorSubject([]);
  }

  saveReminder(reminder: Reminder) {
    reminder.reminderCreatedBy = localStorage.getItem('userId');
    return this.httpClient.post<Reminder>(this.baseUri, reminder, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authservice.getBearerToken()}`,
        'userId': localStorage.getItem('userId')
      })
    }).pipe(tap((res: any) => {
      this.reminders.push(res.data);
      this.reminderSubject.next(this.reminders);
    }));
  }

  updateReminder(reminder: Reminder) {
    // reminder.reminderId = reminder.id;
    console.log(reminder);
    return this.httpClient.put<any>(this.baseUri + '/' + reminder.reminderId, reminder, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedReminder => {
      console.log(editedReminder);
      const oldReminder = this.reminders.find(res => res.reminderId === reminder.reminderId);
      Object.assign(oldReminder, editedReminder.data);
      this.reminderSubject.next(this.reminders);
    }));
  }

  deleteReminder(reminder: Reminder) {
    return this.httpClient.delete<any>(this.baseUri + '/' + reminder.reminderId, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(res => {
      this.reminders.splice(this.reminders.indexOf(reminder), 1);
      this.reminderSubject.next(this.reminders);
    }));
  }

  getAllReminders() {
    return this.reminderSubject;
  }

  fetchRemindersFromServer() {
    return this.httpClient.get<Reminder[]>(this.baseUri, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).subscribe(reminders => {
      console.log(reminders);
      this.reminders = reminders;
      this.reminderSubject.next(this.reminders);
    },
      (err: any) => {
        console.log(err);
        this.reminderSubject.error(err);
      });
  }
}
