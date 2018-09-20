import { Injectable, OnInit ,OnChanges } from '@angular/core';
import { Http } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
// import { HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Response } from '@angular/http';
import * as jwt_decode from "jwt-decode";




@Injectable()
export class PostsService {
     
    posts : Post[] = [] ;


    private url = '/post';
    // private url = 'http://localhost:3000/post';
    constructor(private http : Http) {}




    addPosts(post) {
        const addBody = JSON.stringify(post)
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '' ;
        const headers  = new Headers({ 'Content-Type' : 'application/json' })
        return this.http.post(this.url + token, addBody , {headers : headers})
        .pipe(map((respose:Response) => respose.json()) , 

         catchError(e=> {
            // this.es.handleError(e.json())
            return throwError(new Error(e))
        }) ) 
        
    }

    getPosts() {
        return this.http.get(this.url + '/get-posts-all').pipe(
            map((res:Response) => {
                const posts = res.json().obj ;

                let transformedPosts : Post[] = [];

                for(let post of posts) {
                    transformedPosts.push(new Post(post.user.username, post.content , post.date , post._id , post.user._id ))
                    this.posts.splice(0 , 0 , post)
                    //  this.posts.push(post)
                }
                return transformedPosts ; 
            }) , 
            catchError(e=> {
                // this.es.handleError(e.json())
                return throwError(new Error("SOMETHING BAD HAPPENED bud"))        
            }))
        }

    updatePosts(newObj , id) {
        const body = JSON.stringify(newObj)
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '' ;
        const headers  = new Headers({ 'Content-Type' : 'application/json' })
        return this.http.put(this.url + "/" + id + token , body , {headers : headers}).pipe(map(res => res.json()) ,

        catchError(e=> {
            // this.es.handleError(e.json())
            return throwError(new Error("SOMETHING BAD HAPPENED bud"));
        })
    )

    
    }



    deletePosts(id) {
        const headers  = new Headers({ 'Content-Type' : 'application/json' })
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '' ;
        
        return this.http.delete(this.url + "/" + id + token , { headers : headers }).pipe(
            map(res => res.json()),

            catchError(e=> {
                // this.es.handleError(e.json())
                return throwError(new Error("SOMETHING BAD HAPPENED bud"))
            }
        )
    )
}

    getDecodedAccessToken(token): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

}