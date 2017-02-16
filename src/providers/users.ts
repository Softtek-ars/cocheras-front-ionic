import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Users { 
	headers: Headers;
	data: any;

	constructor(public http: Http) {
		this.data = null;
	}

	// TODO: $http.defaults.headers.common.Authorization = result.token;
	
	getUsers(authorization: string){
		var url = 'http://localhost:8080/api/user';
		
		// Send authorization
		this.headers = new Headers();
		this.headers.append('authorization', authorization);
		
        var response = this.http.get(url, { headers: this.headers}).map(response => response.json());
        
		return response;
	}

	createUser(authorization: string, user){
		// Send authorization
		this.headers = new Headers();
		this.headers.append('authorization', authorization);
		

		var url = 'http://localhost:8080/api/user';
        var response = this.http.post(url, { headers: this.headers, body: JSON.stringify(user)}).map(response => response.json());
        
		return response;
	}
}