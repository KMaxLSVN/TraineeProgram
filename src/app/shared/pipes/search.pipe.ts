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
<<<<<<< HEAD
    console.log(allBooks);
    return allBooks.filter( item => item.title.toLowerCase().indexOf(filter.title.toLowerCase()) !== -1 || item.authors.some(author => author.toLowerCase().indexOf(filter.title.toLowerCase()) !== -1 ));
=======
    return allBooks.filter( item => item.title.toLowerCase().indexOf(filter.title.toLowerCase()) !== -1 );
    // || item.authors.some(result => result.toLowerCase().indexOf(filter.title.toLowerCase()))
>>>>>>> 256c5b5a8c45a648a8df2fd64acdfac537416186
  }

}
