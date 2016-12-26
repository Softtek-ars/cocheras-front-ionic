import { Injectable } from '@angular/core';

@Injectable()
export class LoginSharedService {
	private session = { userId: '', userName: '', authorization: '' };
	
	constructor() {
	}
  
	setSession(session){
		this.session = session;
	}
	
	getSession(){
		return this.session;
	}
	
	getUserId(){
		return this.session.userId;
	}
	
	getUserName(){
		return this.session.userName;
	}
	
	getAuthorization(){
		return this.session.authorization;
	}
	
	setUserId(userId){
		this.session.userId = userId;
	}
	
	setUserName(userName){
		this.session.userName = userName;
	}
	
	setAuthorization(authorization){
		this.session.authorization = authorization;
	}
}