import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})


export class CartComponent implements OnInit {
  cartList = [];
  deletedItemsList = Array(); 

  constructor(private cartService: CartService, private router:Router) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(result => {
      
      for (let x in result) {
        this.cartList.push(result[x])
        console.log(result[x])
      }
      console.log("this is the cartlist", this.cartList);
    })

    //this.getDeletedItems();
  }

  removeItem(itemId: string){
    //alert(`id is ${itemId}`);
    this.cartService.deleteFromCart(itemId).subscribe(result => {
      console.log(result);
      location.reload();
    })
  }

  updateItem(event, itemId:string, bookId: string){
    let newQuantity = event.target.value; 
    alert(`new quantity ${newQuantity}`)
    this.cartService.updateCart(itemId, bookId, newQuantity).subscribe(result => {
      console.log(result);
      location.reload();
      //this.router.navigate(['/home']);
    })
    
  }

  /*getDeletedItems(){
    this.cartService.getDeletedItems().subscribe(result => {
      for (let x in result) {
        this.deletedItemsList.push(result[x])
      }
      console.log(this.deletedItemsList);
    })
  }*/ 

}
