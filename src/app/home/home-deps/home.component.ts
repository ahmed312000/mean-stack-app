import { Component , OnInit } from "@angular/core";
import { PostsService } from "../posts.service";
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from "@angular/forms";



@Component({
    selector : "app-home",
    templateUrl : "./home.component.html",
    styleUrls : ['home.component.css']
})

export class HomeComponent implements OnInit {
    constructor( private ps : PostsService ,private ar : ActivatedRoute){}
    posts : Post[] = []
    editMode = false ;
    hideDelete = false ;
    hideCancel = true ;
    hideUpdate = false ;
    hideAdd = false ; 
    showSave = false ; 
    data = null ;
    username  ;
    sortedposts ;

    authenticated = localStorage.getItem('id');
    isLogedin = localStorage.getItem('token');


   

     sorting() {
        this.posts.sort(function(a,b) { 
        return new Date(b.date).getTime() - new Date(a.date).getTime()
        });     
    }




    ngOnInit(){
        if(this.isLogedin) {
        let decoded = this.ps.getDecodedAccessToken(localStorage.getItem('token'))
        this.username = decoded.user.username
        }
        else {}
        
        this.ps.getPosts()
        .subscribe((posts : Post[]) => {
            this.posts = posts
            this.sorting() 

        }
    ,err => {});

    }
    onAdd(input : HTMLInputElement) {
      
        var post : Post = new Post( this.username , input.value , new Date() , null , localStorage.getItem('id') )
      
        
        this.ps.addPosts(post).subscribe(
            (data) => {console.log(data)
                this.data = data
                post.postId = this.data.postId ;
            }
            ,err => {

            }
        )
        
        this.posts.splice(0 , 0 , post);
        input.value = '';

        setTimeout(() => {

            this.ps.getPosts()
        .subscribe((posts : Post[]) =>  {
        this.posts = posts
        this.sorting();
    });
        } , 2000);

        
    }

    onDelete(id , i) {
        this.ps.deletePosts(id).subscribe(res => console.log(res) , err => {});
        this.posts.splice(i , 1);

        // this.ps.getPosts()
        // .subscribe((posts : Post[]) => this.posts = posts);

    }
    
    onUpdate(input , post) {
        input.value = post.content
        this.hideDelete = true ;
        this.hideCancel = false ;
        this.hideUpdate = true ;
        this.showSave = true ; 
        this.hideAdd = true ;


    }
    onSave(input , post , f ) {
        let thesentPost = new Post(this.username , input.value , new Date() , post.postId)
        this.ps.updatePosts(thesentPost , post.postId).subscribe(res => console.log(res) , err => {})
        post.content = input.value ;
        this.hideDelete = false ;
        this.hideCancel = true ;
        this.hideUpdate = false ;
        this.showSave = false ; 
        this.hideAdd = false ;



        setTimeout(() => {

            this.ps.getPosts()
        .subscribe((posts : Post[]) =>  {
        this.posts = posts
        this.sorting();
        });
    } , 2000);



        input.value = '';


    }

  

    onCancel(content) {
        content.value = '' ;
        this.hideDelete = false ;
        this.hideCancel = true ;
        this.hideUpdate = false ;
        this.showSave = false ; 
        this.hideAdd = false ;

    }

    onClicked() {
        if(this.editMode == true) {
            this.editMode = false ;

        }

        else if(this.editMode == false) {
            this.editMode = true ;

          
        }
    }
    
}