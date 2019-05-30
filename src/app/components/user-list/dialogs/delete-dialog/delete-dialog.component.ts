import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { LocalStorage } from 'src/app/shared/_services/local-storage.service';
import { ApiService } from 'src/app/shared/_services';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  checkboxFlag: boolean;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    public db: LocalStorage,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {    
   }

  ngOnInit() {
    console.log(this.data);
  }

  close(): void{
    this.dialogRef.close();
  }

  confirmDelete(status: boolean): void {
      // this.data.callback(status);
      this.api.deleteUser(this.data.user.id).subscribe(res => {
        console.log(res);
        this.dialogRef.close(this.data.user.id);
      })
  }

}
