import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { EventsComponent } from './events/events.component';
import { GeneralComponent } from './general/general.component';
import { MapComponent } from './map/map.component';
import { PromoComponent } from './promo/promo.component';
import { ServicesComponent } from './services/services.component';
import { StoresComponent } from './stores/stores.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ReachComponent } from './reach/reach.component';
import { MapEditorComponent } from './map-editor/map-editor.component';

const routes: Routes = [
  { path:"Map",component:MapComponent,pathMatch:"full" , canActivate:[AuthGuard]},
  { path:"General",component:GeneralComponent,pathMatch:"full",canActivate:[AuthGuard]},
  { path:"Promo",component:PromoComponent,pathMatch:"full",canActivate:[AuthGuard]},
  { path:"Events",component:EventsComponent,pathMatch:"full",canActivate:[AuthGuard]},
  { path:"Stores",component:StoresComponent,pathMatch:"full",canActivate:[AuthGuard]},
  { path:"Services",component:ServicesComponent,pathMatch:"full",canActivate:[AuthGuard]},
  { path:"Reach",component:ReachComponent,pathMatch:"full",canActivate:[AuthGuard]},
  { path:"Blog",component:BlogComponent,pathMatch:"full",canActivate:[AuthGuard]},
  { path:"MapEditor",component:MapEditorComponent,pathMatch:"full"},
  { path: "Login",component:LoginComponent, pathMatch:"full"},
  { path: "", component: LoginComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
