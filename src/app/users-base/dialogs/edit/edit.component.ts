import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalStorage } from 'src/app/_services/local-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup

  constructor(

    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditComponent>,
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
    let result = this.editForm.value;
    result.email = this.data.user.email;
    console.log(result);
    this.dialogRef.close(result);
  }

  close(): void{
    this.dialogRef.close();
  }

}
