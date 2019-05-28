import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

import { ApiService, AuthService } from '../../shared/_services';
import { User } from '../../shared/_models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  title = 'Registration';
  btnName: string = 'Register';
  errorMsg: string = '';

  @Output() postForm: EventEmitter<any> = new EventEmitter;

  @Output() onChangeUserBase: EventEmitter<{}> = new EventEmitter();

  registerForm: FormGroup;

  model: User = <User>{};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,

    private auth: AuthService,
    private api: ApiService,
  ) {
    if ((this.auth.isAuthenticated())) {
      this.router.navigate(['/books']);
    }
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,
      Validators.pattern("^[A-za-z0-9_-]{2,15}$")]
      ],
      lastName: ['', [Validators.required,
      Validators.pattern("^[a-z0-9_-]{2,15}$")]
      ],
      userName: [null, Validators.pattern("^[a-z0-9_-]{2,15}$")
      ],
      email: ['', [Validators.required,
      // Validators.email,]
      Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]
      ],
      password: ['', [Validators.required,
      Validators.minLength(3)]
      ]
    })

  }

  get f() {
    return this.registerForm.controls;
  }

  public async onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.api.addUser(this.registerForm.value).subscribe(data => {
      console.log('Reg data:',data);
      this.router.navigate(['/login']);
    }, error => {
      this.errorMsg = error;
    });

  }

}