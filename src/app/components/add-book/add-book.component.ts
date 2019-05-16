import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormGroupDirective } from '@angular/forms';
import { BookSevice } from 'src/app/shared/_services';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Book } from 'src/app/shared/_models';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  // Image Cropper
  imageChangedEvent: any = '';
  croppedImage: any = '';

  book: Book;
  bookForm: FormGroup;

  private imageSrc: string = '';

  constructor(

    private formBuilder: FormBuilder,
    private bookService: BookSevice,

  ) { }

  ngOnInit() {

    this.bookForm = this.formBuilder.group({
      id: ['', [Validators.minLength(3),
                  Validators.required]
      ],
      title: ['', [Validators.pattern("^[A-za-z0-9_-]{2,15}$"),
                    Validators.required]
      ],
      authors: this.formBuilder.array([
        this.formBuilder.control ('', [Validators.pattern("^[A-za-z0-9_-]{2,15}$"),
        Validators.required])
      ]),
      
      price: ['', [Validators.minLength(2),
                    Validators.required]
      ],
      amount: ['', [Validators.maxLength(3),
                    Validators.required]
      ],
      description: [''],
      cover: [''],
    })

  }

  get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthor() {
    this.authors.push(this.formBuilder.control(''));
  }


  // addCover(event){
  //   const file = event.target.files[0];
  //   console.log(file);
  //   if(file.size >= 2e+6) {
  //     console.log('load another image');
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = e => {
  //     // review
  //     this.bookForm.controls.cover.patchValue = e.target['result'];
  //     // review
  //     this.imageSrc = e.target['result'];
  //   }
  //   reader.readAsDataURL(file);
  // }

  // Image Cropper
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }


  submit(formDirective: FormGroupDirective): void {
    if(this.bookForm.valid){
      console.log(this.bookForm.value);
      this.book = this.bookForm.value;
      // if(this.bookForm.controls.cover.patchValue){
      //   book['image'] = this.bookForm.controls.cover.patchValue;
      // } else {
      //   book['image'] = '';
      // }
      this.book['image'] = this.croppedImage;
      console.log(this.book);
      this.bookService.addBook(this.book);
      formDirective.resetForm();
      this.bookForm.reset();
      this.imageChangedEvent = null;
    }
  }

}
