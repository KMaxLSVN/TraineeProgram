import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/_services';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displaydColumns: string[] = ['cover','title', 'authors', 'price', 'amount', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(

    private cartService: CartService,



  ) {
    this.dataSource = new MatTableDataSource(this.getDataBase());
    console.warn(this.cartService.readCart());
  }

  ngOnInit() {
  }

  getDataBase(): any[] {
    let cart = this.cartService.readCart();
    console.log('Cart without:', cart);
    return cart;
  }

  DeleteAllItems(){
    console.log('cart is clear');
    this.cartService.deleteAll();
  }
}
