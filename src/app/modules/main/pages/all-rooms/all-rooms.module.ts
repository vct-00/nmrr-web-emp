import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRoomsRoutingModule } from './all-rooms-routing.module';
import { AllRoomsComponent } from './all-rooms.component';

@NgModule({
  declarations: [AllRoomsComponent],
  imports: [CommonModule, AllRoomsRoutingModule],
})
export class AllRoomsModule {}
