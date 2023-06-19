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

  constructor(private cartService: CartService, private dishService: DishService, private router: Router) {
    if (this.role === '') {
      this.router.navigate(["/login"]);
    }
    this.price = 0;
    this.cartService.getCart(this.userId).subscribe(data => {
      this.userData = data;
      for(let i of Object.keys(this.userData["cart"])){
        this.dishService.getDish(i).subscribe(data => {
          this.allDishes.push(data);
          this.dish = data;
          console.log(this.dish);
          this.getPrice(i, 0);
        })
      }
    })
  }
  role: string = localStorage.getItem('userRole') || '';
  userId: string = localStorage.getItem("userId") || "";
  userData : any = {};
  dish : any = {};
  dishes : any[];
  allDishes : any[] = [];
  price: number;

  ngOnInit() {}
  getPrice (i: string, flag: number) {
    if(flag===1) {
      this.price += this.dish["price"];
    } else if(flag===2){
      this.price -= this.dish["price"];
    } else if(flag===0){
      this.price += this.dish["price"]*this.userData["cart"][i];
    }
  }
  checkId(id: string) {
    if(this.userData["cart"].hasOwnProperty(id)) return true;
    else false;
  } 
  increment(id: string) {
    this.userData["cart"][id] += 1;
    this.cartService.addToCart(this.userId, this.userData).subscribe();
    this.getPrice(id, 1);
  }
  decrement(id: string) {
    this.userData["cart"][id] -= 1;
    if(this.userData["cart"][id]===0 || this.userData["cart"][id]===null){delete this.userData["cart"][id];}
    this.cartService.addToCart(this.userId, this.userData).subscribe();
    this.getPrice(id, 2);
  }
}
