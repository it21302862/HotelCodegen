import { NgModule } from '@angular/core';
import { HomeDisplayHotelsComponent } from './home-display-hotels/home-display-hotels.component';
import { HotelDisplayAdminComponent } from './hotel-display-admin/hotel-display-admin.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeDisplayHotelsComponent },
  { path: 'admin', component: HotelDisplayAdminComponent },
  { path: 'room-types/:hotelID', component: RoomTypeComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
