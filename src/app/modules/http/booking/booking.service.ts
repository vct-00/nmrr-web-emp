import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  business: string = environment.business;

  constructor(public http: HttpClient) {}

  getRoomBookings(roomId: string) {
    return this.http.get(
      this.business + '/bookings/room/' + roomId,
      this.getHeaders()
    );
  }

  getUserRoomBookings(userId: string) {
    return this.http.get(
      this.business + '/bookings/user/' + userId,
      this.getHeaders()
    );
  }

  addRoomBooking(data: any) {
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
