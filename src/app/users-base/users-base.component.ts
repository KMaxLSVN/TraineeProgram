import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LocalStorage } from '../_services/local-storage.service';
import { User } from '../_models';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { AddComponent } from './dialogs/add/add.component';
import { Observable } from 'rxjs';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { DataSource } from '@angular/cdk/table';


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
    public dialog: MatDialog,
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
    let userBase = this.db.getAllUsers();
    return userBase;
  }

  addNew(): void{
    const dialogRef = this.dialog.open(AddComponent);
  }

  deleteItem(){
    const dialogRef = this.dialog.open(DeleteComponent, {});
  }

  // removeUser(index: number){
  //   const data = this.dataSource.data;
  //   data.splice(index, 1);
  //   this.dataSource.data = data;
  // }

  delete(user: User) {
    let dialogConfig: MatDialogConfig = {};
    let _this = this;

    dialogConfig.data = {
        name: user,
        title: 'Angular For Beginners',
        callback(status: boolean){
          _this.db.deleteUser(user).subscribe((foo: any) => _this.dataSource.data = foo);
        }
    };
      const dialogRef = this.dialog.open(DeleteComponent, dialogConfig);
      
  }

  removeAllUsers(){
    this.dataSource.data = [];
  }

}
