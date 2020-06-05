import { Component, OnInit } from '@angular/core';
import {BooksService} from '../services/books/books.service'

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss']
})
export class ManageBooksComponent implements OnInit {

  booksList = Array();
  userId: string;

  constructor(private booksService:BooksService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId").toString();
    //Retrieve a list of all the books 
    this.booksService.getBooks().subscribe(result => {
      for (let x in result) {
        this.booksList.push(result[x])
      }
    })
  }


    // Method to create a new book
    deleteBook(bookId: string){
      var retVal = confirm("Are you sure you want to delete the book?");
      if( retVal == true ) {
        this.booksService.deleteBook(bookId)
        .subscribe(response => {
          console.log(response);
        })   
      }       
    }

    updateBook(bookId: string){
      alert(`ID is ${bookId}`)
    }

}
