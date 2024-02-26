import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/interface';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.scss']
})
export class BreakfastComponent implements OnInit {

  breakfastProduct: number = 0;
  productID: number = 0;
  productName: string = '';
  productPrice: number = 0;

  @Input() menuProducts: Product | undefined;

  @Output() getInfoProduct= new EventEmitter<{id:number, name: string, price:number, quantity: number}>();
  @Output() deleteProduct = new EventEmitter<{id:number, quantity: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  addProduct(id: number, name: string, price: number){
    this.breakfastProduct++
    this.productID = id; 
    this.productName = name;
    this.productPrice = price;
    this.getInfoProduct.emit({id: this.productID, name: this.productName, price: this.productPrice, quantity: this.breakfastProduct})
  }

  quitProduct(){
  if(this.breakfastProduct > 0){
    this.breakfastProduct--}
    this.deleteProduct.emit({id: this.productID, quantity: this.breakfastProduct});
  }

  deleteQuantity(id:number){
    if(this.productID === id){
      this.breakfastProduct = 0
    } 
  }
  

}
