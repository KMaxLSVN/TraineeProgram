import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LocalStorage } from '../_services/local-storage.service';
import { User } from '../_models';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { AddComponent } from './dialogs/add/add.component';
import { Observable } from 'rxjs';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { filter } from 'rxjs/operators';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-users-base',
  templateUrl: './users-base.component.html',
  styleUrls: ['./users-base.component.scss'],
})
export class UsersBaseComponent implements OnInit {

  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'email', 'password', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private db: LocalStorage,
    private dialog: MatDialog,
    

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
    const addCompDialogRef = this.dialog.open(AddComponent);

    addCompDialogRef.afterClosed().pipe(filter(result => result)).subscribe( result => {      
      console.warn(`Dialog close. Result: ${result}`);
    })
  }

  addItem(): void{
    console.log('123');
    let dialogConfig: MatDialogConfig = {};
    let _this = this;

    dialogConfig.data = {
      title: 'Add user',
      callback(result){
        console.warn(result);
        _this.dataSource.data.push(result);
      }
  };

    this.dialog
      .open(AddComponent, dialogConfig)
      // .afterClosed()
      // .pipe(filter(result => result))
      // .subscribe( result => {
      //   console.warn(result);
      // });
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
      const dialogRef = this.dialog.open(DeleteComponent, dialogConfig);
      
  }

  removeAllUsers(){
    this.dataSource.data = [];
  }

}
