import {Pipe} from "@angular/core";
import {PipeTransform} from "@angular/core";

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {

    transform(value:string) {
        if (value) {
            if(!value.indexOf(' ')) {
            let firstChar = value.slice(0 , 1).toUpperCase()
            return  firstChar  + value.substr(1 , value.length)
            }
            let arr : string[]
            arr  = value.split(' ')
            // let firstChar = arr[0].slice(0 , 1).toUpperCase
            // arr
            arr.forEach((el) => {
                let firstChar = el.slice(0 , 1).toUpperCase()
                firstChar  + el.substr(1 , el.length)
            });
            return arr.join(' ')
            
        }
    }

}