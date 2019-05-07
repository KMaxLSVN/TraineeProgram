import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BooksComponent } from './pages/books/books.component';
import { BookComponent } from './book/book.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddBookComponent } from './add-book/add-book.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersListComponent } from './components/user-list/users-list.component';
import { AddDialogComponent } from './components/user-list/dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './components/user-list/dialogs/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './components/user-list/dialogs/edit-dialog/edit-dialog.component';


import { AuthenticationService } from './shared/_services/authentication.service';
import { UserService } from './shared/_services/user.service';
import { LocalStorage } from './shared/_services/local-storage.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule, MatStepperModule } from '@angular/material';

import { HttpClientModule }   from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BooksComponent,
    BookComponent,
    NotFoundComponent,
    AdminComponent,
    AddBookComponent,
    HeaderComponent,
    HomeComponent,
    UsersListComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatStepperModule,

    HttpClientModule,

    ToastrModule,
    ToastrModule.forRoot(),
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  providers: [
    AuthenticationService,
    UserService,
    LocalStorage,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
