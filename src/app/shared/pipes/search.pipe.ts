import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../_models';

@Pipe({
  name: 'search',
  pure: false,
})
export class SearchPipe implements PipeTransform {

  transform(allBooks: Book[], filter: Book): Book[] {
    if(!allBooks || !filter){
      return allBooks;
    }
    console.log(allBooks);
    return allBooks.filter( item => item.title.toLowerCase().indexOf(filter.title.toLowerCase()) !== -1 || item.authors.some(author => author.toLowerCase().indexOf(filter.title.toLowerCase()) !== -1 ));
  }

}
