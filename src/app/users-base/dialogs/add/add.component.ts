import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddComponent>
  ) { }

  ngOnInit() {
  }

  close(): void{
    this.dialogRef.close();
  }

}
