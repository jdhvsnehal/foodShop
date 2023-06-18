import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from 'src/app/services/dish.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent {
  constructor(private router: Router, private dishService: DishService, private cartService: CartService) { 
    // window.location.reload();
  }
  role: string = localStorage.getItem('userRole') || '';
  dishes: [];
  categ: string;
  category = [
    { cat: "Indian" },
    { cat: "Continental" },
    { cat: "Italian" },
    { cat: "Mexican" },
    { cat: "Chinese" }
  ]
  ngOnInit() {
    if (this.role === '') {
      this.router.navigate(["/login"]);
    }
    this.dishService.allDishes().subscribe(data => {
      this.dishes = data;
    });
    this.cartService.getCart(this.userId).subscribe(data => {
      this.userData = data;
    })
  }
  name: string;
  description: string;
  imgUrl: string;
  price: number;
  showModal = false;
  identity: number;
  currDish: any[];
  nm: string;
  desc: string;
  pr: number;
  cate: string;
  imu: string;

  editDish(id: number) {
    this.identity = id;
    this.currDish = [this.dishes.find((d) => { return d['id'] === this.identity })];
    this.nm = this.currDish[0]['name'];
    this.desc = this.currDish[0]['description'];
    this.cate = this.currDish[0]['category'];
    this.imu = this.currDish[0]['imgUrl'];
    this.pr = this.currDish[0]['price'];
    this.showUpdate = true;
    console.log(this.nm, this.cate);
  }

  updateDish() {
    if (this.name == null) this.name = this.nm;
    if (this.categ == null) this.categ = this.cate;
    if (this.description == null) this.description = this.desc;
    if (this.imgUrl == null) this.imgUrl = this.imu;
    if (this.price == null) this.price = this.pr;
    this.dishService.updateDish(this.name, this.categ, this.description, this.imgUrl, this.price, this.identity).subscribe(dish => {
      this.router.navigate(['/dishes']);
      window.location.reload();
    })
    this.showUpdate = false;
  }
  showUpdate = false;
  deleteDish(id: number) {
    this.dishService.deleteDish(id).subscribe(() => {
      window.location.reload();
    });
  }
  userId: string = localStorage.getItem("userId") || "";
  userData : any = {};
  checkId(id: string) {
    if(id in Object.keys(this.userData["cart"])) return true;
    else false;
  } 
  increment(id: string) {
    this.userData["cart"][id] += 1;
    this.cartService.addToCart(this.userId, this.userData).subscribe();
  }
  decrement(id: string) {
    this.userData["cart"][id] -= 1;
    if(this.userData["cart"][id]===null){delete this.userData["cart"][id];}
    this.cartService.addToCart(this.userId, this.userData).subscribe();
  }
  addToCart(id: string) {
    this.userData["cart"][id] = 1;
    this.cartService.addToCart(this.userId, this.userData).subscribe();
  }
}
