import { Component,OnInit } from '@angular/core';
import { Hotel } from '../services/hotel';
import { HotelService } from '../services/hotels.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-display-hotels',
  templateUrl: './home-display-hotels.component.html',
  styleUrls: ['./home-display-hotels.component.css']
})
export class HomeDisplayHotelsComponent implements OnInit{

  public hotels: Hotel[] = [];

 

  constructor(private hotelService:HotelService){}

  
  ngOnInit(): void {
    console.log('ngOnInit is called');
    this.getHotels();
  }

  // public getHotels(): void {
  //   this.hotelService.getHotels().subscribe(
  //     (response: Hotel[]) => {
  //       this.hotels = response;
  //       console.log(this.hotels);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public getHotels(): void {
    this.hotelService.getHotels().subscribe(
      (response: any) => {
        if (response && response.content) {
          this.hotels = response.content;
          console.log(this.hotels);
        } else {
          console.error('Invalid API response:', response);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

}
