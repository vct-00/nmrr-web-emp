import { DecodeTokenPipe } from './../../../../shared/pipes/decode-token.pipe';
import { BookingService } from './../../../http/booking/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  public roomBookings: any = [];
  public isLoaded = false;
  public parentName = 'MyBookingsComponent';
  constructor(
    private bookingSvc: BookingService,
    private decode: DecodeTokenPipe
  ) {}

  ngOnInit(): void {
    this.bookingSvc
      .getUserRoomBookings(
        this.decode.transform(localStorage.getItem('Token') as string)._id
      )
      .subscribe((res) => {
        if (res) {
          this.isLoaded = true;
          this.roomBookings = res;
        }
      });
  }
}
