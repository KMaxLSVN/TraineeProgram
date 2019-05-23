import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersListComponent } from './components/user-list/users-list.component';
import { AddDialogComponent } from './components/user-list/dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './components/user-list/dialogs/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './components/user-list/dialogs/edit-dialog/edit-dialog.component';
import { CartComponent } from './pages/cart/cart.component';

import { HttpClientModule }   from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors/index';
// External libs 
import { ToastrModule } from 'ngx-toastr';
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';
import { ImageCropperModule } from 'ngx-image-cropper';
// Angular Material and Pipe
import { SharedModule } from './shared/shared.module';
// App services
import { BookSevice } from './shared/_services';
import { CartService } from './shared/_services/cart.service';
import { AuthenticationService } from './shared/_services/authentication.service';
import { UserService } from './shared/_services/user.service';
import { LocalStorage } from './shared/_services/local-storage.service';
import { SearchBooksComponent } from './components/search-books/search-books.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BooksListComponent,
    BookDetailComponent,
    NotFoundComponent,
    AdminComponent,
    AddBookComponent,
    HeaderComponent,
    HomeComponent,
    UsersListComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    CartComponent,
    SearchBooksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    // Angular Material and Pipe
    SharedModule,
    // Angular Toastr from https://www.npmjs.com/package/ngx-toastr
    ToastrModule,
    ToastrModule.forRoot(),
    // Angular Cookie from https://github.com/ngx-utils/cookies
    BrowserCookiesModule.forRoot(),
    // Angular Image Cropper from https://www.npmjs.com/package/ngx-image-cropper
    ImageCropperModule,
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
  ],
  providers: [
    AuthenticationService,
    UserService,
    LocalStorage,
    BookSevice,
    CartService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
