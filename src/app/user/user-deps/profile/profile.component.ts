import { Component, OnInit } from '@angular/core'
import { PostsService } from '../../../home/posts.service';

@Component({
    selector : 'user-profile',
    templateUrl : 'profile.component.html',
    styleUrls : ['profile.component.css']
})

export class UserProfileComponent implements OnInit {
    constructor(private ps : PostsService) {}
    token
    username ;
    email ;
    
    
    ngOnInit() {
        if(localStorage.getItem('token')) {
        this.token = this.ps.getDecodedAccessToken(localStorage.getItem('token'))
        this.username = this.token.user.username
        this.email = this.token.user.email
        }
    }
}   