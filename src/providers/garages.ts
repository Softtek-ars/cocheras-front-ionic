import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Garages { 
	data: any;

	constructor(public http: Http) {
		this.data = null;
	}

	getGarages(){
		/*
		if (this.data) {
		return Promise.resolve(this.data);
		}

		return new Promise(resolve => {

		this.http.get('http://localhost:8095/api/garages')
		.map(res => res.json())
		.subscribe(data => {
		this.data = data;
		resolve(this.data);
		});
		});
		*/
		
		var url = 'http://localhost:8080/api/garages';
        var response = this.http.get(url).map(response => response.json());
        
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