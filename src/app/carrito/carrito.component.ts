import { Component, OnInit } from '@angular/core';
import { Post } from '../Models/post.model';
import { CarritoService } from '../services/carrito/carrito.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  total$: Observable<Post[]>;
  post!: Post;

  constructor(private carritoService: CarritoService, public route: ActivatedRoute) {

    this.post= {id: "", nombre: "", precio: 0, medida: "", descripcion: "", disponibilidad: true, unidades: 0, author:'' }

    this.total$ = this.carritoService.total$.pipe(
      map((posts) => {
      const distintos = [...new Set(posts)];
      return distintos;
    }));
   }

  ngOnInit(): void {
  //   this.route.paramMap.subscribe((paramMap:ParamMap)=>{
  //     if(paramMap.has("postId")){
  //       this.postId = paramMap.get("postId")!;
  //       this.postService.getPost(this.postId).subscribe(postData =>{
  //         this.post = {id: postData._id,
  //                     nombre: postData.nombre,
  //                     precio: postData.precio,
  //                     medida: postData.medida,
  //                     descripcion: postData.descripcion,
  //                     disponibilidad: postData.disponibilidad,
  //                     unidades: postData.unidades,
  //                     author: postData.author,};
  //       })
  //     }else{
  //       this.postId = null!;
  //     }
  //   })
  // }
  // }

}}
