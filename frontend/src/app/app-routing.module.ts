import { NgModule } from '@angular/core';
import { HomeDisplayHotelsComponent } from './home-display-hotels/home-display-hotels.component';
import { HotelDisplayAdminComponent } from './hotel-display-admin/hotel-display-admin.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { RouterModule, Routes } from '@angular/router';
import { SlideBarComponent } from './slide-bar/slide-bar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookingComponent } from './booking/booking.component'; 

const routes: Routes = [
  { path: '', component: HomeDisplayHotelsComponent },
  { path: 'admin', component: HotelDisplayAdminComponent },
  { path: 'room-types/:hotelID', component: RoomTypeComponent },
  { path: 'dashboard', component: SlideBarComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'booking', component: BookingComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
