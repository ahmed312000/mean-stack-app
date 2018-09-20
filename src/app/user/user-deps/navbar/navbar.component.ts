import { Component, OnInit } from "@angular/core";

@Component({
    selector : 'user-nav',
    templateUrl : 'navbar.component.html',
    styleUrls : ['navbar.component.css']
})

export class UserNavComponent {

    // ngOnInit() {
    //     if(!localStorage.getItem('token')) {
    //         this.profileHide = true
    //     }
    //     else {
    //     this.profileHide = false
    //     }
    // }

    signupActive = true ;
    loginActive
    profileActive
    profileHide ;
    isLoggedin = localStorage.getItem('token')



    onSignup() {
        this.signupActive = true
        this.loginActive = false
        this.profileActive = false
    }
    onLogin() {
        this.signupActive = false
        this.loginActive = true
        this.profileActive = false

    }
    onProfile() {
        if(localStorage.getItem('token')) {
        this.signupActive = false
        this.loginActive = false
        this.profileActive = true
        }
        else {
        this.signupActive = true
        this.loginActive = false
        this.profileActive = false
        }
    }
    
}