import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { relative } from 'path';
import { carDetails } from '../models/car-details';
import { Register } from '../models/register';
import { BackendConnectivityService } from '../service/backendconnectivity.service';
import { CarDetailsBackEndConnectivity } from '../service/CarData-BackEndConnectivity';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  allCarDetails:carDetails[];
  errorMessage:boolean=false;

  constructor(private formBuilder:FormBuilder, private service:BackendConnectivityService
    ,private route:Router, private activatedRouted:ActivatedRoute,
    private navbarService:CarDetailsBackEndConnectivity) {
    this.loginData.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.loginData);
   });
  }

  // private railService:RailwayService) { }
  //   this.r

  ngOnInit(): void {

  }

  loginData = this.formBuilder.group({
    mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  formErrors = {
    // bookId:null,
    mail:'',
    password:''
  };
  
    logValidationErrors(group: FormGroup): void {
      Object.keys(group.controls).forEach(
        (key: string) => {
          const obj = group.get(key);
          if (obj instanceof FormGroup) {
            this.logValidationErrors(obj);
          } else {
            //console.log(obj);
            this.formErrors[key] = '';
            if (obj && obj.invalid && obj.touched) {
              const messages = this.validationErrorMessages[key];
              //console.log(messages);
              //console.log(obj.errors);
              for (const errorKey in obj.errors) {
                if (errorKey) {
                  this.formErrors[key] += messages[errorKey] + ' ';
                  //console.log(this.formErrors[key]);
                }
  
              }
            }
          }
        }
      );
    }
    validationErrorMessages = {
      mail: {
        required: 'Please enter e-mail to login ',
        pattern: 'Invalid mail id'
      },
      password: {
        required: 'Please enter password to login ',
        minLength: 'Invalid Password'
      },
    };
    userDetails:Register;
    
    onSubmit() {
      this.service.checkUser(this.loginData.value)
        .subscribe(
          data => {
            console.log(data);
        
            if (data.status === 200) {
                if (data.body.userRole === 'user') {
                    sessionStorage.setItem('userId', data.body.userId);
                    sessionStorage.setItem('user', JSON.stringify(data.body));
                    this.navbarService.sendData(false);
                    this.route.navigate(['../', 'home'], { relativeTo: this.activatedRouted });
                } else if (data.body.userRole === 'admin') {
                    this.navbarService.sendData(false);
                    sessionStorage.setItem('adminMail', data.body.mail);
                    this.route.navigate(['../', 'admin'], { relativeTo: this.activatedRouted });
                }
            }
        },        
          error =>{
            if (error.status === 400) {
            this.errorMessage = true;}
          
          else if (error.status === 500) {
            this.errorMessage = true;}
          });
      this.userDetails = new Register();
    };
  
    // () {
    //   this.save();
    // };
    registerHere(){
      this.route.navigate(['../','register'],{relativeTo:this.activatedRouted});
    }
}
