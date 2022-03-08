import { AllRoomsModule } from './modules/main/pages/all-rooms/all-rooms.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FooterComponent } from './modules/main/components/footer/footer.component';
import { NavBarModule } from './modules/main/components/nav-bar/nav-bar.module';
import { MyBookingsModule } from './modules/main/pages/my-bookings/my-bookings.module';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    AllRoomsModule,
    MatProgressSpinnerModule,
    NavBarModule,
    MyBookingsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
