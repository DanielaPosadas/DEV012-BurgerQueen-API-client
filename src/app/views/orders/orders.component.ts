import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { FinalProducts, OrderKitchen, OrderProduct, Product } from 'src/app/core/interfaces/interface';
import { BeveragesComponent } from 'src/app/core/menu/beverages/beverages.component';
import { BreakfastComponent } from 'src/app/core/menu/breakfast/breakfast.component';
import { MealComponent } from 'src/app/core/menu/meal/meal.component';
import { SidesComponent } from 'src/app/core/menu/sides/sides.component';
import { APIService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  mySuscription: Subscription | undefined;

  AllProducts: Product[] | undefined;
  customerName: string = '';
  idProduct: number = 0;
  nameProduct: string = '';
  priceProduct: number = 0;
  detailProduct: OrderProduct | undefined;
  quantityProduct: number= 0;
  totalOrder: number = 0;
  message: string = '';

  addProductToOrder: OrderProduct[] = [];
  orderKitchen: OrderKitchen | undefined;
  listFinalProducts: FinalProducts | undefined;

  showMenuBreakfast: boolean = false;
  showMenuBeverages: boolean = false;
  showMenuHamburger: boolean = false;
  showMenuSides: boolean = false;
  showOrderResume: boolean = false;
  
  AllBreakfastProducts: Product[] | undefined;
  AllBeveragesProducts: Product[] | undefined;
  AllHamburgersProducts: Product[] | undefined;
  AllSidesProducts: Product[] | undefined;

  
  @ViewChildren('Breakfast') breakfast!: QueryList<BreakfastComponent>;
  @ViewChildren('Meal') meal!: QueryList<MealComponent>;
  @ViewChildren('Beverages') beverages!: QueryList<BeveragesComponent>;
  @ViewChildren('Sides') sides!: QueryList<SidesComponent>;

  constructor( private service: APIService) { }

  ngOnInit(): void {

    this.getProducts();
  }

//Obtener todos los productos del menú
getProducts(){
  this.mySuscription = this.service.AllProducts().subscribe(resProducts => {
  this.AllProducts = resProducts;

  this.AllBreakfastProducts = this.AllProducts?.filter(product => product.type === 'Breakfast');

  this.AllBeveragesProducts = this.AllProducts?.filter(product => product.type === 'Beverages');

  this.AllHamburgersProducts = this.AllProducts?.filter(product => product.type === 'Lunch' || product.type === 'Combos');

  this.AllSidesProducts = this.AllProducts?.filter(product => product.type === 'Sides');
  })
}

//Obtener el nombre del usuario para mostrarlo en el resumen de orden
getCustomerName(){
  const inputValue = document.getElementById('inputName') as HTMLInputElement;
  this.customerName = inputValue.value;
  localStorage.setItem('customerName', inputValue.value);
  inputValue.value = '';
  this.message = '';
}

//Mostrar y ocultar el menú de breakfast
menuBreakfast(){
  this.showMenuBreakfast = !this.showMenuBreakfast;
  this.showMenuBeverages = false;
  this.showMenuHamburger = false;
  this.showMenuSides = false;
}

//Mostrar y ocultar el menú de beverages
menuBeverages(){
  this.showMenuBeverages = !this.showMenuBeverages;
  this.showMenuBreakfast = false;
  this.showMenuHamburger = false;
  this.showMenuSides = false;
}

//Mostrar y ocultar el menú de hamburguesas
menuHamburger(){
  this.showMenuHamburger = !this.showMenuHamburger;
  this.showMenuBeverages = false;
  this.showMenuBreakfast = false;
  this.showMenuSides = false;
}

//Mostrar y ocultar el menú de hamburguesas
menuSides(){
  this.showMenuSides = !this.showMenuSides;
  this.showMenuBeverages = false;
  this.showMenuBreakfast = false;
  this.showMenuHamburger = false;
}

//Mostrar y ocultar el resumen de la orden
orderResume(){
  this.showOrderResume = !this.showOrderResume;
}

//Agregar ALIMENTOS al resumen de orden
getInfoProduct(ID:number, name: string, price:number, quantity:number){
this.idProduct = ID;
this.nameProduct = name;
this.priceProduct = price;
this.quantityProduct = quantity;
this.detailProduct = {id: this.idProduct, name: this.nameProduct, price: this.priceProduct, quantity: this.quantityProduct};

//Aumentar la cantidad sin repetir el producto
const newProduct = this.addProductToOrder.findIndex(product => product.id === this.idProduct);
if (newProduct !== -1) {
  // Si el producto ya existe, aumenta la cantidad
  this.addProductToOrder[newProduct].quantity++;
} else {
  // Si el producto no existe, agregarlo a la lista
  this.addProductToOrder.push(this.detailProduct);
}
this.totalPriceOrder();
}

deleteProduct(ID: number, quantity:number){
  this.idProduct = ID;
  this.quantityProduct = quantity;
  const newProduct = this.addProductToOrder.findIndex(product => product.id === this.idProduct);
if (newProduct !== -1) {
  if(this.addProductToOrder[newProduct].quantity > 1){
    this.addProductToOrder[newProduct].quantity--;
} else {
    this.addProductToOrder.splice(newProduct, 1);
}}
this.totalPriceOrder();
}

totalPriceOrder(){
  this.totalOrder = this.addProductToOrder.reduce((total, product) => {
    if (product.quantity > 1) {
      return total + (product.price * product.quantity);
    } else {
      return total + product.price;
    }
  }, 0);
}

deleteProductWithButton(ID:number){
  this.idProduct = ID;
  const newProduct = this.addProductToOrder.findIndex(product => product.id === this.idProduct);
  if(newProduct !== -1){
    this.addProductToOrder.splice(newProduct, 1);
    
    this.totalPriceOrder();

    this.breakfast.forEach(component => {
      component.deleteQuantity(this.idProduct)
    });
    this.meal.forEach(component => {
      component.deleteQuantity(this.idProduct)
    });
    this.beverages.forEach(component => {
      component.deleteQuantity(this.idProduct)
    });
    this.sides.forEach(component => {
      component.deleteQuantity(this.idProduct)
    });
  }
}

sendOrderChef(){
  const idUser = localStorage.getItem('idUser');
  const NumIdUser = idUser ? parseInt(idUser) : 0;
  const customerName = localStorage.getItem('customerName');
  const StrCustomerName = customerName ? customerName.toString() : '';
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  this.orderKitchen = {
    "userId": NumIdUser,
    "client": StrCustomerName,
    "products": [],
    "status": "pending",
    "dateEntry": date
  }
  
  this.addProductToOrder.forEach(product => {

    this.listFinalProducts = {
      "qty": product.quantity,
      "product": {
          "id": product.id,
          "name": product.name,
          "price": product.price,
          "dateEntry": date
      }
    };
    if(this.listFinalProducts !== undefined){
      this.orderKitchen?.products.push(this.listFinalProducts)
    }
  })
  console.log('para cocina', this.orderKitchen)
  if(this.customerName === ''){
    this.message = 'Ingresa nombre del cliente';
  } else {
    this.addProductToOrder = [];
    this.totalOrder = 0;
    this.customerName = '';}

    this.mySuscription = this.service.customerOrder(this.orderKitchen).subscribe(respOrder => {
      console.log(respOrder);
    })
}

ngOnDestroy(): void {
  if (this.mySuscription) {
    this.mySuscription.unsubscribe();
    }
  }

}
