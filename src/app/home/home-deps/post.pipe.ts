import { Pipe , PipeTransform } from '@angular/core';

@Pipe({
	name : 'postPipe'
})

export class PostPipe implements PipeTransform {

	transform(value : string , args? : any) {
		if(!value) {
			return null ;
		}
	
		var newLine = "\r\n"


		// var arr = value.split(' ')
		var arr = value.match(/.{1,20}/g) // ['first chonk' , 'second one' , ]
		arr.forEach(function() {
			var index = 0 ;
			arr[index] + newLine ;
			index ++ ; 
		})

		// for(var counter = 1 ; counter < (value.length / 20) ; counter ++){
		// 	var start = value.length * counter ;
		// 	arr.splice(start , 0 ,newLine );
		// }
		return arr.join(' ')

	}




	}

