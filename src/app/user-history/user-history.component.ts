import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetailsBackEndConnectivity } from '../service/CarData-BackEndConnectivity';
import { AdminSearchUserNames } from '../service/admin-search-user';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  userId:string;
  userHistory:any;
  found:boolean;

  constructor(private activatedRoute:ActivatedRoute
    , private apiService:AdminSearchUserNames, private formBuilder:FormBuilder,
    private route: Router) { }

  ngOnInit(): void {
    console.log("Inside the orders ngOnIt");

    this.userId = this.activatedRoute.snapshot.params.userId;

     this.apiService.gettingUserOrderHistory(this.userId).subscribe(data => {
        console.log(data);
        if(data.length === 0){
          this.found = true
        }else{
          this.found=false;
        this.userHistory = data;}
      }, error => console.log(error));
  }

}
