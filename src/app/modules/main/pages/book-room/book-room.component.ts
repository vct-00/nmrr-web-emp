import { BookingService } from './../../../http/booking/booking.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss'],
})
export class BookRoomComponent implements OnInit {
  @Input() public roomId;
  constructor(
    public activeModal: NgbActiveModal,
    public bookingSvc: BookingService
  ) {}

  ngOnInit(): void {}

  saveBooking() {
    //retrieve dates for booking
    let startDateTime = new Date(
      (<HTMLInputElement>document.getElementById('start')).value
    );

    if (startDateTime < new Date()) {
      return alert('Time invalid. Please set a valid booking schedule.');
    }

    let duration = (<HTMLInputElement>document.getElementById('duration'))
      .value;

    let endDateTime = moment(startDateTime).add(duration, 'm').toDate();

    //create booking object to save
    let booking = {
      roomId: this.roomId,
      notes: (<HTMLInputElement>document.getElementById('notes')).value,
      startDate: startDateTime.getTime(),
      endDate: endDateTime.getTime(),
    };

    this.bookingSvc.addRoomBooking(booking).subscribe(
      () => {
        alert('Booking successful!');
        this.activeModal.close('success');
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
  }

  closeBooking() {
    this.activeModal.close('cancelled');
  }
}
