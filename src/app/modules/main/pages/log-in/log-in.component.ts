import { AuthService } from './../../../http/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  constructor(
    private authSvc: AuthService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  logIn() {
    this.authSvc
      .logIn({
        username: (<HTMLInputElement>document.getElementById('username')).value,
        password: (<HTMLInputElement>document.getElementById('password')).value,
      })
      .subscribe(
        (response: any) => {
          localStorage.setItem('Token', response['accessToken']);
          this.activeModal.close('success');
        },
        (error: HttpErrorResponse) => {
          alert(error.error.message);
        }
      );
  }
}
