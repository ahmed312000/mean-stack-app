import { Component } from "@angular/core";
import { Router } from '@angular/router'

@Component({
    selector : "app-stranger-comp",
    templateUrl  :"./stranger.component.html"
    
    ,styleUrls : ["./stranger.component.css"]
})

export class StrangerComponent {
    constructor(private r : Router) {}
    onSignup() {
        this.r.navigateByUrl("/user")
    }
}