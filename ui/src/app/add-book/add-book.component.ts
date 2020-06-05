import { Component, OnInit } from '@angular/core';
import {Books} from '../models/books'
import {FormControl, Validators} from '@angular/forms';
import {BooksService} from '../services/books/books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  public isbn: string;
  public title: string;
  public authors: string;
  public price: number;
  public quantity: number;

  constructor(private booksService: BooksService, private router:Router) { }

  ngOnInit(): void {
  }


  // Method to create a new book
  submitBook(){
    this.booksService.addBook(this.isbn, this.title, this.authors, this.price, this.quantity)
      .subscribe(response => {
        alert("Book added");
        console.log(response);
        this.router.navigate(['/books']);

      })
  }

}
