import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Post} from '../../Models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private posts: Post[] = [];
  private carrito = new BehaviorSubject<Post[]>([]);

  total$ = this.carrito.asObservable();

  constructor() { }

  addPost(post: Post){
    this.posts = [...this.posts, post];
    this.carrito.next(this.posts);
}}
