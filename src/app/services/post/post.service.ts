import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import{Subject} from 'rxjs';
import {Post} from '../../Models/post.model';
import { User } from '../../Models/user.model';

import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = 'http://localhost:3000/api/posts';
  posts: Post[] =[]
  postUpdated = new Subject<Post[]>();
  private postId!: string;
  private postStatusListener = new Subject<boolean>();
  private isAuthenticated = true;

  constructor(private http:HttpClient, private router: Router) { }

  addPost(post: Post, image:File){
    const postData = new FormData();
    postData.append("nombre", post.nombre);
    postData.append("precio", post.precio);
    postData.append("medida", post.medida);
    postData.append("descripcion", post.descripcion);
    postData.append('disponibilidad', post.disponibilidad);
    postData.append('unidades', post.unidades);
    postData.append('author', post.author);
    postData.append('image', image, post.nombre);
    this.http.post<{ post: Post }>(this.url, postData).subscribe((response) => {
      console.log(response.post);
      post.id = response.post.id;
      post.imageUrl = response.post.imageUrl;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  getPostId() {
    return this.postId;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  getPosts(){
    this.http.get<any>(this.url).pipe(map((postData)=>{
      return postData.map((post:{_id:string,nombre:string, precio:string, medida:string, descripcion: string, disponibilidad:string, unidades:string, imageUrl:string, author: string, authorData: User})=>{
        return{
          id:post._id,
          nombre:post.nombre,
          precio:post.precio,
          medida:post.medida,
          descripcion:post.descripcion,
          disponibilidad:post.disponibilidad,
          unidades:post.unidades,
          imageUrl: post.imageUrl,
          author: post.author,
          authorData: post.authorData,
          }
      })
    })).subscribe(
      (dataTransformed)=>{
        this.posts = dataTransformed;
        this.postUpdated.next([...this.posts]);
      })
  }

  getPost(id:string){
    return this.http.get<{_id:string,nombre:string, precio:string, medida:string, descripcion: string, disponibilidad:string, unidades:string, imageUrl:string, author: string;}>(this.url+"/"+id);
  }

  getPostStatusListener() {
    return this.postStatusListener.asObservable();
  }

  deletePost(id: string) {
    this.http.delete(this.url+"/"+id).subscribe((result) => {
      const updatedPost = this.posts.filter(post=> post.id !== id);
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostsUpdateListener(){
    return this.postUpdated.asObservable();
  }

  updatePost(post: Post, id: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image ==='object'){
      postData= new FormData();
      postData.append('id', id);
      postData.append('nombre', post.nombre);
      postData.append('precio', post.precio);
      postData.append('medida', post.medida);
      postData.append('descripcion', post.descripcion);
      postData.append('disponibilidad', post.disponibilidad);
      postData.append('unidades',post.unidades);
      postData.append('author', post.author);
      postData.append('image', image, post.nombre);
  }
  else{
    postData= post;
  }

    this.http.put(this.url + '/' + id, postData).subscribe((result) => {
      const updatedPost = [...this.posts];
      const oldPostIndex = updatedPost.findIndex((p) => p.id === post.id);
      updatedPost[oldPostIndex] = post;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    })
  }

}
