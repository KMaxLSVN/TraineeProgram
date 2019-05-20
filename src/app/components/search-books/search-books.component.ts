import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { from, of, Subject } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { delay } from 'rxjs/internal/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss']
})
export class SearchBooksComponent implements OnInit {

  @Output() onSearchPicked: EventEmitter<any> = new EventEmitter<any>();
  modelChanged: Subject<string> = new Subject<string>();
  model: Subject<string>;

  constructor(
  ) {
    this.modelChanged.pipe(
      debounceTime(2000), 
      distinctUntilChanged())
      .subscribe(model =>  this.onSearchPicked.emit(model));

  }

  ngOnInit() {
  }

  changed(text: string) {
    this.modelChanged.next(text);
}

  // onSearch(result){
  //   console.log('immediately', result.target.value);
  //   let inputValue: string = result.target.value;
  //   this.searchInput.valueChanges.debounceTime(1000).subscribe( timedItem => {
  //     console.log(timedItem);
  //     this.onSearchPicked.emit(timedItem);
  //   });
  //   // this.onSearchPicked.emit(inputValue);
  // }

}
