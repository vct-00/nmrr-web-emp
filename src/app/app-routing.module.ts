import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'rooms',
    loadChildren: () =>
      import('./modules/main/pages/all-rooms/all-rooms.module').then(
        (m) => m.AllRoomsModule
      ),
  },
  {
    path: 'room-details/:id',
    loadChildren: () =>
      import('./modules/main/pages/room-details/room-details.module').then(
        (m) => m.RoomDetailsModule
      ),
  },
  {
    path: 'book-room',
    loadChildren: () =>
      import('./modules/main/pages/book-room/book-room.module').then(
        (m) => m.BookRoomModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/main/pages/log-in/log-in.module').then(
        (m) => m.LogInModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
