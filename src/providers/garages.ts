import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Garages { 
	headers: Headers;
	data: any;

	constructor(public http: Http) {
		this.data = null;
	}

	// TODO: $http.defaults.headers.common.Authorization = result.token;
	
	getGarages(authorization: string, date: Date){
		//var url = 'http://localhost:8080/api/garages/' + date;
		var url = 'http://localhost:8080/api/garages';
		
		// Send authorization
		this.headers = new Headers();
		this.headers.append('authorization', authorization);
		
        var response = this.http.get(url, { headers: this.headers}).map(response => response.json());
        
		return response;
	}

	createGarage(garage){
		/*
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post('http://localhost:8095/api/usuarios', JSON.stringify(garage), {headers: headers})
		.subscribe(res => {
		console.log(res.json());
		});
		*/
		
		var url = 'http://localhost:8080/api/garages';
        var response = this.http.post(url, JSON.stringify(garage)).map(response => response.json());
        
		return response;
	}
}