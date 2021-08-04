import { Component, OnInit } from '@angular/core';
import { Post } from '../Models/post.model';
import { CarritoService } from '../services/carrito/carrito.service';
import { PostService } from '../services/post/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  isAuth = true;
  posts!: Post[];
  post!: Post;
  postId!: string;
  private postListenerSub!: Subscription;

  constructor(private carritoService: CarritoService,
              public route: ActivatedRoute,
              private postService: PostService) {


                this.postListenerSub =this.carritoService.getCarrito().subscribe((post: Post[])=>{
                  this.posts = post;
                })
   }

  ngOnInit(): void {
  this.posts = this.carritoService.getPosts();
  this.postListenerSub =this.carritoService.getCarrito().subscribe((post: Post[])=>{
    this.posts = post;
  })
}}
