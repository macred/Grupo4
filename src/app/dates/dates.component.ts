import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit {
  isAuth = true;
  user : User;
  userId!: string;
  private authListenerSub!: Subscription;

  constructor(private authService: AuthService) {
    this.user= {id: "",name: "", email:"", password: "", direccion: "", celular: ""}
  }

  ngOnInit(): void {

    this.userId = this.authService.getUserId();
    console.log(this.userId);
    this.user = this.authService.getUser(this.userId);
    this.authService.getUser(this.userId).subscribe((user: User) =>{
      console.log(user);

    this.user= user;
    });

    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
        console.log(this.userId)
        this.userId = this.authService.getUserId();
        console.log(this.user);
      });
  }
  ngOnDestroy() {
  }
}
