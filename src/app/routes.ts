import { Routes } from '@angular/router';
import { TotalHomeComponent } from './home/home-total.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './404/Error.component';
import { userRoutes } from './user/user.routes';

export const routes : Routes = [

    {path : '' , redirectTo : 'post' , pathMatch : 'full' },
    { path : 'post' , component : TotalHomeComponent  },
    { path : 'user' , component : UserComponent , children : userRoutes },
    { path : 'about' , component : AboutComponent },
    { path:'**' , component: ErrorComponent },

]