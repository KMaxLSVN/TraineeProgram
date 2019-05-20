import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalStorage } from 'src/app/shared/_services/local-storage.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  editForm: FormGroup

  constructor(

    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private db: LocalStorage,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
    })

    // Set current user's input value
    this.editForm.get('firstName').setValue(this.data.user.firstName);
    this.editForm.get('lastName').setValue(this.data.user.lastName);

  }

  submit(){
    if(this.editForm.dirty){
      let result = this.editForm.value;
      result.email = this.data.user.email;
      this.dialogRef.close(this.db.updateUser(result));
    }
  }

  close(): void{
    this.dialogRef.close();
  }

}
