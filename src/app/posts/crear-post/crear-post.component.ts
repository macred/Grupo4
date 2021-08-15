import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import {Post} from '../../Models/post.model'
import { mimeType } from './mime-type-validator';


@Component({
  selector: 'app-crear-post',
  templateUrl: './crear-post.component.html',
  styleUrls: ['./crear-post.component.css']
})
export class CrearPostComponent implements OnInit {
  private isEditing = false;
  private postId!: string;
  post: Post;
  form!: FormGroup;
  imagePreview!: string;


  constructor(public postService: PostService, public route: ActivatedRoute) {
    this.post= {
      id: "", nombre: "", precio: '', medida: "", descripcion: "", disponibilidad: '', unidades: '', imageUrl: '', author:'' };
    }

  ngOnInit(): void {
    console.log(this.post)
    this.form = new FormGroup({
      nombre: new FormControl(),
      precio: new FormControl (),
      medida: new FormControl(),
      descripcion: new FormControl(),
      disponibilidad: new FormControl(),
      unidades: new FormControl(),
      image: new FormControl({asyncValidators:[mimeType], }),
      author: new FormControl(),
      });


    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
        this.isEditing = true;
        this.postId = paramMap.get('postId')!;
        this.postService.getPost(this.postId).subscribe(postData =>{
          this.post = {id: postData._id,
                      nombre: postData.nombre,
                      precio: postData.precio,
                      medida: postData.medida,
                      descripcion: postData.descripcion,
                      disponibilidad: postData.disponibilidad,
                      unidades: postData.unidades,
                      imageUrl: postData.imageUrl,
                      author: postData.author,
                    };
                    console.log(this.post)
                     this.form.setValue({
                      nombre: this.post.nombre,
                      precio: this.post.precio,
                      medida: this.post.medida,
                      descripcion: this.post.descripcion,
                      disponibilidad: this.post.disponibilidad,
                      unidades: this.post.unidades,
                      image: this.post.imageUrl,
                      author: this.post.author,
                  });
                  this.imagePreview = this.post.imageUrl;
               });
      }
      else{
        this.isEditing = false;
        this.postId = null!;
      }
    });
  }

  onSavePost():void {
    if(this.form.invalid){
      return;
    }
    //Guardando en modo editar
    if(this.isEditing){
      this.postService.updatePost(this.form.value, this.postId, this.form.value.image);
    }
    else{
      const postInfo: Post = {
        id: this.form.value._id,
        nombre: this.form.value.nombre,
        precio: this.form.value.precio,
        medida: this.form.value.medida,
        descripcion: this.form.value.descripcion,
        disponibilidad: this.form.value.disponibilidad,
        unidades: this.form.value.unidades,
        imageUrl: '',
        author: '',
      };
      console.log(postInfo);
      this.postService.addPost(postInfo, this.form.value.image);
    }
    this.form.reset();
  }

  onImageSelected(event: Event){
    const file= (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image:file});
    this.form.get('image')?.updateValueAndValidity();
    const reader= new FileReader();
    reader.onload =()=>{
    this.imagePreview= reader.result as string;
  };
  reader.readAsDataURL(file);
}

contentIsValid(): boolean {
  return this.form.get('content')!.invalid;
}

}
