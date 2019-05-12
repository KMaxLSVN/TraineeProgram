import { Injectable } from '@angular/core';

import { CookiesService } from '@ngx-utils/cookies/src/cookies.service';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../_models';

import { BehaviorSubject, Observable, of } from 'rxjs';

const C_BOOK_KEY = 'book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: BehaviorSubject<Book[]>;
  public cartList: Observable<Book[]>;
  public cart: any;//Book[];

  constructor(

    private cookieService: CookiesService,
    private toastr: ToastrService,

  ) {
    
    this.cartSubject = new BehaviorSubject<Book[]>(this.readCart());
    this.cartList = this.cartSubject.asObservable();

  }

  private saveToCookie(items: Book[]): void{
    this.cookieService.putObject(C_BOOK_KEY, items);
    this.cartSubject.next(items);
  }

  readCart(){
    this.cart = this.cookieService.getObject(C_BOOK_KEY) || [];
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
    this.saveToCookie(cart);
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

  deleteItem(item: Book): Observable<Book[]>{
    let cart = this.readCart();
    for(let i=0; i<=cart.length; i++){
      if(item.id == this.cart[i].id){
        cart.splice(i,1);
        this.saveToCookie(cart);
        break;
      }
    }
    return of(cart);
  }

  deleteAll(): Observable<Book[]>{
    let cart = this.readCart();
    if(cart.length === 0) {
      this.toastr.info('Cart is empty');
      return;
    }
    this.cookieService.remove(C_BOOK_KEY);
    this.cartSubject.next([]);
    return of(null);
  }
  
}
