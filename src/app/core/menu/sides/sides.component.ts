import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/interface';

@Component({
  selector: 'app-sides',
  templateUrl: './sides.component.html',
  styleUrls: ['./sides.component.scss']
})
export class SidesComponent implements OnInit {

  sidesProduct: number = 0;
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
    this.sidesProduct++;
    this.productID = id; 
    this.productName = name;
    this.productPrice = price;
    this.getInfoProduct.emit({id: this.productID, name: this.productName, price: this.productPrice, quantity: this.sidesProduct});
  }

  quitProduct(){
  if(this.sidesProduct > 0){
    this.sidesProduct--};
    this.deleteProduct.emit({id: this.productID, quantity: this.sidesProduct});
  }

  deleteQuantity(id:number){
    if(this.productID === id){
      this.sidesProduct = 0
    } 
  }

}
