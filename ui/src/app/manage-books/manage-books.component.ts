import { Component, OnInit } from '@angular/core';
import {BooksService} from '../services/books/books.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss']
})
export class ManageBooksComponent implements OnInit {

  booksList = Array();
  userId: string;
  image:File; 

  constructor(private booksService:BooksService, private router: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId").toString();
    //Retrieve a list of all the books 
    this.booksService.getBooks().subscribe(result => {
      for (let x in result) {
        var urls = result[x].images.split(';');
        //urls.pop(); 
        result[x].imageArray = urls;
        result[x].selectedIndex = 0;  
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
          alert("Book deleted");
          this.router.navigate(['/books'])
          console.log(response);
        })   
      }       
    }

    updateBook(bookId: string){
      alert(`ID is ${bookId}`)
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

    deleteImage(id){
      this.booksList.forEach(book => {
        if(book.id == id) {
          var imageUrl = book.imageArray[book.selectedIndex];
          book.imageArray.splice(book.selectedIndex,1);
          book.selectedIndex = 0;

          var updatedImageString = book.imageArray.join(';')
          this.booksService.updateBooksImages(id, updatedImageString, imageUrl).subscribe(result=>{

          })

        }
      })
    }

    onFileSelect(event){
      console.log(event.target.files);
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
        console.log(this.image);
        //this.uploadForm.get('profile').setValue(file);
        
      }
    }

    addImage(book){
      if(this.image!=null || this.image!=undefined){
        const formData = new FormData(); 
        formData.append("id", book.id);
        formData.append("images", book.images);
        formData.append("image", this.image);


    this.booksService.addImageToBook(formData)
    .subscribe(response => {
      alert("Book added");
      console.log(response);
      this.router.navigate(['/books']);

    })

      }
      else {
        alert("No image selected");
      }
    }
}
