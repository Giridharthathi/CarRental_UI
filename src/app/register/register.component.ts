import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Register } from '../models/register';
import { BackendConnectivityService } from '../service/backendconnectivity.service';
import { passwordValidator } from '../validations/passwordValidator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private route:Router, private service: BackendConnectivityService) {
    this.userData.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.userData);
    });

  }
  ngOnInit(){
    this.route.navigate(["/register"]);
  }

  userData = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]{4,}$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]{4,}$')]],
    gender: ['', [Validators.required, Validators.pattern(/^(Male|Female)$/)]],
    age: ['', [Validators.required, Validators.pattern('^(1[9-9]|[2-9][0-9])$')]],
    mail: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ]],
    phoneNumber: ['', [Validators.required,Validators.pattern(/^\d{10}$/),Validators.minLength(10)]],
    userRole: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword:['',Validators.required]
  },{validator:passwordValidator});
  formErrors = {
    firstName:'',
    lastName:'',
    gender:'',
    age:'',
    mail:'',
    phoneNumber:'',
    password:'',
    confirmPassword:''
  };
  logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach(
      (key: string) => {
        const obj = group.get(key);
        if (obj instanceof FormGroup) {
          this.logValidationErrors(obj);
        } else {
          this.formErrors[key] = '';
          if (obj && obj.invalid && obj.touched) {
            const messages = this.validationErrorMessages[key];
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
    firstName: {
      required: 'First Name field is empty',
      pattern: 'First Name field is Invalid'
    },
    lastName: {
      required: 'Last Name field is empty',
      pattern: 'Last Name field is Invalid'
    },
    gender: {
      required: 'gender field is empty',
      pattern: 'gender field is Invalid either Male or Female'
    },
    age: {
      required: 'Age field is empty',
      pattern: 'Age field is Invalid'
    },
    mail: {
      required: 'Mail field is empty',
      pattern: 'Mail is invalid'
    },
    phoneNumber: {
      required: 'phone number field is empty',
      minLength:'phone number should only 10 digits',
      pattern: "phone number is Invalid"
    },
    password: {
      required: 'password field is empty'
    },
    confirmPassword: {
      required: 'password field is empty',
      mismatch:'password and confirm must be same'
    }
  };

  submitted: boolean;
  book: Register;

  Book(): void {
    this.submitted = false;
    this.book = new Register();
  }

  onSubmit() {
    this.service.createUser(this.userData.value)
      .subscribe(
        data => {
          console.log(data);
             Swal.fire({
              title: "Registration Successful",
              text: "Please login to continue",
              icon: "success"
            }).then(()=>this.route.navigate(['/login']));
            
        },
        error => { Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Already exist !",
          footer: '<button routerLink="/register">Register</button>'
        });
      });
    this.book = new Register();
  }

  // onSumit() {
  //   this.save();
  // }
}
