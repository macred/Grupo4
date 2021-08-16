import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PostService } from '../post/post.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  url = 'http://localhost:3000/api/user';
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private userId!: string;
  users: User[] = [];
  userUpdated = new Subject<User[]>();


  constructor(private http: HttpClient, private router: Router) {
    this.token = '';
  }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUsersUpdateListener(){
    return this.userUpdated.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  updateUser(user: User, id: string) {
    this.http.put(this.url + "/" + id, user).subscribe((result)=>{
      const updatedUser = [...this.users];
      const oldUserIndex = updatedUser.findIndex (p => p.id === user.id);
      updatedUser[oldUserIndex] = user;
      this.userUpdated.next([...this.users]);
      this.router.navigate(["/dates"]);
    })
  }

  createUser(user: User) {
    this.http.post(this.url + '/signup', user).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  getUser(userId: string): any{
    return this.http.get<User>(this.url + '/' + userId).pipe(map((response) => {
      return response;
    }));
  }

  getUse(id:string){
    return this.http.get<{_id: string,
                          name:string,
                          email:string,
                          password:string,
                          direccion: string,
                          celular:string}>(this.url+"/"+id);
  }

  login(email: string, password: string) {
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(this.url + '/login', {
        email,
        password,
      })
      .subscribe((response) => {
        this.token = response.token;
        if (this.token) {
          const expirationInDuration = response.expiresIn;
          this.setAuthTimer(expirationInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expirationInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(this.token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.userId = '';
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expiration')!);
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
        token: token,
        expirationDate: expirationDate,
        userId: userId,
      };
    }

  private setAuthTimer(duration: number) {
    setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = localStorage.getItem('token')!;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  };


}
