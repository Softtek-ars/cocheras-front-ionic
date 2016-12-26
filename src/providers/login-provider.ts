import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class LoginProvider {
    static get parameters() {
        return [[Http]];
    }
	
	constructor(public http: Http) {
	}
  
	login (username, password){
		//build header options
		//let headers = new Headers({ 'Content-Type': 'application/json' });
		//let options = new RequestOptions({ headers: headers });
		
		let body = { 'username': username, 'password': password };

		//let body = JSON.stringify( { username, password });
		
		var url = 'http://localhost:8080/api/session';
        var response = this.http.post(url, body).map(response => response.json());
		
		return response;
	}
}