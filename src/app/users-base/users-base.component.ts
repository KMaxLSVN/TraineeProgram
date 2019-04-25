import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LocalStorage } from '../_services/local-storage.service';
import { User } from '../_models';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-users-base',
  templateUrl: './users-base.component.html',
  styleUrls: ['./users-base.component.scss']
})
export class UsersBaseComponent implements OnInit {

  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'email', 'password', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private db: LocalStorage,
    @Inject(LocalStorage) public data: any,
  ) { 
    this.dataSource = new MatTableDataSource(this.getUserBase());
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  private applyFilter(value: any){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  private getUserBase(){
    let userBase = [...this.db.getAllUsers()];
    userBase.shift();
    console.log('User base without admin:', userBase);
    console.log('DB', localStorage.getItem('registerUser'));
    return userBase;
  }

  removeUser(index: number){
    const data = this.dataSource.data;
    data.splice(index, 1);
    this.dataSource.data = data;
  }

  delete(): void {
    this.db.deleteUser(this.data);
  }

  removeAllUsers(){
    this.dataSource.data = [];
  }

}
