import { DecodeTokenPipe } from './../../../../shared/pipes/decode-token.pipe';
import { LogInComponent } from './../log-in/log-in.component';
import { BookingService } from './../../../http/booking/booking.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookRoomComponent } from '../book-room/book-room.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-room-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./room-details.component.scss'],
  templateUrl: './room-details.component.html',
})
export class RoomDetailsComponent implements OnInit {
  roomBookings: any = [];
  events: CalendarEvent[] = [];
  private params;
  private modalRef;
  constructor(
    private route: ActivatedRoute,
    private bookingSvc: BookingService,
    private modal: NgbModal,
    private decode: DecodeTokenPipe
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.params;

    this.bookingSvc.getRoomBookings(this.params['id']).subscribe((res) => {
      if (res) {
        this.roomBookings = res;
        this.events = this.parseBookingsToEvents();
        this.refresh.next();
      }
    });
  }

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = false;

  parseBookingsToEvents(): CalendarEvent[] {
    const user = this.decode.transform(localStorage.getItem('Token'));
    const userBookingName = user.firstName + ' ' + user.lastName;

    let events: CalendarEvent[] = [];
    this.roomBookings.forEach((element) => {
      events.push({
        start: new Date(element.startDate),
        end: new Date(element.endDate),
        title: element.name + ' ' + element.notes,
        color: element.name == userBookingName ? colors.blue : colors.yellow,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      });
    });

    return events;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  get isLoggedIn() {
    return localStorage.getItem('Token') != null;
  }

  handlePopUp() {
    const componentToOpen = !this.isLoggedIn
      ? LogInComponent
      : BookRoomComponent;
    this.modalRef = this.openPopUp(componentToOpen);

    this.modalRef.result.then((result) => {
      if (result === 'success') {
        //handle login success
        if (componentToOpen === LogInComponent) {
          this.modalRef = this.openPopUp(BookRoomComponent);
        }
        //todo: handle booking success
      }
    });
  }

  openPopUp(component) {
    let modalRef = this.modal.open(component, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.roomId = this.params['id'];
    return modalRef;
  }
}
