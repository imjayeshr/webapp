import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BooksService} from '../../services/books/books.service'
import {Books} from '../../models/books'
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {
  
  id: string
  book: Books
  
  constructor(private route: ActivatedRoute, private bookService: BooksService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.bookId; 
    this.bookService.getSpecificBook(this.id).subscribe(result => {
      this.book = result[0];
      console.log("Book object now is : ", this.book)
    })
  }

  updateBook(){
    this.bookService.updateBook(this.book.isbn, this.book.title, this.book.authors, this.book.price, this.book.quantity, this.id)
      .subscribe(result => {
        console.log(result);
      })
  }
  

}
