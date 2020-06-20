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
  public image: File;
  public allImages: []; 

  constructor(private booksService: BooksService, private router:Router) { }

  ngOnInit(): void {
  }


  // Method to create a new book
  submitBook(){
    const formData = new FormData();
    const userId = localStorage.getItem('userId').toString();

    for(let img of this.allImages){
      formData.append('image', img);
    }
    
    formData.append("userId", userId);
    formData.append('isbn', this.isbn);
    formData.append('title', this.title);
    formData.append('authors', this.authors);
    formData.append('price', this.price.toString());
    formData.append('quantity', this.quantity.toString());

    console.log(formData);

    this.booksService.addBook(formData)
      .subscribe(response => {
        alert("Book added");
        console.log(response);
        this.router.navigate(['/books/manage']);

      })

    /*this.booksService.addBook(this.isbn, this.title, this.authors, this.price, this.quantity)
      .subscribe(response => {
        alert("Book added");
        console.log(response);
        this.router.navigate(['/books/manage']);

      })*/ 
  }

  onFileSelect(event){
    console.log(event.target.files);
    if (event.target.files.length > 0) {
      //this.image = event.target.files[0];
      //console.log(this.image);
      //this.uploadForm.get('profile').setValue(file);
      this.allImages = event.target.files; 
    }
  }

}
