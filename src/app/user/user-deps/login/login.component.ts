import { Component } from "@angular/core";
import { UserService } from "../../user.service";
import { Router } from "@angular/router"
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector : 'user-login',
    templateUrl : 'login.component.html',
    styleUrls : ['login.component.css']
})

export class UserLoginComponent {
    constructor(private us : UserService , private R : Router) {}
    form = new FormGroup({
        "username-2" : new FormControl('' , [Validators.required]),
        "password-2" : new FormControl('' , [Validators.required])

    })


    get username2() {
        return this.form.get('username-2')
    }

    get password2() {
        return this.form.get('password-2')
    }

    onSubmit(username , password) {
        let post = {
            "username" : username.value ,
            "password" : password.value
        }
        this.us.login(post).subscribe(data => {
            localStorage.setItem('token' , data.token)
            localStorage.setItem('id' , data.userId)
            this.R.navigateByUrl("/")
            this.form.reset();

        },err => { 
            // console.error(err) 
        this.form.setErrors({ loginInvalid : true });
        
    })
    }
}