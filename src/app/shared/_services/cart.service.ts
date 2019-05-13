import { Injectable } from '@angular/core';

import { CookiesService } from '@ngx-utils/cookies/src/cookies.service';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../_models';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { BooksListComponent } from 'src/app/pages/books-list/books-list.component';

const C_BOOK_KEY = 'book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: BehaviorSubject<Book[]>;
  public cartList: Observable<Book[]>;

  // private sumSubject: BehaviorSubject<number>;
  // public sum: Observable<number>;


  public cart: any;//Book[];

  constructor(

    private cookieService: CookiesService,
    private toastr: ToastrService,

  ) {
    
    this.cartSubject = new BehaviorSubject<Book[]>(this.readCart());
    this.cartList = this.cartSubject.asObservable();

    // this.sumSubject = new BehaviorSubject<number>(this.sumQuantity());
    // this.sum = this.sumSubject.asObservable();

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
    item.quantity = 1;
    cart.push(item);
    // cart.forEach(elem => elem.quantity = 1);
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
        this.changeQuantity(item, true);
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
        item.quantity = 0;
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

  updateCartQuantity(item: Book): Book[]{
    let cart: Book[] = this.readCart();
    for(let i=0; i<=cart.length; i++) {
      if(item.id === cart[i].id) {
        cart[i].quantity = item.quantity;
        this.saveToCookie(cart);
        break;
      }
    }
    return cart;
  }

  changeQuantity(item: Book, status: boolean): void{
    if(status){
      item.quantity < item.amount ? item.quantity++ : item.quantity = item.amount;
    } else {
      item.quantity > 1 ? item.quantity-- : item.quantity = 1;
    }
    this.updateCartQuantity(item);
  }

  sumQuantity(): number{
    let data = this.readCart();
    return data.reduce( (accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);
  }

  sumPrice(): number{
    let data = this.readCart();
    return data.reduce( (accumulator, item) => {
      return (accumulator + (item.quantity * item.price)); 
    }, 0);
  }
  
}
