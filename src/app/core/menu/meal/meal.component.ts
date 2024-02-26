import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/interface';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {


  mealProduct: number = 0;
  productID: number = 0;
  productName: string = '';
  productPrice: number = 0;

  @Input() menuProducts: Product | undefined;
  @Output() getInfoProduct = new EventEmitter<{id:number, name: string, price:number, quantity: number}>();
  @Output() deleteProduct = new EventEmitter<{id:number, quantity: number}>();
  

  constructor() { }

  ngOnInit(): void {
  }

  addProduct(id: number, name: string, price: number){
    this.mealProduct++;
    this.productID = id; 
    this.productName = name;
    this.productPrice = price;
    this.getInfoProduct.emit({id: this.productID, name: this.productName, price: this.productPrice, quantity: this.mealProduct})
  }

  quitProduct(){
  if(this.mealProduct > 0){
    this.mealProduct--}
    this.deleteProduct.emit({id: this.productID, quantity: this.mealProduct});
  }

  deleteQuantity(id:number){
    if(this.productID === id){
      this.mealProduct = 0
    } 
  }
}
