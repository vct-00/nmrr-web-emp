import { PipesModule } from './../../../../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomDetailsRoutingModule } from './room-details-routing.module';
import { RoomDetailsComponent } from './room-details.component';

import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    RoomDetailsRoutingModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [RoomDetailsComponent],
  exports: [RoomDetailsComponent],
})
export class RoomDetailsModule {}
