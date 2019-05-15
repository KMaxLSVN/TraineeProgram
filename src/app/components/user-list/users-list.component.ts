import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';

import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { User } from '../../shared/_models';
import { UserService } from 'src/app/shared/_services';
import { LocalStorage } from '../../shared/_services/local-storage.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'userName', 'email', 'password', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(

    private db: LocalStorage,
    private dialog: MatDialog,
    private userService: UserService

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
    this.dialog
      .open(AddDialogComponent)
      .afterClosed()
      .pipe(filter(result => result))
      .subscribe(data => {
        console.log('My condition:',data);
        if(data.email){
          this.userService.register(data).subscribe(result => {console.warn(result); this.dataSource.data = result});
        }
    })
  }

  addItem(): void{
    let dialogConfig: MatDialogConfig = {};
    let _this = this;

    dialogConfig.data = {
      title: 'Add user',
      callback(result){
        console.warn(result);
        // _this.dataSource.data.push(result);
        _this.dataSource.data = [..._this.dataSource.data, result];
      }
  };

  }

  editItem(user: User){
    let dialogConfig: MatDialogConfig = {};

    dialogConfig.data = {
      title: 'Edit user',
      user: user,
    }

    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
    
    dialogRef.afterClosed()
              .pipe(filter(result => result))
              .subscribe(result => {this.dataSource.data = result;});

  }

  deleteItem(user: User) {
    let dialogConfig: MatDialogConfig = {};
    let _this = this;

    dialogConfig.data = {
        title: 'Remove user',
        name: user,
        callback(status: boolean){
          if(status){
            _this.db.deleteUser(user).subscribe((result: any) => _this.dataSource.data = result);
          }
        }
    };
      const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      
  }

}
