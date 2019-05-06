import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { LocalStorage } from 'src/app/_services/local-storage.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    public db: LocalStorage,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {    
   }

  ngOnInit() {
    console.log(this.data);
  }

  close(): void{
    this.confirmDelete(false);
    this.dialogRef.close();
  }

  confirmDelete(status: boolean): void {
      this.data.callback(status);
      this.dialogRef.close();
  }

}
