import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from './hotel';
import { RoomType } from './roomtypes';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiServerUrl}/api/v1/hotels/hotels`);
  }

  public addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.apiServerUrl}/api/v1/hotels/hotel`, hotel);
  }

  public updateHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.apiServerUrl}/api/v1/hotels/updateHotel`, hotel);
  }

  public deleteHotel(hotelID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/hotels/deleteHotel/${hotelID}`);
  }

  public getAvailableRoomTypes(hotelID: number):Observable<RoomType[]> {
    const url = `/api/v1/hotels/hotel/${hotelID}/available-room-types`; // Replace with your actual API endpoint URL
    return this.http.get<RoomType[]>(`${this.apiServerUrl}${url}`);
  }
  


}

