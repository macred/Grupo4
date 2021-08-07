import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Post} from '../../Models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  posts: Post[] = [];

  carrito = new Subject<Post[]>();


  constructor() { }

  addPost(post: Post){
    this.posts.push(post);
    console.log(this.posts)
    this.carrito.next([...this.posts])
}
  getPosts(){
    return this.posts;
}
  getCarrito(){
    console.log(this.posts)
    return this.carrito.asObservable();
}
}
