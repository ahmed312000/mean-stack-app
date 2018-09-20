import { Component , OnInit ,DoCheck} from "@angular/core";
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user.service'
import { User } from "../../../models/user.model";



@Component({
    selector : 'user-signup',
    templateUrl : 'signup.component.html',
    styleUrls : ['signup.component.css']

})

export class UserSignupComponent  {
    constructor(private us  : UserService) {}
    // pass1;
    // pass2;
    validation = true ;

    result ;

    passwordType2 = 'password';
    passwordType = 'password';

    f = new FormGroup({
        username : new FormControl('' ,[Validators.required]), //required
        email : new FormControl('' ,[Validators.required , Validators.email] ), // required and email
        password : new FormControl('' , [Validators.required , Validators.minLength(8)]), // required and minlength 8
        rePassword : new FormControl('', [Validators.required])
    });

    get username() {
        return this.f.get('username');
    }

    get email() {
        return this.f.get('email');
    }

    get password() {
        return this.f.get('password');
    }

    get rePassword() {
        return this.f.get('rePassword');
    }

    onChange(event) {
        if(event.target.checked) {
            this.passwordType = 'text';
        }
        if(!event.target.checked) {
            this.passwordType = 'password'
        }

    }


    
    onChange2(event) {
        if(event.target.checked) {
            this.passwordType2 = 'text';
        }
        if(!event.target.checked) {
            this.passwordType2 = 'password'
        }

    }

    onSubmit(userInput) { 

        if(this.password.value !== this.rePassword.value) {
            this.f.setErrors({ passwordsDoNotMatch : true });
        }

        else {

            let user = new User(this.username.value , this.email.value , this.password.value) ;

            this.us.saveUsers(user).subscribe(data => { console.log(data) ; 
            
        } , err => {
                this.username.setErrors({ usernameTaken : true });
            }) ;

            this.f.reset() 
        }
    }
 





    onInput(event) {
        var post = {username : event.target.value}
        this.us.validateUsername(post).subscribe(
        data => {
            console.log()
            if(data.title == "username Taken") {
                this.username.setErrors({ usernameTaken : true  })
            }
        } 
        , err => console.log())
    }





}



