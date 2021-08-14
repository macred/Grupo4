import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/Models/user.model';

import { CarritoService } from '../../services/carrito/carrito.service';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from '../../Models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];

  @Input() post!: Post;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  postsSub: Subscription;
  isAuth = false;
  userId = 'ObjectId("60ff53f49962c228f0e90596")';

  private authListenerSub!: Subscription;

  constructor(
    public postService: PostService,
    public authService: AuthService,
    private carritoService: CarritoService,
  ) {
    this.postsSub = this.postService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  addPost(post: Post){
    console.log('Añadir al carrito');
    this.carritoService.addPost(post);
  }

  ngOnInit(): void {
    this.postService.getPosts();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    this.isAuth = this.authService.getIsAuthenticated();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }

  onDelete(id: string): void {
    this.postService.deletePost(id);
  }


}
