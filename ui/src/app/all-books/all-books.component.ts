import { Component, OnInit } from '@angular/core';
import {BooksService} from '../services/books/books.service'
import {CartService} from '../services/cart/cart.service'
import { element } from 'protractor';
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
      console.log("received from getBooks", result);
      for (let x in result) {
        console.log(result[x].images)
        var urls = result[x].images.split(';');
        //urls.pop(); 
        console.log(urls);
        
        result[x].imageArray = urls;
        result[x].selectedIndex = 0;  
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

  nextImage(id){
    this.booksList.forEach(book => {
      if(book.id == id) {
        if(book.selectedIndex != book.imageArray.length-1)
        {
          book.selectedIndex = book.selectedIndex + 1;
        }
      }
    })
    
  }

  prevImage(id){
    this.booksList.forEach(book => {
      if(book.id == id) {
        if(book.selectedIndex != 0)
        {
          book.selectedIndex = book.selectedIndex - 1;
        }
      }
    })
    
  }

}
