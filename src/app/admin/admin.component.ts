import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @Input() isAdmin: boolean;

  constructor() {
  }

  ngOnInit() {
    console.log('admin.component -- ', this.isAdmin);
  }
}
