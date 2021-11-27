import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ZnamenitostComponent } from './components/znamenitost/znamenitost.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VaznostfilterPipe } from './pipes/vaznostfilter.pipe';
import { ZnamenitostpreviewComponent } from './components/znamenitostpreview/znamenitostpreview.component';
import { StarsVoteComponent } from './components/stars-vote/stars-vote.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
    // FontAwesomeModule
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    ZnamenitostComponent,
    SearchbarComponent,
    VaznostfilterPipe,
    ZnamenitostpreviewComponent,
    StarsVoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
