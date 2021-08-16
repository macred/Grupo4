import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../Models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarritoService } from '../services/carrito/carrito.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  total$: Observable<number>
  isAuth = false;
  user! : User;
  userId!: string;
  private authListenerSub!: Subscription;

  constructor(private authService: AuthService, private carritoService: CarritoService) {
    this.total$ = this.carritoService.getCarrito().
    pipe(
     map(post=> post.length)
    );
  }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuthenticated();
    this.userId = this.authService.getUserId();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }
}
