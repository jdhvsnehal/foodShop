import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private cartService: CartService, private dishService: DishService) {}

  userId: string = localStorage.getItem("userId") || "";
  userData : any = {};

  ngOnInit() {
    this.cartService.getCart(this.userId).subscribe(data => {
      this.userData = data;
    })
  }
  dish : any = {};
  dishes : any[];
  
  
  getDish (id:string) {
    this.dishService.getDish(id).subscribe(data => {
      this.dish = data;
      return this.dish; 
    })
  }
  checkId(id: string) {
    if(this.userData.cart.hasOwnProperty(id)) return true;
    else false;
  } 
  increment(id: string) {
    this.userData.cart[id] += 1;
    this.cartService.addToCart(this.userId, this.userData).subscribe();
  }
  decrement(id: string) {
    this.userData.cart[id] -= 1;
    if(this.userData.cart[id]===0){delete this.userData.cart[id];}
    this.cartService.addToCart(this.userId, this.userData).subscribe();
  }
}
