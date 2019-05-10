import { Injectable } from '@angular/core';

import { CookiesService } from '@ngx-utils/cookies/src/cookies.service';
import { Book } from '../_models';

const C_BOOK_KEY = 'book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: any;//Book[];

  constructor(
    private cookieService: CookiesService,
  ) { }

  readCart(){
    this.cart = this.cookieService.getObject(C_BOOK_KEY) || [];
    console.log([...this.cart]);
    return [...this.cart];
  }

  readCartById(key: number){
    return this.readCart().find((item: Book) => {
      if(item.id === key){
        return true;
      }
    })
  }

  createItem(item: Book){
    let cart = this.readCart();
    cart.push(item);
    this.cookieService.putObject(C_BOOK_KEY, cart);
    console.log(cart);
    return cart;
  }



  addItem(item: Book){
    let cart: Book[] = this.readCart();
    if(cart.length === 0) {
      cart = this.createItem(item);
    } else {
      let isItemExist = this.readCartById(item.id);
      if(isItemExist){
        console.log('here will be amount -1');
        return;
      }
      cart = this.createItem(item);
    }
    return cart;
  }

  deleteItem(item: Book){
    let cart = this.readCart();
    for(let i=0; i<=cart.length; i++){
      if(item.id == this.cart[i].id){
        cart.splice(i,1);
        this.cookieService.putObject(C_BOOK_KEY, cart);
        break;
      }
    }
    return cart;
  }

  deleteAll(){
    this.cookieService.remove(C_BOOK_KEY);
  }
  
}
