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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZnamenitostComponent } from './components/znamenitost/znamenitost.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VaznostfilterPipe } from './pipes/vaznostfilter.pipe';
import { ZnamenitostpreviewComponent } from './components/znamenitostpreview/znamenitostpreview.component';
import { StarsVoteComponent } from './components/stars-vote/stars-vote.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { LoginGuard } from './guards/login.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AddznamenitostComponent } from './components/addznamenitost/addznamenitost.component';
import { AdminpregledznamenitostiComponent } from './components/adminpregledznamenitosti/adminpregledznamenitosti.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { InlineImageScrollerComponent } from './components/inline-image-scroller/inline-image-scroller.component';
import { AddEditModalComponent } from './components/add-edit-modal/add-edit-modal.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
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
    StarsVoteComponent,
    AddznamenitostComponent,
    AdminpregledznamenitostiComponent,
    PaginationComponent,
    InlineImageScrollerComponent,
    AddEditModalComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,AuthService,LoginGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
