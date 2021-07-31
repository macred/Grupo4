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
  posts$: Observable<Post[]>;

  postId!: string;
  private postListenerSub!: Subscription;

  constructor(private carritoService: CarritoService,
              public route: ActivatedRoute,
              private postService: PostService) {


    this.posts$ = this.carritoService.carrito$.pipe(
      map((posts) => {
      const distintos = [...new Set(posts)];
      return distintos;
    }));
   }

  ngOnInit(): void {

}}
