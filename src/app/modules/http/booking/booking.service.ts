import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  business: string = environment.business;

  constructor(public http: HttpClient) {}

  getRoomBookings(roomId) {
    return this.http.get(
      this.business + '/bookings/room/' + roomId,
      this.getHeaders()
    );
  }

  addRoomBooking(data) {
    console.log(this.getHeaders());

    return this.http.post(this.business + '/bookings', data, this.getHeaders());
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Token'),
      }),
    };
    return httpOptions;
  }
}
