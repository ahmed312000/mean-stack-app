import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class RoutesGuard implements CanActivate {
    constructor(private router : Router) {}
    canActivate() {
        if(!localStorage.getItem('token')) {
            this.router.navigateByUrl('/user')
            return false 
        }
        return true                         
    }
}