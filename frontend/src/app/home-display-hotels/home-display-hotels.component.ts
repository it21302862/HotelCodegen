import { Component,OnInit } from '@angular/core';
import { Hotel } from '../services/hotel';
import { HotelService } from '../services/hotels.service';
import { HttpErrorResponse } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home-display-hotels',
  templateUrl: './home-display-hotels.component.html',
  styleUrls: ['./home-display-hotels.component.css']
})
export class HomeDisplayHotelsComponent implements OnInit{

  public hotels: Hotel[] = [];

  public readonly THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;

 
  constructor(private hotelService:HotelService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(this.THUMBUP_ICON));
  }

  
  ngOnInit(): void {
    console.log('ngOnInit is called');
    this.getHotels();
  }



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

