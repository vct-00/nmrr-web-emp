import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/modules/http/room/room.service';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.scss'],
})
export class AllRoomsComponent implements OnInit {
  constructor(private room: RoomService, private router: Router) {}
  rooms: any = [];
  goToRoomDetails(id: number) {
    this.router.navigate([`/room-details/${id}`]);
  }

  ngOnInit(): void {
    this.room.getAllRooms().subscribe((res) => {
      if (res) {
        this.rooms = res;
      }
    });
  }
}
