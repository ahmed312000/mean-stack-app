import { Component ,OnChanges , OnInit } from "@angular/core";
import { Router } from '@angular/router'
import { HomeComponent } from "../home.component";
import { PostsService } from "../../posts.service";
import { UserLoginComponent } from "../../../user/user-deps/login/login.component";
import * as jwt_decode from "jwt-decode";
import { UserService } from "../../../user/user.service";



@Component({
    selector : "app-username-comp",
    templateUrl  :"./username.component.html"
    
    ,styleUrls : ["./username.component.css"],
})

export class UsernameComponent implements OnInit   {
    constructor(private r : Router , private ps: PostsService) {}
    username ;

    usernameShowing() {
        if(this.ps.getDecodedAccessToken(localStorage.getItem('token'))) {

        this.username = this.ps.getDecodedAccessToken(localStorage.getItem('token')).user.username

        }
    }
    ngOnInit() {
        this.usernameShowing()
    }

    onLogout() {
        localStorage.clear()
        this.r.navigateByUrl("/user");
    }
}