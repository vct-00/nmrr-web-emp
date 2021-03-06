import { DecodeTokenPipe } from './../../../../shared/pipes/decode-token.pipe';
import { AuthService } from './../../../http/auth/auth.service';
import { LogInComponent } from './../../pages/log-in/log-in.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  private modalRef: any;
  public userFullName: string = '';
  constructor(
    private modal: NgbModal,
    private authSvc: AuthService,
    private router: Router,
    private decode: DecodeTokenPipe
  ) {}

  ngOnInit(): void {}

  openLogInModal() {
    if (!this.isLoggedIn) {
      this.modalRef = this.modal.open(LogInComponent, {
        size: 'lg',
        centered: true,
      });

      this.modalRef.result.then(
        (result: string) => {
          if (result === 'success') {
            //TODO: do something here if successful:log in
          }
        },
        (reason: any) => {}
      );
    } else {
      this.authSvc.logOut().subscribe((response) => {
        localStorage.removeItem('Token');
        this.router.navigate([`/`]);
      });
    }
  }

  get isLoggedIn() {
    const user = this.decode.transform(localStorage.getItem('Token') as string);
    this.userFullName = user ? user.firstName + ' ' + user.lastName : '';
    return localStorage.getItem('Token');
  }

  goToOwnBookings() {
    this.router.navigate([`/my-bookings`]);
  }
}
