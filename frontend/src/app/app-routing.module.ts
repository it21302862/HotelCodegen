import { NgModule } from '@angular/core';
import { HomeDisplayHotelsComponent } from './home-display-hotels/home-display-hotels.component';
import { HotelDisplayAdminComponent } from './hotel-display-admin/hotel-display-admin.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeDisplayHotelsComponent },
  { path: 'admin', component: HotelDisplayAdminComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
