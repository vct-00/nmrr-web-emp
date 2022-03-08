import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  business: string = environment.getBusiness();

  constructor(public http: HttpClient) {}

  getAllRooms() {
    return this.http.get(this.business + '/rooms', this.getHeaders());
  }

  getRoomDetails(roomId) {
    return this.http.get(this.business + '/rooms/' + roomId, this.getHeaders());
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return httpOptions;
  }
}
