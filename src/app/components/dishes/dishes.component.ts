import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent {
  constructor (private router : Router, private dishService: DishService) { }
  role: string =  localStorage.getItem('userRole') || '';
  dishes : [];
  categ : string;
  category = [
    { cat : "Indian"},
    { cat : "Continental"},
    { cat : "Italian"},
    { cat : "Mexican"},
    { cat : "Chinese"}
  ]
  ngOnInit () {
    if(this.role===''){
      this.router.navigate(["/login"]);
    }
    this.dishService.allDishes().subscribe(data => {
      this.dishes = data;
      console.log(this.dishes);
    });
  }
  name:string;
  description: string;
  imgUrl: string;
  price: number;
  addDish () {
    this.dishService.addDish(this.name, this.categ, this.description, this.imgUrl, this.price).subscribe(dish => {
      this.router.navigate(['/dishes']);
      window.location.reload();
    })
  }
  showModal = false;
}
