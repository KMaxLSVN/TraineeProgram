import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';


const routes: Routes = [
  // Home page
  { path: '', component: HomeComponent, pathMatch: 'full'},
  // Pages
  { path: 'books', component: BooksListComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'cart', component: CartComponent, pathMatch: 'full' },
  { path: 'book/:id', component: BookDetailComponent, pathMatch: 'full' },
  // UX pages
  { path: 'about', redirectTo: '/', pathMatch: 'full' },
  { path: 'contact', redirectTo: '/', pathMatch: 'full' },
  { path: 'buy', redirectTo: '/books', pathMatch: 'full' },
  // Otherwise redirect to "page not found"
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
