import { PipesModule } from './../../../../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBookingsRoutingModule } from './my-bookings-routing.module';
import { MyBookingsComponent } from './my-bookings.component';
import { EventsCalendarModule } from '../../components/events-calendar/events-calendar.module';

@NgModule({
  declarations: [MyBookingsComponent],
  imports: [
    CommonModule,
    MyBookingsRoutingModule,
    EventsCalendarModule,
    PipesModule,
  ],
})
export class MyBookingsModule {}
