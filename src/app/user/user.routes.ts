import { Routes } from '@angular/router';
import { UserSignupComponent } from './user-deps/signup/signup.component';
import { UserLoginComponent } from './user-deps/login/login.component';
import { UserProfileComponent } from './user-deps/profile/profile.component';
import { UserErrorComponent } from './404/userError.component';
import { RoutesGuard } from '../guards/routes.guard';
// import { UserLogoutComponent } from './user-deps/logout/logout.component';


export const userRoutes  : Routes = [
    { path : '' , component : UserSignupComponent } ,
    { path : 'login' , component : UserLoginComponent },
    { path : 'profile' , component : UserProfileComponent , canActivate: [RoutesGuard]   },
    // { path : 'Logout' , component : UserLogoutComponent } ,
    { path : '**' , component : UserErrorComponent }
]