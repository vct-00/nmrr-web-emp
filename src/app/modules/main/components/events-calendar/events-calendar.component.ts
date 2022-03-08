import { RoomService } from 'src/app/modules/http/room/room.service';
import { DecodeTokenPipe } from './../../../../shared/pipes/decode-token.pipe';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';

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
  selector: 'app-events-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.scss'],
})
export class EventsCalendarComponent implements OnInit {
  @Input() roomBookings: any[] = [];
  @Input() parentName: string;
  @Input() roomId: string;
  events: CalendarEvent[] = [];

  constructor(private decode: DecodeTokenPipe, private roomSvc: RoomService) {}

  ngOnInit(): void {
    this.events = this.parseBookingsToEvents();
    this.refresh.next();
  }

  // #region Calendar Attributes
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = false;

  get isMyBookingParent() {
    return this.parentName == 'MyBookingsComponent';
  }
  // #endregion

  // #region Calendar Events
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
  // #endregion

  // #region Initialize CalendarEvents
  parseBookingsToEvents(): CalendarEvent[] {
    let events: CalendarEvent[] = [];
    this.roomBookings.forEach(async (element) => {
      events.push(this.createCalendarEvent(element));
    });
    return events;
  }

  // #endregion

  // #region Helper Methods

  createCalendarEvent(roomBooking) {
    let user;

    if (this.isLoggedIn) {
      user = this.decode.transform(localStorage.getItem('Token'));
    }

    let event: CalendarEvent = {
      start: new Date(roomBooking.startDate),
      end: new Date(roomBooking.endDate),
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      title: '',
      color: roomBooking.userId == user._id ? colors.blue : colors.yellow,
    };

    //#region Update Event Title
    let postFixTitle = ' - ' + roomBooking.notes;
    if (this.parentName == 'RoomDetailsComponent') {
      event.title = roomBooking.name + postFixTitle;
    } else if (this.parentName == 'MyBookingsComponent') {
      this.roomSvc.getRoomDetails(roomBooking.roomId).subscribe((res: any) => {
        event.title = res.room.name + postFixTitle;
      });
    }
    //#endregion

    return event;
  }

  get isLoggedIn() {
    return localStorage.getItem('Token') != null;
  }
  // #endregion
}
