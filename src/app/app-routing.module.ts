import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './book/book.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddBookComponent } from './add-book/add-book.component';
import { UsersBaseComponent } from './users-base/users-base.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  // Home page
  { path: '', component: HomeComponent, pathMatch: 'full'},
  // Pages
  { path: 'books', component: BooksComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'book/:id', component: BookComponent, pathMatch: 'full' },
  // UX pages
  { path: 'about', redirectTo: '/', pathMatch: 'full' },
  { path: 'contact', redirectTo: '/', pathMatch: 'full' },
  // Otherwise redirect to "page not found"
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
