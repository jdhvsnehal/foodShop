import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from 'src/app/services/dish.service';
import { Dish } from 'src/app/models/dish.model';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent {
  constructor (private router : Router, private dishService : DishService) { }
  name:string;
  description: string;
  imgUrl: string;
  price: number;
  categ : string;
  category = [
    { cat : "Indian"},
    { cat : "Continental"},
    { cat : "Italian"},
    { cat : "Mexican"},
    { cat : "Chinese"}
  ]
  addDish () {
    this.dishService.addDish(this.name, this.categ, this.description, this.imgUrl, this.price).subscribe(dish => {
      this.router.navigate(['/dishes']);
      window.location.reload();
    })
  }
  
  @Input('show')
  show = true;

  @Output('close')
  onClose = new EventEmitter()
}
