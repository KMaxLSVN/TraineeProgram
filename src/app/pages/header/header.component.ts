import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { User } from '../../shared/_models/users';
import { Book } from 'src/app/shared/_models';

import { AuthenticationService } from '../../shared/_services/authentication.service';
import { CartService, ApiService, AuthService } from 'src/app/shared/_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any = '';

  books: Book[];
  quantity: number;
  price: any;
  title: string;
  // Environment
  env = environment;

  constructor(
    public router: Router,
    public service: AuthenticationService,
    public cartService: CartService,

    private api: ApiService,
    private auth: AuthService,
  ) {
    // this.service.currentUser.subscribe(x => this.currentUser = x);

    // this.currentUser = this.auth.currentEmail();

    // Render current user email
    this.auth.currentUser$.subscribe(res => this.currentUser = res);

    this.cartService.cartList.subscribe(response => {
      this.books = response;
      this.quantity = this.cartService.sumQuantity();
      this.price = this.cartService.sumPrice();
      this.title = 'Total price'; 
    });

  }

  ngOnInit() {
    if(this.auth.currentEmail()){
      this.auth.getSession().subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
        this.logout();
      })
    }
   
    
  }

  logout() {
    this.auth.logout();
    this.cartService.deleteAll();
    this.router.navigate(['/login']);
  }

}
