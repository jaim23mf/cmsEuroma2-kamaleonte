import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule  } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input' 
import { MatExpansionModule} from '@angular/material/expansion'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { GeneralComponent } from './general/general.component';
import { PromoComponent } from './promo/promo.component';
import { EventsComponent } from './events/events.component';
import { StoresComponent } from './stores/stores.component';
import { ServicesComponent } from './services/services.component';
import { BlogComponent } from './blog/blog.component';
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSelectModule} from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OphoursDialogComponent } from './ophours-dialog/ophours-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './usersService/token-interceptor.service';
import { ReachComponent } from './reach/reach.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    GeneralComponent,
    PromoComponent,
    EventsComponent,
    StoresComponent,
    ServicesComponent,
    BlogComponent,
    OphoursDialogComponent,
    FileUploadComponent,
    ConfirmDialogComponent,
    LoginComponent,
    ReachComponent
    ],
  imports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    MatIconModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [MatNativeDateModule ,  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
