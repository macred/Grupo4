import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productslistadmin',
  templateUrl: './productslistadmin.component.html',
  styleUrls: ['./productslistadmin.component.css']
})
export class ProductslistadminComponent implements OnInit {

  product ={
    name: "",
    precio: "",
    medida: "",
    description: "",
    disponibilidad:"",
    unidades: "",
    image: ""

  }

  constructor() { }

  ngOnInit(): void {
  }

  createProduct(){}

}
