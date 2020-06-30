import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BooksService} from '../../services/books/books.service'
import {Books} from '../../models/books'
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {
  
  id: string
  book : Books
  isbn: string
  title: string
  authors: string
  publication_date: string
  price: number
  quantity: number

  constructor(private route: ActivatedRoute, private bookService: BooksService, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.bookId; 
    this.bookService.getSpecificBook(this.id).subscribe(result => {
      console.log("received from back", result);
      this.book = result;
      this.isbn = result.isbn
      this.title = result.title
      this.authors = result.authors
      this.publication_date = "123"
      this.price = result.price
      this.quantity = result.quantity

      console.log("Book object now is : ", this.book)
    })
  }


  /*updateBook(){
    this.bookService.updateBook(this.book.isbn, this.book.title, this.book.authors, this.book.price, this.book.quantity, this.id)
      .subscribe(result => {
        alert("Book updated");
        console.log(result);
        this.router.navigate(['/books/manage']);
      })
  }*/ 
  
  updateBook(){
    this.bookService.updateBook(this.isbn, this.title, this.authors, this.price, this.quantity, this.id)
      .subscribe(result => {
        alert("Book updated");
        console.log(result);
        this.router.navigate(['/books/manage']);
      })

  }

}
