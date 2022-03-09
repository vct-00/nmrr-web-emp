import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from './../../../http/booking/booking.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogInComponent } from '../log-in/log-in.component';
import { BookRoomComponent } from '../book-room/book-room.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-room-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./room-details.component.scss'],
  templateUrl: './room-details.component.html',
})
export class RoomDetailsComponent implements OnInit {
  public roomBookings: any = [];
  public parentName = 'RoomDetailsComponent';
  public isLoaded = false;
  private params: any;
  private modalRef: any;

  constructor(
    private route: ActivatedRoute,
    private bookingSvc: BookingService,
    private modal: NgbModal,
    private changedetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.params;

    this.bookingSvc.getRoomBookings(this.params['id']).subscribe((res) => {
      if (res) {
        this.roomBookings = res;
        this.isLoaded = true;
        this.changedetectorRef.detectChanges();
      }
    });
  }

  get isLoggedIn() {
    return localStorage.getItem('Token') != null;
  }
  // #endregion

  handlePopUp() {
    const componentToOpen = !this.isLoggedIn
      ? LogInComponent
      : BookRoomComponent;
    this.modalRef = this.openPopUp(componentToOpen);

    this.modalRef.result.then((result: any) => {
      if (result === 'success') {
        if (componentToOpen === LogInComponent) {
          this.modalRef = this.openPopUp(BookRoomComponent);
        } else {
          this.refresh.next;
        }
      }
    });
  }

  openPopUp(component: any) {
    let modalToOpen = this.modal.open(component, {
      size: 'lg',
      centered: true,
    });
    modalToOpen.componentInstance.roomId = this.params['id'];
    return modalToOpen;
  }

  refresh = new Subject<void>();
  makeloadedtrue() {
    this.isLoaded = true;
  }
}
