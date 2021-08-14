import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import {Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user!: User;
  private isEditing = false;
  users: User[] = [];
  private userId!: string;


  constructor(public authService: AuthService, public route: ActivatedRoute) {
    this.user= {
     id: "",
     name: "",
     email: '',
     password: "",
     direccion: "",
     celular: ''};
  }

  ngOnInit(): void {
   this.route.paramMap.subscribe((paramMap: ParamMap) => {
     if (paramMap.has("userId")){
      this.isEditing = true;
      this.userId = paramMap.get("userId")!;
      this.authService.getUse(this.userId).subscribe(userData =>{
        this.user = {
          id: userData._id,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          direccion: userData.direccion,
          celular: userData.celular}
      })
     }else{
       this.isEditing = false;
       this.userId = null!;
     }
   })
  }


  onSignup(form:NgForm): void {
    if(form.invalid){
      return
    }
    if(this.isEditing){
      this.authService.updateUser(form.value, this.userId);
    }else{
      this.authService.createUser(form.value);
    }
    form.resetForm();
  }
}
