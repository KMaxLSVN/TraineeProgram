import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../_services/local-storage.service';
import { User } from '../_models';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-users-base',
  templateUrl: './users-base.component.html',
  styleUrls: ['./users-base.component.scss']
})
export class UsersBaseComponent implements OnInit {

  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'email', 'password', 'actions'];
  // dataSource: User[] = this.dbShift(this.db.getAllUsers());
  dataSource = new MatTableDataSource(this.dbShift(this.db.getAllUsers()));

  constructor(
    private db: LocalStorage,
  ) { 
    
  }

  ngOnInit() {
  }

  private applyFilter( value: any){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  private dbShift(users: User[]){
      users.shift();
      return users;
  }


}
