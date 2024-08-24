import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { carDetails } from '../models/car-details';

@Injectable({
  providedIn: 'root'
})

export class BackendConnectivityService {

  private baseUrl = "http://localhost:8080/api/registration";
  private baseLoginUrl = "http://localhost:8080/api/login";

  constructor(private http:HttpClient) { }

  //Registration
  createUser(userData: any): Observable<any> {    
    return this.http.post(this.baseUrl, userData,  { observe: 'response' });
  }

  //Login
  checkUser(userData: any): Observable<any> {    
    return this.http.post(this.baseLoginUrl, userData,{observe: 'response'});
  }

  //update mail and phone Number
  update(myAccount:any):Observable<any>{
    return this.http.post(`${this.baseLoginUrl}/update`, myAccount,  { observe: 'response' });
  }
  
  // update(myAccount: any): Observable<any> {
  //   const url = `${this.baseLoginUrl}/update`;  // Correct URL construction
  //   console.log(`${url}, ${JSON.stringify(myAccount)}`);
  //   console.log(myAccount);
  
  //   return this.http.post(url, myAccount, { observe: 'response' });
  // }
  
}
