import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home-deps/home.component';
import { NavComponent } from './navbar/nav.component';
import { TotalHomeComponent } from './home/home-total.component';
import { UserComponent } from './user/user.component';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PostsService } from './home/posts.service';
import { ErrorComponent } from './404/Error.component';
import { UserSignupComponent } from './user/user-deps/signup/signup.component';
import { UserLoginComponent } from './user/user-deps/login/login.component';
import { UserNavComponent } from './user/user-deps/navbar/navbar.component';
import { UserProfileComponent } from './user/user-deps/profile/profile.component';
import { UserErrorComponent } from './user/404/userError.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PostPipe } from './home/home-deps/post.pipe';
import { UserService } from './user/user.service';
// import { UserLogoutComponent } from './user/user-deps/logout/logout.component';
import { UsernameComponent } from './home/home-deps/username/username.component';
import { StrangerComponent } from './home/home-deps/stranger/stranger.component';
import { CapitalizePipe } from './home/capitalize.pipe';
import { RoutesGuard } from './guards/routes.guard';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        TotalHomeComponent,
        UserComponent,
        AboutComponent,
        ErrorComponent,
        UserSignupComponent,
        UserLoginComponent,
        UserNavComponent,
        UserProfileComponent,
        UserErrorComponent,
        PostPipe,
        // UserLogoutComponent,
        UsernameComponent,
        StrangerComponent,
        CapitalizePipe,
    ],
    providers : [PostsService , UserService , RoutesGuard],
    imports: [
        BrowserModule,
        FormsModule,ReactiveFormsModule, 
        RouterModule.forRoot(routes),
        HttpModule,
        HttpClientModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}