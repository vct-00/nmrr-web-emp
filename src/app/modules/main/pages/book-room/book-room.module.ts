import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoomRoutingModule } from './book-room-routing.module';
import { BookRoomComponent } from './book-room.component';


@NgModule({
  declarations: [
    BookRoomComponent
  ],
  imports: [
    CommonModule,
    BookRoomRoutingModule
  ]
})
export class BookRoomModule { }
