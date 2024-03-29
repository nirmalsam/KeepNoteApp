import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {

  constructor(public router: Router, public location: Location) { }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  routeToRegister() {
    this.router.navigate(['register']);
  }

  routeToEditNoteView(noteId) {
    this.router.navigate(['dashboard', {
      outlets: {
        noteEditOutlet: ['note', noteId, 'edit'],
      }
    }]);
  }

  routeBack() {
    this.location.back();
  }

  routeToNoteView() {
    this.router.navigate(['dashboard/view/noteview']);
  }

  routeToListView() {
    this.router.navigate(['dashboard/view/listview']);
  }
}
