import { AbstractControl, ValidationErrors } from "@angular/forms";


export class UserValidator {
    static doNotMatch(contorl : AbstractControl , anotherContorl : AbstractControl) : ValidationErrors | null {
        if(contorl.value !== anotherContorl.value ){
           return  { doNotMatch : true };
        }
        return
    }
}