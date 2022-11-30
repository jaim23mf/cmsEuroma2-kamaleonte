import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { EventsComponent } from './events/events.component';
import { GeneralComponent } from './general/general.component';
import { MapComponent } from './map/map.component';
import { PromoComponent } from './promo/promo.component';
import { ServicesComponent } from './services/services.component';
import { StoresComponent } from './stores/stores.component';

const routes: Routes = [
  { path:"Map",component:MapComponent,pathMatch:"full"},
  { path:"General",component:GeneralComponent,pathMatch:"full"},
  { path:"Promo",component:PromoComponent,pathMatch:"full"},
  { path:"Events",component:EventsComponent,pathMatch:"full"},
  { path:"Stores",component:StoresComponent,pathMatch:"full"},
  { path:"Services",component:ServicesComponent,pathMatch:"full"},
  { path:"Blog",component:BlogComponent,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
