
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../services/hotels.service';
import { RoomType } from '../services/roomtypes';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css']
})
export class RoomTypeComponent implements OnInit {
  public roomTypes: RoomType[] = [];

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the hotelID from the route parameters
    this.route.params.subscribe((params) => {
      const hotelID = +params['hotelID']; // Convert the parameter to a number

      // Call the service to get available room types for the specified hotel
      this.hotelService.getAvailableRoomTypes(hotelID).subscribe(
        (roomTypes: RoomType[]) => {
          this.roomTypes = roomTypes;
          console.log('Available Room Types:', this.roomTypes);
        },
        (error) => {
          console.error('Error fetching room types:', error);
        }
      );
    });
  }
}

