import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPostComponent } from './posts/crear-post/crear-post.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { CarritoComponent } from './carrito/carrito.component';
import { DatesComponent } from './dates/dates.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'new', component: CrearPostComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:postId',
    component: CrearPostComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dates', component: DatesComponent },
  { path: 'carrito', component: CarritoComponent },
  {
    path: 'edituser/:userId',
    component: SignupComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
