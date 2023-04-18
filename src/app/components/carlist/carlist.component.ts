import { Component } from '@angular/core';
import { ICar, NewCar } from 'src/app/interfaces/car';
import { CarApiService } from 'src/app/services/car-api.service';
import { OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core'; //test

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit{
  public carsData:ICar | any ;
  show!:boolean;
  bodyText = 'This text can be updated in modal 1';

  
  constructor(private _carAPIService:CarApiService){}
  @Output() carDeletedEvent = new EventEmitter<string>()//test
  ngOnInit() {
    this.getCars()
  }

  getCars() {
    this._carAPIService.getCarDetails().subscribe(carsData =>
      { this.carsData = carsData
        console.log(this.carsData);
    });
    
  }

  addCar(make:string, model:string, year:string,imageUrl:string) {
    let addCar:ICar;
    addCar=new NewCar(make,model,year,imageUrl);
    this._carAPIService.addCarDetails(addCar).subscribe(carsData =>
      { this.carsData = carsData;
      this.getCars();}
    );
    let formField=document.getElementsByTagName('input');
    for(let i = 0; i < formField.length; i++){
      formField[i].value = "";
    }
    return false;
  }
  deleteCar(carId:string) { 
    this._carAPIService.delCarDetails(carId).subscribe(result =>
      { 
        console.log(result);
      });
      this.carsData = this.carsData.filter((car:ICar) => car._id !== carId);
      this.carDeletedEvent.emit("car got deleted");
  }
  
}
