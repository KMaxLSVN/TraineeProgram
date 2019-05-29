import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';

import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';

import { filter } from 'rxjs/operators';

import { User } from '../../shared/_models';
import { UserService, ApiService } from 'src/app/shared/_services';
import { LocalStorage } from '../../shared/_services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {


  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'userName', 'email', 'password', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  private usersBase: User[];
  private dataChange: BehaviorSubject<User[]>;

  constructor(

    private api: ApiService,
    private db: LocalStorage,
    private dialog: MatDialog,
    private userService: UserService,
  ) {
    // this.dataSource = new MatTableDataSource(this.getUserBase());

    this.usersBase = [];
    this.dataChange = <BehaviorSubject<User[]>>new BehaviorSubject([]);
  }

  ngOnInit() {
    this.renderMatTable();
  }

  get _usersBase() {
    return this.dataChange.asObservable();
  }

  public applyFilter(value: any){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  public renderMatTable = () => {
    // let userBase = this.db.getAllUsers();
    this.api.getUsers().subscribe(res => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res as User[];
      this.dataSource.paginator = this.paginator;
    });
  }

  addNew(): void{
    this.dialog
      .open(AddDialogComponent)
      .afterClosed()
      .pipe(filter(result => result))
      .subscribe(data => {        
          // this.userService.register(data).subscribe(result => {console.warn(result); this.dataSource.data = result});

          // this.api.addUser(data).subscribe( res => {this.dataSource.data.push(res); console.log(data)} );
          console.log(data);
          const newData = this.dataSource.data;
          newData.push(data);
          this.dataSource.data = newData;
    })
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
              .subscribe(res => {
                console.log(res);
                this.dataSource.data = res;
              });

  }

  deleteItem(user: User) {
    let dialogConfig: MatDialogConfig = {};
    let _this = this;

    dialogConfig.data = {
        title: 'Remove user',
        user: user,
        // callback(status: boolean){
        //   if(status){
        //     _this.api.deleteUser(user.id).subscribe((result: any) => _this.dataSource.data = result);
        //   }
        // }
    };
      const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

      dialogRef
        .afterClosed()
        .pipe(filter(result=>result))
        .subscribe(res => {
          console.log(res);
          const newData = this.dataSource.data;
          newData.filter(elem => elem.id != res );
          this.dataSource.data = newData;
        })
      
  }

}
