import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/model/ingredient.model';
import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', {static: false}) editForm: NgForm;
  editItem = false;
  editItemIndex: number;
  editIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService){}
  ngOnInit(): void {
    this.shoppingListService.startedEditItem.subscribe((index: number) => {
      this.editItem = true;
      this.editItemIndex = index;
      this.editIngredient =  this.shoppingListService.getIngredient(index);
      this.editForm.setValue({
        name: this.editIngredient.name,
        amount: this.editIngredient.amount
      });
    });
  }
  onSubmit(form: NgForm): void {
  const value = form.value;
  const newIngredient = new Ingredient(value.name, value.amount);
  if (this.editItem){
    this.shoppingListService.editIngredient(this.editItemIndex, newIngredient);
  }else{
    this.shoppingListService.addIngredients(newIngredient);
  }
  this.editItem = false;
  this.editForm.reset();
  }

  onClear(): void{
    this.editItem = false;
    this.editForm.reset();
  }
  onDelete(): void{
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
}
