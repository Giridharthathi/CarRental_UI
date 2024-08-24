import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AdminSearchUserNames {

    private searchUserDetailsUrl = "http://localhost:8080/api/admin-search";

    constructor(private http: HttpClient) { }

    getCarUsedUserDetails(carId: number): Observable<any[]> {
        console.log("inside service method");
        console.log(`${this.searchUserDetailsUrl}/${carId}`);
        return this.http.get<any[]>(`${this.searchUserDetailsUrl}/${carId}`);
    }

    insertOrderDetails(orderConfirmDetail: any):Observable<any[]> {
        console.log(`${this.searchUserDetailsUrl}`, orderConfirmDetail);
        console.log(orderConfirmDetail);        
        return this.http.post<any[]>(this.searchUserDetailsUrl, orderConfirmDetail);
    }

    gettingUserOrderHistory(userId: string): Observable<any[]> {
        console.log(userId);
        console.log(`${this.searchUserDetailsUrl}/user-history/${userId}`);
        return this.http.get<any[]>(`${this.searchUserDetailsUrl}/user-history/${userId}`);
    }
    
}
