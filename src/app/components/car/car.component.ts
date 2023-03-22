import { Component } from '@angular/core';
import {Input} from '@angular/core'
import { ICar } from 'src/app/interfaces/car';
import { CarApiService } from 'src/app/services/car-api.service';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  @Input() carData!: ICar;
  carImageWidth:number = 300;

  constructor(private _carAPIService: CarApiService){}
  deleteCar(carId:string) { 
    this._carAPIService.delCarDetails(carId).subscribe(result =>
      { 
        console.log(result);
      });
  }
}
