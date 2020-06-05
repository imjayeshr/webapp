import { Component, OnInit } from '@angular/core';
import {BooksService} from '../services/books/books.service'
import {CartService} from '../services/cart/cart.service'
@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {

  booksList = Array();
  userId: string;
  selectedQuantity: number; 

  constructor(private booksService:BooksService, private cartService:CartService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId").toString();
    //Retrieve a list of all the books 
    this.booksService.getBooks().subscribe(result => {
      console.log("received from getBooks", typeof result[0]);
      for (let x in result) {
        result[x].cartQuantity = 1; 
        this.booksList.push(result[x])
        console.log(result[x].cartQuantity , typeof result[x]);
      }
    })
  }

  addToCart(bookId:string, quan:number){
    alert(`Quantity : ${quan} and book id is ${bookId}`)
    this.cartService.addToCart(bookId, quan).subscribe(result => {
      console.log(result);
    })
  }

}
