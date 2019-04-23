import {Book} from '../_models/book';

export class BookSevice {

    private data: Book[] = [
        {
            id: 123,
            title: "THE OLD MAN AND THE SEA",
            author: "Ernest Hemingway",
            price: 2000,
        }
    ];
    getData(): Book[] {
        return this.data;
    }
    addData( id: number, title: string, author: string, price: number) {
        this.data.push(new Book());
    }
}