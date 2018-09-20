import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Response } from '@angular/http';


@Injectable()

export class UserService {
    constructor(private http : Http) {}

    private url = "/user"
    // private url = 'http://localhost:3000/user';
    private headers = new Headers({ 'Content-Type' : 'application/json' })

    saveUsers(user) {
        let body = JSON.stringify(user)
        return this.http.post(this.url , body , { headers : this.headers }).pipe(map(res => res.json()) ,
        // catchError(e=> {
            // this.es.handleError(e.json())
        //     return throwError(new Error("SOMETHING BAD HAPPENED bud"))
        // })
    )
    
    }

    validateUsername(username) {
        // let headers = new Headers({ 'Content-Type' : 'application/json' })
        let body = JSON.stringify(username)
        return this.http.put(this.url + "/username-validation" , body , { headers : this.headers }).pipe(map(res => res.json() ),
        // catchError(e=> {
            // this.es.handleError(e.json())
        //     return throwError(new Error("SOMETHING BAD HAPPENED bud"))
        // })
    ) 
        
    }

    login(info) {
        const body = JSON.stringify(info);
        return this.http.post(this.url + "/" + "login" , body , {headers : this.headers}).pipe(map(res => res.json()),
        // catchError(e=> {
            // this.es.handleError(e.json())
        //     return throwError(new Error("SOMETHING BAD HAPPENED bud"))
        // })
    )
    }

}



