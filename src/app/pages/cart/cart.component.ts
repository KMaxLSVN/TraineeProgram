import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/_services';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['cover','title', 'authors', 'price', 'amount', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(

    private cartService: CartService,

  ) {
    this.dataSource = new MatTableDataSource(this.getDataBase());
  }

  ngOnInit() {
  }

  getDataBase(): any[] {
    let cart = this.cartService.readCart();
    return cart;
  }

  DeleteBook(elem): void{
    this.cartService.deleteItem(elem).subscribe(response => {this.dataSource.data = response});
  }

  DeleteAllBooks(){
    this.cartService.deleteAll().subscribe(response => (this.dataSource.data = response));
  }
}
