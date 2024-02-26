import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product } from '../../interfaces/interface';

@Component({
  selector: 'app-beverages',
  templateUrl: './beverages.component.html',
  styleUrls: ['./beverages.component.scss']
})
export class BeveragesComponent implements OnInit {

  beverageProduct: number = 0;
  productID: number = 0;
  productName: string = '';
  productPrice: number = 0;

  @Input() menuProducts: Product | undefined;

  @Output() getInfoProduct = new EventEmitter<{id:number, name: string, price:number, quantity: number}>();
  @Output() deleteProduct = new EventEmitter<{id:number, quantity: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  addProduct(ID:number, productName: string, productPrice:number){
      this.productID = ID;
      this.productName = productName;
      this.productPrice = productPrice;
      if(this.beverageProduct >= 0){
        this.beverageProduct++;
      }
      this.getInfoProduct.emit({id: this.productID, name: this.productName, price: this.productPrice, quantity: this.beverageProduct});
   }

  quitProduct(){
    if(this.beverageProduct > 0){
      this.beverageProduct--}
    this.deleteProduct.emit({id: this.productID, quantity: this.beverageProduct});
  }

  deleteQuantity(id:number){
    if(this.productID === id){
      this.beverageProduct = 0
    } 
  }

}
