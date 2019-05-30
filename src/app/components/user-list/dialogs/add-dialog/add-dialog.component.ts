import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/_services';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  addForm: FormGroup;
  formData: any;

  constructor(

    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,

    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data,

  ) {}


  ngOnInit() {
    this.addForm = this.formBuilder.group({

      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
          Validators.required,
          Validators.email
        ]),
      password: new FormControl(null, Validators.required)

    });
  }

  submit(): void {
    console.log(this.addForm);
    this.api.addUser(this.addForm.value).subscribe(res=>{
      this.dialogRef.close(res);
    })
  }

  close(): void {
    this.dialogRef.close();
  }


}
