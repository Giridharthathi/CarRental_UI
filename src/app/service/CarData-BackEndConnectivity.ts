import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { carDetails } from '../models/car-details';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CarDetailsBackEndConnectivity {

    private baseCarUrl = "http://localhost:8080/api/car";
    private searchCarUrl = "http://localhost:8080/api/search";
    constructor(private http: HttpClient) { }

    //Getting All Details
    getAllCarDetails(): Observable<carDetails[]> {
        return this.http.get<carDetails[]>(this.baseCarUrl);
    }


    searchCar(search: String) {
        console.log(search);
        console.log(this.searchCarUrl);
        return this.http.get<carDetails[]>(`${this.searchCarUrl}/${search}`);
    }

    getParicularCarDetails(carId: number): Observable<carDetails[]> {
        console.log("inside service method");
        console.log(`${this.baseCarUrl}/${carId}`);
        return this.http.get<carDetails[]>(`${this.baseCarUrl}/${carId}`);
    }

    insertCar(carData: carDetails): Observable<carDetails[]> {
        return this.http.post<carDetails[]>(this.baseCarUrl, carData);
    }

    deleteCar(id: number): Observable<any> {
        console.log(`${this.baseCarUrl}/${id}`);
        return this.http.delete(`${this.baseCarUrl}/${id}`);
    }

    updateCar(carId: number, carData: any): Observable<any> {
        return this.http.put(`${this.baseCarUrl}/${carId}`, carData);
    }

    // insertOrderDetails(orderConfirmDetail: any):Observable<any[]> {
    //     console.log(`${this.searchCarUrl}`, orderConfirmDetail);
    //     console.log(orderConfirmDetail);        
    //     return this.http.post<any[]>(this.searchCarUrl, orderConfirmDetail);
    // }

    private dataSubject = new BehaviorSubject<boolean>(true); //initially im setting value true

    data$ = this.dataSubject.asObservable();


    sendData(input: boolean) {
        this.dataSubject.next(input); //publishing the data
    }



}
