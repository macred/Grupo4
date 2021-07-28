import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import {Post} from '../../Models/post.model'


@Component({
  selector: 'app-crear-post',
  templateUrl: './crear-post.component.html',
  styleUrls: ['./crear-post.component.css']
})
export class CrearPostComponent implements OnInit {
  private isEditing = false;
  private postId!: string;
  post!: Post;

  constructor(public postService: PostService, public route: ActivatedRoute) {
    this.post= {id: "", nombre: "", precio: 0, medida: "", descripcion: "", disponibilidad: true, unidades: 0, author:'' }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has("postId")){
        this.isEditing = true;
        this.postId = paramMap.get("postId")!;
        this.postService.getPost(this.postId).subscribe(postData =>{
          this.post = {id: postData._id,
                      nombre: postData.nombre,
                      precio: postData.precio,
                      medida: postData.medida,
                      descripcion: postData.descripcion,
                      disponibilidad: postData.disponibilidad,
                      unidades: postData.unidades,
                      author: postData.author,};
        })
      }else{
        this.isEditing = false;
        this.postId = null!;
      }
    })
  }

  onSavePost(form:NgForm):void{
    if(form.invalid){
      return;
    }
    if(this.isEditing){
      this.postService.updatePost(form.value, this.postId);
    }else{
      this.postService.addPost(form.value);
    }
    form.resetForm();
  }
}
