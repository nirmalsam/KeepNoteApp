import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatExpansionModule, MatInputModule,
  MatFormFieldModule, MatCardModule, MatListModule,
  MatButtonModule, MatSidenavModule, MatIconModule,
  MatDialogModule, MatSelectModule, MatTableModule
} from '@angular/material';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';

import { AuthenticationService } from './services/authentication.service';
import { NotesService } from './services/notes.service';
import { CategoryService } from './services/category.service';
import { ReminderService } from './services/reminder.service';
import { RouterService } from './services/router.service';

import { CanActivateRouteGuard } from './can-activate-route.guard';
import { ReminderComponent } from './reminder/reminder.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'category', component: CategoryComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'reminder', component: ReminderComponent, canActivate: [CanActivateRouteGuard] },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      { path: 'view/noteview', component: NoteViewComponent },
      { path: 'view/listview', component: ListViewComponent },
      { path: 'note/:noteId/edit', component: EditNoteOpenerComponent, outlet: 'noteEditOutlet' },
      { path: '', redirectTo: 'view/noteview', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    HeaderComponent,
    ListViewComponent,
    LoginComponent,
    NoteComponent,
    NoteTakerComponent,
    NoteViewComponent,
    RegisterComponent,
    CategoryComponent,
    ReminderComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,

    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthenticationService,
    NotesService,
    RouterService,
    CategoryService,
    ReminderService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
})

export class AppModule { }
