import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  user ={
    name: "",
    lastname: "",
    email: "",
    password: "",
    adress: "",
    movil: ""

  }

  constructor() { }

  ngOnInit(): void {
  }

  singUp(){}

}
