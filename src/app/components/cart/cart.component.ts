import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { DishService } from 'src/app/services/dish.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private cartService: CartService, private dishService: DishService, private router: Router) {}
  role: string = localStorage.getItem('userRole') || '';
  userId: string = localStorage.getItem("userId") || "";
  userData : any = {};
  dishes : any[];
  allDishes : any[] = [];

  ngOnInit() {
    if (this.role === '') {
      this.router.navigate(["/login"]);
    }
    this.cartService.getCart(this.userId).subscribe(data => {
      this.userData = data;
      for(let i of Object.keys(this.userData["cart"])){
        this.dishService.getDish(i).subscribe(data => {
          this.allDishes.push(data);
        })
      }
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
