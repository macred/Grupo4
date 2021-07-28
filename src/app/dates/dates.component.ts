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
  user! : User;
  userId!: string;
  private authListenerSub!: Subscription;

  constructor(private authService: AuthService) {
    this.user= {name: "", email:"", password: "", direccion: "", celular: ""}
  }

  ngOnInit(): void {

    this.userId = this.authService.getUserId();
    console.log(this.userId);
    console.log(this.user);
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
        console.log(this.userId)
        this.userId = this.authService.getUserId();
        this.user = this.authService.getUser(this.userId);
        console.log(this.user);
      });
  }
  ngOnDestroy() {
  }
}
