import { Component, EventEmitter, Output } from '@angular/core';
import {Input} from '@angular/core'
import { ICar } from 'src/app/interfaces/car';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  @Input() carData!: ICar;
  carImageWidth:number = 300;
  showCar!:boolean;
  
  @Output() carDeletedEvent = new EventEmitter<string>()
  constructor(){}
  
}
