import { Recipe } from './../model/recipe.model';
import { RecipeService } from './../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }
  onSubmit(): void{
    const newRecipe = new Recipe(
    this.recipeForm.value.name,
    this.recipeForm.value.description,
    this.recipeForm.value.imagePath,
    this.recipeForm.value.ingredients);
    if (this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
    }else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }
  private initForm(): void{
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients){
        for (const ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount :  new FormControl(ingredient.amount,
                [Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description : new FormControl(recipeDescription, Validators.required),
      imagePath : new FormControl(recipeImagePath, Validators.required),
      ingredients : recipeIngredients
    });
  }
  addIngredients(): void{
    (this.recipeForm.get('ingredients') as FormArray).push(
       new FormGroup({
      name: new FormControl(null, Validators.required),
      amount :  new FormControl(null, [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }
  // tslint:disable-next-line:typedef
  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  onCancel(): void{
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  deleteIngredient(index: number): void{
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);

  }
}
