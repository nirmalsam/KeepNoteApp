import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isNoteView = true;

  isAutenticated = false;
  constructor(private routerService: RouterService, 
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.getAuthentication().subscribe(isAuthentication => {
      this.isAutenticated = isAuthentication;
    })
  }

  switchToListView() {
    this.isNoteView = !this.isNoteView;
    this.routerService.routeToListView();
  }

  switchToNoteView() {
    this.isNoteView = !this.isNoteView;
    this.routerService.routeToNoteView();
  }

  logout() {
    this.isAutenticated = false;
    localStorage.removeItem('bearerToken');
    this.routerService.routeToLogin();
  }
}
