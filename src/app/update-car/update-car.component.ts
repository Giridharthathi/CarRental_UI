import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { carDetails } from '../models/car-details';
import { BackendConnectivityService } from '../service/backendconnectivity.service';
import { CarDetailsBackEndConnectivity } from '../service/CarData-BackEndConnectivity';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  carId: number;
  car: any;
  carData: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: Router,
    private apiCarService: CarDetailsBackEndConnectivity, private activateRoute: ActivatedRoute) {
    this.carData = this.formBuilder.group({
      carName: ['', [Validators.required]],
      model: ['', [Validators.required]],
      airBags: ['', [Validators.required]],
      seats: ['', [Validators.required]],
      fuelType: ['', [Validators.required]],
      fuelCapacity: ['', [Validators.required]],
      kmsDriven: [''],
      carType: ['', [Validators.required]],
      registrationNumber: ['', Validators.required],
      transmission: ['', Validators.required],
      price: ['', Validators.required],
      city: ['', Validators.required]
      // , , , , , , , carType, 
      // transmission, registrationNumber, 
      // kmsDriven, price, rating, ownerMailId, city, dataPresence
    });
    this.carData.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.carData);
    });

  }
  ngOnInit() {
    this.car = new carDetails();
    this.carId = this.activateRoute.snapshot.params.carId;
    this.apiCarService.getParicularCarDetails(this.carId)
      .subscribe(
        data => {
          console.log(data[0]);
          this.car = data[0];
          console.log(this.car);
          this.prefillUpdateForm();
        },
        error => console.log(error));

  }
  prefillUpdateForm(): void {
    this.carData.setValue({
      carName: this.car.carName,
      model: this.car.model,
      seats: this.car.seats,
      fuelCapacity: this.car.fuelCapacity,
      airBags: this.car.airBags,
      fuelType: this.car.fuelType,
      carType: this.car.carType,
      registrationNumber: this.car.registrationNumber,
      transmission: this.car.transmission,
      kmsDriven: this.car.kmsDriven,
      price: this.car.price,
      city: this.car.city
    });
  }

  formErrors = {
    carName: '',
    model: '',
    seats: '',
    fuelCapacity: '',
    airBags: '',
    fuelType: '',
    carType: '',
    registrationNumber: '',
    transmission: '',
    kmsDriven: '',
    price: '',
    city: ''
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
    carName: {
      required: 'First Name field is empty'
    },
    model: {
      required: 'Last Name field is empty'
    },
    seats: {
      required: 'seats field is empty'
    },
    fuelCapacity: {
      required: 'fuelCapacity field is empty'
    },
    airBags: {
      required: 'airbags field is empty'
    },
    fuelType: {
      required: 'fuelType field is empty'
    },
    carType: {
      required: 'carType field is empty'
    },
    registrationNumber: {
      required: 'password field is empty'
    },
    transmission: {
      required: 'password field is empty'
    },
    kmsDriven: {
      required: 'kmsDriven field is empty'
    },
    price: {
      required: 'price field is empty'
    },
    city: {
      required: 'city field is empty'
    }
  }
  updateCar() {
    this.apiCarService.updateCar(this.carId, this.carData.value)
      .subscribe(
        data => {
          console.log("inside updatre methid");
          
          console.log(data+"----------")
          Swal.fire(
            'Nice!',
            'The product has been updated!',
            'success'
          ).then(()=>this.route.navigate(['../','admin']));
        },
        error => console.log(error));
    this.car = new carDetails();
    
  }
}