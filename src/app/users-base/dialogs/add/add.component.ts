import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;

  constructor(

    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,


  ) {


  }


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

  submit(){
    console.log(this.addForm);
  }

  close(): void{
    this.dialogRef.close();
  }

}
