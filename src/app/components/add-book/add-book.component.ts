import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookSevice } from 'src/app/shared/_services';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup;

  constructor(

    private formBuilder: FormBuilder,
    private bookService: BookSevice,

  ) { }

  ngOnInit() {

    this.bookForm = this.formBuilder.group({
      id: [null, [Validators.minLength(3),
                  Validators.required]
      ],
      title: [null, [Validators.pattern("^[A-za-z0-9_-]{2,15}$"),
                    Validators.required]
      ],
      authors: [null, [Validators.pattern("^[A-za-z0-9_-]{2,15}$"),
                    Validators.required]
      ],
      price: [null, [Validators.minLength(2),
                    Validators.required]
      ],
      amount: [null, [Validators.maxLength(3),
                    Validators.required]
      ],
      description: [null, [Validators.pattern("^[A-za-z0-9_-]{5,50}$")]

      ],
      cover: [null],
    })

  }

  submit(){
    if(this.bookForm.invalid){
      return;
    }
    console.log(this.bookForm.value);
    this.bookService.addBook(this.bookForm.value);
    this.bookForm.reset();
  }

}
