import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  contractId: number | null = null;
  roomTypeId: number | null = null;
  checkIn: string | null = null;
  checkOut: string | null = null;
  noOfPax: number | null = null;
  roomPrice: number | null = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.contractId = +params['contractId']|| null;
      this.roomTypeId = +params['roomTypeId'] || null;
      this.checkIn = params['checkIn'] || null;
      this.checkOut = params['checkOut'] || null;
      this.noOfPax = +params['noOfPax'] || null;
      console.log(this.contractId);
      if (
        this.contractId !== null &&
        this.roomTypeId !== null &&
        this.checkIn !== null &&
        this.checkOut !== null &&
        this.noOfPax !== null
      ) {
        this.calculatePrice();
      } else {
        this.error = 'Invalid query parameters.';
      }
    });
  }

  calculatePrice() {
    console.log('cal runs');
    const requestPayload = {
      contractId: this.contractId,
      roomTypeId: this.roomTypeId,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      noOfPax: this.noOfPax,
    };
    
    const url = `http://localhost:9090/api/v1/hotels/calculate-price?contractId=${requestPayload.contractId}&roomTypeId=${requestPayload.roomTypeId}&checkIn=${requestPayload.checkIn}&checkOut=${requestPayload.checkOut}&noOfPax=${requestPayload.noOfPax}`;
    
    this.http.post<any>(url, 0).subscribe(
      (response: any) => {
        this.roomPrice = response?.roomPrice ?? null;
        console.log('Room Price:', this.roomPrice);
      },
      (error: HttpErrorResponse) => {
        this.error =
          'Error calculating price: ' + (error.message || 'Unknown error');
        console.error('Error calculating price:', error);
      }
    );
    
  }
}
